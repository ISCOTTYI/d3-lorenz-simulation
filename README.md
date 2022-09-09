# Example Project

* Need NodeJS installed

      node -v

  To check the node installation.
* Install a bundler: use Parcel
  * To start the development server use

        npx parcel index.html

    and go to `http://localhost:1234`. A production build can be achieved via

        npx parcel build index.html

  * Alternatively setup start and build scripts in `package.json` to use

        npm start
        npm run build

  respectively [source](https://parceljs.org/getting-started/webapp/).
* Using KaTeX (css must be manually imported) with [auto-render](https://katex.org/docs/autorender.html), math can be typeset just like in a typical LaTeX body.
* A p5 sketch instance is created in the DOM as described [here](https://github.com/processing/p5.js/wiki/Global-and-instance-mode).
* Very useful D3.js resources:
  * [Full API reference](https://github.com/d3/d3/blob/main/API.md).
  * [Beginner-friendly course](https://www.d3indepth.com/).
  * [Rich example library](https://d3-graph-gallery.com/).
* [This](https://www.d3indepth.com/datajoins/) may be particularly important for plots.
* [`data()` vs `datum()`](https://www.intothevoid.io/data-visualization/understanding-d3-data-vs-datum/).
* [Updating paths with new data caveats](https://stackoverflow.com/questions/73651710/d3-line-chart-extend-existing-path-with-new-data/73656083#73656083).
