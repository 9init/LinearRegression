/*
A linear regression line has an equation of the form Y = b0 + b1X,
where X is the explanatory variable and Y is the dependent variable.
The slope of the line is a, and a is the intercept (the value of y when x = 0).
*/

let data = [];
let b0 = 0;
let b1 = 0;

function setup(){
  createCanvas(900, 900);
}


function getAverage(){
  let xSum = 0;
  let ySum = 0;
  for(let i=0; i<data.length; i++){
    xSum += data[i].x;
    ySum += data[i].y;
  }
  let xAvr = xSum/data.length;
  let yAvr = ySum/data.length;
  return createVector(xAvr, yAvr);
}

  
function mousePressed(){
  let x = map(mouseX, 0, width, 0, 1);
  let y = map(mouseY, 0, height, 1, 0);
  let point = createVector(x, y);
  data.push(point);
}

function calcLinearReg(){
  let average = getAverage();
  let numerator = 0;
  let denominator = 0;
  for(let i=0; i<data.length; i++){
    let {x, y} = data[i];
    numerator += (x - average.x) * (y - average.y);
    denominator += (x - average.x) * (x - average.x)
  }
  b1 = numerator / denominator;
  b0 = average.y - (b1 * average.x);
}

function drawLine(){
  let x1 = 0;
  let y1 = b0 + (b1 * x1);
  let x2 = 1;
  let y2 = b0 + (b1 * x2);

  x1 = map(x1, 0, 1, 0, width);
  y1 = map(y1, 0, 1, height, 0);
  x2 = map(x2, 0, 1, 0, width);
  y2 = map(y2, 0, 1, height, 0);

  stroke(255);
  strokeWeight(4);
  line(x1, y1, x2, y2);
}

function draw(){
  background(50);
  if(data.length > 1){
    calcLinearReg();
    drawLine();
  }
  for(let i=0; i<data.length; i++){
    let x = map(data[i].x, 0, 1, 0, width);
    let y = map(data[i].y, 0, 1, height, 0);
    let predict = b0 + b1 * data[i].x;
    let residual = data[i].y - predict;
    
    if (residual > 0)
      fill(97,15,240);
    else
      fill(204, 159, 255);

    stroke(255);
    strokeWeight(2);
    ellipse(x,y,20,20);
  }
}
