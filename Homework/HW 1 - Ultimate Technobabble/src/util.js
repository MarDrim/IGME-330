    let randomElement = (array) => {
        // Get random array + word
        return array[Math.floor(Math.random() * array.length)];
    };

    export {randomElement};