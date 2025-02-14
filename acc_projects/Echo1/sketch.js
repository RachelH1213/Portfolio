let font;
let echoPoints = [];

function preload() {
  font = loadFont('echo.otf');
}

function setup() {
  createCanvas(600, 600);
  textSize(100);
  let basePoints = font.textToPoints('ECHO', 50, 300, 100, { sampleFactor: 0.2 });

  for (let i = 0; i < 5; i++) {
    let offset = i * 10;
    let alpha = map(i, 0, 5, 255, 50);
    let layer = basePoints.map(pt => ({
      x: pt.x + offset,
      y: pt.y + offset,
      alpha: alpha
    }));
    echoPoints.push(layer);
  }
}

function draw() {
  background(30);
  noStroke();

  for (let i = 0; i < echoPoints.length; i++) {
    fill(255, 255, 255, echoPoints[i][0].alpha);
    for (let pt of echoPoints[i]) {
      ellipse(pt.x, pt.y, 4, 4);
    }
  }
}

function mousePressed() {
  for (let i = 0; i < echoPoints.length; i++) {
    for (let pt of echoPoints[i]) {
      pt.x += random(-10, 10);
      pt.y += random(-10, 10);
    }
  }
}