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

let data = [];

// define the svg and add it to the DOM
const svg = d3
  .select(".content")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

/*
- a simpler way to draw the dots on the screen
- This is the draw function
*/

function drawCircle(x, y) {
  svg.append("circle")
    .attr('class', 'click-circle')
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius);

  y = Math.round(y);
  x = Math.round(x);

  // lets push the Xs and Ys into their res[ective arrays
  y_coords.push(y);
  x_coords.push(x);
  //data.push({"x": d3.mouse(this)[0], "y": d3.mouse(this)[1] });
  data.push({"x": x, "y": y});

  console.log(x_coords, y_coords);
  console.log(data);
}

// click on the screen draws a dot
svg.on('click', function() {
  var coords = d3.mouse(this);
  drawCircle(coords[0], coords[1]);
});




/*

* TensorFlow JS *

*/


// - 1 -
// First we setup out variables
let m, b;

m = tf.variable(tf.scalar(Math.random()));
b = tf.variable(tf.scalar(Math.random()));

// then we define the Optimizer
const learningRate = 0.3;
const optimizer = tf.train.sgd(learningRate);
const iterations = 75;

// - 2 -
// We build our Model by making a representation of the linear regression formula 
// y = mx + b
function predict (x) {
  return tf.tidy(() => {
    //const x = tf.tensor1d(x);
    //  y = mx + b
    return m.mul(x).add(b);
  });
}

// - 3 -
/* 
Third we Train the model
For that we will need: 

- a Loss function
- an Optimizer
- a Training Loop

*/

// Here we define the Loss Function
function loss (prediction, labels) {
  const error = prediction.sub(labels).square().mean();
  return error;
}

// And now the Training Loop
async function train (xs, ys, iterations) {
  // the training loop
  for (let iter = 0; iter < iterations; iter++) {
    // optimizer.minimize is where the training happens.
    optimizer.minimize(() => {
      // Feed the examples into the model
      const pred = predict(xs);
      console.log(xs);

      return loss(pred, ys);
    });
    // Use tf.nextFrame to not block the browser.
    await tf.nextFrame();
  }
}





// Problem:
//
// I mange to get the line to be drqwn based on the linear regression data
// but it's not interactive yet,
// the dots on the svg and the line are not interating.

const xs = [0,1];
const ys = predict(xs);

ys.print();

let lineY = ys.dataSync();
// console.log(lineY);

// Drawing the Line
svg.append("line")
  .attr('class', 'the-line')
  .attr('x1', xs[0])
  .attr('y1', lineY[0])
  .attr('x2', width)
  .attr('y2', (lineY[1] * height));


/*

Math Helpers

*/

function generateData(numPoints, coeff) {
  return tf.tidy(() => {
    const [m, b] = [
      tf.scalar(coeff.a), tf.scalar(coeff.b), tf.scalar(coeff.c),
      tf.scalar(coeff.d)
    ];

    const xs = tf.randomUniform([numPoints], -1, 1);

    // Generate polynomial data
    const three = tf.scalar(3, 'int32');
    const ys = a.mul(xs.pow(three))
      .add(b.mul(xs.square()))
      .add(c.mul(xs))
      .add(d)
      // Add random noise to the generated data
      // to make the problem a bit more interesting
      .add(tf.randomNormal([numPoints], 0, sigma));

    // Normalize the y values to the range 0 to 1.
    const ymin = ys.min();
    const ymax = ys.max();
    const yrange = ymax.sub(ymin);
    const ysNormalized = ys.sub(ymin).div(yrange);

    return {
      xs, 
      ys: ysNormalized
    };
  })
}


async function learnCoefficients() {
  const trueCoefficients = {m: m, b: b};
  const trainingData = generateData(100, trueCoefficients);



  // See what the predictions look like with random coefficients
  renderCoefficients('.the-line', {
    m: m.dataSync()[0],
    b: b.dataSync()[0]
  });


  // Train the model!
  await train(trainingData.xs, trainingData.ys, numIterations);

  // See what the final results predictions are after training.
  renderCoefficients('#trained .coeff', {
    a: a.dataSync()[0],
    b: b.dataSync()[0],
    c: c.dataSync()[0],
    d: d.dataSync()[0],
  });
  const predictionsAfter = predict(trainingData.xs);
  await plotDataAndPredictions(
      '#trained .plot', trainingData.xs, trainingData.ys, predictionsAfter);

  predictionsBefore.dispose();
  predictionsAfter.dispose();
}


learnCoefficients();