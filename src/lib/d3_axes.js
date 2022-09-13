import * as d3 from 'd3';

// Set dimensions of canvas and svg area
export const margin = {
  top: 40,
  bottom: 40,
  right: 40,
  left: 40
};
export const owidth = 440, oheight = 340;
export const width = owidth - margin.left - margin.right;
export const height = oheight - margin.top - margin.bottom;

// Build svg
export const svg = d3.select("#d3_test").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

// Build group which contents are shifted by margin: the canvas
export const canvas = svg.append("g")
canvas.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Construct scales and axes
const xmin = -32, xmax = 32;
const ymin = -5, ymax = 75;
// Create a scale that maps data to canvas (D3) coordinates
export var xSc = d3.scaleLinear()
  .domain([xmin, xmax]) // Data coordinate range
  .range([0, width]); // Canvas coordinate range
// Create an axis from the scale and add to canvas (for convenience placed in a group)
canvas.append('g')
  .call(d3.axisTop(xSc).tickFormat(''))
// By default, axisBottom (bottom ticks) is placed at the top. Correct that
  .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xSc));
// The same for y
export var ySc = d3.scaleLinear()
  .domain([ymin, ymax])
  .range([height, 0]);
canvas.append('g')
  .call(d3.axisLeft(ySc))
  .append('g')
    .attr('transform', `translate(${width}, 0)`)
    .call(d3.axisRight(ySc).tickFormat(''));
// Add axis labels
canvas.append('text')
  .attr('text-anchor', 'middle')
  .attr('x', width/2)
  .attr('y', height + 30)
  .attr('font-style', 'italic')
  .attr('font-family', 'Times')
  .text('x');
canvas.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
  .attr('y', -30)
  .attr('x', -height/2)
  .attr('font-style', 'italic')
  .attr('font-family', 'Times')
  .text('z');
