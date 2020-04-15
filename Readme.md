
# Linear Regression Visualization

## Using D3JS

*Interactive Training and Visualization*

The goal here is to create a project similar to the one done on the Coding Train youTube channel. In their example he used p5.js for the drawing and rendering, and tesnorflowJS for the Machine Learning.

I will also use TensorflowJS but I will accomplish the task with D3JS.



## What is Linear Regression

Figure out, can we fit a line into a 3d space that approxiamtes all the points the best we can.
While minimizing all the distances rom all the points to the line.

1. We need a dataset (x's and y's)
We'll create the dataset with interactive clicks

2. We need a Loss function > Mean squared error

3. We need an Optimizer - allows us to minimize the loss function

4. We also need a learning rate

The Formula for the line:

		y = mx + b



********************************************************************************************

*app.js* - Combines making the dots, drawing the line with D3 and using Tensorflow to get the line to be drawn with the Tensor data. But it is not interactive, the dots and the line are independent of eachother.

*appV2.js* - This oe uses a different method to draw the dots and the line and it uses math formulas to get the line to make it's predictions based on the data. Dots get the line to move.

*appV3.js* - The goal here is to combine the TensorFlow functionality from app.js with the interactive dots and line from appV2.js