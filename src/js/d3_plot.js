import * as d3 from 'd3';
import { canvas, width, height, xSc, ySc } from './d3_plot_util/axes.js';

const sig = 10, beta = 8/3, rho = 28;
let v0 = {
  x: 1,
  y: 1,
  z: 25,
  t: 0
};
var data = [v0];
updateLine();

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
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
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

// function updateLine() {
//   canvas
//     .selectAll('.myPath').remove();
//   canvas
//     .append('path')
//       .datum(data)
//       .attr('class', 'myPath')
//       .attr('fill', 'none')
//       .attr('stroke', 'steelblue')
//       .attr('stroke-width', 1.5)
//       .attr('d', d3.line()
//         .x(function(d, i) {return xSc(d.x)})
//         .y(function(d, i) {return ySc(d.z)})
//       )
// }

function run() {
  let running = false;
  let intvl;
  d3.select('button')
    .on('click', function() {
      if (!running) {
        running = true;
        d3.select(this)
          .text('Pause')
          .attr('class', 'btn btn-danger');
        intvl = setInterval(function() {
          step(0.001);
          updateLine();
        }, 0.001); // TODO: Define a d3 scale that maps real time to step time
      } else {
        running = false;
        d3.select(this)
          .text('Play')
          .attr('class', 'btn btn-success');
        clearInterval(intvl);
      }
    })
}

run();

