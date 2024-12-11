function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(0);
    noStroke();
  
    let faceSize = map(mouseX, 0, width, 100, 200);
    let eyeSize = map(mouseY, 0, height, 10, 90);
    let mouthWidth = random(30, 80);
    let mouthHeight = random(10, 30);
  
    
    fill(255, 224, 189);
    rectMode(CENTER);
    rect(width / 2, height /2, faceSize, faceSize);
    if ((mouseX < width / 2) && (mouseY < height / 2)) {
      fill(255,0,0);
    };
  
   push();
    fill(255);
    stroke(4);
    ellipse(width / 2 - faceSize / 4, height / 2 - faceSize / 8, eyeSize, eyeSize);
     ellipse(width / 2 + faceSize / 4, height / 2 - faceSize / 8, eyeSize, eyeSize);
    pop();
    
    push();
    fill(3, 242, 255);
    ellipse(width / 2 - faceSize / 4, height / 2 - faceSize / 8, eyeSize/3, eyeSize/3);
    ellipse(width / 2 + faceSize / 4, height / 2 - faceSize / 8, eyeSize/3, eyeSize/3);
    pop();
  
    // 绘制嘴巴
    fill(255, 0, 0);
    ellipse(width / 2, height / 2 + faceSize / 4, mouthWidth, mouthHeight);
  }
  
  