let font;
let snowfall;

function preload() {
  font = loadFont('snow.otf');
}

function setup() {
  createCanvas(600, 600);
  snowfall = new SnowfallSketch('SNOW', 50, 300, 120);
}

function draw() {
  background(20);
  snowfall.update();
  snowfall.display();
}

class SnowfallSketch {
  constructor(text, x, y, size) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.size = size;
    this.snowflakes = [];

    let points = font.textToPoints(this.text, this.x, this.y, this.size, { sampleFactor: 0.2 });
    for (let pt of points) {
      this.snowflakes.push(new Snowflake(pt.x, pt.y));
    }
  }

  update() {
    for (let flake of this.snowflakes) {
      flake.update();
    }
  }

  display() {
    for (let flake of this.snowflakes) {
      flake.display();
    }
  }
}

class Snowflake {
  constructor(x, y) {
    this.originX = x;
    this.x = x;
    this.y = y;
    this.speed = random(0.5, 2);
    this.size = random(2, 5);
    this.angle = random(TWO_PI);
    this.amplitude = random(1, 3); 
  }

  update() {
    this.y += this.speed;
    this.x = this.originX + sin(this.angle) * this.amplitude; 
    this.angle += 0.05;

    if (this.y > height) {
      this.y = random(-50, 0);
      this.x = this.originX + sin(this.angle) * this.amplitude;
    }
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

function mousePressed() {
  for (let flake of snowfall.snowflakes) {
    flake.size = random(5, 10);
    flake.speed = random(1, 3); 
  }
}