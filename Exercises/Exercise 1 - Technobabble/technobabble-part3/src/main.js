"use strict";

    const words1 = ["Acute", "Aft", "Anti-matter", "Bipolar", "Cargo", "Command", "Communication", "Computer", "Deuterium", "Dorsal", "Emergency", "Engineering", "Environmental", "Flight", "Fore", "Guidance", "Heat", "Impulse", "Increased", "Inertial", "Infinite", "Ionizing", "Isolinear", "Lateral", "Linear", "Matter", "Medical", "Navigational", "Optical", "Optimal", "Optional", "Personal", "Personnel", "Phased", "Reduced", "Science", "Ship's", "Shuttlecraft", "Structural", "Subspace", "Transporter", "Ventral"];
	
	const words2 = ["Propulsion", "Dissipation", "Sensor", "Improbability", "Buffer", "Graviton", "Replicator", "Matter", "Anti-matter", "Organic", "Power", "Silicon", "Holographic", "Transient", "Integrity", "Plasma", "Fusion", "Control", "Access", "Auto", "Destruct", "Isolinear", "Transwarp", "Energy", "Medical", "Environmental", "Coil", "Impulse", "Warp", "Phaser", "Operating", "Photon", "Deflector", "Integrity", "Control", "Bridge", "Dampening", "Display", "Beam", "Quantum", "Baseline", "Input"];
	
	const words3 = ["Chamber", "Interface", "Coil", "Polymer", "Biosphere", "Platform", "Thruster", "Deflector", "Replicator", "Tricorder", "Operation", "Array", "Matrix", "Grid", "Sensor", "Mode", "Panel", "Storage", "Conduit", "Pod", "Hatch", "Regulator", "Display", "Inverter", "Spectrum", "Generator", "Cloud", "Field", "Terminal", "Module", "Procedure", "System", "Diagnostic", "Device", "Beam", "Probe", "Bank", "Tie-In", "Facility", "Bay", "Indicator", "Cell"];

	console.log(words1[0]);

    // Technobabble Part I

    // #1 Getting a random variable from the array
    function getRandomWord(array) {
        // Get random array + word
        return array[Math.floor(Math.random() * array.length)];
    };

    // Get a random word from array 1
    let word1 = getRandomWord(words1);

    // #2 String the words together to get a truly random word
    let randomWord = getRandomWord(words1) + getRandomWord(words2) + getRandomWord (words3);

    // #3 Update paragraph elements with code 
    // (#5 must use event handler since script is before html)
    // *note: you don't have to use an event handler, there are other methods

    document.addEventListener("DOMContentLoaded", ()=> {
        let textbox = document.querySelector('#output');
        textbox.innerHTML = randomWord;

    // #4 Get button to call code when clicked
        const button = document.querySelector('#myButton');
        button.onclick = function() {
            randomWord = getRandomWord(words1) + getRandomWord(words2) + getRandomWord (words3);
            textbox.innerHTML = randomWord;
        }
    });

    