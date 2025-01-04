// CREATING BASE SETUP
function setupBase() {
    // CREATING PLAYPAUSE BUTTON
    playPauseButton = createButton("PLAY");
    playPauseButton.position(20, 20);
    playPauseButton.mousePressed(playPauseSound);
    playPauseButton.addClass("playButton");
    // CREATING SOUND SELECTION
    soundSelect = createSelect();
    soundSelect.option("sound 1");
    soundSelect.option("sound 2");
    soundSelect.option("sound 3");
    soundSelect.option("sound 4");
    soundSelect.selected("sound 4");
    soundSelect.position(100, 20);
    soundSelect.addClass("soundSelect");
    prevSound = "sound 4";
}

// PLAYING AND PAUSING AUDIO
function playPauseSound() {
    // STOP AUDIO AND ANALYZER
    if (currSound.isPlaying()) {
        currSound.pause();
        analyzer.stop();
        playPauseButton.html("PLAY");
    }
    // PLAY AUDIO AND ANALYZER
    else {
        currSound.play();
        analyzer.start();
        playPauseButton.html("PAUSE");
    }
}

// CHANGING AUDIO FROM SELECTION
function changeAudio(soundChoice) {
    if (soundChoice != prevSound) {
        // STOPPING AUDIO AND ANALYZER
        if (currSound.isPlaying()) {
            currSound.stop();
            analyzer.stop();
        }
        playPauseButton.html("PLAY");
        
        // CHANGING CURRSOUND FROM CHOSEN SOUND
        if (soundChoice == "sound 1") currSound = mySound1;
        else if (soundChoice == "sound 2") currSound = mySound2;
        else if (soundChoice == "sound 3") currSound = mySound3;
        else if (soundChoice == "sound 4") currSound = mySound4;

        prevSound = soundChoice;
        // changing analyzer source
        analyzer.setSource(currSound);
    }
}