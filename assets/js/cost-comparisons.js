
queue()
    .defer(d3.json, "assets/data/combined_flat.json")
    .await(function makeGraphs(error, allData) {

    //OVERLAY CHART****************************************************************

    let margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        },
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    let x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);
    let y = d3.scale.linear()
        .range([height, 0]);


    let xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    let yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    let svg = d3.select("#overlay-bar-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let overlayData = assembleOverlayDataSet(allData);

    x.domain(overlayData.map(function (d) {
        return d.procedure;
    }));
    y.domain([0, Math.ceil(overlayData[4].sd_average/100)*100 ]); //SD crown is the most expensive procedure

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Values");

    let g = svg.selectAll(".bars")
        .data(overlayData)
        .enter().append("g");

    g.append("rect")
        .attr("class", "sdBar")
        .attr("x", function (d) {
            return x(d.procedure) + 10; // center it
        })
        .attr("width", x.rangeBand() - 20) // make it slimmer
        .attr("y", function (d) {
            return y(d.sd_average);
        })
        .attr("height", function (d) {
            return height - y(d.sd_average)
        })
        .on("mouseover", sdEnter)
        .on("mouseleave", sdLeave);

    g.append("rect")
        .attr("class", "tjBar")
        .attr("x", function (d) {
            return x(d.procedure);
        })
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
            return y(d.tj_average);
        })
        .attr("height", function (d) {
            return height - y(d.tj_average)
        })
        .on("mouseover", tjEnter)
        .on("mouseleave", tjLeave);

    svg.selectAll(".text,sdBar")
        .data(overlayData)
        .enter()
        .append("text")
        .attr("class", "label sdBar")
        .attr("x", (function(d) { return x(d.procedure) + 38; }  ))
        .attr("y", function(d) { return y(d.sd_average) + 3; })
        .attr("dy", ".75em")
        .text(function(d) { return `$${d.sd_average}`; });

    svg.selectAll(".text")
        .data(overlayData)
        .enter()
        .append("text")
        .attr("class", "label tjBar")
        .attr("x", (function(d) { return x(d.procedure) + 38; }  ))
        .attr("y", function(d) { return y(d.tj_average) + 5; })
        .attr("dy", ".75em")
        .text(function(d) { return `$${d.tj_average}`; });
        // .on("mouseover", toggleColor)
        // .on("mouseleave", toggleColor);;

        const legspacing = 25;
        let rectClasses = ["sdBar", "tjBar"];
        let labels = ["San Diego", "Tijuana"];
        let colors = d3.scale.ordinal()
            .range(["#4e92c3", "#57b358"]);

        let legend = svg.selectAll(".legend")
            .data(["San Diego","Tijuana"])
            .enter()
            .append("g")

        legend.append("rect")
            .attr("class", function(d, i) {
                return rectClasses[i];
            })
            .attr("fill", colors)
            .attr("width", 20)
            .attr("height", 20)
            .attr("y", function (d, i) {
                return i * legspacing + 20;
            })
            .attr("x", 50);

        legend.append("text")
            .attr("class", function(d, i) {
                return "legend " + labels[i]
            }) //NOT WORKING AS HOPED
            .attr("y", function (d, i) {
                return i * legspacing + 32;
            })
            .attr("x", 75)
            .attr("text-anchor", "start")
            .text(function (d, i) {
                return labels[i];
            });
        legend.select("text.legend.San.Diego")
            .on("mouseover", sdEnter)
            .on("mouseleave", sdLeave);
        legend.select("text.legend.Tijuana")
            .on("mouseover", tjEnter)
            .on("mouseleave", tjLeave);
        legend.select("rect.sdBar")
            .on("mouseover", sdEnter)
            .on("mouseleave", sdLeave)
        legend.select("rect.tjBar")
            .on("mouseover", tjEnter)
            .on("mouseleave", tjLeave);;

    function type(d) {
        d.sd_average = +d.sd_average;
        d.tj_average = +d.tj_average;
        return d;
    }

    function sdEnter(d, i) {
        d3.selectAll("rect.sdBar").style("opacity", 1);
        d3.selectAll("rect.tjBar").style("opacity", .2);
    }
    function sdLeave(d, i) {
        d3.selectAll("rect.sdBar").style("opacity", .7);
        d3.selectAll("rect.tjBar").style("opacity", .7);
    }

    function tjEnter(d, i) {
        d3.selectAll("rect.tjBar").style("opacity", 1);
        d3.selectAll("rect.sdBar").style("opacity", .2);
    }
    function tjLeave(d, i) {
        d3.selectAll("rect.tjBar").style("opacity", .7);
        d3.selectAll("rect.sdBar").style("opacity", .7);
    }

    //SCATTER CHART********************************************************************************

    let ndx = crossfilter(allData);

    let proc_dim = ndx.dimension(dc.pluck('procedure'));

    let cost_dim = ndx.dimension(function(d) {
        return [d.procedure, d.cost, d.city];
    });

    let cost_group = cost_dim.group().reduceSum(function(d) {
        return [d.cost];
    });

    let scatter_chart = dc.scatterPlot('#distribution-chart');

    scatter_chart
        .width(670)
        .height(700)
        .dimension(proc_dim)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .y(d3.scale.linear().domain([0, 1200]))
        .brushOn(false)
        .symbolSize(8)
        .clipPadding(10)
        .xAxisLabel("Procedure")
        .yAxisLabel("Cost")
        // .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .group(cost_group)
        .renderlet(function (chart) {
            chart.selectAll("g.x text")
                .attr('dx', '-30')
                .attr('transform', "translate(-20,0)")
        });


    //PIE CHARTS ***************************************************

    let dataByCity = sortDataByCity(allData);
    let sdData = dataByCity[0];
    let tjData = dataByCity[1];

    let sdNdx = crossfilter(sdData);

    let sd_fake_dim = sdNdx.dimension(dc.pluck('fake_data'));

    let sd_fakeCount = sd_fake_dim.group().reduceCount(function() {
        if(d.fake_data === "*") {
            return d++;
        }
    });

    dc.pieChart('#sd-pie-chart')
        .height(225)
        .radius(90)
        .transitionDuration(1500)
        .dimension(sd_fake_dim)
        .group(sd_fakeCount)
    // .legend(dc.legend().x(400).y(10).itemHeight(13).gap(5))
    // .legend(dc.legendText("yankee"));

    let tjNdx = crossfilter(tjData);

    let tj_fake_dim = tjNdx.dimension(dc.pluck('fake_data'));

    let tj_fakeCount = tj_fake_dim.group().reduceCount(function() {
        if(d.fake_data === "*") {
            return d++;
        }
    });

    dc.pieChart('#tj-pie-chart')
        .height(225)
        .radius(90)
        .transitionDuration(1500)
        .dimension(tj_fake_dim)
        .group(tj_fakeCount);


    dc.renderAll();


    });


//This restructures the data into a structure that the overlay chart can use
function assembleOverlayDataSet(costData) {

    let procedures = ["Adult Cleaning", "Composite Filling", "Extraction", "Root Canal", "Porcelain Crown"];

    let totalCosts = [{"procedure": "Adult Cleaning", "sd_cost": 0, "sd_count": 0, "tj_cost": 0, "tj_count": 0},
                        {"procedure": "Composite Filling", "sd_cost": 0, "sd_count": 0, "tj_cost": 0, "tj_count": 0},
                        {"procedure": "Extraction", "sd_cost": 0, "sd_count": 0, "tj_cost": 0, "tj_count": 0},
                        {"procedure": "Root Canal", "sd_cost": 0, "sd_count": 0, "tj_cost": 0, "tj_count": 0},
                        {"procedure": "Porcelain Crown", "sd_cost": 0, "sd_count": 0, "tj_cost": 0, "tj_count": 0}];

    let averageCosts = [{"procedure":"Adult Cleaning", "sd_average":0, "tj_average":0}, {"procedure": "Composite Filling", "sd_average":0, "tj_average":0}, {"procedure": "Extraction", "sd_average":0, "tj_average":0}, {"procedure": "Root Canal", "sd_average":0, "tj_average":0}, {"procedure": "Porcelain Crown", "sd_average":0, "tj_average":0}];

    //For each procedure type, add up the total cost for San Diego and Tijuana
    for (let i = 0; i < procedures.length; i++) {
        costData.forEach(function (d) {
            if (d.procedure === procedures[i]) {
                if (d.city === "San Diego") {
                    totalCosts[i].sd_cost += d.cost;
                    if (d.cost > 0) {
                        totalCosts[i].sd_count++;
                    }
                } else {
                    totalCosts[i].tj_cost += d.cost;
                    if (d.cost > 0) {
                        totalCosts[i].tj_count++;
                    }
                }
            }
        });
        //Take the total costs and divide by the number of non-zero entries to set the average for each city
        averageCosts[i].sd_average = Math.round(totalCosts[i].sd_cost/totalCosts[i].sd_count);
        averageCosts[i].tj_average = Math.round(totalCosts[i].tj_cost/totalCosts[i].tj_count);
    }

    return averageCosts;

}

function sortDataByCity(allData) {
    let sdData = [];
    let tjData = [];

    for(let i=0; i<allData.length; i++) {
        if(allData[i].city === "San Diego") {
            sdData.push(allData[i]);
        } else {
            tjData.push(allData[i]);
        }
    }

    return [sdData, tjData];
}

// //Scatter chart BLUE DOTS
// let ndx = crossfilter(bothData);
//
// let proc_dim = ndx.dimension(dc.pluck('procedure'));
//
// let cost_dim = ndx.dimension(function(d) {
//     return [d.procedure, d.cost, d.city];// return [d.city, d.procedure, d.cost]; //this adds the city to the array you were looking at
// });
//
// let cost_group = cost_dim.group().reduceSum(dc.pluck('cost')); //blue dot
//
// let scatter_chart = dc.scatterPlot('#distribution-chart'); //blue dots
//
// scatter_chart
//     .width(670)
//     .height(500)
//     .dimension(proc_dim)
//     .x(d3.scale.ordinal())
//     .xUnits(dc.units.ordinal)
//     .y(d3.scale.linear().domain([0, 1200]))
//     .brushOn(false) //blue
//     .symbolSize(8) //blue
//     .clipPadding(10) //blue
//     .xAxisLabel("Procedure")
//     .yAxisLabel("Cost")
//     // .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
//     .renderHorizontalGridLines(true)
//     .group(cost_group); //blue dots

