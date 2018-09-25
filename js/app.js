
// First we need t define our variables
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