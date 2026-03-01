let classifier;
let label = "Click to start";
let bgColor;
let isListening = false;

let videos = [];
let activeVideo = null;
let lastLabel = "";

function preload() {
  videos[0] = createVideo("5a630f6e461248d580ccff3c00f51b98.MOV");
  videos[1] = createVideo("copy_5DABF3A3-B324-4CBB-9AFB-92F3D52EE575.MOV");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(40, 40, 45); // 默认深灰

  for (let v of videos) {
    v.hide();
    v.pause();
    v.volume(0);
  }

  const URL = window.location.origin + "/";

  classifier = speechCommands.create(
    "BROWSER_FFT",
    undefined,
    URL + "model.json",
    URL + "metadata.json"
  );

  classifier.ensureModelLoaded().then(() => {
    console.log("Model loaded");
  });
}

function mousePressed() {
  if (!isListening) {
    startListening();
    isListening = true;
    label = "Listening...";
  }
}

function startListening() {
  classifier.listen(result => {

    const scores = result.scores;
    const labels = classifier.wordLabels();

    let maxScore = Math.max(...scores);
    let index = scores.indexOf(maxScore);
    label = labels[index];

    changeBackground(label);

    if (label === "doggy" && lastLabel !== "doggy") {
      chooseRandomVideo();
    }

    lastLabel = label;

  }, {
    probabilityThreshold: 0.9
  });
}

function changeBackground(label) {

  if (label === "doggy") {
    bgColor = color(168, 140, 120); // 棕灰
  }
  else if (label === "petting") {
    bgColor = color(222, 182, 186); // 浅粉灰
  }
  else if (label === "voice") {
    bgColor = color(130, 150, 175); // 灰蓝
  }
  else if (label === "enviroment") {
    bgColor = color(150, 170, 150); // 灰绿
  }
  else if (label === "counting_game ") {
    bgColor = color(210, 190, 140); // 暖灰黄
  }
  else {
    bgColor = color(40, 40, 45); // 默认深灰
  }
}

function chooseRandomVideo() {
  for (let v of videos) {
    v.pause();
    v.time(0);
  }

  let randomIndex = floor(random(videos.length));
  activeVideo = videos[randomIndex];
  activeVideo.loop();
}

function draw() {
  background(bgColor);

  textAlign(CENTER, CENTER);
  textSize(40);
  fill(255);

  text(label, width / 2, height / 3);

  if (label === "doggy" && activeVideo !== null) {

    let txtWidth = textWidth(label);
    let videoWidth = txtWidth * 1.4;

    let ratio = activeVideo.width / activeVideo.height;
    let videoHeight = videoWidth / ratio;

    image(
      activeVideo,
      width / 2 - videoWidth / 2,
      height / 3 + 80,
      videoWidth,
      videoHeight
    );
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}