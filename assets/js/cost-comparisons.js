
queue()
    .defer(d3.json, "assets/data/combined_flat.json")
    .await(makeGraphs);

function makeGraphs(error, costData) {
    console.log(costData);
    let dataset = assembleDataSet(costData);

    console.log(dataset);

    let w = 500;
    let h = 600;
    let barPadding = 1;

    let colWidth = w / dataset.length;
    let barWidth = colWidth - barPadding;

    var fillIndex = 1;

    let svg = d3.select("#averageCostByCity")
        .append("svg")
        .attr("height", h)
        .attr("width", w);

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return i * colWidth;
        })
        .attr("y", function (d) {
            return h - d;
        })
        .attr("height", function (d) {
            return d;
        })
        .attr("width", barWidth)
        .attr("fill", function(d) {
            if(fillIndex++ % 2 === 0) {
                return "rgba(255,223,0,0.7)";
            } else {
                return "rgba(94,47,37,0.7)";
            }
        });

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
            return i * colWidth + barWidth / 2;
        })
        .attr("y", function (d) {
            return h - d + 14;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white");
}

function assembleDataSet(costData) {

    //[SD, sdCount TJ, tjCount]
    let rawData = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];

    let adult_cleaning = rawData[0];
    let composite_filling = rawData[1];
    let extraction = rawData[2];
    let porcelain_crown = rawData[3];
    let root_canal = rawData[4];

    costData.forEach(function(d) {
        if(d.city === 'San Diego') {
            eval(d.procedure)[0] += d.cost;
            if (d.cost > 0) {
                eval(d.procedure)[1]++
            }
        } else {
            eval(d.procedure)[2] += d.cost;
            if(d.cost > 0) {
                eval(d.procedure)[3]++
            }
        }

    });

    //SD, TJ, SD, TJ ...
    let averageCosts = [];

    for(let i=0; i<5; i++) {
        averageCosts.push(Math.round(rawData[i][0] / rawData[i][1]));
        averageCosts.push(Math.round(rawData[i][2] / rawData[i][3]));
    }

    return averageCosts;
}