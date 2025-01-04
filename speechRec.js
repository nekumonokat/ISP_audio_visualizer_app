// CREATING VOICE RECOGNIZER
function setupSpeechRec() {
    let lang = navigator.language || "en-US";
    // passing gotSpeech as callback
    speechRec = new p5.SpeechRec(lang, speechRecog);
    speechRec.continuous = true; // keeps listening
    speechRec.interimResults = false; // use only final result
    speechRec.start();
}

// VALIDATING SPEECH TO COLOUR / SHAPE
function speechRecog() {
    const validColours = [  "black", "white", "red", "blue", "green", "purple", "pink", "yellow"];
    const validShapes = ["circle", "square"];

    if (speechRec.resultValue) {
        const command = speechRec.resultString.toLowerCase();
        // console.log("Recognised command:", command);

        // HANDLES COLOUR CHANGE:
        validColours.forEach((color) => {
            if (command.includes(color)) {
                backgroundColor = color;
            }
        })

        // HANDLES SHAPE CHANGE:
        validShapes.forEach((shape) => {
            if (command.includes(shape)) {
                currShape = shape;
            }
        })
    }
}