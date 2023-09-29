const data = [
    { name: 'l', score: 27.9800 },
    { name: 'a', score: 43.3100 },
    { name: 's', score: 29.2300 },
    { name: 'y', score: 9.0600 },
    { name: 'r', score: 38.6400 },
    { name: 'h', score: 15.3100 },
    { name: 'l', score: 27.9800 },
    { name: 'p', score: 16.1400 },
    { name: 'i', score: 38.4500 },
  ];
  
  const width = 900;
  const height = 450;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };
  
  const svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);
  
  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)
  
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top])
  
  svg
    .append("g")
    .attr("fill", 'royalblue')
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(a.score, b.score)))
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.score))
      .attr('title', (d) => d.score)
      .attr("class", "rect")
      .attr("height", d => y(0) - y(d.score))
      .attr("width", x.bandwidth());

      svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height)
      .text("Letters");

      svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 8)
    .attr("dy", ".95em")
    .attr("transform", "rotate(-90)")
    .text("Frequency(%)");

//     var axisLabelX = -50;
// var axisLabelY = chartHeight / 2;

// chartArea
//     .append('g')
//     .attr('transform', 'translate(' + axisLabelX + ', ' + axisLabelY + ')')
//     .append('text')
//     .attr('text-anchor', 'middle')
//     .attr('transform', 'rotate(-90)')
//     .text('Y Axis Label')
    ;
  
  function yAxis(g) {
    g.attr("transform", `translate(${margin.right}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '20px')
  }
  
  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].name))
      .attr("font-size", '20px')
  }
  
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();