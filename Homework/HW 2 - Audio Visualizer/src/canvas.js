/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/
import * as utils from './utils.js';

let ctx,canvasWidth,canvasHeight,gradient,analyserNode,audioData;
let notes = [];
let previousNote="";

const noteNames = [
    "C3", "D3", "E3", "F3", "G3", "A3", "B3",
    "C4", "D4", "E4", "F4", "G4", "A4", "B4",
    "C5", "D5", "E5", "F5", "G5", "A5", "B5"
];

const noteColors = [
    "#7777ff",
    "#c75b5b",
    "#e6bd63",
    "#4d91b5",
    "#a77be8"
];

let setupCanvas = (canvasElement,analyserNodeRef) =>{
	// create drawing context
	ctx = canvasElement.getContext("2d");
	canvasWidth = canvasElement.width;
	canvasHeight = canvasElement.height;
	// create a gradient that runs top to bottom
    gradient = utils.getLinearGradient(
        ctx, 0, 0, 0, canvasHeight,
        [
            {percent: 0, color: "#26143d"},
            {percent: 0.25, color: "#426693"},
            {percent: 0.5, color: "#67b8d7"},
            {percent: 0.75, color: "#426693"},
            {percent: 1, color: "#26143d"}
        ]
    );	
    // keep a reference to the analyser node
	analyserNode = analyserNodeRef;
	// this is the array where the analyser data will be stored
	audioData = new Uint8Array(analyserNode.fftSize/2);
}

let createNote = (noteName) => {
    let note = {
        name: noteName,

        // Random position around the canvas
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,

        size: Math.random() * 25 + 25,
        color: noteColors[Math.floor(Math.random() * noteColors.length)],
        opacity: 1,

        // Upward movement speed
        speed: Math.random() * 1.5 + 1
    };

    notes.push(note);

    if (notes.length > 20) {
        notes.shift();
    }
}

// Draw the microphone waveform
let drawWaveform = (waveformData) => {

    if (!waveformData) return;

    ctx.save();

    // Waveform draw code
    ctx.beginPath();


    // make a rainbow gradient for the waveform
   let rainbow = ctx.createLinearGradient(0, 0, canvasWidth, 0);

    rainbow.addColorStop(0, "red");
    rainbow.addColorStop(0.2, "orange");
    rainbow.addColorStop(0.4, "yellow");
    rainbow.addColorStop(0.6, "lime");
    rainbow.addColorStop(0.8, "cyan");
    rainbow.addColorStop(1, "magenta");

    // Waveform appearance
    ctx.strokeStyle = rainbow;
    ctx.lineWidth = 3;

    // Rainbow glow
    ctx.shadowColor = "#52dcff";
    ctx.shadowBlur = 12;

    // Get canvas center vertically
    let centerY = canvasHeight / 2;

    // Draw waveform point
    for (let i = 0; i < waveformData.length; i++) {

        let x = i / waveformData.length * canvasWidth;

        let y = centerY + (waveformData[i] - 128) * 1.5;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.stroke();
    ctx.restore();
}

let draw = (currentNote, micActive, waveformData) => {

    // Draw background every frame
    ctx.fillStyle = "#101a29";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    if (micActive) {
        drawWaveform(waveformData);
    }

    // Don't draw anything if microphone is off
    if (!micActive) {
        notes = [];
        previousNote = "";
        return;
    }

    // Create a note when the detected note changes
    if (currentNote && currentNote !== "---") {

        if (currentNote !== previousNote) {
            createNote(currentNote);
            previousNote = currentNote;
        }
    }

    // Draw and animate floating notes
    for (let i = 0; i < notes.length; i++) {

        ctx.save();

        // Move to note position
        ctx.translate(notes[i].x, notes[i].y);

        // Note appearance
        ctx.globalAlpha = notes[i].opacity;
        ctx.fillStyle = notes[i].color;
        ctx.font = "bold " + notes[i].size + "px Arial";
        ctx.textAlign = "center";

        // Draw note
        ctx.fillText(notes[i].name, 0, 0);
        ctx.restore();

        // Move upward
        notes[i].y -= notes[i].speed;

        // Fade 
        notes[i].opacity -= 0.005;
    }

    // Remove invisible notes
    notes = notes.filter(note => note.opacity > 0);

    // Display current note in center
    if (currentNote && currentNote !== "---") {

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 90px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
            currentNote,
            canvasWidth / 2,
            canvasHeight / 2
        );
    }
}

export {setupCanvas,draw};