function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    console.log(mouseX,mouseY);
    noStroke();
    background(255,255,10);
    push();
    blendMode(SCREEN);
    rectMode(CENTER);
    fill(187, 191, 188);
    rect(width/2,120,250,150);
    rect(width/2,170,100,350);
    pop();
    
    
    
    push();
    //blendMode(SCREEN);
    rectMode(CENTER);
    fill(187, 191, 188);
    rect(width/2,120,150,50);
    rect(width/2,170,50,250);
    pop();
    
    push();
    fill(255);
    rect(215,57,5,42);
    rect(215,99,50,5);
    rect(135,99,50,5);
    rect(215,145,5,140);
    pop();
    
    push();
    
    fill(0,255,0);
    circle(width/2,120,50);
    pop();
    
    push();
    fill(255);
    circle(213,112,5);
    pop();
    
    
  
  
   
  }