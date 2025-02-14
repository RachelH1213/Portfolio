let font;
let trails = [];
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
  background(0);
  trails.push({ x: mouseX, y: mouseY, alpha: 255 });

  for (let i = trails.length - 1; i >= 0; i--) {
    let t = trails[i];
    fill(255, t.alpha);
    text("ECHO", t.x, t.y);
    t.alpha -= 5;
    if (t.alpha < 0) trails.splice(i, 1);
  }
  
}