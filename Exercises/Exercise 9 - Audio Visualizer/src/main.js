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

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/New Adventure Theme.mp3"
});

function init(){
	console.log("init called");
	console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
	audio.setupWebaudio(DEFAULTS.sound1);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
	setupUI(canvasElement);
    canvas.setupCanvas(canvasElement, audio.analyserNode);
    loop();
}

function setupUI(canvasElement){
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fsButton");
  const playButton = document.querySelector("#playButton");

  playButton.onclick = e => {
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`);
  

  if (audio.audioCtx.state == "suspended") {
    audio.audioCtx.resume();
  }

  console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
  if (e.target.dataset.playing == "no") {
    audio.playCurrentSound();
    e.target.dataset.playing = "yes";
  }

  else {
    audio.pauseCurrentSound();
    e.target.dataset.playing = "no";
  }
}

    let volumeSlider = document.querySelector("#volumeSlider");
    let volumeLabel = document.querySelector("#volumeLabel");

    volumeSlider.oninput = e => {
        audio.setVolume(e.target.value);
        volumeLabel.innerHTML =  Math.round((e.target.value/2 * 100));
    };

    volumeSlider.dispatchEvent(new Event("input"));

    let trackSelect = document.querySelector("#trackSelect");

    trackSelect.onchange = e => {
        audio.loadSoundFile(e.target.value);
        if(playButton.dataset.playing == "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }
    }


  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  };

  // Gradient checkbox
    let gradientCB = document.querySelector("#gradientCB");

    gradientCB.onchange = () => {
        drawParams.showGradient = gradientCB.checked;
    };

    // Bars checkbox
    let barsCB = document.querySelector("#barsCB");

    barsCB.onchange = () => {
        drawParams.showBars = barsCB.checked;
    };

    // Circles checkbox
    let circlesCB = document.querySelector("#circlesCB");

    circlesCB.onchange = () => {
        drawParams.showCircles = circlesCB.checked;
    };

    // Noise Checkbox
    let noiseCB = document.querySelector("#noiseCB");
        noiseCB.onchange = () => {
        drawParams.showNoise = noiseCB.checked;
    };

    let invertCB = document.querySelector("#invertCB");
        invertCB.onchange = () => {
        drawParams.showInvert = invertCB.checked;
    }

    // Emboss checkbox
    let embossCB = document.querySelector("#embossCB");
        embossCB.onchange = () => {
        drawParams.showEmboss = embossCB.checked;
    };
	
} // end setupUI

const drawParams = {
        showGradient: false,
        showBars: false,
        showCircles: false,
        showNoise: false,
        showInvert: false,
        showEmboss: false
};

function loop(){
/* NOTE: This is temporary testing code that we will delete in Part II */
	requestAnimationFrame(loop);
    canvas.draw(drawParams);
}

export {init};