var song = "";
var gobeyond = "";
var happymemories = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var leftWristScore = 0;
var rightWristScore = 0;

function preload() {
    var gobeyond = loadSound("2020-08-10_-_Go_Beyond_-_David_Fesliyan.mp3");
    var happymemories = loadSound("Happy_Music-2018-09-18_-_Beautiful_Memories_-_David_Fesliyan.mp3");
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.position(440, 150);
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
    }
}

function draw() {
    image(video, 0, 0, 400, 400);
    stroke("blue")
    fill("blue")

    if (leftWristScore > rightWristScore) {
        circle(leftWristX, leftWristY, 50);
        InNumberleftWristY = Number(leftWristY);
        song.stop();
        song = gobeyond;
        song.play();
    }

    if (rightWristScore > leftWristScore) {
        circle(rightWristX, rightWristY, 50);
        InNumberrightWristY = Number(rightWristY);
        song.stop();
        song = happymemories;
        song.play();
    }

}


function play() {
    song.play();
}

function stop() {
    song.stop();
    song.setVolume(1);
    song.rate(1);
}