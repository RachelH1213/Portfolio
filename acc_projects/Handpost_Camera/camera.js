let video;

// -- Teachable Machine related --
let classifier;       // Classifier
let label = "Waiting..."; 
// Replace with your Teachable Machine model URL (ensure the URL ends with a slash)
let modelURL = "https://teachablemachine.withgoogle.com/models/vxqUbdTJu/";

// -- Handpose related --
let handpose;
let predictions = []; // Hand landmarks detection results

// -- Drawing related --
let graphics; 
let prevX, prevY; // Previous frame's index finger coordinates

// -- DOM Elements --
let colorPicker;      // Color picker for brush color in paint mode
let thicknessSlider;  // Slider to control brush thickness
let gestureP;         // Paragraph element to display current gesture

function preload() {
  // Preload Teachable Machine model
  classifier = ml5.imageClassifier(modelURL + "model.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create the video capture
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Create an independent graphics layer for drawing
  graphics = createGraphics(width, height);
  graphics.clear();

  // Start the classifier
  classifyVideo();

  // Initialize the Handpose model
  handpose = ml5.handpose(video, () => {
    console.log("Handpose model loaded!");
  });
  // When a hand is detected, store the results in predictions
  handpose.on("hand", (results) => {
    console.log("Hand detection results:", results);
    predictions = results;
  });

  // Create DOM buttons for saving and clearing the drawing
  let saveBtn = createButton("Save Drawing");
  saveBtn.position(20, 20);
  saveBtn.mousePressed(() => saveCanvas(graphics, "hand_draw", "png"));

  let clearBtn = createButton("Clear Drawing");
  clearBtn.position(140, 20);
  clearBtn.mousePressed(() => graphics.clear());

  // Create a color picker for the brush (used in paint mode)
  colorPicker = createColorPicker('#00FF00'); // default green
  colorPicker.position(20, 60);

  // Create a slider to control brush thickness (used in paint mode)
  thicknessSlider = createSlider(1, 20, 10); // min:1, max:20, default:10
  thicknessSlider.position(20, 100);

  // Create a paragraph DOM element to display the current gesture
  gestureP = createP("Current Gesture: " + label);
  gestureP.position(20, 140);
}

function classifyVideo() {
  if (classifier) {
    classifier.classify(video, gotResult);
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  if (results && results.length > 0) {
    label = results[0].label; // Get the highest confidence gesture label
    console.log("Classification result:", label, "Confidence:", results[0].confidence);
  } else {
    label = "No Gesture";
  }
  classifyVideo(); // Loop classification
}

function draw() {
  background(0);

  // Update the DOM paragraph with the current gesture
  gestureP.html("Current Gesture: " + label);

  // Display the video with a mirror effect
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();

  // Overlay the drawing graphics layer
  image(graphics, 0, 0);

  // Display the current classification label on canvas (optional)
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, 50);

  // Call different drawing functions based on the gesture label:
  if (label === "Open Hand") {
    // Paint mode: use a thick brush with user-selected color and thickness
    drawWithHandpose("paint");
  } else if (label === "One Finger") {
    // Fine line mode: use a thinner brush (fixed value)
    drawWithHandpose("fine");
  } else if (label === "Fist") {
    // Erase mode: erase content on the graphics layer
    eraseWithHandpose();
  } else {
    // For other gestures, reset previous coordinates to avoid unwanted lines
    prevX = undefined;
    prevY = undefined;
  }
}

/** Draw a line on the graphics layer using the index finger coordinates from Handpose.
 *  The "mode" parameter: "paint" for thick brush, "fine" for thin line.
 */
function drawWithHandpose(mode) {
  if (predictions.length > 0) {
    let hand = predictions[0];        // Use data from the first detected hand
    let landmarks = hand.landmarks;     // 21 hand landmarks
    // landmarks[8] is usually the index finger tip coordinate
    let x = landmarks[8][0];
    let y = landmarks[8][1];

    // Since the video is mirrored, reverse the x coordinate
    x = width - x;

    // Debug: print the drawing coordinates
    console.log("Drawing coordinates:", x, y);

    // If previous coordinates exist, draw a line
    if (prevX !== undefined && prevY !== undefined) {
      if (mode === "paint") {
        // Use the color picker value and slider value for thickness
        graphics.stroke(colorPicker.value());
        graphics.strokeWeight(thicknessSlider.value());
      } else if (mode === "fine") {
        // Fixed thin line settings for fine mode
        graphics.stroke(255, 0, 0);
        graphics.strokeWeight(4);
      }
      graphics.line(prevX, prevY, x, y);
    }
    // Update previous coordinates
    prevX = x;
    prevY = y;
  } else {
    prevX = undefined;
    prevY = undefined;
  }
}

/** Erase content on the graphics layer using the index finger coordinate from Handpose */
function eraseWithHandpose() {
  if (predictions.length > 0) {
    let hand = predictions[0];
    let landmarks = hand.landmarks;
    let x = landmarks[8][0];
    let y = landmarks[8][1];
    x = width - x; // Mirror conversion

    // Use p5.js erase mode to clear pixels on the graphics layer
    graphics.erase();
    graphics.noStroke();
    // Draw a circle to erase an area around the finger
    graphics.ellipse(x, y, 50, 50);
    graphics.noErase();

    // Do not update prevX/prevY during erasing to avoid unwanted lines
    prevX = undefined;
    prevY = undefined;
  }
}