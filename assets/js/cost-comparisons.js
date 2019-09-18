
queue()
    .defer(d3.json, "assets/data/combined_flat.json")
    .await(makeGraphs);

function makeGraphs(error, costData) {

    // var data = [{"food":"Hotdogs","quantity":24},{"food":"Tacos","quantity":15},{"food":"Pizza","quantity":3},{"food":"Double Quarter Pounders with Cheese","quantity":2},{"food":"Omelets","quantity":30},{"food":"Falafel and Hummus","quantity":21},{"food":"Soylent","quantity":13}]

    let data = assembleDataSet();

    let margin = {top:10, right:10, bottom:90, left:50};

    let width = 500; //- margin.left - margin.right;
    let height = 500; //- margin.top - margin.bottom;

    let xScale = d3.scale.ordinal().rangeRoundBands([0, width], .03)
    let yScale = d3.scale.linear().range([height, 0]);

    // var xAxis = d3.axisBottom(xScale).tickFormat(function(d){ return d.x;});
    // // var yAxis = d3.axisLeft(yRange);

    let xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    let yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(10);

    let svg = d3.select("#averageCostByCity").append("svg")
        .attr("width", width+margin.left + margin.right)
        .attr("height",height+margin.top + margin.bottom)
        .append("g").attr("class", "container")
        .attr("transform", "translate("+ margin.left +","+ margin.top +")");

    xScale.domain(data.map(function(d) { return d.procedure; }));
    // yScale.domain([0, d3.max(data, function(d) { return d.cost; })]);
    yScale.domain([0, 1000]);


//xAxis. To put on the top, swap "(height)" with "-5" in the translate() statement. Then you'll have to change the margins above and the x,y attributes in the svgContainer.select('.x.axis') statement inside resize() below.
    var xAxis_g = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis)
        .selectAll("text");

// Uncomment this block if you want the y axis
    var yAxis_g = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6).attr("dy", ".71em")
            .style("text-anchor", "end").text("Average Cost");


    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.procedure); })
        .attr("width", xScale.rangeBand())
        .attr("y", function(d) { return yScale(d.cost); })
        .attr("height", function(d) { return height - yScale(d.cost); });

    svg.selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("class","label")
        .attr("x", (function(d) { return xScale(d.procedure) + xScale.rangeBand() / 2 ; }  ))
        .attr("y", function(d) { return yScale(d.cost) + 1; })
        .attr("dy", ".75em")
        .text(function(d) { return `$${d.cost} ${d.city}`; });
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

    averageCosts = [{"procedure": "adult_cleaning", "cost":100, "city":"SD"}, {"procedure": "adult_cleaning", "cost":42, "city":"TJ"}, {"procedure": "composite_filling", "cost":127, "city":"SD"}, {"procedure": "composite_filling", "cost":60, "city":"TJ"}, {"procedure": "extraction", "cost":115, "city":"SD"}, {"procedure": "extraction", "cost":85, "city":"TJ"}, {"procedure": "root_canal", "cost":968, "city":"SD"}, {"procedure": "root_canal", "cost":492, "city":"TJ"}, {"procedure": "porcelain_crown", "cost":758, "city":"SD"}, {"procedure": "porcelain_crown", "cost":303, "city":"TJ"}]

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