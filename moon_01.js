let beginX = 200; // Initial x-coordinate
let beginY = 200; // Initial y-coordinate
let endX = 720.0; // Final x-coordinate
let endY = 0.0; // Final y-coordinate
let distX; // X-axis distance to move
let distY; // Y-axis distance to move
let exponent = 4; // Determines the curve
let x = 0.0; // Current x-coordinate
let y = 0.0; // Current y-coordinate
let pauseBool = 0;
let button;

let step = 0.0001; // Size of each step along the path
let t = 0.0; // Initial time
let omega = 100.;
let amplitude = 150.;

let slider;

function setup() {
  createCanvas(400, 400);
  canvas = createCanvas(400, 400);
  canvas.parent('simple-sketch-holder');
  frameRate(60);
  //noStroke();
  distX = endX - beginX;
  distY = endY - beginY;

  button = createButton('click me');
  button.position(0, 0);
  button.mousePressed(pauseDraw);
  button.parent('simple-sketch-holder');

  slider = createSlider(0, 255, 100);
  slider.position(10, 10);
  slider.style('width', '80px');

}

function draw() {
  let val = slider.value();
  background(val);
}

function draw() {
  
  background(0);
  
  //fill(0);
  //rect(50, 50, width, height);
  t += step;
  
  x = beginX + amplitude * cos(omega*t);
  y = beginY + amplitude * sin(omega*t);

  noFill();
  beginShape();
  for (let i = 0; i < t; i += 1*step){
    curveVertex(beginX + amplitude * cos(omega*i) , beginY + amplitude * sin(omega*i) )
  }
  endShape();

  fill(255);
  noStroke();
  ellipse(x, y, 20, 20);
  stroke("red");
  
  

}

function pauseDraw() {
  if( pauseBool == 0 ){
    noLoop();
    pauseBool = 1;
  }
  else{
    loop();
    pauseBool = 0;
  }
  
}