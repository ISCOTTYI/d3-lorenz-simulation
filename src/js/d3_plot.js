import * as d3 from 'd3';
import { canvas, width, height, xSc, ySc } from './d3_plot_util/axes.js';

let initP = {x: 1, y: 10};
var data = [initP];
update();

function step() {
  let lastP = data[data.length - 1];
  let lx = lastP.x, ly = lastP.y;
  let newP = {x: lx * 2, y: ly * 2};
  data.push(newP);
}

function update() {
  canvas
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', function(d, i) {
      return xSc(d.x);
    })
    .attr('cy', function(d, i) {
      return ySc(d.y);
    })
    .attr('r', 3)
    .style('fill', 'red');
}

function updatePlot() {
  d3.select('button')
    .on('click', function() {
      console.log(data);
      step();
      console.log(data);
      update();
    })
}

updatePlot();

