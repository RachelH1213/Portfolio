function setup() {
    createCanvas(400, 600);
    background(255);
  
    drawHead(200, 100, 100); 
    drawUpperBody(200, 250, 150);
    drawLowerBody(200, 450, 100);
  }
  
  function drawHead(x, y, size) {
    fill(200); 
    ellipse(x, y, size, size); 
    fill(0, 0, 255);
    ellipse(x - 20, y - 10, 20, 20); 
    ellipse(x + 20, y - 10, 20, 20); 
    fill(0);
    rect(x - 30, y + 10, 60, 10);
  }
  
  function drawUpperBody(x, y, size) {
    fill(150);
    rect(x - size/2, y, size, size); 
    fill(100);
    ellipse(x - size/2 - 20, y + 30, 30, 60); 
    ellipse(x + size/2 + 20, y + 30, 30, 60); 
    fill(100);
    rect(x - 20, y + 20, 40, 20); 
  }
  
  function drawLowerBody(x, y, size) {
    fill(180);
    rect(x - size/2, y, size, 60); 
    fill(255, 0, 0);
    ellipse(x, y + 80, size - 20, 60); 
    fill(200);
    ellipse(x, y + 130, size + 10, 30); 
  }