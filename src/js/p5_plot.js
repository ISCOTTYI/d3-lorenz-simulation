import * as p5 from 'p5/lib/p5.min.js';
import { GPoint, GPlot } from '../lib/grafica.min.js';

// This creates a p5 simulation placed in the DOM element with id "simulation"
sketch = (s) => {
    s.setup = () => {
        s.createCanvas(450, 300);
        s.background(230);
        // s.scale(1);
        
        // Prepare the points for the plot
		var points = [];
		var seed = 100 * s.random();

		for (var i = 0; i < 100; i++) {
			points[i] = new GPoint(i, 10 * s.noise(0.1 * i + seed));
		}

		// Create a new plot and set its position on the screen
		var plot = new GPlot(s);
		// plot.setPos(25, 25);
        // plot.setDim(s.width, s.height);

		// Set the plot title and the axis labels
		plot.setPoints(points);
		plot.getXAxis().setAxisLabelText("x axis");
		plot.getYAxis().setAxisLabelText("y axis");
		plot.setTitleText("A very simple example");

		// Draw it!
		plot.defaultDraw();
    }

    s.draw = () => {
    }
}

