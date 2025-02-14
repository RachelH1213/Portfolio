let font;
let snowflakes = [];

function preload() {
  font = loadFont('snow.otf');
}

function setup() {
  createCanvas(600, 600);
  let points = font.textToPoints('SNOW', 50, 300, 120, { sampleFactor: 0.2 });

  for (let pt of points) {
    snowflakes.push(new Snowflake(pt.x, pt.y));
  }
}

function draw() {
  background(20);
  for (let flake of snowflakes) {
    flake.update();
    flake.display();
  }
}

class Snowflake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(0.5, 2);
    this.size = random(2, 5);
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-50, 0);
    }
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

function mousePressed() {
  for (let flake of snowflakes) {
    flake.size = random(5, 10); 
  }
}