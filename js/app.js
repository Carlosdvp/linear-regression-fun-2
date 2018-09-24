
// First we need t define our variables
const width = 1200,
    	height = 600,
    	margin = { top: 20, right: 20, bottom: 20, left: 40 },
    	radius = 4;

console.log(width);

// define the svg and add it to the DOM
const svg = d3
	.select(".content")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

// console.log(svg);

var dataset = [
  { x: 100, y: 110 },
  { x: 83, y: 43 },
  { x: 92, y: 28 },
  { x: 49, y: 74 },
  { x: 51, y: 10 },
  { x: 25, y: 98 },
  { x: 77, y: 30 },
  { x: 20, y: 83 },
  { x: 11, y: 63 },
  { x:  4, y: 55 },
  { x:  0, y:  0 },
  { x: 85, y: 100 },
  { x: 60, y: 40 },
  { x: 70, y: 80 },
  { x: 10, y: 20 },
  { x: 40, y: 50 },
  { x: 25, y: 31 }
];

// We're passing in a function in d3.max to tell it what we're maxing (x value)
var xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function (d) { return d.x + 10; })])
  .range([margin.left, width - margin.right]);  // Set margins for x specific

// We're passing in a function in d3.max to tell it what we're maxing (y value)
var yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function (d) { return d.y + 10; })])
  .range([margin.top, height - margin.bottom]);  // Set margins for y specific

// Add a X and Y Axis (Note: orient means the direction that ticks go, not position)
var xAxis = d3.axisTop(xScale);
var yAxis = d3.axisLeft(yScale);



// Adds X-Axis as a 'g' element
svg.append("g")
	.attr("class", "axis")
	.attr("transfrom", "translate(" + [0, margin.top] + ")")
	.call(xAxis);  // Call the xAxis function on the group

// Adds Y-Axis as a 'g' element
svg.append("g")
	.attr("class", "axis")
	.attr("transfrom", "translate(" + [margin.left, 0] + ")")
	.call(yAxis);  // Call the yAxis function on the group

svg.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  // .attr(circleAttrs)// Get attributes from circleAttrs var
  .attr('r', radius)
  .attr('cx', function(d) { return xScale(d.x); })
  .attr('cy', function(d) { return yScale(d.y); })
  .on("mouseover", handleMouseOver)
  .on("mouseout", handleMouseOut);

// On Click, we want to add data to the array and chart
svg.on("click", function() {
  var coords = d3.mouse(this);

  // Normally we go from data to pixels, but here we're doing pixels to data
  var newData= {
    x: Math.round( xScale.invert(coords[0])),  // Takes the pixel number to convert to number
    y: Math.round( yScale.invert(coords[1]))
  };

  dataset.push(newData);   // Push data to our array

  svg.selectAll("circle")  // For new circle, go through the update process
    .data(dataset)
    .enter()
    .append("circle")
    // .attr(circleAttrs)  // Get attributes from circleAttrs var
    .attr('r', radius)
	  .attr('cx', function(d) { return xScale(d.x); })
	  .attr('cy', function(d) { return yScale(d.y); })
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);
})




// Create Event Handlers for mouse
function handleMouseOver(d, i) {  // Add interactivity

  // Use D3 to select element, change color and size
  d3.select(this).attr({
    fill: "orange",
    r: radius * 2
  });

  // Specify where to put label of text
  svg.append("text").attr({
		id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
		x: function() { return xScale(d.x) - 30; },
		y: function() { return yScale(d.y) - 15; }
  })
  .text(function() {
    return [d.x, d.y];  // Value of the text
  });
}

function handleMouseOut(d, i) {
  // Use D3 to select element, change color back to normal
  d3.select(this).attr({
    fill: "black",
    r: radius
  });

  // Select text by id and then remove
  d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
}