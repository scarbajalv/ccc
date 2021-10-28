// FALTA:
// 1. QUE TODO SEA EN FUNCION A FRAME_W Y FRAME_H. Por algún motivo no funciona.
// 2. Que los tamaños de las letras sean múltiplos de canvas_w

let frame_center_x_factor = 0.5;
let frame_center_y_factor = 0.65;
let frame_w_factor = 0.75;
let frame_h_factor = 0.5;

// ******************************

let x;
let x_cm;
let y;

// step is the change in the "t" parameter in each Frame
// If deltaTime is the real elapsed time: deltaTime = FrameRate * tAxis_max_t * step
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
let period = 10;

let button_period_increase;
let button_period_decrease;
let button_amplitude_increase;
let button_amplitude_decrease;
let checkbox_gridlines;
let checkbox_time_evolve;


let canvas_w;
let canvas_h;
let amplitude;
let amplitude_max;
let amplitude_min;
let amplitude_cm;

let t_MAX = 12; // Máximo tiempo del eje horizontal
let t_limit = 10; // Máximo t a graficar para la función
let frame_w;

let slider_time;

var t2_ini = 0;

let nFrame = 0;
let currentTime = 0;

let frame_origin_x = 0;
let frame_origin_y = 0;

// ##################### SETUP #####################

function setup() {

	// Establecer dimensiones del canvas
	if(windowWidth > 655) canvas_w = 655;
	else canvas_w = windowWidth - 55;
	canvas_h = canvas_w;

	frame_origin_x = (frame_center_x_factor - 0.5*frame_w_factor)*canvas_w;
	frame_origin_y = (frame_center_y_factor + 0.5*frame_h_factor)*canvas_h;

	frame_w = canvas_w - 2*frame_origin_x;
	frame_h = frame_h_factor*canvas_w;
	axis_zero_y = frame_origin_y - 0.5*frame_h;

	amplitude_max = 0.5*frame_h;
	amplitude_min = (1/5)*(0.5*frame_h);
	amplitude = 0.5*frame_h;
	amplitude_cm = int((amplitude/amplitude_max)*100);

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
  checkbox_time_evolve.parent("simple-sketch-holder");
  checkbox_time_evolve.position(0.85*canvas_w, 0.05*canvas_h);
  //checkbox_time_evolve.changed(f_checkbox_time_evolve_changed);

  slider_time = createSlider(0, 10*framerate_custom, 
  	0, 0.1*framerate_custom);
  slider_time.input(f_slider_time_input);
  slider_time.parent("simple-sketch-holder");
  slider_time.position( (0.375)*canvas_w, (0.2)*canvas_h);
  slider_time.style('width', str(0.25*canvas_w)+'px');

  checkbox_gridlines = createCheckbox('Grid', true);
  checkbox_gridlines.parent("simple-sketch-holder");
  checkbox_gridlines.position(0.85*canvas_w, 0.085*canvas_h);


}

// ##################### DRAW #####################

function draw() {

	background(0);

	stroke('black');
	fill('white');
	
	//iFrame += 1;
	t = iFrame/framerate_custom;

	omega = 2*3.1415926/period;
	waveLength = (period/t_MAX)*frame_w; // px
	waveNumber = 2*3.1415926/waveLength;
	waveSpeed = omega/waveNumber; // px/s	

	x = amplitude*cos(omega*t);
	x_cm = amplitude_cm*cos(omega*t);

	textAlign(CENTER, CENTER);
	text("t = " + t.toFixed(2) + "s", canvas_w/2, (0.175)*canvas_h);
	text("T = " + period.toFixed(2) + "s", 0.075*canvas_w, 0.0675*canvas_h);
	text("A = " + amplitude_cm.toFixed(0) + "cm", 0.075*canvas_w, 0.1175*canvas_h);
	text("x = " + x_cm.toFixed(2) + " cm", (0.5)*canvas_w, (0.35)*canvas_h);

	draw_Oscillator();

	if (checkbox_time_evolve.checked()){
		iFrame += 1;
		slider_time.value(t*framerate_custom);
	}

	strokeWeight(1);
	if( checkbox_gridlines.checked() ){
		draw_Gridlines();
	}
	strokeWeight(1.5);
	draw_TimeAxis();
	draw_XAxis();
	strokeWeight(3);
	drawTrayectory_v3();
	strokeWeight(1);
	
	


}

// ##################### FUNCTIONS ####################

// Botones para Periodo
function f_period_increase(){
	if (period < 10){
		period = period + 1;
	}
	//iFrame = 0;
}
function f_period_decrease(){
	if (period > 1){
		period = period - 1;
	}
	//iFrame = 0;
}

// Botones para Amplitud
function f_amplitude_increase(){
	if (amplitude < amplitude_max){
		amplitude = amplitude + 0.2*amplitude_max;
		amplitude_cm = int( (amplitude/amplitude_max)*100 );
	}
}

function f_amplitude_decrease(){
	if (amplitude > amplitude_min){
		amplitude = amplitude - 0.2*amplitude_max;
		amplitude_cm = int( (amplitude/amplitude_max)*100 );
	}
}

// Oscilador
function draw_Oscillator(){

	var xpos_oscillator = (50/100)*canvas_w;
	var ypos_oscillator = (30/100)*canvas_h;	

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
	fill('yellow');
	circle(canvas_w/2 + x, ypos_oscillator, (3/100)*canvas_w);
	fill('white');
	stroke('white');

	noStroke();
	textAlign(CENTER, TOP);
	text( "-"+amplitude_cm , canvas_w/2 - (amplitude), ypos_oscillator + (1/100)*canvas_w);
	text( "+"+amplitude_cm , canvas_w/2 + (amplitude), ypos_oscillator + (1/100)*canvas_w);
	text( "x (cm)" , canvas_w/2 + (35/100)*canvas_w , ypos_oscillator);
	stroke("white");

	

}

// Acción al mover el slider
function f_slider_time_input(){
	checkbox_time_evolve.checked(false);
	iFrame = slider_time.value();
}



// Gráfica x vs t
function drawTrayectory_v3() {
	stroke('yellow');
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

// PLOTEAR EJE HORIZONTAL
function draw_TimeAxis() {	

	// Línea x = 0	
	//stroke('gray');
	noFill();	
	//strokeWeight(1.5);
	line(frame_origin_x, axis_zero_y, 
		frame_origin_x + t_MAX*waveSpeed , axis_zero_y);	

	// Líneas de eje temporal
	stroke('white');	
	line(frame_origin_x, frame_origin_y, 
		frame_origin_x + t_MAX*waveSpeed , frame_origin_y); // Línea inferior
	line(frame_origin_x, frame_origin_y - frame_h, 
		frame_origin_x + t_MAX*waveSpeed , frame_origin_y - frame_h); // Línea superior
	
	push();
		noStroke();
		fill("white");
		textAlign(CENTER, CENTER);
		textSize(16);
		text("t (s)", frame_origin_x + frame_w/2 , frame_origin_y + 0.1*frame_h);
	pop();
	

	if (t <= t_limit) {
		noStroke();
		fill("white");
		// Los tiempos a plotear van de 0 a 12. i_time está en segundos.
		for (var i_time = 0; i_time <= t_MAX; i_time++){
			textAlign(CENTER, TOP);
			noStroke();
			// i_time*waveSpeed es el desplazamiento en píxeles de un tiempo a otro.
			text(i_time, 
				frame_origin_x + i_time*waveSpeed, frame_origin_y + canvas_w/100);
			stroke('white');
			line(	frame_origin_x + waveSpeed*i_time, frame_origin_y + (0.5/100)*canvas_h,
						frame_origin_x + waveSpeed*i_time, frame_origin_y - (0.5/100)*canvas_h);
		}
	}
	else{
		noStroke();
		fill("white");
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
			stroke('white');
			line(	frame_origin_x + waveSpeed*i_time - waveSpeed*(t - t_limit), 
							frame_origin_y + (0.5/100)*canvas_h,
						frame_origin_x + waveSpeed*i_time - waveSpeed*(t - t_limit), 
							frame_origin_y - (0.5/100)*canvas_h);
		}
	}
}


// PLOTEAR EJE VERTICAL
function draw_XAxis(){

	// Línea vertical
	stroke("white");
	line(frame_origin_x, frame_origin_y, frame_origin_x, frame_origin_y - frame_h);
	line(	frame_origin_x + t_MAX*waveSpeed, frame_origin_y, 
				frame_origin_x + t_MAX*waveSpeed, frame_origin_y - frame_h);

	push();
		noStroke();
		textAlign(RIGHT, CENTER);
		text("-"+amplitude_cm, frame_origin_x - canvas_w/100, axis_zero_y + amplitude );
		text("0", frame_origin_x - canvas_w/100, axis_zero_y );
		text("+"+amplitude_cm, frame_origin_x - canvas_w/100, axis_zero_y - amplitude);
	pop();

	push();
		noStroke();		
		textAlign(CENTER, CENTER);
		translate( frame_origin_x - 0.1*frame_h, axis_zero_y);
		rotate( - 3.1415/2 );
		textSize(16);
		text("x (cm)", 0, 0);
	pop();

	stroke('white');
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
		fill("white");
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
			stroke('white');
		}
	}
	else{
		noStroke();
		fill("white");
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
			stroke('white');
		}
	}

	// HORIZONTAL
	stroke('gray');
	//drawingContext.setLineDash([3, 5]);
	for ( i = 1; i < 5; i++){
		line(frame_origin_x , axis_zero_y - i*0.5*(20/100)*frame_h,
			frame_origin_x + t_MAX*waveSpeed, axis_zero_y - i*0.5*(20/100)*frame_h);
	}
	for ( i = -5; i < 0; i++){
		line(frame_origin_x , axis_zero_y - i*0.5*(20/100)*frame_h,
			frame_origin_x + t_MAX*waveSpeed, axis_zero_y - i*0.5*(20/100)*frame_h);
	}
	//drawingContext.setLineDash([3, 0]);
	stroke('white');	
	
}