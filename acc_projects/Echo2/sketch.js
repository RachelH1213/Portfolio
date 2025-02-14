let font;
let echoLayers = [];

function preload() {
  font = loadFont('echo.otf');
}

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 5; i++) {
    echoLayers.push({ x: 50 + i * 10, y: 300 + i * 10, alpha: 255 - i * 50 });
  }
}

function draw() {
  background(30);
 fill(255);
  textSize(100);
  let yOffset = sin(frameCount * 0.1) * 10;
  text("ECHO", 50, 300 + yOffset);
  
}