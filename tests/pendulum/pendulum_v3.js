let pi = 3.1415926;

// FALTA:
// 1. QUE TODO SEA EN FUNCION A FRAME_W Y FRAME_H. Por algún motivo no funciona.
// 2. Que los tamaños de las letras sean múltiplos de canvas_w

let frame_center_x_factor = 0.5;
let frame_center_y_factor = 0.65;
let frame_w_factor = 0.75;
let frame_h_factor = 0.5;
let phase = 0;
let text_default_factor = 0.03;
let text_small_factor = 0.02;
let text_large_factor = 0.035;
let text_huge_factor = 0.04;

let buttons_posX_fact = 0.1;
let buttons_posY_fact = 0.1;

let radio_plot_width;
let checkbox_play_width;
let checkbox_play_height;
let panel_move_x;
let panel_move_y;

// ******************************

let x;
let theta;
let x_cm;
let y;

let button_w_factor = 0.04;
let button_h_factor = 0.04;
let framerate_custom = 60; // set frameRate
let stepConfig = 1;
let step = stepConfig;
let iFrame = 0;
let t = 0.0; // Initial time
let omega;
let waveLength;
let waveNumber;
let waveSpeed;
let long = 7; // en metros
//let long_factor = 0.25;
let period = 10;
let gravity = 9.81;
let gravity_vec = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9.81, 10];
let k = 1;
let m = Math.pow(period/(2*pi),2)*k;

let button_period_increase;
let button_period_decrease;
let button_gravity_increase;
let button_gravity_decrease;
let button_amplitude_increase;
let button_amplitude_decrease;
let checkbox_gridlines;
let checkbox_time_evolve;

let canvas_w;
let canvas_h;
let amplitude;
let amplitude_max;
let amplitude_min;
let amplitude_units;
let theta_max_deg;
let theta_max__rad;
let theta_rad;
let thetaMax_deg;
let thetaLimit_deg = 15;

let t_MAX = 12; // Máximo tiempo del eje horizontal
let t_limit = 10; // Máximo t a graficar para la función
let frame_w;

let slider_time;

let radio_plot;
let speed_cms;
let acc_cms2;
let e_J;

var t2_ini = 0;

let nFrame = 0;
let currentTime = 0;

let frame_origin_x = 0;
let frame_origin_y = 0;

// ##################### SETUP #####################

function setup() {

	noStroke();
	fill("black");

	// Establecer dimensiones del canvas
	if(windowWidth > 650) canvas_w = 650;
	else canvas_w = windowWidth - 55;
	canvas_h = 1.5*canvas_w;

	frame_origin_x = (frame_center_x_factor - 0.5*frame_w_factor)*canvas_w;
	frame_origin_y = (frame_center_y_factor + 0.5*frame_h_factor)*canvas_h;

	frame_w = canvas_w - 2*frame_origin_x;
	frame_h = frame_h_factor*canvas_w;
	axis_zero_y = frame_origin_y - 0.5*frame_h;

	amplitude_max = 0.5*frame_h;
	amplitude_min = (3/15)*(0.5*frame_h);
	amplitude = 0.5*frame_h;
	amplitude_units = int(( amplitude / amplitude_max )*100);
	thetaMax_deg = (amplitude/amplitude_max)*thetaLimit_deg;
	

	canvas = createCanvas(canvas_w, canvas_h);
	canvas.parent('simple-sketch-holder');
	frameRate(framerate_custom);

  var button_width_factor = 0.05;

  panel_move_x = 0.01*canvas_w;
	panel_move_y = 0.06*canvas_h;




  button_period_decrease = createButton("-");
  button_period_decrease.parent('simple-sketch-holder');
  button_period_decrease.position(0.17*canvas_w + panel_move_x, 
  	0.15*canvas_h - 0.5*button_width_factor*canvas_h + panel_move_y);
  button_period_decrease.mousePressed(f_period_decrease);
  button_period_decrease.style("width", button_width_factor*canvas_w.toString()+"px");
  button_period_decrease.style("height", button_width_factor*canvas_w.toString()+"px");
  button_period_decrease.style("font-size", text_default_factor*canvas_w.toString()+"px");
  button_period_decrease.style("text-align:center");
  button_period_decrease.style("padding:1px");  

  button_period_increase = createButton("+");
  button_period_increase.parent('simple-sketch-holder');
  button_period_increase.position(0.17*canvas_w + button_width_factor*canvas_w + 2 + panel_move_x, 
  	0.15*canvas_h - 0.5*button_width_factor*canvas_h + panel_move_y);
  button_period_increase.mousePressed(f_period_increase);
  button_period_increase.style("width", button_width_factor*canvas_w.toString()+"px");
  button_period_increase.style("height", button_width_factor*canvas_w.toString()+"px");
  button_period_increase.style("font-size", text_default_factor*canvas_w.toString()+"px");
  button_period_increase.style("text-align:center");
  button_period_increase.style("padding:1px");

  button_gravity_decrease = createButton("-");
  button_gravity_decrease.parent('simple-sketch-holder');
  button_gravity_decrease.position(0.17*canvas_w + panel_move_x, 
  	0.20*canvas_h - 0.5*button_width_factor*canvas_h + panel_move_y);
  button_gravity_decrease.mousePressed(f_gravity_decrease);
  button_gravity_decrease.style("width", button_width_factor*canvas_w.toString()+"px");
  button_gravity_decrease.style("height", button_width_factor*canvas_w.toString()+"px");
  button_gravity_decrease.style("font-size", text_default_factor*canvas_w.toString()+"px");
  button_gravity_decrease.style("text-align:center");
  button_gravity_decrease.style("padding:1px");

  button_gravity_increase = createButton("+");
  button_gravity_increase.parent('simple-sketch-holder');
  button_gravity_increase.position(0.17*canvas_w + button_width_factor*canvas_w + 2 + panel_move_x, 
  	0.20*canvas_h - 0.5*button_width_factor*canvas_h + panel_move_y);
  button_gravity_increase.mousePressed(f_gravity_increase);
  button_gravity_increase.style("width", button_width_factor*canvas_w.toString()+"px");
  button_gravity_increase.style("height", button_width_factor*canvas_w.toString()+"px");
  button_gravity_increase.style("font-size", text_default_factor*canvas_w.toString()+"px");
  button_gravity_increase.style("text-align:center");
  button_gravity_increase.style("padding:1px");

  button_amplitude_decrease = createButton("-");
  button_amplitude_decrease.parent('simple-sketch-holder');
  button_amplitude_decrease.position(0.17*canvas_w + panel_move_x, 
  	0.25*canvas_h - 0.5*button_width_factor*canvas_h + panel_move_y);
  button_amplitude_decrease.mousePressed(f_amplitude_decrease);
  button_amplitude_decrease.style("width", button_width_factor*canvas_w.toString()+"px");
  button_amplitude_decrease.style("height", button_width_factor*canvas_w.toString()+"px");
  button_amplitude_decrease.style("font-size", text_default_factor*canvas_w.toString()+"px");
  button_amplitude_decrease.style("text-align:center");
  button_amplitude_decrease.style("padding:1px");  

  button_amplitude_increase = createButton("+");
  button_amplitude_increase.parent('simple-sketch-holder');
  button_amplitude_increase.position(0.17*canvas_w + button_width_factor*canvas_w + 2 + panel_move_x, 
  	0.25*canvas_h -  0.5*button_width_factor*canvas_h + panel_move_y);
  button_amplitude_increase.mousePressed(f_amplitude_increase);
  button_amplitude_increase.style("width", button_width_factor*canvas_w.toString()+"px");
  button_amplitude_increase.style("height", button_width_factor*canvas_w.toString()+"px");
  button_amplitude_increase.style("font-size", text_default_factor*canvas_w.toString()+"px");
  button_amplitude_increase.style("text-align:center");
  button_amplitude_increase.style("padding:1px");
  
  
  


  slider_time = createSlider(0, 10*framerate_custom, 
  	0, 0.1*framerate_custom);
  slider_time.input(f_slider_time_input);
  slider_time.parent("simple-sketch-holder");
  slider_time.position( 0.075*canvas_w + panel_move_x, 0.34*canvas_h + panel_move_y);
  slider_time.style('width', str(0.21*canvas_w)+'px');

  checkbox_time_evolve = createCheckbox(' Play', false);
  checkbox_time_evolve.parent("simple-sketch-holder");
  checkbox_time_evolve.position(0.19*canvas_w - 48/2 + panel_move_x, 
  	0.06*canvas_h-22/2 + panel_move_y);
  checkbox_time_evolve.style("font-size", "16px");
  checkbox_time_evolve.style("text-align:center");
  checkbox_time_evolve.style("color:black");
  checkbox_play_height = checkbox_time_evolve.style("height").substring(0,2);
  //checkbox_time_evolve.position(0.18*canvas_w - 48/2, 0.071*canvas_h - 0.5*checkbox_play_height);
  checkbox_time_evolve.position(0.18*canvas_w - 48/2 + panel_move_x, 
  	0.09*canvas_h - 0.5*checkbox_play_height - 0.5*1.4*checkbox_play_height + panel_move_y);

  

  

  radio_plot = createRadio();
  radio_plot.parent("simple-sketch-holder");
  radio_plot.option(1, ' \u03b8  ');
  radio_plot.option(2, ' \u03c9  ');
  radio_plot.option(3, ' \u03b1  ');
  radio_plot.option(4, ' E  ');    
  radio_plot.style("font-size", "16px");
  radio_plot.style("color", "black");
  //radio_plot.style("background", "black");
  radio_plot.style("padding-left:0px");
  radio_plot.style("padding-right:0px");  
  radio_plot.position(0.5*canvas_w - 0.5*(30*4), 0.44*canvas_h);
  radio_plot_width = radio_plot.style("width").substring(0,3);
  radio_plot_height = radio_plot.style("height").substring(0,2);
  radio_plot.position(0.5*canvas_w - 0.5*(radio_plot_width), 
  	//0.44*canvas_h);
  	0.55*canvas_h -0.5*radio_plot_height - 0.5*1.4*radio_plot_height );
  //radio_plot.style("width:140px");

  img_upn = loadImage('img-upn.png'); // Load the image

  textFont('serif');
  

}

// ##############################################################################################
// ##############################################################################################
// ##############################################################################################
// ########################################      DRAW    ########################################

function draw() {

	background(250);

	noStroke();
	fill('black');

	text( radio_plot_height, 0.5*canvas_w, 0.4*canvas_h);
	
	
	period = 2*3.1415926*sqrt(long/gravity);
	omega = 2*3.1415926/period;
	waveLength = (period/t_MAX)*frame_w; // px
	waveNumber = 2*3.1415926/waveLength;
	waveSpeed = omega/waveNumber; // px/s

	speed_cms = omega*amplitude_units;
	acc_cms2 = omega*omega*amplitude_units;
	m = Math.pow(period/(2*pi),2)*k;
	e_J = 0.5*k*Math.pow(amplitude_units*1e-2,2);

	t = iFrame/framerate_custom + phase/omega;

	x = amplitude*cos(omega*t);
	x_cm = amplitude_units*cos(omega*t);
	theta = thetaMax_deg*cos(omega*t);
	theta_rad = thetaMax_deg/180*3.1415926*cos(omega*t);

	//m = Math.pow((2*pi)/period,2)*k;

	// Buttons Frame
	push();		
		
		strokeWeight(0.002*canvas_w);
		stroke("black");
		fill(255, 239, 201);
		//fill(255, 243, 230);
		
		var borders = 0.005*canvas_w;

		// All
		rect(0.03*canvas_w + panel_move_x, 0.105*canvas_h - 1.4*checkbox_play_height - 0.03*canvas_h + panel_move_y, 
		0.298*canvas_w, 1.4*checkbox_play_height + 0.315*canvas_h, 
		borders);

		stroke("black");
		fill("white");
		
		// L G theta//fill(250);		
		rect(0.066*canvas_w + panel_move_x, 0.105*canvas_h + panel_move_y, 
			0.225*canvas_w, 0.18*canvas_h, 
			borders);

		// Play
		var aux_width = 70;
		rect(0.066*canvas_w + (0.225*canvas_w - aux_width)/2 + panel_move_x, 0.09*canvas_h + panel_move_y, 
			aux_width, -1.4*checkbox_play_height, 
			borders);

		// Slider
		rect(0.05*canvas_w  + panel_move_x, 0.30*canvas_h + panel_move_y, 
			0.259*canvas_w, 0.075*canvas_h, 
			borders);

		// Variables
		fill(255, 239, 201);
		rect(0.5*canvas_w -  0.5*(120) - 15, 0.55*canvas_h, 
			150, - 1.4*radio_plot_height, 
			borders);
		

	pop();

	

	// Button Text
	textAlign(CENTER, CENTER);
	textSize(text_large_factor*canvas_w);	
	text("L", 0.12*canvas_w + panel_move_x, 0.15*canvas_h + panel_move_y);
	text("g", 0.12*canvas_w + panel_move_x, 0.20*canvas_h + panel_move_y);
	text("\u03b8Max", 0.12*canvas_w + panel_move_x, 0.25*canvas_h + panel_move_y);

	var move_x = 0.01*canvas_w;
	var move_y = 0.01*canvas_h;

	push();
		translate( 0.0*canvas_w, 0.07*canvas_h);
		textAlign(RIGHT, CENTER);
		textSize(text_default_factor*canvas_w);
		text("L = ", 0.45*canvas_w, 0.12*canvas_h);	
		text("g = ", 0.45*canvas_w, 0.16*canvas_h);
		text("\u03b8Max = ", 0.5*canvas_w, 0.20*canvas_h);
		text("T = ", 0.45*canvas_w, 0.24*canvas_h);

		textAlign(LEFT, CENTER);
		textSize(text_default_factor*canvas_w);
		text(long.toFixed(2) + " m", 0.45*canvas_w, 0.12*canvas_h);
		text(gravity.toFixed(2) + " m/s2", 0.45*canvas_w, 0.16*canvas_h);
		text(thetaMax_deg.toFixed(0) + "°" + " (" + (thetaMax_deg/180*3.1415).toFixed(2) + " rad)", 
			0.5*canvas_w, 0.20*canvas_h);
		text(period.toFixed(2) + "s", 0.45*canvas_w, 0.24*canvas_h);
		text("\u03B8 = " + theta_rad.toFixed(2) + " rad", 0.8*canvas_w, (0.125)*canvas_h);	
	pop();

	// Figure Text
	/*textAlign(RIGHT, CENTER);
	textSize(text_default_factor*canvas_w);
	text("L = ", 0.45*canvas_w, 0.12*canvas_h);	
	text("g = ", 0.45*canvas_w, 0.16*canvas_h);
	text("\u03b8Max = ", 0.5*canvas_w, 0.20*canvas_h);
	text("T = ", 0.45*canvas_w, 0.24*canvas_h);

	textAlign(LEFT, CENTER);
	textSize(text_default_factor*canvas_w);
	text(long.toFixed(2) + " m", 0.45*canvas_w, 0.12*canvas_h);
	text(gravity.toFixed(2) + " m/s2", 0.45*canvas_w, 0.16*canvas_h);
	text(thetaMax_deg.toFixed(0) + "°" + " (" + (thetaMax_deg/180*3.1415).toFixed(2) + " rad)", 
		0.5*canvas_w, 0.20*canvas_h);
	text(period.toFixed(2) + "s", 0.45*canvas_w, 0.24*canvas_h);*/

	// Other Text
	textAlign(LEFT, CENTER);
	textSize(text_default_factor*canvas_w);
	text("t = " + t.toFixed(2) + " s", 0.13*canvas_w + panel_move_x, 0.325*canvas_h + panel_move_y);
	
	/*text("Play", 0.86*canvas_w, 0.1*canvas_h + 16/2);
	text("Grid", 0.86*canvas_w, 0.15*canvas_h);*/

	textSize(text_default_factor*canvas_w);	
	


	draw_Oscillator();


	if (checkbox_time_evolve.checked()){
		iFrame += 1;
		slider_time.value(t*framerate_custom);
	}

	push();
		// Líneas verticales
		stroke("black");
		line(frame_origin_x, frame_origin_y, frame_origin_x, frame_origin_y - frame_h);
		line(	frame_origin_x + t_MAX*waveSpeed, frame_origin_y, 
					frame_origin_x + t_MAX*waveSpeed, frame_origin_y - frame_h);
	pop();

	strokeWeight(1);	
	draw_Gridlines();
	strokeWeight(1.5);
	draw_TimeAxis();
	
	if ( radio_plot.value() == 1 ){
		draw_yAxis_x();
		strokeWeight(3);
		drawTrayectory_x();
		strokeWeight(1);
	} else if ( radio_plot.value() == 2 ){
		draw_yAxis_v();
		strokeWeight(3);
		drawTrayectory_v();
		strokeWeight(1);
	} else if ( radio_plot.value() == 3 ){
		draw_yAxis_a();
		strokeWeight(3);
		drawTrayectory_a();
		strokeWeight(1);
	}	else if ( radio_plot.value() == 4 ){
		draw_yAxis_E();
		strokeWeight(3);
		drawTrayectory_E();
		strokeWeight(1);
	}

	

	// Variable Plot Frame
	push();
		var imgfactor = 0.25;
		image(img_upn, 
			0.86*canvas_w - canvas_w*imgfactor/2, 
			0.045*canvas_h - 0.5*canvas_w*imgfactor/329*153, 
			canvas_w*imgfactor, canvas_w*imgfactor/329*153);
	pop();



}

// ##############################################################################################
// ##############################################################################################
// ##############################################################################################
// ########################################  FUNCTIONS   ########################################


function mousePressed(){

}


// FUNCIONES para Periodo
	function f_period_increase(){
		if (long < 10){
			long = long + 1;
		}
		//iFrame = 0;
	}
	function f_period_decrease(){
		if (long > 4){
			long = long - 1;
		}
		//iFrame = 0;
	}
	function f_gravity_increase(){
		if (gravity == 9.81){
			gravity = gravity + 0.19;
		}
		else if (gravity == 9){
			gravity = gravity + 0.81;
		}
		else if (gravity < 20){
			gravity = gravity + 1;
		}
		//iFrame = 0;
	}
	function f_gravity_decrease(){
		if (gravity == 9.81){
			gravity = gravity - 0.81;
		}
		else if (gravity == 10){
			gravity = gravity - 0.19;
		}
		else if (gravity > 1){
			gravity = gravity - 1;
		}
		//iFrame = 0;
	}			

// FUNCIONES para Amplitud
	function f_amplitude_increase(){
		if (amplitude < amplitude_max){
			amplitude = amplitude + (3/15)*amplitude_max;
			amplitude_units = int( (amplitude/amplitude_max)*thetaLimit_deg );
			thetaMax_deg = (amplitude/amplitude_max)*thetaLimit_deg;
		}
	}

	function f_amplitude_decrease(){
		if (amplitude > amplitude_min){
			amplitude = amplitude - (3/15)*amplitude_max;
			amplitude_units = int( (amplitude/amplitude_max)*thetaLimit_deg );
			thetaMax_deg = (amplitude/amplitude_max)*thetaLimit_deg;
		}
	}

// Oscilador
function draw_Oscillator(){

	//long_factor
	var long_factor = 0.35*(long/10);

	var pendulum_vertex_x = 0.75*canvas_w;
	var pendulum_vertex_y = 0.12*canvas_h;

	push();
		stroke("black");
		strokeWeight(0.004*canvas_w);
		line(pendulum_vertex_x, pendulum_vertex_y,
			pendulum_vertex_x + long_factor*canvas_h*sin(theta_rad), 
			pendulum_vertex_y + long_factor*canvas_h*cos(theta_rad));
	pop();

	push();
		drawingContext.setLineDash([3, 5]);
		stroke("gray");
		line(pendulum_vertex_x, pendulum_vertex_y,
			pendulum_vertex_x, pendulum_vertex_y + 1.05*0.35*canvas_h);
		drawingContext.setLineDash([3, 0]);
	pop();

	push();
		fill(255, 184, 25);
		stroke("black");
		strokeWeight(0.004*canvas_w);
		circle( pendulum_vertex_x + long_factor*canvas_h*sin(theta_rad), 
			pendulum_vertex_y + long_factor*canvas_h*cos(theta_rad),
			0.04*canvas_h);
	pop();

	push();
		fill(50);
		rect(pendulum_vertex_x - 0.15*canvas_w, pendulum_vertex_y, 
			0.3*canvas_w, -0.025*canvas_h);
	pop();

	push();
	strokeWeight(0.003*canvas_w);
	stroke("gray");
	//stroke("black");
		if( theta_rad > 0){
			beginShape();
			for (var itheta = 0; itheta < theta_rad; itheta += 0.01){
			  curveVertex( pendulum_vertex_x + 0.1*canvas_h*sin(itheta), 
				pendulum_vertex_y + 0.1*canvas_h*cos(itheta) );
			}
			endShape();
		}
		else{
			beginShape();
			for (var itheta = 0; itheta > theta_rad; itheta -= 0.01){
			  curveVertex( pendulum_vertex_x + 0.1*canvas_h*sin(itheta), 
				pendulum_vertex_y + 0.1*canvas_h*cos(itheta) );
			}
			endShape();	
		}
		
	pop();

	

}

// Acción al mover el slider
function f_slider_time_input(){
	checkbox_time_evolve.checked(false);
	iFrame = slider_time.value();
}



// Gráfica x vs t
function drawTrayectory_x() {
	stroke('orange');
	//strokeWeight(2);
	noFill();
	// Las unidades de tAxis se encuentran en pixeles
	
	var tAxis_final;

	if ( t < t_limit ){
		tAxis_final = waveSpeed*t;
		beginShape();
		for (var tAxis = 0; tAxis < tAxis_final; tAxis += 0.5){
		  curveVertex( frame_origin_x + tAxis , 
		  	axis_zero_y - amplitude*cos(waveNumber* tAxis )  )
		}
		endShape();
	}else{
		tAxis_final = waveSpeed*t_limit;
		beginShape();
		for (var tAxis = 0; tAxis < tAxis_final; tAxis += 0.5){
		  curveVertex( frame_origin_x + tAxis , 
		  	axis_zero_y - amplitude*cos(waveNumber*(tAxis_final - tAxis) - omega*t) )
		}
		endShape();
	}
}

function drawTrayectory_v() {
	stroke('red');
	//strokeWeight(2);
	noFill();
	// Las unidades de tAxis se encuentran en pixeles
	
	var tAxis_final;

	if ( t < t_limit ){
		tAxis_final = waveSpeed*t;
		beginShape();
		for (var tAxis = 0; tAxis < tAxis_final; tAxis += 0.5){
		  curveVertex( frame_origin_x + tAxis , 
		  	axis_zero_y - -1*amplitude*sin(waveNumber* tAxis )  )
		}
		endShape();
	}else{
		tAxis_final = waveSpeed*t_limit;
		beginShape();
		for (var tAxis = 0; tAxis < tAxis_final; tAxis += 0.5){
		  curveVertex( frame_origin_x + tAxis , 
		  	axis_zero_y - 1*amplitude*sin(waveNumber*(tAxis_final - tAxis) - omega*t) )
		}
		endShape();
	}
}

function drawTrayectory_a() {
	stroke('blue');
	//strokeWeight(2);
	noFill();
	// Las unidades de tAxis se encuentran en pixeles
	
	var tAxis_final;

	if ( t < t_limit ){
		tAxis_final = waveSpeed*t;
		beginShape();
		for (var tAxis = 0; tAxis < tAxis_final; tAxis += 0.5){
		  curveVertex( frame_origin_x + tAxis , 
		  	axis_zero_y - 1*amplitude*cos(waveNumber* tAxis )  )
		}
		endShape();
	}else{
		tAxis_final = waveSpeed*t_limit;
		beginShape();
		for (var tAxis = 0; tAxis < tAxis_final; tAxis += 0.5){
		  curveVertex( frame_origin_x + tAxis , 
		  	axis_zero_y - 1*amplitude*cos(waveNumber*(tAxis_final - tAxis) - omega*t) )
		}
		endShape();
	}
}

function drawTrayectory_E() {
	
	//strokeWeight(2);
	noFill();
	// Las unidades de tAxis se encuentran en pixeles
	
	var tAxis_final;

	text()

	if ( t < t_limit ){
		tAxis_final = waveSpeed*t;
		stroke('blue');
		beginShape();		
		for (var tAxis = 0; tAxis < tAxis_final; tAxis += 0.5){
		  curveVertex( frame_origin_x + tAxis , 
		  	axis_zero_y - amplitude*Math.pow(sin(waveNumber* tAxis ),2)  )
		}
		endShape();
		stroke('red');
		beginShape();
		for (var tAxis = 0; tAxis < tAxis_final; tAxis += 0.5){
		  curveVertex( frame_origin_x + tAxis , 
		  	axis_zero_y - amplitude*Math.pow(cos(waveNumber* tAxis ),2)  )
		}
		endShape();		
	}else{
		tAxis_final = waveSpeed*t_limit;
		stroke('blue');
		beginShape();
		for (var tAxis = 0; tAxis < tAxis_final; tAxis += 0.5){
		  curveVertex( frame_origin_x + tAxis , 
		  	axis_zero_y - 1*amplitude*Math.pow(sin(waveNumber*(tAxis_final - tAxis) - omega*t),2) )
		}
		endShape();
		stroke('red');
		beginShape();
		for (var tAxis = 0; tAxis < tAxis_final; tAxis += 0.5){
		  curveVertex( frame_origin_x + tAxis , 
		  	axis_zero_y - 1*amplitude*Math.pow(cos(waveNumber*(tAxis_final - tAxis) - omega*t),2) )
		}
		endShape();
	}
}

// PLOTEAR EJE HORIZONTAL
function draw_TimeAxis() {	

	// Línea x = 0	
	//stroke('gray');
	noFill();	
	//strokeWeight(1.5);
	line(frame_origin_x, axis_zero_y, 
		frame_origin_x + t_MAX*waveSpeed , axis_zero_y);	

	// Líneas de eje temporal
	stroke('black');	
	line(frame_origin_x, frame_origin_y, 
		frame_origin_x + t_MAX*waveSpeed , frame_origin_y); // Línea inferior
	line(frame_origin_x, frame_origin_y - frame_h, 
		frame_origin_x + t_MAX*waveSpeed , frame_origin_y - frame_h); // Línea superior
	
	push();
		noStroke();
		fill("black");
		textAlign(CENTER, CENTER);
		textSize(text_default_factor*canvas_w);
		text("t (s)", frame_origin_x + frame_w/2 , frame_origin_y + 0.12*frame_h);
	pop();
	

	if (t <= t_limit) {
		noStroke();
		fill("black");
		// Los tiempos a plotear van de 0 a 12. i_time está en segundos.
		for (var i_time = 0; i_time <= t_MAX; i_time++){
			textAlign(CENTER, TOP);
			noStroke();
			// i_time*waveSpeed es el desplazamiento en píxeles de un tiempo a otro.
			text(i_time, 
				frame_origin_x + i_time*waveSpeed, frame_origin_y + canvas_w/100);
			stroke('black');
			line(	frame_origin_x + waveSpeed*i_time, frame_origin_y + (0.5/100)*canvas_h,
						frame_origin_x + waveSpeed*i_time, frame_origin_y - (0.5/100)*canvas_h);
		}
	}
	else{
		noStroke();
		fill("black");
		// Calculamos el tiempo inicial y final a plotear
		var i_time_ini = int (t - t_limit) + 1;
		var i_time_final = int (t - t_limit + t_MAX);
		// Ploteamos los tiempos
		for (var i_time = i_time_ini; i_time <= i_time_final; i_time++){
			textAlign(CENTER, TOP);
			noStroke();
			// Al agregar "-waveSpeed*(t-t_limit)" la onda se mueve hacia la izquierda
			text(i_time, 
				frame_origin_x + waveSpeed*i_time - waveSpeed*(t - t_limit), 
				frame_origin_y - 0 + canvas_w/100 );
			stroke('black');
			line(	frame_origin_x + waveSpeed*i_time - waveSpeed*(t - t_limit), 
							frame_origin_y + (0.5/100)*canvas_h,
						frame_origin_x + waveSpeed*i_time - waveSpeed*(t - t_limit), 
							frame_origin_y - (0.5/100)*canvas_h);
		}
	}
}


// PLOTEAR EJE VERTICAL
function draw_yAxis_x(){

	push();
		noStroke();
		textAlign(RIGHT, CENTER);
		text("-"+amplitude_units, frame_origin_x - canvas_w/100, axis_zero_y + amplitude );
		text("0", frame_origin_x - canvas_w/100, axis_zero_y );
		text("+"+amplitude_units, frame_origin_x - canvas_w/100, axis_zero_y - amplitude);
	pop();

	push();
		noStroke();		
		textAlign(CENTER, CENTER);
		translate( frame_origin_x - 0.17*frame_h, axis_zero_y);
		rotate( - 3.1415/2 );
		textSize(text_default_factor*canvas_w);
		text("x (cm)", 0, 0);
	pop();

	stroke('black');
	line(frame_origin_x - (0.5/100)*canvas_w, axis_zero_y + amplitude,
			 frame_origin_x + (0.5/100)*canvas_w, axis_zero_y + amplitude);
	line(frame_origin_x - (0.5/100)*canvas_w, axis_zero_y - amplitude,
			 frame_origin_x + (0.5/100)*canvas_w, axis_zero_y - amplitude);
	noStroke();

}

// PLOTEAR EJE VERTICAL
function draw_yAxis_v(){

	push();
		noStroke();
		textAlign(RIGHT, CENTER);
		text("-" + speed_cms.toFixed(0), frame_origin_x - canvas_w/100, axis_zero_y + amplitude );
		text("0", frame_origin_x - canvas_w/100, axis_zero_y );
		text("+" + speed_cms.toFixed(0), frame_origin_x - canvas_w/100, axis_zero_y - amplitude);
	pop();

	push();
		noStroke();		
		textAlign(CENTER, CENTER);
		translate( frame_origin_x - 0.17*frame_h, axis_zero_y);
		rotate( - 3.1415/2 );
		textSize(text_default_factor*canvas_w);
		text("v (cm/s)", 0, 0);
	pop();

	stroke('black');
	line(frame_origin_x - (0.5/100)*canvas_w, axis_zero_y + amplitude,
			 frame_origin_x + (0.5/100)*canvas_w, axis_zero_y + amplitude);
	line(frame_origin_x - (0.5/100)*canvas_w, axis_zero_y - amplitude,
			 frame_origin_x + (0.5/100)*canvas_w, axis_zero_y - amplitude);
	noStroke();

}

function draw_yAxis_a(){

	push();
		noStroke();
		textAlign(RIGHT, CENTER);
		text("-" + acc_cms2.toFixed(0), frame_origin_x - canvas_w/100, axis_zero_y + amplitude );
		text("0", frame_origin_x - canvas_w/100, axis_zero_y );
		text("+" + acc_cms2.toFixed(0), frame_origin_x - canvas_w/100, axis_zero_y - amplitude);
	pop();

	push();
		noStroke();		
		textAlign(CENTER, CENTER);
		translate( frame_origin_x - 0.17*frame_h, axis_zero_y);
		rotate( - 3.1415/2 );
		textSize(text_default_factor*canvas_w);
		text("a (cm/s  )", 0, 0);
		textSize(text_small_factor*canvas_w);
		text("2", 0.09*frame_h, -0.01*frame_h);
		textSize(text_default_factor*canvas_w);
	pop();

	stroke('black');
	line(frame_origin_x - (0.5/100)*canvas_w, axis_zero_y + amplitude,
			 frame_origin_x + (0.5/100)*canvas_w, axis_zero_y + amplitude);
	line(frame_origin_x - (0.5/100)*canvas_w, axis_zero_y - amplitude,
			 frame_origin_x + (0.5/100)*canvas_w, axis_zero_y - amplitude);
	noStroke();

}

function draw_yAxis_E(){

	push();
		noStroke();
		textAlign(RIGHT, CENTER);
		text("-" + (1000*e_J).toFixed(0), frame_origin_x - canvas_w/100, axis_zero_y + amplitude );
		text("0", frame_origin_x - canvas_w/100, axis_zero_y );
		text("+" + (1000*e_J).toFixed(0), frame_origin_x - canvas_w/100, axis_zero_y - amplitude);
	pop();

	push();
		noStroke();		
		textAlign(CENTER, CENTER);
		translate( frame_origin_x - 0.17*frame_h, axis_zero_y);
		rotate( - 3.1415/2 );
		textSize(text_default_factor*canvas_w);
		text("E (mJ)", 0, 0);
	pop();

	stroke('black');
	line(frame_origin_x - (0.5/100)*canvas_w, axis_zero_y + amplitude,
			 frame_origin_x + (0.5/100)*canvas_w, axis_zero_y + amplitude);
	line(frame_origin_x - (0.5/100)*canvas_w, axis_zero_y - amplitude,
			 frame_origin_x + (0.5/100)*canvas_w, axis_zero_y - amplitude);
	noStroke();

}


// PLOTEAR GRIDLINES
function draw_Gridlines() {	

	//	VERTICAL
	if (t <= t_limit) {		
		noStroke();
		fill("black");
		// Los tiempos a plotear van de 0 a 12. i_time está en segundos.
		for (var i_time = 0; i_time <= t_MAX; i_time++){
			if (i_time == t_MAX) continue;
			textAlign(CENTER, TOP);
			noStroke();
			// i_time*waveSpeed es el desplazamiento en píxeles de un tiempo a otro.
			stroke('gray');
			//drawingContext.setLineDash([3, 5]);
			line(	frame_origin_x + waveSpeed*i_time, frame_origin_y - frame_h,
						frame_origin_x + waveSpeed*i_time, frame_origin_y);
			//drawingContext.setLineDash([3, 0]);
			stroke('black');
		}
	}
	else{
		noStroke();
		fill("black");
		// Calculamos el tiempo inicial y final a plotear
		var i_time_ini = int (t - t_limit) + 1;
		var i_time_final = int (t - t_limit + t_MAX);
		// Ploteamos los tiempos
		for (var i_time = i_time_ini; i_time <= i_time_final; i_time++){
			//if ( t == t_limit && i_time == i_time_final) continue;
			textAlign(CENTER, TOP);
			noStroke();
			// Al agregar "-waveSpeed*(t-t_limit)" la onda se mueve hacia la izquierda
			stroke('gray');
			//drawingContext.setLineDash([3, 5]);
			line(	frame_origin_x + waveSpeed*i_time - waveSpeed*(t - t_limit), 
							frame_origin_y - frame_h,
						frame_origin_x + waveSpeed*i_time - waveSpeed*(t - t_limit), 
							frame_origin_y);
			//drawingContext.setLineDash([3, 0]);
			stroke('black');
		}
	}

	// HORIZONTAL
	stroke('gray');
	//drawingContext.setLineDash([3, 5]);
	for ( i = 1; i < 5; i++){
		line(frame_origin_x , axis_zero_y - i*0.5*(3/15)*frame_h,
			frame_origin_x + t_MAX*waveSpeed, axis_zero_y - i*0.5*(3/15)*frame_h);
	}
	for ( i = -5; i < 0; i++){
		line(frame_origin_x , axis_zero_y - i*0.5*(3/15)*frame_h,
			frame_origin_x + t_MAX*waveSpeed, axis_zero_y - i*0.5*(3/15)*frame_h);
	}
	//drawingContext.setLineDash([3, 0]);
	stroke('black');	
	
}



  /*button_amplitude_decrease = createButton("-");
  button_amplitude_decrease.parent("simple-sketch-holder");
  button_amplitude_decrease.position(0.125*canvas_w, 0.1*canvas_h);
  button_amplitude_decrease.style("width","25px");
  button_amplitude_decrease.mousePressed(f_amplitude_decrease);

  button_amplitude_increase = createButton("+");
  button_amplitude_increase.parent("simple-sketch-holder");
  button_amplitude_increase.style("width", "25px");
  button_amplitude_increase.position(0.175*canvas_w, 0.1*canvas_h);
  button_amplitude_increase.mousePressed(f_amplitude_increase);*/



  	/*

	// BOTONES PARA PERIODO

		push();
			stroke("orange");
			var square_center_factor = [0.2, 0.1];
			var button_text = "-";
			if (true 	&& mouseX > (square_center_factor[0]-0.5*button_w_factor)*canvas_w 
								&& mouseX < (square_center_factor[0]+0.5*button_w_factor)*canvas_w
								&& mouseY > (square_center_factor[1]-0.5*button_h_factor)*canvas_h
								&& mouseY < (square_center_factor[1]+0.5*button_h_factor)*canvas_h ){
				//fill(255, 150, 150);
				fill(40);
			}
			else{
				fill(0);
			}
			translate(square_center_factor[0]*canvas_w - 0.5*button_w_factor*canvas_w, 
								square_center_factor[1]*canvas_h - 0.5*button_h_factor*canvas_h);
			square(0, 0, button_w_factor*canvas_w);
			noStroke();
			fill(255);
			textAlign(CENTER, CENTER);
			textSize(text_default_factor*canvas_w);
			text(button_text, 0.5*button_w_factor*canvas_w, 0.5*button_w_factor*canvas_w);
		pop();

		push();
			stroke("orange");
			var square_center_factor = [0.25, 0.1];
			var button_text = "+";
			if (true 	&& mouseX > (square_center_factor[0]-0.5*button_w_factor)*canvas_w 
								&& mouseX < (square_center_factor[0]+0.5*button_w_factor)*canvas_w
								&& mouseY > (square_center_factor[1]-0.5*button_h_factor)*canvas_h
								&& mouseY < (square_center_factor[1]+0.5*button_h_factor)*canvas_h ){
				//fill(255, 150, 150);
				fill(40);
			}
			else{
				fill(0);
			}
			translate(square_center_factor[0]*canvas_w - 0.5*button_w_factor*canvas_w, 
								square_center_factor[1]*canvas_h - 0.5*button_h_factor*canvas_h);
			square(0, 0, button_w_factor*canvas_w);
			noStroke();
			fill(255);
			textAlign(CENTER, CENTER);
			textSize(text_default_factor*canvas_w);
			text(button_text, 0.5*button_w_factor*canvas_w, 0.5*button_w_factor*canvas_w);
		pop();

	// BOTONES PARA AMPLITUD

		push();
			stroke("orange");
			var square_center_factor = [0.2, 0.15];
			var button_text = "-";
			if (true 	&& mouseX > (square_center_factor[0]-0.5*button_w_factor)*canvas_w 
								&& mouseX < (square_center_factor[0]+0.5*button_w_factor)*canvas_w
								&& mouseY > (square_center_factor[1]-0.5*button_h_factor)*canvas_h
								&& mouseY < (square_center_factor[1]+0.5*button_h_factor)*canvas_h ){
				//fill(255, 150, 150);
				fill(40);
			}
			else{
				fill(0);
			}
			translate(square_center_factor[0]*canvas_w - 0.5*button_w_factor*canvas_w, 
								square_center_factor[1]*canvas_h - 0.5*button_h_factor*canvas_h);
			square(0, 0, button_w_factor*canvas_w);
			noStroke();
			fill(255);
			textAlign(CENTER, CENTER);
			textSize(text_default_factor*canvas_w);
			text(button_text, 0.5*button_w_factor*canvas_w, 0.5*button_w_factor*canvas_w);
		pop();

		push();
			stroke("orange");
			var square_center_factor = [0.25, 0.15];
			var button_text = "+";
			if (true 	&& mouseX > (square_center_factor[0]-0.5*button_w_factor)*canvas_w 
								&& mouseX < (square_center_factor[0]+0.5*button_w_factor)*canvas_w
								&& mouseY > (square_center_factor[1]-0.5*button_h_factor)*canvas_h
								&& mouseY < (square_center_factor[1]+0.5*button_h_factor)*canvas_h ){
				//fill(255, 150, 150);
				fill(40);
			}
			else{
				fill(0);
			}
			translate(square_center_factor[0]*canvas_w - 0.5*button_w_factor*canvas_w, 
								square_center_factor[1]*canvas_h - 0.5*button_h_factor*canvas_h);
			square(0, 0, button_w_factor*canvas_w);
			noStroke();
			fill(255);
			textAlign(CENTER, CENTER);
			textSize(text_default_factor*canvas_w);
			text(button_text, 0.5*button_w_factor*canvas_w, 0.5*button_w_factor*canvas_w);
		pop();

	*/


		/*// BOTONES PARA PERIODO
		var square_center_factor = [0.2, 0.1];
		var button_text = "-";
		if (true 	&& mouseX > (square_center_factor[0]-0.5*button_w_factor)*canvas_w 
							&& mouseX < (square_center_factor[0]+0.5*button_w_factor)*canvas_w
							&& mouseY > (square_center_factor[1]-0.5*button_h_factor)*canvas_h
							&& mouseY < (square_center_factor[1]+0.5*button_h_factor)*canvas_h){
			//fill(255, 150, 150);
			fill(40);
			fill("red");
			f_period_decrease();
		}

		var square_center_factor = [0.25, 0.1];
		var button_text = "+";
		if (true 	&& mouseX > (square_center_factor[0]-0.5*button_w_factor)*canvas_w 
							&& mouseX < (square_center_factor[0]+0.5*button_w_factor)*canvas_w
							&& mouseY > (square_center_factor[1]-0.5*button_h_factor)*canvas_h
							&& mouseY < (square_center_factor[1]+0.5*button_h_factor)*canvas_h){
			//fill(255, 150, 150);
			fill(40);
			fill("red");
			f_period_increase();
		}	

	// BOTONES PARA AMPLITUD
		var square_center_factor = [0.2, 0.15];
		var button_text = "-";
		if (true 	&& mouseX > (square_center_factor[0]-0.5*button_w_factor)*canvas_w 
							&& mouseX < (square_center_factor[0]+0.5*button_w_factor)*canvas_w
							&& mouseY > (square_center_factor[1]-0.5*button_h_factor)*canvas_h
							&& mouseY < (square_center_factor[1]+0.5*button_h_factor)*canvas_h){
			//fill(255, 150, 150);
			fill(40);
			fill("red");
			f_amplitude_decrease();
		}

		var square_center_factor = [0.25, 0.15];
		var button_text = "+";
		if (true 	&& mouseX > (square_center_factor[0]-0.5*button_w_factor)*canvas_w 
							&& mouseX < (square_center_factor[0]+0.5*button_w_factor)*canvas_w
							&& mouseY > (square_center_factor[1]-0.5*button_h_factor)*canvas_h
							&& mouseY < (square_center_factor[1]+0.5*button_h_factor)*canvas_h){
			//fill(255, 150, 150);
			fill(40);
			fill("red");
			f_amplitude_increase();
		}	*/
