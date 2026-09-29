// gets a random rgba value
        export let getRandomColor = () => {
            let getByte = () => {
                return 55 + Math.round(Math.random() * 200);
            }
            return `rgba(${getByte()},${getByte()},${getByte()},.8)`;
        }

		// gets a random int value
        export let getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }