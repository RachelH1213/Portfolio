let rachel;
let selfReflectionMeter = 0;
let scene = 0;
let items = [];
let collectEffects = [];
let bgChildhood, bgAdolescence, bgAdulthood, bgEnd;

function preload() {
  bgChildhood = loadImage("childhood.jpg");
  bgAdolescence = loadImage("adolescence.jpg");
  bgAdulthood = loadImage("adulthood.jpg");
  bgEnd = loadImage("end.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  rachel = {
    x: width / 2,
    y: height - 50,
    expression: "neutral",
    itemsCollected: []
  };
  regenerateItems();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 当窗口大小调整时重新设置画布大小
}

function draw() {

  if (scene < 3) {
    drawScene();
    drawCharacter(rachel);
    drawSelfReflectionMeter();
    drawItems();
    checkItemCollection();
    drawSceneText();
    drawCollectEffects();
  } else {
    drawEndScreen();
  }
}

function drawScene() {
  if (scene === 0) {
    if (bgChildhood) {
      image(bgChildhood, 0, 0, width, height);
    } else {
      background(173, 216, 230);
    }
  } else if (scene === 1) {
    if (bgAdolescence) {
      image(bgAdolescence, 0, 0, width, height);
    } else {
      background(255, 222, 173);
    }
  } else if (scene === 2) {
    if (bgAdulthood) {
      image(bgAdulthood, 0, 0, width, height);
    } else {
      background(192, 192, 192);
    }
  }
}

function drawCharacter(char) {
  if (scene === 0) fill(0, 100, 255);
  else if (scene === 1) fill(255, 100, 0);
  else if (scene === 2) fill(100, 255, 100);
  ellipse(char.x, char.y, 30, 30);
}

function regenerateItems() {
  items = [];
  let types = ["curiosity", "empathy", "achievement"];
  for (let j = 0; j < 10; j++) {
    items.push({
      x: random(width),
      y: random(height - 50),
      type: types[scene % 3]
    });
  }
}

function checkItemCollection() {
  for (let i = items.length - 1; i >= 0; i--) {
    let item = items[i];
    let d = dist(rachel.x, rachel.y, item.x, item.y);
    if (d < 20) {
      selfReflectionMeter += 10;
      collectEffects.push({ x: item.x, y: item.y, time: 30 });
      items.splice(i, 1);
      if (selfReflectionMeter >= 100) {
        if (scene < 2) {
          scene++;
          selfReflectionMeter = 0;
          regenerateItems();
        } else {
          scene = 3;
        }
      }
    }
  }
}

function drawCollectEffects() {
  for (let i = collectEffects.length - 1; i >= 0; i--) {
    let effect = collectEffects[i];
    fill(255, 255, 0, effect.time * 8);
    ellipse(effect.x, effect.y, 30 - effect.time, 30 - effect.time);
    effect.time--;
    if (effect.time <= 0) collectEffects.splice(i, 1);
  }
}

function drawItems() {
  for (let item of items) {
    if (item.type === "curiosity") {
      fill(255, 0, 0); // 红色表示 "curiosity"
    } else if (item.type === "empathy") {
      fill(0, 255, 255); // 青色表示 "empathy"
    } else {
      fill(255, 255, 0); // 黄色表示 "achievement"
    }
    ellipse(item.x, item.y, 15, 15); // 绘制物品
     noStroke();
  }
}


function drawSelfReflectionMeter() {
  let meterColor = color(0, 255, 0); // 绿色初始颜色
  if (selfReflectionMeter > 50) {
    meterColor = lerpColor(color(0, 255, 0), color(255, 0, 0), (selfReflectionMeter - 50) / 50); // 渐变为红色
  }
  fill(meterColor);
  noStroke();

  rect(10, 10, selfReflectionMeter, 10); // 绘制进度条
}

function drawSceneText() {
  fill(255);
  textSize(16);
  textAlign(LEFT);
  if (scene === 0) text("Childhood: Collect curiosity items!", 50, 50);
  else if (scene === 1) text("Adolescence: Collect empathy items!", 50, 50);
  else if (scene === 2) text("Young Adulthood: Collect independence items!", 50, 50);
}

function drawEndScreen() {
  if (bgEnd) {
    image(bgEnd, 0, 0, width, height);
  } else {
    background(0);
  }
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Congratulations, Rachel!", width / 2, height / 2 - 20);
  textSize(16);
  text("You have completed the journey of self-discovery!", width / 2, height / 2 + 20);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) rachel.x -= 10;
  else if (keyCode === RIGHT_ARROW) rachel.x += 10;
  else if (keyCode === UP_ARROW) rachel.y -= 10;
  else if (keyCode === DOWN_ARROW) rachel.y += 10;
}