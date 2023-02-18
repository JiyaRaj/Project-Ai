music_1 = "";
music_2 = "";

leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_score=0;
rightWrist_score=0;
song1_status=false;
song2_status=false;

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, model_ready);
    poseNet.on("pose", got_results);
}

function draw() {
    image(video, 0, 0, 500, 400);
    stroke("red");
    fill("red");
    song1_status=music_1.isPlaying();
    if(leftWrist_score>0.2){
        circle(leftWrist_x,leftWrist_y, 30);
        music_2.stop();
        if(song1_status==false){
            music_1.play();
            document.getElementById("song_name").innerHTML="Harry Potter";
        }
    }
    
    song2_status=music_2.isPlaying();
    if(rightWrist_score>0.2){
        circle(rightWrist_x,rightWrist_y, 30);
        music_1.stop();
        if(song2_status==false){
            music_2.play();
            document.getElementById("song_name").innerHTML="Peter Pan";
        }
    }
}

function preload() {
    music_1 = loadSound("music.mp3");
    music_2 = loadSound("music2.mp3");
}


function play() {
    
}

function model_ready() {
    console.log("Success");
}

function got_results(results) {

    if (results.length > 0) {
        console.log(results);
        leftWrist_x = results[0].pose.leftWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        leftWrist_y = results[0].pose.leftWrist.y;
        rightWrist_x = results[0].pose.rightWrist.x;
        leftWrist_score = results[0].pose.keypoints[9].score;
        rightWrist_score = results[0].pose.keypoints[10].score;
        console.log(leftWrist_x);
    }


}



