let video;
let poseNet;
let pose;
let videoWidth;
let videoHeight;

let oscArr = [];
let freq = [];
let amp;
let delay =[];
let isPlaying;

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);
	video = createCapture(VIDEO);
	video.hide();
	poseNet = ml5.poseNet(video);
	poseNet.on('pose', getPoses);
	videoWidth = width;
	videoHeight = width * (video.height/video.width);
	for(let i=0; i<1; i++){
		oscArr.push(new p5.Oscillator('sine'));
		freq.push(0);
		//delay.push(new p5.Delay());
	}
}

function draw(){

	translate(width, 0);
  	scale(-1, 1);
	image(video, 0, 0, videoWidth, videoHeight);
	if(pose && pose.score>0.44){
		let leftWristX = pose.leftWrist.x * (videoWidth/video.width);
		let leftWristY = pose.leftWrist.y * (videoHeight/video.height);
		let rightWristX = pose.rightWrist.x * (videoWidth/video.width);
		let rightWristY = pose.rightWrist.y * (videoHeight/video.height);
		fill(255,0,0);
		ellipse(leftWristX, leftWristY, 20, 20);
		ellipse(rightWristX, rightWristY, 20, 20);	
		freq[0] = (map(leftWristX, 0, height, 262, 294));
		amp = (map(leftWristY, height, 0, 0, 1));
	}
	else{
		amp = 0;
	}
	translate(width, 0);
  	scale(-1, 1);
	fill(0);
	rect(0,height-100,width,100);
	fill(255,255,255);
	textSize(42);
	textAlign(CENTER);
	text('Click Mouse To Start Music', width/2, (height-50));
	if (isPlaying) {
		for(let i=0; i<oscArr.length; i++){
			// smooth the transitions by 0.1 seconds
			oscArr[i].freq(freq[i], 0.2);
			//osc2.freq(freq2, 0.1);
			oscArr[i].amp(amp, 0.2);
			// osc2.amp(amp, 0.1);
		}
  }
}
function getPoses(poses){
	if(poses.length > 0){
		pose = poses[0].pose;
	}
}

function mousePressed(){
	startMusic();
}

function startMusic(){
	for(let i=0; i<oscArr.length; i++){
		//delay[i].process(oscArr[i], (i*0.62), (i*0.7), 300);
 		oscArr[i].start();
	}
  	isPlaying = true;
}