
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
let omega = 50.;
let omega2 = 300.;


let canvas_w = 400;
let canvas_h = 400;
let beginX = canvas_w/2; // Initial x-coordinate
let beginY = canvas_h/2; // Initial y-coordinate
let radius1 = 0.325*canvas_w;
let radius2 = 0.1*canvas_w;

let slider;
let imgfactor;

var t2_ini = 0;

// ##################### SETUP #####################

function setup() {

	if(windowWidth > 655) canvas_w = 655;
	else canvas_w = windowWidth - 55;
	canvas_h = canvas_w;
	radius1 = 0.325*canvas_w;
	radius2 = 0.1*canvas_w;
	//createCanvas(400, 400);
	canvas = createCanvas(canvas_w, canvas_h);
	canvas.parent('simple-sketch-holder');
	frameRate(60);
	//noStroke();
	distX = endX - beginX;
	distY = endY - beginY;

	button = createButton('Pausa');
	button.position(canvas_w-60, 5);
	button.mousePressed(pauseDraw);
	button.parent('simple-sketch-holder');

	/*slider = createSlider(0, 255, 100);
	slider.position(0, 0);
	slider.style('width', '80px');
	slider.parent('simple-sketch-holder');*/

	img_sun = loadImage('img-sun.png'); // Load the image
	img_earth = loadImage('img-earth.png'); // Load the image
	img_moon = loadImage('img-moon.png'); // Load the image

	checkboxTray = createCheckbox('Trayectorias', false);
	checkboxTray.style('color','white');
	checkboxTray.style('font-size',16+'px');
  checkboxTray.parent('simple-sketch-holder');
  checkboxTray.position(0, 0);
  checkboxTray.changed(update_t2_ini);

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

	x = canvas_w/2 + radius1 * cos(omega*t);
	y = canvas_h/2 - radius1 * sin(omega*t);

	x2 = x + radius2 * cos(omega2*t);
	y2 = y - radius2 * sin(omega2*t);

	/*textSize(32);
	fill('white');
	stroke('black');
	text(windowWidth, 100, 50);*/
	
	//text(t2_ini, canvas_w/2, 100);

	if (checkboxTray.checked()){
		drawTrayectory(t,  canvas_w/2,  canvas_h/2, 'lightblue');
		drawTrayectory2(t,  canvas_w/2,  canvas_h/2, 'gray');
	}
	
	//noStroke();
	imgfactor = 1/10;
	image(img_sun, 
		canvas_w/2 - canvas_w*imgfactor/2, 
		canvas_h/2 - canvas_h*imgfactor/2, 
		canvas_w*imgfactor, canvas_h*imgfactor);
	
	imgfactor = 5/100;
	image(img_earth, 
		x - canvas_w*imgfactor/2 , 
		y - canvas_h*imgfactor/2 , 
		canvas_w*imgfactor, canvas_h*imgfactor);

	imgfactor = 3/100;
	image(img_moon, 
		x2 - canvas_w*imgfactor/2 , 
		y2 - canvas_h*imgfactor/2 , 
		canvas_w*imgfactor, canvas_h*imgfactor);
	
	
	if (checkboxRad1.checked()){
		var v0 = createVector(canvas_w/2, canvas_h/2);
	  var v1 = createVector(x - canvas_w/2, y - canvas_h/2);
	  drawArrow(v0, v1, 'lightblue');
	  v0 = createVector(x, y);
	  v1 = createVector(x2 - x, y2 - y);
	  drawArrow(v0, v1, 'gray');
	  v0 = createVector(canvas_w/2, canvas_h/2);
	  v1 = createVector(x2 - canvas_w/2, y2 - canvas_h/2);
	  drawArrow(v0, v1, 'red');
	}

}

// ##################### FUNCTIONS #####################

function update_t2_ini(){
	t2_ini = t;
	//if (t2_ini == 0) t2_ini = 1;
	//else t2_ini = 0;
}

/*function checkTrayectoryEvent() {
  if (this.checked()) {
    drawTrayectory(t, x, y, 'white');
    drawTrayectory2(t, x, y, 'white');
  }
}*/

/*newDrawImage(imagen, xpos, ypos, imgfactor){
		image(imagen, 
			canvas_w/2 - canvas_w*imgfactor/2, 
			canvas_h/2 - canvas_h*imgfactor/2, 
			canvas_w*imgfactor, canvas_h*imgfactor);
}*/

function drawTrayectory(t,  x0,  y0, myColor) {
	stroke(myColor);
	noFill();
	drawingContext.setLineDash([3, 5]);
	var t2_final;
	if(t - t2_ini <= 2*pi/omega) t2_final = t;
	else t2_final = t2_ini + 2*pi/omega + step;
	
	beginShape();	
	for (var t2 = t2_ini; t2 < t2_final; t2 += 1*step){
	  curveVertex(x0 + radius1*cos(omega*t2) , y0 - radius1*sin(omega*t2) )
	}
	endShape();
	drawingContext.setLineDash([3, 0]);
}

function drawTrayectory2(t,  x0,  y0, myColor) {
	stroke(myColor);
	noFill();
	strokeWeight(0.002*canvas_w);
	drawingContext.setLineDash([3, 5]);
	var t2_final = t;
	
	beginShape();	
	for (var t2 = t2_ini; t2 < t2_final; t2 += 1*step){
	  curveVertex(x0 + radius1*cos(omega*t2) + radius2*cos(omega2*t2), 
	  	y0 - radius1*sin(omega*t2) - radius2*sin(omega2*t2) )
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
  strokeWeight(0.005*canvas_w);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 0.02*canvas_w;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
  stroke('black');
  fill('white');
}