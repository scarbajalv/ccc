
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
let periodTime = 2;


let period_slider;
let period_button_increase;
let period_button_decrease;
let amplitude_button_increase;
let amplitude_button_decrease;
let pause_checkbox;
let autoTime_checkbox;


let canvas_w = 400;
let canvas_h = 400;
let beginX = canvas_w/2; // Initial x-coordinate
let beginY = canvas_h/2; // Initial y-coordinate
let radius1 = 0.4*canvas_w;
let amplitude;
let amplitude_cm;

let pixel_x_max;
let delta_t = 9;

let slider_time;

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
	amplitude = (25/100)*canvas_h;
	amplitude_cm = amplitude/(0.25*canvas_h)*100;
	pixel_x_max = (60/100)*canvas_w;

	canvas = createCanvas(canvas_w, canvas_h);
	canvas.parent('simple-sketch-holder');
	frameRate(framerate_custom);

	/*period_slider = createSlider(0,10,3,1);
	period_slider.position(100,100);
	period_slider.style("width", '80px');
	period_slider.parent('simple-sketch-holder');
  period_slider.changed(() => {
    t = 0;
  });*/

  period_button_decrease = createButton("-");
  period_button_decrease.parent('simple-sketch-holder');
  period_button_decrease.style("width","25"+"px");
  period_button_decrease.position(0.125*canvas_w, 0.05*canvas_h);
  period_button_decrease.mousePressed(decreasePeriod);

  period_button_increase = createButton("+");
  period_button_increase.parent('simple-sketch-holder');
  period_button_increase.position(0.175*canvas_w, 0.05*canvas_h);
  period_button_increase.style("width","25"+"px");
  period_button_increase.mousePressed(increasePeriod);  

  amplitude_button_decrease = createButton("-");
  amplitude_button_decrease.parent("simple-sketch-holder");
  amplitude_button_decrease.position(0.125*canvas_w, 0.1*canvas_h);
  amplitude_button_decrease.style("width","25px");
  amplitude_button_decrease.mousePressed(decreaseAmplitude);

  amplitude_button_increase = createButton("+");
  amplitude_button_increase.parent("simple-sketch-holder");
  amplitude_button_increase.style("width", "25px");
  amplitude_button_increase.position(0.175*canvas_w, 0.1*canvas_h);
  amplitude_button_increase.mousePressed(increaseAmplitude);

  autoTime_checkbox = createCheckbox(' Play', false);
  autoTime_checkbox.position(500,500);
  autoTime_checkbox.changed(pauseTime);

  slider_time = createSlider(0, 10*framerate_custom*step, 
  	0, 0.1*framerate_custom*step);
  slider_time.parent("simple-sketch-holder");
  slider_time.position( (0.375)*canvas_w, (0.075)*canvas_h);
  slider_time.style('width', str(0.25*canvas_w)+'px');



}



// ##################### DRAW #####################

function draw() {

	background(0);

	stroke('black');
	fill('white');


	//t += step;
	nFrame += 1;
	currentTime = nFrame/framerate_custom;
	currentTime = (t/step)/framerate_custom;

	/*if ( t > 500){
		t = 0;		
	};*/
	//Math.round(num * 100) / 100;

	//let periodTime = period_slider.value();

	//amplitude = (25/100)*canvas_w;

	period = framerate_custom * periodTime * step;
	omega = 2*3.1416/period;
	waveLength = (periodTime/delta_t)*pixel_x_max;
	waveNumber = 2*3.14159/waveLength;
	waveSpeed = omega/waveNumber;


	axis_origin_x = (1/8)*canvas_w;
	axis_origin_y = (90/100)*canvas_h;
	axis_zero_y = axis_origin_y - (25/100)*canvas_h;;

	x = amplitude*cos(omega*t);

	textAlign(CENTER, CENTER);
	text("t = " + currentTime.toFixed(2) + "s", canvas_w/2, 0.4*canvas_h/8);
	text("T = " + periodTime.toFixed(2) + "s", 0.075*canvas_w, 0.0675*canvas_h);
	text("A = " + amplitude_cm.toFixed(0) + "cm", 0.075*canvas_w, 0.1175*canvas_h);
	/*text("omega = " + omega, canvas_w/2, 0.6*canvas_h/8);
	text("waveNumber = " + waveNumber, canvas_w/2, 0.8*canvas_h/8);
	text("waveSpeed = " + waveSpeed, canvas_w/2, 1.0*canvas_h/8);
	text(nFrame*step, canvas_w/2, 1.2*canvas_h/8);
	text("t = " + t, canvas_w/2, 1.4*canvas_h/8);
	text("step = " + step, canvas_w/2, 1.6*canvas_h/8);*/
	text("x = " + x.toFixed(2), canvas_w/2, 1.8*canvas_h/8);	

	
	//circle(canvas_w/2 + x, canvas_h/4, 2*canvas_w/100);

	//circle(canvas_w/4 , canvas_h/2 + y, 2*canvas_w/100);

	drawTrayectory_v3();

	draw_TimeAxis();

	draw_XAxis();

	draw_Oscillator();

	if (autoTime_checkbox.checked()){
		t += step;
	}
	else{
		t = slider_time.value();
	}


}

// ##################### FUNCTIONS ####################

function pauseTime(){

	if (pause_checkbox.checked()){
		noLoop();
	}
	else{
		loop();
	}

}


function increaseAmplitude(){
	if (amplitude < (25/100)*canvas_h){
		amplitude = amplitude + (5/100)*canvas_h;
		amplitude_cm = amplitude/(0.25*canvas_h)*100;
		t = 0;
	}
}

function decreaseAmplitude(){
	if (amplitude > (5/100)*canvas_h){
		amplitude = amplitude - (5/100)*canvas_h;
		amplitude_cm = amplitude/(0.25*canvas_h)*100;
		t = 0;
	}
}

function resetTime(){
	t = 0;
}

function increasePeriod(){
	if (periodTime < 10){
		periodTime = periodTime + 0.5;
	}
	t = 0;
}

function decreasePeriod(){
	if (periodTime > 1){
		periodTime = periodTime - 0.5;
	}
	t = 0;
}


function drawTrayectory_v3() {
	stroke('gold');
	strokeWeight(2);
	noFill();	

	var xW_ini = 0;
	var xW_final = pixel_x_max; // pixel_x hasta donde se grafica
	var t_limit = (xW_final - xW_ini) / waveSpeed;

	if ( t < t_limit ){
		xW_final = waveSpeed*t;
		beginShape();
		for (var xW = xW_ini; xW < xW_final; xW += 0.5){
		  curveVertex( axis_origin_x + xW , 
		  	axis_zero_y - amplitude*cos(waveNumber* xW )  )
		}
		endShape();

	}else{
		beginShape();
		for (var xW = xW_ini; xW < xW_final; xW += 0.5){
		  curveVertex( xW + axis_origin_x , 
		  	-amplitude*cos(waveNumber*(xW_final - xW) - omega*t) + axis_zero_y)
		}
		endShape();
	}
	strokeWeight(1);
	
}

function draw_TimeAxis() {	

	var t_limit = (pixel_x_max) / waveSpeed; // instante en el cual se comienza a mover el plot
	var cT_limit = t_limit/(framerate_custom*step); // lo mismo que t_limit pero en tiempo real
	// Delta_cT representa el int() del tiempo real que demora la función en llegar a xW_final
	// El +2 es algo artificioso, debería poderse generalizar.
	var Delta_cT = int( cT_limit ) + 2;
	//Delta_cT = 15;

	drawingContext.setLineDash([3, 5]);
	stroke('gray');
	noFill();	
	line(axis_origin_x, axis_zero_y, 
		axis_origin_x + (3/4)*canvas_w , axis_zero_y);
	drawingContext.setLineDash([3, 0]);
	noStroke();
	fill("white");
	textAlign(LEFT, CENTER);
	//textSize(16);
	text("t (s)", axis_origin_x + (3/4)*canvas_w + (1/100)*canvas_w , axis_origin_y);
	//textSize(12);
	noFill();
	stroke('white');

	var	newwaveSpeed = (2*3.1416/8)/(2*3.14159/waveLength);

	if (t < t_limit) {
		line(axis_origin_x, axis_origin_y, 
			axis_origin_x + (3/4)*canvas_w , axis_origin_y);
		noStroke();
		fill("white");
		for (var i = 0; i <= Delta_cT + 1; i++){
			textAlign(CENTER, TOP);
			noStroke();
			text(i, 
				axis_origin_x + waveSpeed*framerate_custom*i*step, 
				//axis_origin_x + 10*framerate_custom*i*step, 
				axis_origin_y - 0 + canvas_w/100);
			stroke('white');
			line(axis_origin_x + waveSpeed*framerate_custom*i*step, axis_origin_y + (0.5/100)*canvas_h,
				axis_origin_x + waveSpeed*framerate_custom*i*step, axis_origin_y - (0.5/100)*canvas_h);
			//line(0,0,100,100);
		}
	}
	else{
		line(axis_origin_x, axis_origin_y, 
			axis_origin_x + (3/4)*canvas_w , axis_origin_y);
		noStroke();
		fill("white");
		var i_ini = int (currentTime - cT_limit) + 1;
		var i_final = int (currentTime - cT_limit + Delta_cT);
		for (var i = i_ini; i <= i_final + 1; i++){			
			textAlign(CENTER, TOP);
			noStroke();
			text(i, 
				axis_origin_x + waveSpeed*framerate_custom*i*step - waveSpeed*(t - t_limit), 
				axis_origin_y - 0 + canvas_w/100
				);
			stroke('white');
			line(axis_origin_x + waveSpeed*framerate_custom*i*step - waveSpeed*(t - t_limit), axis_origin_y + (0.5/100)*canvas_h,
				axis_origin_x + waveSpeed*framerate_custom*i*step - waveSpeed*(t - t_limit), axis_origin_y - (0.5/100)*canvas_h);
		}
	}
	
}

function draw_XAxis(){

	stroke("white");
	line(axis_origin_x, axis_origin_y, axis_origin_x, axis_origin_y - (50/100)*canvas_w);

	noStroke();
	textAlign(RIGHT, CENTER);	
	text("-"+amplitude_cm, axis_origin_x - canvas_w/100, axis_zero_y + amplitude );
	text("0", axis_origin_x - canvas_w/100, axis_zero_y );
	text("+"+amplitude_cm, axis_origin_x - canvas_w/100, axis_zero_y - amplitude);
	textAlign(CENTER, CENTER);
	text("x (cm)", axis_origin_x, axis_zero_y - (25/100)*canvas_h - (2/100)*canvas_h );
	stroke('white');
	line(axis_origin_x - (0.5/100)*canvas_w, axis_zero_y + amplitude,
			 axis_origin_x + (0.5/100)*canvas_w, axis_zero_y + amplitude);
	line(axis_origin_x - (0.5/100)*canvas_w, axis_zero_y - amplitude,
			 axis_origin_x + (0.5/100)*canvas_w, axis_zero_y - amplitude);
	noStroke();
	

}


function draw_Oscillator(){

	var xpos_oscillator = canvas_w/2;
	var ypos_oscillator = canvas_h/6;
	circle(canvas_w/2 + x, ypos_oscillator, (3/100)*canvas_w);

	stroke('white');
	line( canvas_w/2 - (30/100)*canvas_w, ypos_oscillator,
				canvas_w/2 + (30/100)*canvas_w , ypos_oscillator);

	line( canvas_w/2 - (amplitude), ypos_oscillator - (0.5/100)*canvas_w,
				canvas_w/2 - (amplitude), ypos_oscillator + (0.5/100)*canvas_w);
	line( canvas_w/2 + (amplitude), ypos_oscillator - (0.5/100)*canvas_w,
				canvas_w/2 + (amplitude), ypos_oscillator + (0.5/100)*canvas_w);
	line( canvas_w/2 , ypos_oscillator - (0.5/100)*canvas_w,
				canvas_w/2 , ypos_oscillator + (0.5/100)*canvas_w);

	noStroke();
	textAlign(CENTER, TOP);
	text( "-"+amplitude_cm , canvas_w/2 - (amplitude), ypos_oscillator + (1/100)*canvas_w);
	text( "+"+amplitude_cm , canvas_w/2 + (amplitude), ypos_oscillator + (1/100)*canvas_w);
	text( "x (cm)" , canvas_w/2 + (35/100)*canvas_w , ypos_oscillator);
	stroke("white");


}

