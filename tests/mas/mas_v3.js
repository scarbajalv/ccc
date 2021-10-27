
let x;
let x_cm;
let y;

// step is the change in the "t" parameter in each Frame
// If deltaTime is the real elapsed time: deltaTime = FrameRate * delta_t * step
let framerate_custom = 60; // set frameRate
let stepConfig = 1;
let step = stepConfig;
let iFrame = 0;
let t = 0.0; // Initial time
let omega;
let delta = 0;
let waveLength;
let waveNumber;
let waveSpeed;
let period = 6;

let button_period_increase;
let button_period_decrease;
let button_amplitude_increase;
let button_amplitude_decrease;
let pause_checkbox;
let checkbox_time_evolve;


let canvas_w;
let canvas_h;
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
	amplitude = (0.25)*canvas_h;
	amplitude_cm = amplitude/(0.25*canvas_h)*100;
	pixel_x_max = (60/100)*canvas_w;

	canvas = createCanvas(canvas_w, canvas_h);
	canvas.parent('simple-sketch-holder');
	frameRate(framerate_custom);

  button_period_decrease = createButton("-");
  button_period_decrease.parent('simple-sketch-holder');
  button_period_decrease.style("width","25"+"px");
  button_period_decrease.position(0.125*canvas_w, 0.05*canvas_h);
  button_period_decrease.mousePressed(f_period_decrease);

  button_period_increase = createButton("+");
  button_period_increase.parent('simple-sketch-holder');
  button_period_increase.position(0.175*canvas_w, 0.05*canvas_h);
  button_period_increase.style("width","25"+"px");
  button_period_increase.mousePressed(f_period_increase);

  button_amplitude_decrease = createButton("-");
  button_amplitude_decrease.parent("simple-sketch-holder");
  button_amplitude_decrease.position(0.125*canvas_w, 0.1*canvas_h);
  button_amplitude_decrease.style("width","25px");
  button_amplitude_decrease.mousePressed(f_amplitude_decrease);

  button_amplitude_increase = createButton("+");
  button_amplitude_increase.parent("simple-sketch-holder");
  button_amplitude_increase.style("width", "25px");
  button_amplitude_increase.position(0.175*canvas_w, 0.1*canvas_h);
  button_amplitude_increase.mousePressed(f_amplitude_increase);

  checkbox_time_evolve = createCheckbox(' Play', false);
  checkbox_time_evolve.position(500,500);
  //checkbox_time_evolve.changed(f_checkbox_time_evolve_changed);

  slider_time = createSlider(0, 10*framerate_custom, 
  	0, 0.1*framerate_custom);
  slider_time.input(f_slider_time_input);
  slider_time.parent("simple-sketch-holder");
  slider_time.position( (0.375)*canvas_w, (0.075)*canvas_h);
  slider_time.style('width', str(0.25*canvas_w)+'px');
  



}

// ##################### DRAW #####################

function draw() {

	background(0);

	stroke('black');
	fill('white');
	
	//iFrame += 1;
	t = iFrame/framerate_custom;

	omega = 2*3.1416/period;
	waveLength = (period/delta_t)*pixel_x_max;
	waveNumber = 2*3.14159/waveLength;
	waveSpeed = omega/waveNumber;

	axis_origin_x = (1/8)*canvas_w;
	axis_origin_y = (90/100)*canvas_h;
	axis_zero_y = axis_origin_y - (25/100)*canvas_h;;

	x = amplitude*cos(omega*t);
	x_cm = amplitude_cm*cos(omega*t);

	textAlign(CENTER, CENTER);
	text("t = " + t.toFixed(2) + "s", canvas_w/2, 0.4*canvas_h/8);
	text("T = " + period.toFixed(2) + "s", 0.075*canvas_w, 0.0675*canvas_h);
	text("A = " + amplitude_cm.toFixed(0) + "cm", 0.075*canvas_w, 0.1175*canvas_h);
	text("x = " + x_cm.toFixed(2) + " cm", canvas_w/2, 1.8*canvas_h/8);

	draw_Oscillator();

	if (checkbox_time_evolve.checked()){
		iFrame += 1;
		slider_time.value(t*framerate_custom);
	}


}

// ##################### FUNCTIONS ####################

function f_period_increase(){
	if (period < 10){
		period = period + 0.5;
	}
	iFrame = 0;
}

function f_period_decrease(){
	if (period > 1){
		period = period - 0.5;
	}
	iFrame = 0;
}

function f_amplitude_increase(){
	if (amplitude < (25/100)*canvas_h){
		amplitude = amplitude + (5/100)*canvas_h;
		amplitude_cm = amplitude/(0.25*canvas_h)*100;
		t = 0;
	}
}

function f_amplitude_decrease(){
	if (amplitude > (5/100)*canvas_h){
		amplitude = amplitude - (5/100)*canvas_h;
		amplitude_cm = amplitude/(0.25*canvas_h)*100;
		t = 0;
	}
}

function draw_Oscillator(){

	var xpos_oscillator = canvas_w/2;
	var ypos_oscillator = canvas_h/6;	

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

	noStroke();
	fill('gold');
	circle(canvas_w/2 + x, ypos_oscillator, (3/100)*canvas_w);
	fill('white');
	stroke('white');




}

function f_slider_time_input(){
	checkbox_time_evolve.checked(false);
	iFrame = slider_time.value();
}