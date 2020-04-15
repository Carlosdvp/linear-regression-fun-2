//
// Bringing it all together

// First we need to define our variables
const width = 810,
    	height = 500,
    	margin = { top: 20, right: 20, bottom: 20, left: 40 },
    	radius = 3;

// the array to hold our data
var x_vals = [],
    y_vals = [];

var data = [];

let m, b;

// then we define the Optimizer
const learningRate = 0.2;
const optimizer = tf.train.sgd(learningRate);

//  y = mx + b
m = tf.variable(tf.scalar(Math.random()));
b = tf.variable(tf.scalar(Math.random()));

// define the svg and add it to the DOM
const svg = d3
  .select(".content")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// This is the draw function
function drawCircle(x, y) {
  //select each circle and append the data
  var selection = svg.selectAll("circle").data(data);
  // make the dots - little circles
  selection.enter()
    .append("circle")
    .attr('class', 'click-circle')
    .attr("cx", function(d) {return d.x;})
    .attr("cy", function(d) {return d.y;})
    .attr("r", radius);
  //exit selection
  selection.exit().remove();
}

// click on the screen draws a dot
svg.on('click', function() {
  var coords = d3.mouse(this);
  //push new data point to data array
  data.push({"x": d3.mouse(this)[0], "y": Math.round(d3.mouse(this)[1])});

  x_vals.push(d3.mouse(this)[0]);
  y_vals.push(Math.round(d3.mouse(this)[1]));

  // now we draw the dots
  drawCircle(coords[0], coords[1]);

  // the training model
  if (x_vals.length > 0) {

    const ys = tf.tensor1d(y_vals);
    ys.print();
    // Train the model.
    optimizer.minimize(() => loss(predict(x_vals), ys));
    x_vals.print();
  }
});



/*

* TensorFlow JS *

*/

console.log(data);


// The Loss Function
function loss (pred, labels) {
  return pred.sub(labels).square().mean();
}

// we need our line


// the predict function
function predict (xs) {
  const tfxs = tf.tensor1d(xs);
  // the formula for a line
  //  y = mx + b
  const ys = tfxs.mul(m).add(b);
  return ys;
}











tf.tidy(() => {
  
  // Darwing the Line
  var drawline = function(data){
    // use the learning rate to draw the line

    const xs = [0,1];
    const ys = predict(xs);
    let lineY = ys.dataSync();

    var xValues = x_vals.map(function(d){return d.x;});
    var yValues = y_vals.map(function(d){return d.y;});

    svg.append("line")
      .attr('class', 'the-line')
      .attr('x1', xs[0])
      .attr('x2', xs[1])
      .attr('y1', lineY[0])
      .attr('y2', lineY[1])
      .attr('id', 'regline');
  }

  var transitionline = function(data) {
    var xValues = data.map(function(d){return d.x;});
    var yValues = data.map(function(d){return d.y;});

    var lineFunction = d3.line()
      .x(function(d) { return d.x; })
      .y(function(d) { return d.y; });
    
    d3.select('#regline')
      .transition();
  }
})
