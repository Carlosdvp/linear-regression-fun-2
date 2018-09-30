//
// First we prepare the canvas with D3 and we make dots with mouse clicks
//

// First we need to define our variables
const width = 810,
    	height = 540,
    	margin = { top: 20, right: 20, bottom: 20, left: 40 },
    	radius = 3;

// lets define the arrays that will hold the x and y values for the dataset
let x_coords = [];
let y_coords = [];

// we need our line
let m, b;

// y = a * x^2 + b * x + c.
// const f = x => a.mul(x.square()).add(b.mul(x)).add(c);

m = tf.scalar(Math.random()).variable();
b = tf.scalar(Math.random()).variable();

// then we define the Optimizer
const learningRate = 0.2;
const optimizer = tf.train.sgd(learningRate);

// define the svg and add it to the DOM
const svg = d3
	.select(".content")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

//
// a simpler way to draw the dots on the screen
// This is the draw function

function drawCircle(x, y) {
  svg.append("circle")
    .attr('class', 'click-circle')
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius);

  y = Math.round(y);

  // lets push the Xs and Ys into their res[ective arrays
  y_coords.push(y);
  x_coords.push(x);

  console.log(x, y);
  console.log(x_coords, y_coords);

  //
  // Check to see if the coordinate arrays are empty
  if (x_coords.length > 0) {
    // the Ys
    const ys = tf.tensor1d(y_coords);
    //
    // the minimizer
    optimizer.minimize(() => loss(predict(x_coords), ys));
  }

  //
  // The Loss Function
  function loss (pred, labels) {
    return pred.sub(labels).square().mean();
  }


}


// click on the screen draws a dot
svg.on('click', function() {
  var coords = d3.mouse(this);
  drawCircle(coords[0], coords[1]);

  console.log(x_coords);
});

//
// Drawing the Line
svg.append("line")
  .attr('class', 'the-line')
  .attr('x1', 20)
  .attr('y1', 20)
  .attr('x2', 500)
  .attr('y2', 500);


/*

    TensorFlow JS

*/



// the predict function
function predict (x) {
  const firstAngle = tf.tensor1d(x);
  //  y = mx + b
  const ys = firstAngle.mul(m).add(b);
  return ys;
}


