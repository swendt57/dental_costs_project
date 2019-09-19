
queue()
    .defer(d3.json, "assets/data/combined_flat.json")
    .await(makeGraphs);

function makeGraphs(error, costData) {

    // let data = assembleDataSet();

    let svg = d3.select("averageCostByCity")

    let margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    let x = d3.scaleLinear().rangeRound([0, width]);
    let y = d3.scaleBand().rangeRound([0,height]).padding(0.1);

    let g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("assets/data/combined.csv", function(error, data) {
        if (error) throw error;
        console.log(data);

        x.domain([0, d3.max(data, function(d) { return d.col1; })]);
        y.domain(data.map(function(d) { return d.letter; }));


        g.append("g")
            .attr("class", "axis x_axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));


        g.append("g")
            .attr("class", "axis y_axis")
            .call(d3.axisLeft(y));

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar1")
            .attr("x", 0)
            .attr("y", function(d) { return y(d.letter) + 10; })
            .attr("width", function(d) { return x(d.col1); })
            .attr("height", y.bandwidth() - 20);

        g.selectAll(".bar2")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar2")
            .attr("x", 0)
            .attr("y", function(d) { return y(d.letter); })
            .attr("width", function(d) { return x(d.col2); })
            .attr("height", y.bandwidth());
    });


}

function assembleDataSet(costData) {

    //[SD, sdCount TJ, tjCount]
    let rawData = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];

    let adult_cleaning = rawData[0];
    let composite_filling = rawData[1];
    let extraction = rawData[2];
    let porcelain_crown = rawData[3];
    let root_canal = rawData[4];

    // costData.forEach(function(d) {
    //     if(d.city === 'San Diego') {
    //         eval(d.procedure)[0] += d.cost;
    //         if (d.cost > 0) {
    //             eval(d.procedure)[1]++
    //         }
    //     } else {
    //         eval(d.procedure)[2] += d.cost;
    //         if(d.cost > 0) {
    //             eval(d.procedure)[3]++
    //         }
    //     }
    //
    // });

    // //SD, TJ, SD, TJ ...
    // let averageCosts = [];
    //
    // for(let i=0; i<5; i++) {
    //     averageCosts.push(Math.round(rawData[i][0] / rawData[i][1]));
    //     averageCosts.push(Math.round(rawData[i][2] / rawData[i][3]));
    // }
    //
    // console.log(averageCosts);

    averageCosts = [[{"procedure": "adult_cleaning", "cost":100, "city":"SD"}, {"procedure": "adult_cleaning", "cost":42, "city":"TJ"}], [{"procedure": "composite_filling", "cost":127, "city":"SD"}, {"procedure": "composite_filling", "cost":60, "city":"TJ"}], [{"procedure": "extraction", "cost":115, "city":"SD"}, {"procedure": "extraction", "cost":85, "city":"TJ"}], [{"procedure": "root_canal", "cost":968, "city":"SD"}, {"procedure": "root_canal", "cost":492, "city":"TJ"}], [{"procedure": "porcelain_crown", "cost":758, "city":"SD"}, {"procedure": "porcelain_crown", "cost":303, "city":"TJ"}]]

    return averageCosts;
}

// console.log(costData);
// let dataset = assembleDataSet(costData);
//
// console.log(dataset);
//
// let w = 500;
// let h = 600;
// let barPadding = 1;
//
// let colWidth = w / dataset.length;
// let barWidth = colWidth - barPadding;
//
// var fillIndex = 1;
//
// let svg = d3.select("#averageCostByCity")
//     .append("svg")
//     .attr("height", h)
//     .attr("width", w);
//
// svg.selectAll("rect")
//     .data(dataset)
//     .enter()
//     .append("rect")
//     .attr("x", function (d, i) {
//         return i * colWidth;
//     })
//     .attr("y", function (d) {
//         return h - d;
//     })
//     .attr("height", function (d) {
//         return d;
//     })
//     .attr("width", barWidth)
//     .attr("fill", function(d) {
//         if(fillIndex++ % 2 === 0) {
//             return "rgba(255,223,0,0.7)";
//         } else {
//             return "rgba(94,47,37,0.7)";
//         }
//     });
//
// svg.selectAll("text")
//     .data(dataset)
//     .enter()
//     .append("text")
//     .text(function (d) {
//         return d;
//     })
//     .attr("text-anchor", "middle")
//     .attr("x", function (d, i) {
//         return i * colWidth + barWidth / 2;
//     })
//     .attr("y", function (d) {
//         return h - d + 14;
//     })
//     .attr("font-family", "sans-serif")
//     .attr("font-size", "11px")
//     .attr("fill", "white");