    let words1 = [];
	
	let words2 = [];
	
	let words3 = [];

    // XHR
    let loadBabble = () => {
        const url = "data/babble-data.json";
        const xhr = new XMLHttpRequest();
        xhr.onload = (e) => {
            babbleLoaded(e);
        };
        xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
        xhr.open("GET", url);
        xhr.send();
    }

    // Getting a random variable from the array
    import {randomElement} from "./util.js"


    let babbleLoaded = (e) => {
        let data = JSON.parse(e.target.responseText)

        // initialize words
        words1 = data.words1;
        words2 = data.words2;
        words3 = data.words3;

        console.log(data);
        console.log(data.words1);
        console.log(data.words2);
        console.log(data.words3);
        
        //initialize buttons
        const button = document.querySelector('#my-button');
        const moreBabble = document.querySelector('#more-babble');

        button.onclick = () => generateTechno(1);
        moreBabble.onclick = () => generateTechno(5);

        // display initial babble
        let randomWord = randomElement(words1) + randomElement(words2) + randomElement (words3);
        
        babbleInit(randomWord);
    }
    // String the words together to get a truly random word

    // Update paragraph elements with code 
    // (must use event handler since script is before html)
    // *note: you don't have to use an event handler, there are other methods


    let babbleInit = (randomWord) => {
        let textbox = document.querySelector('#output');
        textbox.innerHTML = randomWord;
    };

    const generateTechno = (num) => {
            let textbox = document.querySelector('#output');
            textbox.innerHTML = "";

            for (let i = 0; i < num; i++) {
                let randomWord = randomElement(words1) + randomElement(words2) + randomElement(words3);
                textbox.innerHTML = `${textbox.innerHTML} <br> ${randomWord}`;
            }
    }

    loadBabble();
    