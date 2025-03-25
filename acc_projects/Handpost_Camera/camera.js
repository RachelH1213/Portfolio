let video;          // 摄像头视频
let poseNet;        // PoseNet 模型
let poses = [];     // PoseNet 返回的姿势数组

let classifier;     // Teachable Machine 分类器
let label = "none"; // 当前手势标签
let modelURL = "https://teachablemachine.withgoogle.com/models/VMC5Z__3A/"; // TM 模型文件夹路径

let pg;             // 用于绘图的离屏画布

// UI 控件
let rSlider, gSlider, bSlider;   // 颜色滑块
let brushSizeSlider;             // 笔刷大小滑块
let saveBtn, clearBtn;           // 保存 & 清空按钮

// ==============
// 预加载：加载 TM 模型
// ==============
function preload() {
  classifier = ml5.imageClassifier(modelURL + "model.json");
}

// ==============
// setup：初始化
// ==============
function setup() {
  createCanvas(windowWidth-100, windowHeight);

  // 创建摄像头输入
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 初始化 PoseNet
  poseNet = ml5.poseNet(video, () => {
    console.log("PoseNet ready");
  });
  poseNet.on("pose", (results) => {
    poses = results;
  });

  // 离屏画布：专门用来绘制涂鸦
  pg = createGraphics(width, height);

  // 开始分类视频（手势识别）
  classifyVideo();
   // 创建一个容器 div，用于放置所有 UI 控件
   let uiContainer = createDiv('');
   // 通过 style() 设置绝对定位，让它浮在画面上
   uiContainer.style('position', 'absolute');
   uiContainer.style('top', '10px');
   uiContainer.style('left', '10px');
   uiContainer.style('z-index', '9999');
   // 下面这几行是为了让它有个半透明背景、白字、一些内边距等美化
   uiContainer.style('background', 'rgba(0, 0, 0, 0.3)');
   uiContainer.style('color', '#fff');
   uiContainer.style('padding', '10px');
   uiContainer.style('border-radius', '5px');

  // ------------- 创建 UI 控件 -------------
  createP("Brush Color (R / G / B):").parent(uiContainer);
rSlider = createSlider(0, 255, 255).parent(uiContainer);
gSlider = createSlider(0, 255, 0).parent(uiContainer);
bSlider = createSlider(0, 255, 0).parent(uiContainer);
createP("Brush Size:").parent(uiContainer);
brushSizeSlider = createSlider(5, 100, 20).parent(uiContainer);

saveBtn = createButton("Save").parent(uiContainer);
saveBtn.mousePressed(saveDrawing);

clearBtn = createButton("Clear").parent(uiContainer);
clearBtn.mousePressed(clearCanvas);


}

// ==============
// draw：每帧循环
// ==============
function draw() {
  background(220);

  // （1）镜像显示摄像头
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();

  // （2）叠加我们在离屏画布上的绘图
  image(pg, 0, 0);

  // （3）获取右手坐标并根据手势绘图
  if (poses.length > 0) {
    let handPos = getMirroredRightHandPos();

    // 根据手势执行操作
    if (label === "open_hand") {
      spray(handPos.x, handPos.y);
    } else if (label === "closed_fist") {
      eraseArea(handPos.x, handPos.y);
    }

    // 画一个小圆点可视化手的位置（调试用）
    // fill(255, 0, 0);
    // noStroke();
    // ellipse(handPos.x, handPos.y, 10);
  }

  // （4）在画面上显示当前识别到的手势标签
  // fill(0);
  // textSize(20);
  // text("Gesture: " + label, 10, 30);
}

// ==============
// 分类视频（循环调用）
// ==============
function classifyVideo() {
  classifier.classify(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo(); // 继续下一帧识别
}

// ==============
// 获取右手坐标（镜像处理）
// ==============
function getMirroredRightHandPos() {
  let rightWrist = poses[0].pose.rightWrist;
  // PoseNet 给出的 (x,y) 是原始视频坐标
  // 我们要镜像到画布中，所以 x 变成 width - x
  let xMirrored = width - rightWrist.x;
  let yMirrored = rightWrist.y;
  return createVector(xMirrored, yMirrored);
}

// ==============
// 喷涂
// ==============
function spray(x, y) {
  let brushSize = brushSizeSlider.value();
  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();
  pg.noStroke();
  
  // 增加每帧生成的圆形数量，比如从 10 增加到 20 个
  let circlesCount = 200;
  // 使用更小的偏移范围，让圆形之间更紧密
  for (let i = 0; i < circlesCount; i++) {
    let offsetX = random(-brushSize/2, brushSize/2);
    let offsetY = random(-brushSize/2, brushSize/2);
    pg.fill(r, g, b, 150);
    // 保持圆形直径在一定范围内，保证连续感
    pg.ellipse(x + offsetX, y + offsetY, random(brushSize/4, brushSize/2));
  }
}

// ==============
// 擦除
// ==============
function eraseArea(x, y) {
  let brushSize = brushSizeSlider.value();
  pg.erase();
  pg.ellipse(x, y, brushSize);
  pg.noErase();
}

// ==============
// 保存画面
// ==============
function saveDrawing() {
  // saveCanvas() 会把当前主画布的内容导出为 PNG
  // 也就是摄像头画面 + 离屏画布叠加效果
  saveCanvas("myDrawing", "png");
}

// ==============
// 清空涂鸦
// ==============
function clearCanvas() {
  pg.clear();
} 