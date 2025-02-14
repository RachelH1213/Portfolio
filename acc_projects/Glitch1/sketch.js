let font;
let points = [];
let glitchEffect = false;

function preload() {
  font = loadFont('grotesk.otf'); 
}

function setup() {
  createCanvas(600, 600);
  textSize(150);
  points = font.textToPoints('GLITCH', 50, 300, 150, { sampleFactor: 0.2 });
}

function draw() {
  background(0);
  noStroke();
  fill(0, 255, 0); 

  for (let pt of points) {
    let offsetX = glitchEffect ? random(-5, 5) : 0;
    let offsetY = glitchEffect ? random(-5, 5) : 0;
    ellipse(pt.x + offsetX, pt.y + offsetY, 4, 4);
  }
}

function mousePressed() {
  glitchEffect = true;
  setTimeout(() => {
    glitchEffect = false;
  }, 200);
}