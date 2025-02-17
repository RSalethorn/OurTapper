import React from "react";
import { useRef, useEffect } from "react";

function VibrationCurveViewer({ a = 0.5, h = 2, k = 3, width = 400, height = 400, tapDuration }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        //Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw the axes
        ctx.strokeStyle = "#1c1b1a";
        ctx.lineWidth = 3
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(width, height); // x-axis
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height); // y-axis
        ctx.stroke()

        //Draw the parabola
        ctx.strokeStyle = "#000";
        ctx.beginPath();

        for (let x = 0; x <= tapDuration*1000; x += 0.1) {
            const y = a * Math.pow(x - h, 2) + k; // Parabola equation: y = a(x - h)^2 + k
            const canvasX = (width/tapDuration) * x;
            const canvasY = height - ((height/100) * y);

            if (x === 0) {
                ctx.moveTo(canvasX, canvasY);
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        /*
        for (let x = 0; x <= tapDuration; x += 0.1) {
            let y = a * Math.pow(x - h, 2) + k; // Parabola equation: y = a(x - h)^2 + k
            y = height - y //Convert y to canvas coordinates (Zero y at top of canvas)
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        */
        ctx.stroke();






    }, [a, h, k, width, height]);

    return <canvas ref={canvasRef} width={
        width} height={height} />
}


export default VibrationCurveViewer;