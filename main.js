// VARIABLES FOR AUDIO
let currSound, prevSound;
let mySound1, mySound2, mySound3, mySound4;
// VARIABLES FOR PLAYBACK
let playPauseButton;
let soundSelect;

// VARIABLES FOR MEYDA
let analyzer;
let featureValues = {};
// VARIABLES FOR SMOOTHING
let smoothedValues = {};
const smoothingFactor = 0.2;
// VARIABLES FOR VISUALIZER
let x = 80;
let space = 80;
let sizes = [80, 60, 70, 50, 90, 50];

// VARIABLES FOR SPEECH RECOGNIZER
let speechRec;
let currShape = "circle";
let backgroundColor = "white";

function preload() {
    mySound1 = loadSound("sounds/Ex2_sound1.wav");
    mySound2 = loadSound("sounds/Ex2_sound2.wav");
    mySound3 = loadSound("sounds/Ex2_sound3.wav");
    mySound4 = loadSound("sounds/Kalte_Ohren_(_Remix_).mp3");
}

function setup() {
    createCanvas(550, 600);
    currSound = mySound4;
    
    // CREATING BASE SETUP
    setupBase();
    // CREATING MEYDA ANALYZER
    setupMeyda();
    // CREATING VOICE RECOGNIZER
    setupSpeechRec();
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

    // stating chosen features
    text("Chosen features:\nRMS: Loudness - Size of shapes\nspectralCentroid: Brightness - Colour\nspectralKurtosis: Pitchiness - y-axis value", 20, 200);

    // stating available speech mods
    text("For available modifications by voice:\nColours: black, white, red, blue, green\n              purple, pink, yellow\nShapes: circle, square", 300, 200)
    
    push();
        // DRAWING FEATURES TO VISUALISE
        visualise();
    pop();
}