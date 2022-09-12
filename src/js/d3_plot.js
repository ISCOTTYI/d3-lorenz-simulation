import * as d3 from 'd3';
import { canvas, width, height, xSc, ySc } from './d3_plot_util/axes.js';

const sig = 10, beta = 8/3;
var rho = 28;
let v0 = {
  x: 1,
  y: 1,
  z: 25,
  t: 0
};
var data = [v0];

function getFixedPoints() {
  const fp0 = {x: 0, y: 0, z: 0};
  var fp1 = {
      x: Math.sqrt(beta * (rho - 1)),
      y: Math.sqrt(beta * (rho - 1)),
      z: rho - 1
  };
  var fp2 = {
      x: - Math.sqrt(beta * (rho - 1)),
      y: - Math.sqrt(beta * (rho - 1)),
      z: rho - 1
  };
  return [fp0, fp1, fp2];
}

function step(dt) {
  var v = data[data.length-1];
  var x = v.x, y = v.y, z = v.z, t = v.t;
  var w = {
    x: x + (sig * (y - x)) * dt,
    y: y + (x * (rho - z) - y) * dt,
    z: z + (x * y - beta * z) * dt,
    t: t + dt
  }
  data.push(w);
}

function updateLine() {
  canvas.selectAll('#myPath')
    .data([data])
    .join(
      function(enter) {
        return enter
          .append('path')
            .attr('id', 'myPath')
            .attr('fill', 'none')
            .attr('stroke', '#adb5bd')
            .attr('stroke-width', 2)
            .attr('d', d3.line()
              .x(function(d, i) {return xSc(d.x)})
              .y(function(d, i) {return ySc(d.z)})
            );
      },
      function(update) {
        return update
          .attr('d', d3.line()
            .x(function(d, i) {return xSc(d.x)})
            .y(function(d, i) {return ySc(d.z)})
          );
      }
    );
}

// TODO: Bind this function to button click event in html, REFACTOR
function run() {
  let running = false;
  let intvl;
  d3.select('#start-stop')
    .on('click', function() {
      if (!running) {
        running = true;
        d3.select(this)
          .attr('fill', '#0d6efd')
          .html('<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>')
        d3.select('#rho-changer')
          .attr('disabled', true);
        intvl = setInterval(function() {
          step(0.001);
          updateLine();
        }, 0.001); // TODO: Define a d3 scale that maps real time to step time
      } else {
        running = false;
        d3.select(this)
          .attr('fill', '#adb5bd')
          .html('<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>')
        d3.select('#rho-changer')
          .attr('disabled', null);
        clearInterval(intvl);
      }
    });
  d3.select('#reset')
    .on('click', function() {
      data = [v0];
      updateLine();
    });
  d3.select('#show-fixed-points')
    .on('input', function() {
      if (d3.select(this).property('checked')) {
        canvas.selectAll('.fixedPoint')
          .data(getFixedPoints())
          .join('circle')
          .classed('fixedPoint', true)
          .attr('cx', function(d) {
            return xSc(d.x);
          })
          .attr('cy', function(d) {
            return ySc(d.z);
          })
          .attr('r', 3)
          .style('fill', '#0d6efd');
      } else {
        canvas.selectAll('.fixedPoint')
          .remove();
      }
    });
  d3.select('#rho-changer')
    .on('change', function () {
      rho = d3.select(this).property('value');
      // Reset plot
      data = [v0];
      updateLine();
      // If FPs shown, move them
      canvas.selectAll('.fixedPoint')
        .data(getFixedPoints())
        .join('circle')
        .transition().duration(1000)
        .attr('cx', function(d) {
          return xSc(d.x);
        })
        .attr('cy', function(d) {
          return ySc(d.z);
        });
    });
}

run();

