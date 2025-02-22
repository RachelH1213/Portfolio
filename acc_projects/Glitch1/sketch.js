let font;
let glitchText;

function preload() {
  font = loadFont('grotesk.otf');
}

function setup() {
  createCanvas(600, 600);
  glitchText = new GlitchText('GLITCH', 50, 300, 150);
}

function draw() {
  background(0);
  glitchText.render();  
}

class GlitchText {
    constructor(text, x, y, size) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.size = size;
        this.glitchEffect = false;
        this.points = font.textToPoints(this.text, this.x, this.y, this.size, { sampleFactor: 0.2 });
    }

    render() {
        noStroke();
        fill(0, 255, 0);

        for (let pt of this.points) {
            let offsetX = this.glitchEffect ? random(-5, 5) : 0;
            let offsetY = this.glitchEffect ? random(-5, 5) : 0;
            ellipse(pt.x + offsetX, pt.y + offsetY, 4, 4);
        }
    }

    triggerGlitch() {
        this.glitchEffect = true;
        setTimeout(() => {
            this.glitchEffect = false;
        }, 200);
    }
}

function mousePressed() {
  glitchText.triggerGlitch();  
}