let musicData = [15, 18, 13, 16, 4, 33, 20]; 
let maxChanges; 
let animValues = [];  
let hoverIndex = -1; 


function setup() {
  createCanvas(600, 600);
  maxChanges = max(musicData); 
  for (let i = 0; i < musicData.length; i++) {
    animValues[i] = 0; 
  }
  
  let button = createButton('Reset Animation');
  button.position(10, 10);
  button.mousePressed(resetAnimation); 
}

function draw() {
  
  
 background(0, 0, 0); 

  let barWidth = width / musicData.length;
  
  
  for (let i = 0; i < musicData.length; i++) {
    let finalBarHeight = map(musicData[i], 0, maxChanges, 0, height - 30);
    
    animValues[i] = lerp(animValues[i], finalBarHeight, 0.05); 

    
    if (mouseX > i * barWidth+5 && mouseX < (i + 1) * barWidth+5) {
      fill(255, 255, 0); 
      hoverIndex = i; 
    } else {
      fill(70 + i * 30, 150, 250); 
    }
  noStroke();
    rect(i * barWidth+5, height - animValues[i], barWidth - 10, animValues[i]); 
    
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(musicData[i], i * barWidth + barWidth / 2, height - animValues[i] - 10); 
  }
  
  
  if (hoverIndex > -1) {
    fill(255);
    textSize(18);
    text(`Music track changes on Day ${hoverIndex + 1}: ${musicData[hoverIndex]}`, width / 2, 50); 
  }
}

function resetAnimation() {
  for (let i = 0; i < musicData.length; i++) {
    animValues[i] = 0; 
  }
  
}