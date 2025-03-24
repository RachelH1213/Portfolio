let font;
let echoText;

function preload() {
  font = loadFont('echo.otf'); 
}

function setup() {
  createCanvas(600, 600);
  echoText = new EchoText('ECHO', 100, 300, 150);
}

function draw() {
  background(0);
  echoText.update();
  echoText.render();
}

class EchoText {
  constructor(text, x, y, size) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.size = size;
    this.layers = []; 
    this.points = font.textToPoints(this.text, this.x, this.y, this.size, { sampleFactor: 0.2 });

    for (let i = 0; i < 5; i++) {
      this.layers.push({ offset: i * 2, alpha: 255 - i * 50 });
    }
  }

  update() {
    
    for (let layer of this.layers) {
      layer.offset += 0.5;
      layer.alpha -= 1; 
    }

    
    if (this.layers.length > 0 && this.layers[this.layers.length - 1].alpha <= 0) {
      this.layers.shift(); 
      this.layers.push({ offset: 0, alpha: 255 }); 
    }
  }

  render() {
    noStroke();

    
    for (let layer of this.layers) {
      fill(0, 255, 0, layer.alpha); 
      for (let pt of this.points) {
        ellipse(pt.x + layer.offset, pt.y + layer.offset, 4, 4);
      }
    }

    
    fill(255);
    for (let pt of this.points) {
      ellipse(pt.x, pt.y, 5, 5);
    }
  }
}

function mousePressed() {
  echoText.layers = [];
  for (let i = 0; i < 5; i++) {
    echoText.layers.push({ offset: i * 2, alpha: 255 - i * 50 });
  }
}