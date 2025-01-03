let currSound, prevSound;
let mySound1, mySound2, mySound3;

let playPauseButton;
let soundSelect;

// VARIABLES FOR MEYDA
let analyzer;
let featureValues = {};

function preload() {
    mySound1 = loadSound("sounds/Ex2_sound1.wav");
    mySound2 = loadSound("sounds/Ex2_sound2.wav");
    mySound3 = loadSound("sounds/Ex2_sound3.wav");
}

function setup() {
    createCanvas(550, 500);
    currSound = mySound1;

    // CREATING BASE SETUP
    setupBase();
    // CREATING MEYDA ANALYZER
    setupMeyda();
}

function draw() {
    background(200);
    let soundChoice = soundSelect.value();
    // CHANGING AUDIO FROM SELECTION
    changeAudio(soundChoice);

    if (!currSound.isPlaying()) {
        playPauseButton.html("PLAY");
        analyzer.stop();
    }

    // drawing of each feature out for analysis
    drawFeatures();
}