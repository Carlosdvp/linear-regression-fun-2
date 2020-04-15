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



/*************************************************************************************
**************************************************************************************/

// Releant coe for the Line from the Code Train Course


const xs = tf.tensor1d([0, 1]);
const ys = predict(xs);

xs.print();
ys.print();


// another way

let lineX = [0,1];

const xs = tf.tensor1d(lineX);
const ys = predict(lineX);

xs.print();
ys.print();

// an easier way
const xs = [0,1];
const ys = predict(xs);

ys.print();

// p5.prototype.map = function(n, start1, stop1, start2, stop2, withinBounds

// the line
let x1 = map(xs[0], 0, 1, 0, width);
let x2 = map(xs[1], 0, 1, 0, width);

let y1 = map(ys[0], 0, 1, height, 0);
let y2 = map(ys[1], 0, 1, height, 0);


/*************************************************************************************
**************************************************************************************/
/*************************************************************************************
**************************************************************************************/



//Global Variables
var data = [];
var resids = [];

//D3 Set up
var width = 500,
    height = 500, 
    margin = 50;


//makes scales
var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
var x=d3.scaleLinear().domain([0,10]).range([margin,width-margin]);
var y=d3.scaleLinear().domain([0,10]).range([height-margin,margin]);
var r=d3.scaleLinear().domain([0,500]).range([0,20]);
var o=d3.scaleLinear().domain([10000,100000]).range([.5,1]);
var c=d3.scale.category10().domain(["Africa","America","Asia","Europe","Oceania"]);

//create axis
var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

//draw axis
svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (height - margin) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "axis")
   .attr("transform", "translate(" + margin + ",0)")
  .call(yAxis);

//draw dashed lines
svg.selectAll(".h").data(d3.range(0,10,2)).enter()
  .append("line").classed("h",1)
  .attr("x1",margin).attr("x2",height-margin)
  .attr("y1",y).attr("y2",y)
  
svg.selectAll(".v").data(d3.range(0,10,2)).enter()
  .append("line").classed("v",1)
  .attr("y1",margin).attr("y2",width-margin)
  .attr("x1",x).attr("x2",x)


var residview = false;

d3.select('#resid_button').on('click', function() {

    if ( residview ) {
        svg.selectAll('path.resline').remove();
        svg.selectAll('path.halfcirc').remove();
        svg.selectAll("circle")
          .style("opacity", 1)
        residview = false;
    } else {
        svg.selectAll("circle")
        .style("opacity", 0)


        residview = true;
        drawresiduals(data);
       
    }        
});

d3.select('#reset_button').on('click', function() {

   
        svg.selectAll('path.resline').remove();
        svg.selectAll('path.halfcirc').remove();
        svg.selectAll('circle').remove();
        svg.selectAll('path').remove();
        residview = false;
        data = []
        resids = []
        
});  



//click event: draw new circle
svg.on('click', function(){
  if(d3.mouse(this)[0] > (50 + r(200)) && d3.mouse(this)[0] < (450 - r(200)) && d3.mouse(this)[1] > (50 + r(200)) && d3.mouse(this)[1] < (450 - r(200))){
    //push new data point to data array
    data.push({"x": d3.mouse(this)[0], "y": d3.mouse(this)[1], "radius": 200, "fill": "Europe", "opacity": 90000});

    //select each circle and append the data
    var selection = svg.selectAll("circle").data(data)

    //update selection and draw new circle
    selection.enter()
    .append("circle")
    .attr("cx",function(d) {return d.x;})
    .attr("cy",function(d) {return d.y;})
    .attr("r",function(d) {return r(d.radius);})
    .style("fill",function(d) {return "green";})
    .style("opacity",function(d) {
      if(residview){
        return 0;
      } else {
        return o(+d.opacity);
      }
    })

    //exit selection
    selection.exit().remove()

    if(data.length == 2){
      drawline(data);
    } else if(data.length > 2){
      transitionline(data);
      if(residview){
        resids = drawresiduals(data);
      }
    }
  }
})


