// #0 - in this class we will always use ECMAScript 5's "strict" mode
		// See what 'use strict' does here:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
		"use strict";

        let ctx;
		let arcEnabled;
		let rectEnabled;
		let lineEnabled;

		let canvas;

		let playButton;
		let pauseButton;
		let clearButton;

		let isPlaying = true;
	
        import { getRandomColor, getRandomInt } from "./utils.js";
        import { drawRectangle, drawArc, drawLine } from "./canvas-utils.js";

		let init = () => {
			console.log("page loaded!");
			// #2 Now that the page has loaded, start drawing!
			
			// A - `canvas` variable points at <canvas> tag
			canvas = document.querySelector("canvas");
			
			arcEnabled = document.querySelector("#arc");
			rectEnabled = document.querySelector("#rect");
			lineEnabled = document.querySelector("#line");

			playButton = document.querySelector("#play");
			pauseButton = document.querySelector("#pause");
			clearButton = document.querySelector("#clear");
			// B - the `ctx` variable points at a "2D drawing context"
			ctx = canvas.getContext("2d");
			
			// C - all fill operations are now in red
			ctx.fillStyle = "red"; 
			
			// D - fill a rectangle with the current fill color
			ctx.fillRect(20,20,600,440); 


			// Blue Circle
			ctx.fillStyle = "cyan";
			ctx.beginPath();
			ctx.arc(200, 100, 50, 0, Math.PI * 2, false);
			ctx.closePath();
			ctx.fill();

			// Yellow Circle
			ctx.fillStyle = "yellow";
			ctx.beginPath();
			ctx.arc(400, 300, 80, 0, Math.PI * 2, false);
			ctx.closePath();
			ctx.fill();

            // Lines
			ctx.strokeStyle = "white";
			ctx.beginPath();
			ctx.moveTo(20, 200);
			ctx.lineTo(620, 200);
			ctx.lineWidth = 20;
			ctx.stroke();


			setupUI();

			// Update
            update();
		}

        // #1 call the `init` function after the pages loads
		window.onload = init;

        let update = () => {
            requestAnimationFrame(update);

			// Check if playing
			if (!isPlaying) return;

			// Check if checkbox enabled, if so draw
            if (rectEnabled.checked) drawRandomRect(ctx);
			if (arcEnabled.checked) drawRandomArc(ctx);
			if (lineEnabled.checked)drawRandomLine(ctx);

        }

		// Draws random rects
		let drawRandomRect = (ctx) => {
			let x = getRandomInt(0, 480);
			let y = getRandomInt(0, 480);
			let width = getRandomInt(10, 200);
			let height = getRandomInt(10, 640);

			drawRectangle(ctx, x, y, width, height, `${getRandomColor()}`);
        }

		// Draws random arcs
		let drawRandomArc = (ctx) => {
			let x = getRandomInt(0, 480);
			let y = getRandomInt(0, 680);
			let radius = getRandomInt(0, 90);

			drawArc(ctx, x, y, radius, `${getRandomColor()}`)
		}
		
		// Draws random lines
		let drawRandomLine = (ctx) => {
			let x1 = getRandomInt(0, 600);
			let y1 = getRandomInt(0, 440);
			let x2 = getRandomInt(0, 600);
			let y2 = getRandomInt(0, 440);

			drawLine(ctx, x1, y1, x2, y2, `${getRandomColor()}`);
		}

		// Helper functions
		
		// button handler
		let setupUI = () => {
			pauseButton.onclick = () => {
				isPlaying = false;
			}

			playButton.onclick = () => {
				isPlaying = true;
			}

			clearButton.onclick = () => {
				ctx.clearRect(0, 0, 640, 480);
			}

			canvas.onclick = canvasClicked;
		}

		// tells you if canvas was clicked
		let canvasClicked = (e) => {
			let rect = e.target.getBoundingClientRect();
			let mouseX = e.clientX - rect.x;
			let mouseY = e.clientY - rect.y;
			console.log(mouseX,mouseY);

			for (let i = 0; i < 10; i++) {
				let x = getRandomInt(-100, 100) + mouseX;
				let y = getRandomInt(-100, 100) + mouseY;
				let radius = getRandomInt(20, 50);
				let color = getRandomColor();
				drawArc(ctx, x, y, radius, color);
			}
		}

		// draws a rectangle
		