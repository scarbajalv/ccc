
let pi=3.14159265358;
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


let canvas_w = 400;
let canvas_h = 400;
let beginX = canvas_w/2; // Initial x-coordinate
let beginY = canvas_h/2; // Initial y-coordinate
let amplitude = 0.4*canvas_w;

let slider;

var t2_ini = 0;

// ##################### SETUP #####################

function setup() {
	//createCanvas(400, 400);
	canvas = createCanvas(canvas_w, canvas_h);
	canvas.parent('simple-sketch-holder');
	frameRate(60);
	//noStroke();
	distX = endX - beginX;
	distY = endY - beginY;

	/*button = createButton('click me');
	button.position(0, 0);
	button.mousePressed(pauseDraw);
	button.parent('simple-sketch-holder');

	slider = createSlider(0, 255, 100);
	slider.position(0, 0);
	slider.style('width', '80px');
	slider.parent('simple-sketch-holder');*/

	img_earth = loadImage('img-earth.png'); // Load the image
	img_moon = loadImage('img-moon.png'); // Load the image

	checkboxTray = createCheckbox('Trayectoria', false);
	checkboxTray.style('color','white');
	checkboxTray.style('font-size',16+'px');
  checkboxTray.parent('simple-sketch-holder');
  checkboxTray.position(0, 0);
  checkboxTray.changed(test01);

  checkboxRad1 = createCheckbox('Radios', false);
	checkboxRad1.style('color','white');
	checkboxRad1.style('font-size',16+'px');
  checkboxRad1.parent('simple-sketch-holder');
  checkboxRad1.position(0, 20);
  

}

/*function draw() {
	let val = slider.value();
	background(val);
}*/

// ##################### DRAW #####################

function draw() {

	background(0);
	stroke('black');
	fill('white');

	//fill(0);
	//rect(50, 50, width, height);
	t += step;

	x = beginX + amplitude * cos(omega*t);
	y = beginY + amplitude * sin(omega*t);

	/*textSize(32);
	fill('white');
	stroke('black');
	text('t = '+t, 100, 50);*/
	
	//text(t2_ini, canvas_w/2, 100);

	if (checkboxTray.checked()){
		drawTrayectory(t,  x,  y);
	}
	
	//noStroke();
	image(img_moon, x-img_moon.width/2, y - img_moon.height/2 );
	image(img_earth, canvas_w/2 - img_earth.width/2, canvas_h/2 - img_earth.height/2);
	
	if (checkboxRad1.checked()){
		stroke("red");
		var v0 = createVector(canvas_w/2, canvas_h/2);
	  var v1 = createVector(x - canvas_w/2, y - canvas_h/2);
	  drawArrow(v0, v1, 'red');
	}

}

// ##################### FUNCTIONS #####################

function test01(){
	t2_ini = t;
	//if (t2_ini == 0) t2_ini = 1;
	//else t2_ini = 0;
	
}

function checkTrayectoryEvent() {
  if (this.checked()) {
    drawTrayectory(t, x, y);
  }
}

/*function drawTrayectory(t,  x,  y) {
	stroke('white');
	noFill();
	drawingContext.setLineDash([3, 5]);
	var t2_final;
	if(t <= 2*pi/omega) t2_final = t;
	else t2_final = 2*pi/omega + step;
	
	beginShape();	
	for (var t2 = 0; t2 < t2_final; t2 += 1*step){
	  curveVertex(beginX + amplitude * cos(omega*t2) , beginY + amplitude * sin(omega*t2) )
	}
	endShape();
	drawingContext.setLineDash([3, 0]);
}*/

function drawTrayectory(t,  x,  y) {
	stroke('white');
	noFill();
	drawingContext.setLineDash([3, 5]);
	var t2_final;
	if(t - t2_ini <= 2*pi/omega) t2_final = t;
	else t2_final = t2_ini + 2*pi/omega + step;
	
	beginShape();	
	for (var t2 = t2_ini; t2 < t2_final; t2 += 1*step){
	  curveVertex(beginX + amplitude * cos(omega*t2) , beginY + amplitude * sin(omega*t2) )
	}
	endShape();
	drawingContext.setLineDash([3, 0]);
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


// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
  stroke('black');
  fill('white');
}