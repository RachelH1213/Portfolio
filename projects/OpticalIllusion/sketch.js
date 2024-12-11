let angle = 0
let lineWeight = 2; 

function setup() {
  createCanvas(600, 600);
  noFill();
}

function draw() {
  background(0);
  translate(width / 2, height / 2); 
  
  for (let i = 0; i < 15; i++) {  
    let size = 50 + i * 40; 
    let colorValue = map(i, 0, 10, 0, 255); 
    let weight = map(sin(angle + i), -1, 1, 1, 5); 
    strokeWeight(weight); 
    stroke(0, 0, 255 - i * 25, 200); 

    push();
    rotate(angle * (i + 1) * 0.2);

        if (i % 2 == 0) {
       ellipse(0, 0, size, size); 
     } else {
       
      ellipse(0, 0, size, size); 
    }

    pop();
  }
  
  
  stroke(255, 0, 0, 100); 
  for (let j = 0; j < 10; j++) {
    push();
    rotate(angle + j * PI / 3); 
    line(0, 0, 150, 0); 
    pop();
  }
  
  
  angle += 0.05; 
}