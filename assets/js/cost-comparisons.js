
// queue()
//     .defer(d3.json, "assets/data/combined_flat.json")
//     .await(makeGraphs);
//
// function makeGraphs(error, costData) {
//
//     // let data = assembleDataSet();
//
//     let svg = d3.select("averageCostByCity")
//
//     let margin = {top: 20, right: 20, bottom: 30, left: 50},
//         width = 500 - margin.left - margin.right,
//         height = 500 - margin.top - margin.bottom;
//
//     let x = d3.scaleLinear().rangeRound([0, width]);
//     let y = d3.scaleBand().rangeRound([0,height]).padding(0.1);
//
//     let g = svg.append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//     d3.csv("assets/data/combined.csv", function(error, data) {
//         if (error) throw error;
//         console.log(data);
//
//         x.domain([0, d3.max(data, function(d) { return d.col1; })]);
//         y.domain(data.map(function(d) { return d.letter; }));
//
//
//         g.append("g")
//             .attr("class", "axis x_axis")
//             .attr("transform", "translate(0," + height + ")")
//             .call(d3.axisBottom(x));
//
//
//         g.append("g")
//             .attr("class", "axis y_axis")
//             .call(d3.axisLeft(y));
//
//         g.selectAll(".bar")
//             .data(data)
//             .enter().append("rect")
//             .attr("class", "bar1")
//             .attr("x", 0)
//             .attr("y", function(d) { return y(d.letter) + 10; })
//             .attr("width", function(d) { return x(d.col1); })
//             .attr("height", y.bandwidth() - 20);
//
//         g.selectAll(".bar2")
//             .data(data)
//             .enter().append("rect")
//             .attr("class", "bar2")
//             .attr("x", 0)
//             .attr("y", function(d) { return y(d.letter); })
//             .attr("width", function(d) { return x(d.col2); })
//             .attr("height", y.bandwidth());
//     });
//
//
// }

//This restructures the data into a structure that the overlay chart can use
function assembleDataSet(costData) {

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
