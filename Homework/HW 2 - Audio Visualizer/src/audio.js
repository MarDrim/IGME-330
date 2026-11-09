
// WebAudio context
let audioCtx;

// WebAudio nodes
let sourceNode, analyserNode, stream;

// Default settings
const DEFAULTS = Object.freeze({
    fftSize: 2048
});

// Array to hold frequency data
let audioData = new Float32Array(DEFAULTS.fftSize / 2);

// Array to hold waveform data
let waveformData = new Uint8Array(DEFAULTS.fftSize);

// Setup WebAudio
let setupWebaudio = () => {

    const AudioContext = window.AudioContext || window.webkitAudioContext;

    audioCtx = new AudioContext();

    // Create analyser
    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = DEFAULTS.fftSize;

    // Create array for frequency data
    audioData = new Float32Array(analyserNode.frequencyBinCount);
}


// Start microphone
async function startMicrophone() {

    // Resume audio context if suspended
    if (audioCtx.state === "suspended") {
        await audioCtx.resume();
    }

    // Request microphone access
    stream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });

    // Connect microphone to analyser
    sourceNode = audioCtx.createMediaStreamSource(stream);
    sourceNode.connect(analyserNode);
}

// Stop button for microphone
let stopMicrophone = () => {

    if (stream) {
        // Stop the microphone
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }

     // Disconnect microphone source
    if (sourceNode) {
        sourceNode.disconnect();
        sourceNode = null;
    }
}

// Get frequency data
let getFrequencyData = () => {
    analyserNode.getFloatFrequencyData(audioData);
    return audioData;
}

// Get waveform data
let getWaveformData = () => {
    analyserNode.getByteTimeDomainData(waveformData);
    return waveformData;
}

export {
    audioCtx,
    analyserNode,
    audioData,
    setupWebaudio,
    startMicrophone,
    getFrequencyData,
    stopMicrophone,
    getWaveformData
};