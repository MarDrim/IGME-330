/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!
import * as canvas from './canvas.js';
import * as audio from './audio.js';
import * as utils from './utils.js';

let micActive = false;

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/New Adventure Theme.mp3"
});

let init = () => {

    console.log("init called");

    // Setup audio
    audio.setupWebaudio();
    let canvasElement = document.querySelector("canvas");
    setupUI(canvasElement);
    canvas.setupCanvas(canvasElement, audio.analyserNode);

    loop();
}

let setupUI = (canvasElement) => {

    const micButton = document.querySelector("#micButton");
    const stopButton = document.querySelector("#stopButton");

    // start button
    micButton.onclick = async () => {
        try {
            await audio.startMicrophone();

            micActive = true;

            // Disable Start and enable Stop
            micButton.disabled = true;
            stopButton.disabled = false;

        } catch (error) {
            console.log("Microphone error:", error);
        }
    };

    // stop button 
    stopButton.onclick = () => {

        audio.stopMicrophone();

        micActive = false;

        // Enable Start and disable Stop
        micButton.disabled = false;
        stopButton.disabled = true;

        // Reset displays
        document.querySelector("#noteDisplay").textContent = "---";
        document.querySelector("#frequencyDisplay").textContent = "---";
    };

    const fsButton = document.querySelector("#fsButton");

    fsButton.onclick = () => {
        utils.goFullscreen(canvasElement);
    };
} // end setup ui

const drawParams = {
        note: "---"
};

let detectNote = (magnitudes, sampleRate, fftSize) => {

    let bestIndex = 1;

    // Find strongest frequency bin
    for (let i = 2; i < magnitudes.length; i++) {

        if (magnitudes[i] > magnitudes[bestIndex]) {
            bestIndex = i;
        }
    }

    // Check signal strength
    if (magnitudes[bestIndex] < -60) {
        return {
        note: "---",
        frequency: "---"
        };
    }

    // Calculate frequency
    let frequency = bestIndex * sampleRate / fftSize;
    frequency = frequency/2;

    // Calculate note number
    let noteNumber = Math.round(
        69 + 12 * Math.log2(frequency / 440)
    );

    let noteNames = [
        "C", "C#", "D", "D#", "E", "F",
        "F#", "G", "G#", "A", "A#", "B"
    ];

    let noteName = noteNames[noteNumber % 12];
    let octave = Math.floor(noteNumber / 12) - 1;

    return {
        note: noteName + octave,
        frequency: frequency
    };
}


let loop = () => {

    requestAnimationFrame(loop);

    let note = "---";
    let frequency = 0;

    if (micActive && audio.analyserNode) {

        let magnitudes = audio.getFrequencyData();

        // Get both the note and frequency from the detect note function
        let result = detectNote(
            magnitudes,
            audio.audioCtx.sampleRate,
            audio.analyserNode.fftSize
        );

        note = result.note;
        frequency = result.frequency;

        // Display note
        document.querySelector("#noteDisplay").textContent =
            note && note !== "" ? note : "---";
        // Display frequency rounded to nearest Hz
        document.querySelector("#frequencyDisplay").textContent =
            frequency > 0 ? Math.round(frequency) + " Hz" : "---";
    } 
    else {
        document.querySelector("#noteDisplay").textContent = "---";
        document.querySelector("#frequencyDisplay").textContent = "---";
    }

    let waveformData = null;

    if (micActive) {
        waveformData = audio.getWaveformData();
    }

    canvas.draw(note, micActive, waveformData);
}


export {init};