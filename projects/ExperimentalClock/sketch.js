let plantHeight = 0;
let dayDuration = 86400000; 
function setup() {
  createCanvas(600, 600);
  background(255);
}

function draw() {
  background(255);
  let currentTime = millis();
  
  
  plantHeight = map(currentTime % dayDuration, 0, dayDuration, 0, height);
  
  
  fill(34, 139, 34);
  rect(width / 2, height, 10, -plantHeight);
  
  
  let sunColor = map(plantHeight, 0, height, 255, 0);
  fill(sunColor, sunColor, 0);
  ellipse(width / 2, height - plantHeight - 50, 50, 50);
}