// DRAWING FEATURES TO VISUALISE
function visualise() {

    // making rect to store visualiser to change background
    fill(backgroundColor);

    rect(0, 280, 550, 320);
    if (featureValues) {
        // RMS (loudness): size of shapes
        let size = map(featureValues["rms"] || 0, 1, 50, 10, 100);

        // spectralCentroid (brightness): colour
        let spectralCentroid = featureValues["spectralCentroid"];
        // handling edge cases
        if (isNaN(spectralCentroid) || spectralCentroid === undefined) spectralCentroid = 25;
        let colour = map(spectralCentroid, 1, 50, 10, 255);

        // spectralKurtosis (pitchiness): y-axis value
        let spectralKurtosis = featureValues["spectralKurtosis"];
        // handling edge cases
        if (isNaN(spectralKurtosis) || spectralCentroid === undefined) spectralKurtosis = 25;
        let yPos = map(spectralKurtosis, 1, 50, -25, 25);

        if (currShape == "circle") {
            for (let i = 0; i < 6; i++) {
                fill(125, 200, colour);
                ellipse(x+(space*0), 420+yPos, sizes[0]+size);
                fill(20, colour, 255);
                ellipse(x+(space*1)+5, 390+yPos, sizes[1]+size);
                fill(colour, 30, 400);
                ellipse(x+(space*2), 440+yPos, sizes[2]+size);
                fill(200, 190, colour);
                ellipse(x+(space*3)-5, 470+yPos, sizes[3]+size);
                fill(215, colour, 30);
                ellipse(x+(space*4), 430+yPos, sizes[4]+size);
                fill(100, 50, colour);
                ellipse(x+(space*5), 470+yPos, sizes[5]+size);
            }
        }
        
        else if (currShape == "square") {
            rectMode(CENTER, CENTER);
            for (let i = 0; i < 6; i++) {
                fill(125, 200, colour);
                rect(x+(space*0), 420+yPos, sizes[0]+size, sizes[0]+size, 5);
                fill(20, colour, 255);
                rect(x+(space*1)+5, 390+yPos, sizes[1]+size, sizes[1]+size, 5);
                fill(colour, 30, 400);
                rect(x+(space*2), 440+yPos, sizes[2]+size, sizes[2]+size, 5);
                fill(200, 190, colour);
                rect(x+(space*3)-5, 470+yPos, sizes[3]+size, sizes[3]+size, 5);
                fill(215, colour, 30);
                rect(x+(space*4), 430+yPos, sizes[4]+size, sizes[4]+size, 5);
                fill(100, 50, colour);
                rect(x+(space*5), 470+yPos, sizes[5]+size, sizes[5]+size, 5);
            }
        }

    }

}

