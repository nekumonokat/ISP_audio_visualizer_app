// CREATING MEYDA ANALYZER
function setupMeyda() {
    if (typeof Meyda === "undefined") {
        console.log("Meyda could not be found");
    }

    else {
        console.log("Meyda was installed");
        analyzer = Meyda.createMeydaAnalyzer({
            "audioContext": getAudioContext(),
            "source": currSound,
            "bufferSize": 512,

            // we wanna use all available features to see
            "featureExtractors": [
                "rms",
                "zcr",
                "spectralCentroid",
                "spectralKurtosis",
                "chroma",
                "perceptualSharpness",
            ],
            
            "callback": features => {
                displayFeatures(features);
            }
        })
    }
}

// GENERATING CODE FOR MAPPING VALUES
function mapFeatureValues(value, min, max) {
    // calculate mean for the array feature
    if (Array.isArray(value)) { value = value.reduce((sum, val) => sum + val, 0) / value.length; }
    return map(value, min, max, 1, 50); // maps between 1-50px
}

// STORING FEATURES TO RESPECTIVE VALUES
function displayFeatures(features) {
    // CLEARING PREVIOUS VALUES
    featureValues = {};

    // SETTING RANGES
    const featureRanges = {
        rms: { min: 0, max: 0.5 },
        zcr: { min: 0, max: 255 }, // default zcr range for 512 buffer
        spectralCentroid: { min: 0, max: 50 }, // half of sampling rate
        spectralKurtosis: { min: 0, max: 255 }, // sound 3
        chroma: { min: 0, max: 1 },
        perceptualSharpness: { min: 0, max: 1 }, // sound 2?
    }

    // MAPPING FEATURES
    for (let feature in features) {
        if (features.hasOwnProperty(feature) && featureRanges[feature]) {
            // mapping each feature to the respective values
            const {min, max} = featureRanges[feature];
            featureValues[feature] = mapFeatureValues(features[feature], min, max);
        }
    }
}

// DRAWING EACH FEATURE OUT FOR ANALYSIS
function drawFeatures() {
    push();
        if (featureValues) {
            let x = 50; // starting y position
            for (let feature in featureValues) {
                let size = featureValues[feature];
                fill(100, 100, 255);
                ellipse(x, 80, size);
                fill(0);
                textSize(10);
                textAlign(CENTER, CENTER);
                text(`${feature}`, x, 130);
                text(`${size.toFixed(2)}`, x, 140);
                x += 85;
            }
        }
    pop();
}