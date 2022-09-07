import * as d3 from 'd3';

// Set dimensions
const margin = {
  top: 30,
  bottom: 30,
  right: 30,
  left: 30
};
const owidth = 400, oheight = 300;
const width = owidth - margin.left - margin.right;
const height = oheight - margin.top - margin.bottom;

// Build svg
const svg = d3.select("#d3_test").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)

// Set background color
svg.append('rect')
  .attr('width', '100%')
  .attr('height', '100%')
  .style('fill', 'grey');

// Build group that shifts margin coordinates with margin
const g = svg.append("g")
g.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Set background for the group
g.append("rect")
  .attr("width", width)
  .attr("height", height)
  .style("fill", "lightgrey")

// Append dots
for(i=0; i<10; i++) {
  g.append('circle')
    .attr('r', 5)
    .attr('cx', margin.left+20*(i+1)+30)
    .attr('cy', height/2)
    .style('fill', 'red');
}

// Change color of dot upon click
g.selectAll('circle')
  .on('click', function(e, d) {
    var circ = d3.select(this);
    if (circ.style('fill') == 'red') {
      circ.style('fill', 'black');
    } else {
      circ.style('fill', 'red');
    }
  });

// Specify data


