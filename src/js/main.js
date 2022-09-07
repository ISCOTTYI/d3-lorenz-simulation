// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
import renderMathInElement from 'katex/dist/contrib/auto-render.min.js';
// import './d3_shapes.js'
import './d3_plot.js'


// Setup KaTeX to auto-render equations in DOM
document.addEventListener("DOMContentLoaded", function() {
  renderMathInElement(document.body, {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false},
      {left: '\\(', right: '\\)', display: false},
      {left: '\\[', right: '\\]', display: true},
      {left: "\\begin{equation}", right: "\\end{equation}", display: true},
      {left: "\\begin{align}", right: "\\end{align}", display: true},
      {left: "\\begin{alignat}", right: "\\end{alignat}", display: true},
      {left: "\\begin{gather}", right: "\\end{gather}", display: true},
    ],
    // rendering keys, e.g.:
    throwOnError : false
  });
});

