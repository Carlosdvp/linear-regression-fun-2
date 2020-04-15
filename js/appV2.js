// Global Variables
var data = [];

// D3 Set up
var width = 810,
    height = 540, 
    margin = 20,
    radius = 4;

// Adding our SVG to the DOM
var svg = d3.select(".content").append("svg").attr("width", width).attr("height", height);

// Math helper
function LeastSquares(values_x, values_y) {
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var count = 0;

  // We'll use those variables for faster read/write access.
  var x = 0;
  var y = 0;
  var values_length = values_x.length;

  // Calculate the sum for each of the parts necessary.
  for (var v = 0; v < values_length; v++) {
    x = values_x[v];
    y = values_y[v];
    sum_x += x;
    sum_y += y;
    sum_xx += x*x;
    sum_xy += x*y;
    count++;
  }
  /* Calculate m and b for the formular:
  y = x * m + b
  */
  var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
  var b = (sum_y/count) - (m*sum_x)/count;
  return {'b': b, 'm': m};
}

// Darwing the Line
var drawline = function(data){
  var xValues = data.map(function(d){return d.x;});
  var yValues = data.map(function(d){return d.y;});
  var lsCoef = [LeastSquares(xValues, yValues)];

  var lineFunction = d3.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

  svg
    .append('path')
    .attr("d", lineFunction([{"x": 0, "y": lsCoef[0].m * 0 + lsCoef[0].b},{"x": width, "y": lsCoef[0].m * height + lsCoef[0].b}]))
    .attr('id', 'regline');
}

var transitionline = function(data) {
  var xValues = data.map(function(d){return d.x;});
  var yValues = data.map(function(d){return d.y;});
  var lsCoef = [LeastSquares(xValues, yValues)];

  var lineFunction = d3.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });
  
  d3.select('#regline')
    .transition()
    .attr('d', lineFunction([{"x": 0, "y": lsCoef[0].m * 0 + lsCoef[0].b}, {"x": width, "y": lsCoef[0].m * height + lsCoef[0].b}]));
}

// click event: draw new circle
svg.on('click', function(x, y){
  //push new data point to data array
   data.push({"x": d3.mouse(this)[0], "y": d3.mouse(this)[1], "radius": radius });

  //select each circle and append the data
  var selection = svg.selectAll("circle").data(data);

  //update selection and draw new circle
  selection.enter()
    .append("circle")
    .attr('class', 'click-circle')
    .attr("cx",function(d) {return d.x;})
    .attr("cy",function(d) {return d.y;})
    .attr("r", radius);

  //exit selection
  selection.exit().remove();

  if (data.length === 2){
    drawline(data);
  } else if (data.length > 2){
    transitionline(data);
  }

  console.log(data);
})
