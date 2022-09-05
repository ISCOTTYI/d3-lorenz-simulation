import * as p5 from 'p5/lib/p5.min.js'

// This creates a p5 simulation placed in the DOM element with id "simulation"
let simulation = new p5((s) => {
    s.setup = () => {
        s.createCanvas(400, 300);
    }

    s.draw = () => {
        s.background(230);
    }
}, "simulation");

