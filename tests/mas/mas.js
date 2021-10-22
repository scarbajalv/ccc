
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

// step is the change in the "t" parameter in each Frame
// If deltaTime is the real elapsed time: deltaTime = FrameRate * delta_t * step
let framerate_custom = 60; // set frameRate
let stepConfig = 1; 
let step = stepConfig;
let t = 0.0; // Initial time
let omegaconfig = 50.;
let omega = omegaconfig;
let delta = 0;
let waveLength = 100;
let waveNumber = 2*3.14159/waveLength;
let waveSpeed = omega/waveNumber;


let canvas_w = 400;
let canvas_h = 400;
let beginX = canvas_w/2; // Initial x-coordinate
let beginY = canvas_h/2; // Initial y-coordinate
let radius1 = 0.4*canvas_w;

let slider;

var t2_ini = 0;

let nFrame = 0;
let currentTime = 0;

let axis_origin_x = 0;
let axis_origin_y = 0;

// ##################### SETUP #####################

function setup() {

	// Establecer dimensiones del canvas
	if(windowWidth > 655) canvas_w = 655;
	else canvas_w = windowWidth - 55;
	canvas_h = canvas_w;

	canvas = createCanvas(canvas_w, canvas_h);
	canvas.parent('simple-sketch-holder');
	frameRate(framerate_custom);



}



// ##################### DRAW #####################

function draw() {

	background(0);

	stroke('black');
	fill('white');

	t += step;
	nFrame += 1;
	currentTime = nFrame/framerate_custom;


	periodTime = 4;
	period = framerate_custom * periodTime * step;
	omega = 2*3.1416/period;
	waveLength = 0.5 * canvas_w;
	waveNumber = 2*3.14159/waveLength;
	waveSpeed = omega/waveNumber;
	amplitude = 0.3*canvas_w;

	axis_origin_x = (1/8)*canvas_w;
	axis_origin_y = (4/5)*canvas_h;

	var x = amplitude*sin(omega*t);
	var y = amplitude*sin(omega*t);

	text("currentTime = " + currentTime, canvas_w/2, 0.4*canvas_h/8);
	text("omega = " + omega, canvas_w/2, 0.6*canvas_h/8);
	text("waveNumber = " + waveNumber, canvas_w/2, 0.8*canvas_h/8);
	text("waveSpeed = " + waveSpeed, canvas_w/2, 1.0*canvas_h/8);
	text(nFrame*step, canvas_w/2, 1.2*canvas_h/8);
	text("t = " + t, canvas_w/2, 1.4*canvas_h/8);
	text("step = " + step, canvas_w/2, 1.6*canvas_h/8);
	text("x = " + x, canvas_w/2, 1.8*canvas_h/8);

	circle(canvas_w/2 + x, canvas_h/4, 3*canvas_w/100);
	//circle(canvas_w/2 + x, canvas_h/4, 2*canvas_w/100);

	//circle(canvas_w/4 , canvas_h/2 + y, 2*canvas_w/100);

	drawTrayectory_v3();

	draw_TimeAxis();
	draw_XAxis();


}




function drawTrayectory_v3() {
	stroke('white');
	noFill();	

	var xW_ini = 0;
	var xW_final = (2.5/4)*canvas_w;
	var t_limit = (xW_final - xW_ini) / waveSpeed;

	if ( t < t_limit ){
		xW_final = waveSpeed*t;
		beginShape();
		for (var xW = xW_ini; xW < xW_final; xW += 0.5){
		  curveVertex( xW + axis_origin_x , 
		  	-amplitude*sin(waveNumber* xW ) + axis_origin_y - amplitude)
		}
		endShape();

	}else{
		beginShape();
		for (var xW = xW_ini; xW < xW_final; xW += 0.5){
		  curveVertex( xW + axis_origin_x , 
		  	-amplitude*sin(waveNumber*(xW_final - xW) - omega*t + 3.1415926) + axis_origin_y - amplitude)
		}
		endShape();
	}
	
		

	
}

function draw_TimeAxis() {	

	var xW_ini = 0; // Default 0, el plot inicia al inicio de los ejes
	var xW_final = (2.5/4)*canvas_w; // es el grosor del eje X, no su coordenada final
	var t_limit = (xW_final - xW_ini) / waveSpeed; // instante en el cual se comienza a mover el plot
	var cT_limit = t_limit/(framerate_custom*step); // lo mismo que t_limit pero en tiempo real
	// Delta_cT representa el int() del tiempo real que demora la función en llegar a xW_final
	// El +2 es algo artificioso, debería poderse generalizar.
	var Delta_cT = int( cT_limit ) + 2;

	drawingContext.setLineDash([3, 5]);
	stroke('gray');
	noFill();	
	line(axis_origin_x, axis_origin_y - amplitude, 
		axis_origin_x + (3/4)*canvas_w , axis_origin_y - amplitude);
	drawingContext.setLineDash([3, 0]);
	stroke('white');

	if (t < t_limit) {
		line(axis_origin_x, axis_origin_y, 
			axis_origin_x + (3/4)*canvas_w , axis_origin_y);
		noStroke();
		fill("white");
		for (var i = 0; i <= Delta_cT ; i++){			
			textAlign(CENTER, TOP);
			text(i, 
				axis_origin_x + waveSpeed*framerate_custom*i*step, 
				axis_origin_y - 0 + canvas_w/100);
		}
	}
	else{
		line(axis_origin_x, axis_origin_y, 
			axis_origin_x + (3/4)*canvas_w , axis_origin_y);
		noStroke();
		fill("white");
		var i_ini = int (currentTime - cT_limit) + 1;
		var i_final = int (currentTime - cT_limit + Delta_cT);
		for (var i = i_ini; i <= i_final ; i++){			
			textAlign(CENTER, TOP);
			text(i, 
				axis_origin_x + waveSpeed*framerate_custom*i*step - waveSpeed*(t - t_limit), 
				axis_origin_y - 0 + canvas_w/100
				);
		}
	}
	
	
}

function draw_XAxis(){

	stroke("white");
	line(axis_origin_x, axis_origin_y, axis_origin_x, axis_origin_y - 2*amplitude );

	noStroke();
	textAlign(RIGHT, CENTER);
	text("-"+amplitude, axis_origin_x - canvas_w/100, axis_origin_y );
	text("0", axis_origin_x - canvas_w/100, axis_origin_y - amplitude );
	text("+"+amplitude, axis_origin_x - canvas_w/100, axis_origin_y - 2*amplitude);

}






















//***********************************************************************
//******************************* BACKUPS *******************************
//***********************************************************************


function drawTrayectory_old(t,  x,  y) {
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


function drawTrayectory_v2() {
	stroke('white');
	noFill();
	//drawingContext.setLineDash([3, 0]);

	var t2_ini = 0;
	var waveNumber = 0.5*omega;
	var waveSpeed = omega/waveNumber;
	var t2_final = 1.5*(2*3.1416/waveNumber);
	var t2_final = 0.03;
	//var t2_final = waveSpeed*t;

	
	beginShape();	
	for (var t2 = t2_ini; t2 < t2_final; t2 += 1*stepConfig){
	  curveVertex( t2*1e4 + canvas_w/8 , -100*sin(waveNumber*t2 + omega*t) + canvas_h/2 )
	}
	endShape();
	//drawingContext.setLineDash([3, 0]);
}


























