let flakes = [];
let font;
let alphaVal = 255;


function preload() {
  font = loadFont('snow.otf');
}
function setup() {
  createCanvas(600, 600);
  let points = font.textToPoints('SNOW', 50, 300, 120, { sampleFactor: 0.2 });
  for (let pt of points) {
    flakes.push({ x: pt.x, y: pt.y, size: random(2, 5) });
  }
}

function draw() {
  background(20);
  fill(255, alphaVal);
  textSize(120);
  text("SNOW", 50, 300);
  alphaVal -= 0.5;
}