
const drawScatterplot = (data) => {

    // Set the dimensions and margins of the chart area
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // Create an inner chart group with margins
    innerChartS = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    
    // Calculate the maximum values
    const maxStar = d3.max(data, d => d.star);
    const maxEnergy = d3.max(data, d => d.energyConsumption);

    // Set up the x and y scales
    xScaleS.domain([0, maxStar]).range([0, innerWidth]);
    yScaleS.domain([0, maxEnergy]).range([innerHeight, 0]).nice();

    
    // Set up colour scale
    colorScale
        .domain(data.map(d => d.screenTech))
        .range(d3.schemeCategory10);
    
    
    // Draw the circles
    innerChartS.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("r", 2.5)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5);

    
    // Add bottom axis (Star Rating)
    innerChartS.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScaleS));

    // Add left axis (Energy Consumption)
    innerChartS.append("g")
        .call(d3.axisLeft(yScaleS));
    
    
    // Add x-axis label
    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "middle")
        .text("Star Rating");

    // Add y-axis label
    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text("Labeled Energy Consumption (kWh/year)");
    
    
    // Add legend
    const legend = innerChartS.append("g")
        .attr("transform", `translate(${innerWidth - 100}, 0)`);

    const legendItems = legend.selectAll(".legend-item")
        .data(colorScale.domain())
        .join("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`);

    legendItems.append("circle")
        .attr("r", 5)
        .attr("fill", d => colorScale(d));

    legendItems.append("text")
        .attr("x", 10)
        .attr("y", 4)
        .text(d => d);




};
