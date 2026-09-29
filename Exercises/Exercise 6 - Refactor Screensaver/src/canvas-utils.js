        export let drawRectangle = (ctx,x,y,width,height,fillStyle="black",lineWidth=0,strokeStyle="black") => {
           	ctx.save();

			ctx.fillStyle = fillStyle;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.closePath();
            ctx.fill();

			ctx.restore();
		}

		// draws an arc
		export let drawArc = (ctx, x, y, radius, fillStyle="black", lineWidth=0, strokeStyle="white", startAngle = 0, endAngle = Math.PI*2) => {
			ctx.save();
			
			ctx.fillStyle = fillStyle;
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = strokeStyle;

			ctx.beginPath();
			ctx.arc(x, y, radius, startAngle, endAngle);
			ctx.fill();
			ctx.stroke();
	
			ctx.restore();
		}

		// draws a line
		export let drawLine = (ctx, x1, y1 ,x2, y2, strokeStyle = "black", lineWidth = 1,) => {
			ctx.save();
			
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = strokeStyle;

			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();

			ctx.restore();
		}