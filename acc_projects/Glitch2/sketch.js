let font;
let points = [];

function preload() {
  font = loadFont('grotesk.otf');
}

function setup() {
  createCanvas(600, 600);
  let opts = { sampleFactor: 0.2 };
  points = font.textToPoints('GLITCH', 150, 300, 550, opts);
  textSize(150);
}


function draw() {
   background(0);
  noStroke();
  
  fill(255, 0, 0);
  text("GLITCH", 52, 302); 
  
  fill(0, 255, 0);
  text("GLITCH", 48, 298); 

  fill(0, 0, 255);
  text("GLITCH", 50, 300); 
  

}