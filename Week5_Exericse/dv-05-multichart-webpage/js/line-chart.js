const drawLineChart = data => {
    
    const margin = { top: 40, right: 170, bottom: 25, left: 40 };
    const width = 1000;
    const height = 500;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .range([innerHeight, 0]);

    // Set up axes
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));

    const leftAxis = d3.axisLeft(yScale);

    // Create SVG container
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");

    // Create inner chart group
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add bottom x-axis
    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Add left y-axis
    innerChart.append("g")
        .call(leftAxis);
    
    // Draw line
    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));

    innerChart.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);
    
    // Draw scatter plot points
    innerChart.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("r", 3)
        .attr("fill", "green");
};

d3.csv("data/ARE_Spot_Prices.csv", d => {
    return {
        year: +d.Year,
        averagePrice: +d["Average Price (notTas-Snowy)"]
    };
}).then(data => {
    console.log(data);
    drawLineChart(data);
});