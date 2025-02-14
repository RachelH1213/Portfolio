let font;
let points = [];
let t = 0;
function preload() {
  font = loadFont('grotesk.otf');
}

function setup() {
  createCanvas(600, 600);
  let opts = { sampleFactor: 0.2 };
   points = font.textToPoints('GLITCH', 50, 300, 150, opts);
}

function draw() {
  background(0);
  fill(0, 255, 0);
 

  textSize(150);
  let xOffset = noise(t) * 100 - 5;
  text("GLITCH", 50 + xOffset, 300);
  t += 0.5;
  
}