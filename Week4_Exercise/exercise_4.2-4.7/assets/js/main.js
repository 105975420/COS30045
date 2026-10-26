const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
  .style("border", "1px solid black");

svg.append("rect")
  .attr("x", 10)
  .attr("y", 10)
  .attr("width", 414)
  .attr("height", 16)
  .attr("fill", "blue");

  d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count
    };
}).then(data => {
    console.log(data);

    console.log("Number of rows:", data.length);

    console.log("Maximum count:", d3.max(data, d => d.count));

    console.log("Minimum count:", d3.min(data, d => d.count));

    console.log("Extent:", d3.extent(data, d => d.count));

    data.sort((a, b) => b.count - a.count);
    console.log("Sorted data:", data);

    drawBarChart(data);
});