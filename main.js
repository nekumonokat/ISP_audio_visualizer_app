let currSound, prevSound;
let mySound1, mySound2, mySound3;

let playPauseButton;
let soundSelect;

// VARIABLES FOR MEYDA
let analyzer;
let featureValues = {};

// VARIABLES FOR VISUALIZER
let x = 80;
let space = 80;
let sizes = [80, 60, 70, 50, 90, 50];

function preload() {
    mySound1 = loadSound("sounds/Ex2_sound1.wav");
    mySound2 = loadSound("sounds/Ex2_sound2.wav");
    mySound3 = loadSound("sounds/Ex2_sound3.wav");
}

function setup() {
    createCanvas(550, 600);
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

    // stating chosen features
    text("Chosen features:\nRMS: Loudness - Size of shapes\nspectralCentroid: Brightness - Colour\nspectralKurtosis: Pitchiness - y-axis value", 20, 200);

    push();
        if (featureValues) {
            // RMS (loudness): size of shapes
            let size = map(featureValues["rms"] || 0, 1, 50, 10, 100);

            // spectralCentroid (brightness): colour
            let spectralCentroid = featureValues["spectralCentroid"];
            // handling edge cases
            if (isNaN(spectralCentroid) || spectralCentroid === undefined) spectralCentroid = 100;
            let colour = map(spectralCentroid, 1, 50, 10, 255);

            // spectralKurtosis (pitchiness): y-axis value
            let spectralKurtosis = featureValues["spectralKurtosis"];
            // handling edge cases
            if (isNaN(spectralKurtosis) || spectralCentroid === undefined) spectralKurtosis = 25;
            let yPos = map(spectralKurtosis, 1, 50, -25, 25);

            for (let i = 0; i < 6; i++) {
                fill(125, 200, colour);
                ellipse(x + (space*0), 410+yPos, sizes[0]+size);
                fill(20, colour, 255);
                ellipse(x + (space*1)+5, 380+yPos, sizes[1]+size);
                fill(colour, 30, 400);
                ellipse(x + (space*2), 430+yPos, sizes[2]+size);
                fill(200, 190, colour);
                ellipse(x + (space*3)-5, 460+yPos, sizes[3]+size);
                fill(215, colour, 30);
                ellipse(x + (space*4), 420+yPos, sizes[4]+size);
                fill(100, 50, colour);
                ellipse(x + (space*5), 460+yPos, sizes[5]+size);
            }
        }
    pop();
}