let flakes = [];
let font;


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
  fill(255);
  for (let f of flakes) ellipse(f.x, f.y, f.size);
}