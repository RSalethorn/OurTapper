import React from "react";
import { useRef, useEffect } from "react";

function VibrationCurveViewer({ a = 0.5, h = 2, k = 3, width = 400, height = 400, tapDuration }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        //Clear canvas
        ctx.clearRect(0, 0, width, height);

        const graphWidth = width * 0.9;
        const graphHeight = height * 0.9;

        const xLabelHeight = height * 0.1;
        const yLabelWidth = height * 0.1;

        // Draw the axes
        ctx.strokeStyle = "#1c1b1a";
        ctx.lineWidth = 2
        ctx.beginPath();
        ctx.moveTo(yLabelWidth, graphHeight);
        ctx.lineTo(yLabelWidth, 0); // x-axis
        ctx.moveTo(yLabelWidth, graphHeight);
        ctx.lineTo(width, graphHeight); // y-axis
        ctx.stroke()

        const labelTextHeight = 10;
        ctx.font = '${labelTextHeight}px serif';

        //Loops through intensity labels
        for (let i = 0; i <= 100; i+=5) {
            const labelY = graphHeight - ((graphHeight/100) * i);

            let markerLength;
            if (i % 10 == 0) {
                ctx.lineWidth = 3;
                ctx.fillText(i, 15, labelY + (labelTextHeight / 2));
                ctx.lineWidth = 2;
                markerLength = 7;
            } else {
                ctx.lineWidth = 1;
                markerLength = 4;
            }
            ctx.beginPath();
            ctx.moveTo(yLabelWidth-markerLength, labelY)
            ctx.lineTo(yLabelWidth, labelY)
            ctx.stroke()    
        }

        //Loops through time/duration labels
        for (let i = 0; i <= tapDuration; i+=0.25) {
            const labelX = ((graphWidth/tapDuration) * i) + yLabelWidth;

            let markerLength;
            if (i % 0.5 == 0) {
                ctx.lineWidth = 3;
                //ctx.fillText(i, 15, labelY + (labelTextHeight / 2));
                ctx.fillText(i, labelX, height-15);
                ctx.lineWidth = 2;
                markerLength = 7;
            } else {
                ctx.lineWidth = 1;
                markerLength = 4;
            }
            ctx.beginPath();
            ctx.moveTo(labelX, graphHeight+markerLength)
            ctx.lineTo(labelX, graphHeight)
            ctx.stroke()  
        }

        //Draw the parabola
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.beginPath();

        for (let x = 0; x <= tapDuration*1000; x += 0.1) {
            const y = a * Math.pow(x - h, 2) + k; // Parabola equation: y = a(x - h)^2 + k
            const canvasX = ((graphWidth/tapDuration) * x) + yLabelWidth;
            const canvasY = graphHeight - ((graphHeight/100) * y);

            if (x === 0) {
                ctx.moveTo(canvasX, canvasY);
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        ctx.stroke();
    }, [a, h, k, width, height, tapDuration]);

    return <canvas ref={canvasRef} width={
        width} height={height} />
}


export default VibrationCurveViewer;