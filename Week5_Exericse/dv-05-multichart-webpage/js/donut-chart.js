
const drawDonutChart = data => {

    const width = 1000;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20;

    
    const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.screensize_category))
        .range(d3.schemeCategory10);

    const pie = d3.pie()
        .value(d => d.Count);

    const arc = d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius);
    
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);
    
    svg.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => colorScale(d.data.screensize_category));

    svg.selectAll("text")
        .data(pie(data))
        .enter()
        .append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .text(d => d.data.screensize_category + " (" + d.data.Count + ")");
};

d3.csv("data/screenSizeCount.csv", d => {
    return {
        screensize_category: d.screensize_category,
        Count: +d.Count
    };
}).then(data => {
    console.log(data);

     drawDonutChart(data);
});
