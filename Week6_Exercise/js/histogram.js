const drawHistogram = (data) => {

    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    const bins = binGenerator(data);

    console.log(bins);

    // Calculate the minimum and maximum energy consumption values
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;

    // Calculate the maximum length of the bins
    const binsMaxLength = d3.max(bins, d => d.length);

    console.log("minEng:", minEng, "maxEng:", maxEng, "binsMaxLength:", binsMaxLength);

    // Set the domains and ranges for the x and y scales
    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();

    
    // Draw the bars of the histogram
    innerChart.selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0) - 1)
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor);

    // Add the x-axis
    innerChart.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale));

    // Add the y-axis
    innerChart.append("g")
        .call(d3.axisLeft(yScale));
    
    // Add the x-axis label
    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.bottom - 5)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    // Add the y-axis label
    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -margin.left + 20)
        .attr("text-anchor", "middle")
        .text("Number of TVs");

};