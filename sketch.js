let beginX = 0; // Initial x-coordinate
let beginY = 200; // Initial y-coordinate
let endX = 720.0; // Final x-coordinate
let endY = 0.0; // Final y-coordinate
let distX; // X-axis distance to move
let distY; // Y-axis distance to move
let exponent = 4; // Determines the curve
let x = 0.0; // Current x-coordinate
let y = 0.0; // Current y-coordinate
let step = 0.002; // Size of each step along the path
let pct = 0.0; // Percentage traveled (0.0 to 1.0)

function setup() {
  canvas = createCanvas(720, 400);
  canvas.parent('simple-sketch-holder');
  frameRate(60);
  //noStroke();
  distX = endX - beginX;
  distY = endY - beginY;

}

function draw() {
  
	background(0);
  
  //fill(0);
  //rect(50, 50, width, height);
  pct += step;
  if (pct < 1.0) {
    x = beginX + pct * distX;
    y = beginY + 1.*sin(32*pct)*pow(1.27,-16*pct) * distY;
  }
  fill(255);
  noStroke();
  ellipse(x, y, 20, 20);
  stroke("red");
  /*
  for (let i=0; i<pct; i = i+step){
  	point(beginX + i * distX , beginY + 1.*sin(32*i)*pow(1.27,-16*i) * distY)
  }
  */
  noFill();
  beginShape();
  for (let i=0; i<pct; i +=1*step){
  	curveVertex(beginX + i * distX , beginY + 1.*sin(32*i)*pow(1.27,-16*i) * distY)
  }
  endShape();
}