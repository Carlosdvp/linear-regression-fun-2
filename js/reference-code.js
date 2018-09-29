// First we prepare the canvas with D3 and we make dots with mouse clicks
//

// First we need to define our variables
const width = 810,
    	height = 540,
    	margin = { top: 20, right: 20, bottom: 20, left: 40 },
    	radius = 3;

// define the svg and add it to the DOM
const svg = d3
	.select(".content")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

// a simpler way to draw the dots on the screen
function drawCircle(x, y) {
  console.log('Drawing dot at', x, y);
  svg.append("circle")
    .attr('class', 'click-circle')
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius);
}

svg.on('click', function() {
  var coords = d3.mouse(this);
  drawCircle(coords[0], coords[1]);
});



//
// Next we add TensorflowJS
//

// first we create our empty array to hold our values
const values = [];
const shape = [2, 5, 3]; // and define the Tensor's shape


// we need 15 random numbers for our array to create our 3x5 tensor
for (let i = 0; i < 30; i++) {
  // values[i] = Math.ceil(Math.random() * 100); // to get a random integer between 0 and 100 - the same can be done with the 3rd parameter below ('int32')
  values[i] = Math.random() * 100; 
}

// and now to make that tensor
const stars = tf.tensor3d(values, shape, 'int32');


// 
const alien = tf.tensor2d([0, 0, 125, 25], [2, 2]);

console.log(stars.toString());
console.log(alien.toString());
//


console.log(tf.memory().numTensors);