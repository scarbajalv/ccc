
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

let stepConfig = 0.0001; // Size of each step along the path
let step = stepConfig;
let t = 0.0; // Initial time
let omegaconfig = 50.;
let omega = omegaconfig;
let delta = 0;


let canvas_w = 400;
let canvas_h = 400;
let beginX = canvas_w/2; // Initial x-coordinate
let beginY = canvas_h/2; // Initial y-coordinate
let radius1 = 0.4*canvas_w;

let slider;

var t2_ini = 0;

// ##################### SETUP #####################

function setup() {
	//createCanvas(400, 400);
	if(windowWidth > 655) canvas_w = 655;
	else canvas_w = windowWidth - 55;
	canvas_h = canvas_w;
	radius1 = 0.325*canvas_w;
	radius2 = 0.1*canvas_w;
	
	canvas = createCanvas(canvas_w, canvas_h);
	canvas.parent('simple-sketch-holder');
	frameRate(60);
	
	beginX = canvas_w/2; // Initial x-coordinate
	beginY = canvas_h/2; // Initial y-coordinate
	distX = endX - beginX;
	distY = endY - beginY;

	button = createButton('Pausa');
	button.position(canvas_w-60, 5);
	button.mousePressed(pauseDraw);
	button.parent('simple-sketch-holder');

	/*button2 = createButton('NewPausa');
	button2.position(canvas_w-60, 25);
	button2.mousePressed(NewpauseDraw);
	button2.parent('simple-sketch-holder');*/

	img_earth = loadImage('img-earth.png'); // Load the image
	img_moon = loadImage('img-moon.png'); // Load the image

	checkboxTrayec = createCheckbox('Trayectoria', false);
	checkboxTrayec.style('color','white');
	checkboxTrayec.style('font-size',16+'px');
  checkboxTrayec.parent('simple-sketch-holder');
  checkboxTrayec.position(0, 0);
  checkboxTrayec.changed(test01);

  checkboxRad1 = createCheckbox('Radios', false);
	checkboxRad1.style('color','white');
	checkboxRad1.style('font-size',16+'px');
  checkboxRad1.parent('simple-sketch-holder');
  checkboxRad1.position(0, 20);

  checkboxAxes = createCheckbox('Axes', false);
	checkboxAxes.style('color','white');
	checkboxAxes.style('font-size',16+'px');
  checkboxAxes.parent('simple-sketch-holder');
  checkboxAxes.position(0, 40);

  checkboxTheta = createCheckbox('Ángulo', false);
	checkboxTheta.style('color','white');
	checkboxTheta.style('font-size',16+'px');
  checkboxTheta.parent('simple-sketch-holder');
  checkboxTheta.position(0, 60);

  checkboxCoord = createCheckbox('Coordenadas', false);
	checkboxCoord.style('color','white');
	checkboxCoord.style('font-size',16+'px');
  checkboxCoord.parent('simple-sketch-holder');
  checkboxCoord.position(0, 80);
  

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

	t += step;
	var theta = omega*t;

	x = canvas_w/2 + radius1 * cos(omega*t + delta);
	y = canvas_h/2 - radius1 * sin(omega*t + delta);

	if (checkboxTrayec.checked()){
		if(!checkboxAxes.checked()){
			drawTrayectory(t,  x,  y);
		}
	}
	
	//noStroke();
	image(img_moon, x-img_moon.width/2, y - img_moon.height/2 );
	image(img_earth, canvas_w/2 - img_earth.width/2, canvas_h/2 - img_earth.height/2);

	if (checkboxAxes.checked()){
		
		stroke("white");		
		line(canvas_w/8, canvas_h/2 , canvas_w - canvas_w/8, canvas_h/2);
		line(canvas_h/2, canvas_w/8 , canvas_h/2 , canvas_w - canvas_w/8);

		noFill();
		drawingContext.setLineDash([3, 5]);
		line(canvas_w/2, canvas_h/2 , x, y);
		beginShape();
		for (var itheta = 0; itheta < 2*pi; itheta += 0.01){
		  curveVertex(canvas_w/2 + radius1 * cos(itheta) , canvas_h/2 - radius1 * sin(itheta) )
		}
		endShape();
		drawingContext.setLineDash([3, 0]);
	}

	if (checkboxTheta.checked()){
		if(checkboxAxes.checked()){
			fill('white');
			noStroke();
			var thetaSimple = theta - int(theta/(2*pi))*(2*pi);
			number = (Math.round(thetaSimple * 100) / 100/ pi).toFixed(2);
			textSize(canvas_w/30);
			textFont('Garamond');
			text("θ = "+number+" π", canvas_w/2+canvas_w/12.5, canvas_h/2-canvas_h/50);
			
			stroke('red');
			noFill();
			beginShape();
			for (var itheta = 0; itheta < thetaSimple; itheta += 0.01){
			  curveVertex(canvas_w/2 + 0.2*radius1 * cos(itheta) , canvas_h/2 - 0.2*radius1 * sin(itheta) )
			}
			endShape();
			stroke('white');
		}	
	}	

	if (checkboxCoord.checked()){
		if(checkboxAxes.checked()){
			stroke('blue');
			line(x, y, x, canvas_h/2);
			line(x, y, canvas_w/2, y);
			stroke('white');
			noStroke();
			fill('white');
			textSize(canvas_w/30);
			text(cos(theta).toFixed(2)+' R', x-canvas_w/30, canvas_h/2+canvas_h/30);
			text(sin(theta).toFixed(2)+' R', canvas_w/2-canvas_w/10, y+canvas_h/80);
			noFill();
			stroke('white');
		}
	}

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
	  curveVertex(beginX + radius1 * cos(omega*t2) , beginY + radius1 * sin(omega*t2) )
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
	for (var t2 = t2_ini; t2 < t2_final; t2 += 1*stepConfig){
	  curveVertex(canvas_w/2 + radius1 * cos(omega*t2) , canvas_h/2 - radius1 * sin(omega*t2) )
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

function NewpauseDraw() {
	if( step == stepConfig ){
		step = 0;
	}
	else{
	  step = stepConfig;
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