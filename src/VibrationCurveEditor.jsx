import React from 'react';
import { useRef, useEffect } from 'react';
import './VibrationCurveEditor.css';
import Slider from './Slider';

function VibrationCurveEditor({
  width = 400,
  height = 400,
  tapDuration,
  vibrationParameters,
  setVibrationParameters,
}) {
  const canvasRef = useRef(null);

  let a = vibrationParameters['a'];
  let h = vibrationParameters['h'];
  let k = vibrationParameters['k'];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    //Clear canvas
    ctx.clearRect(0, 0, width, height);

    const graphWidth = width * 0.9;
    const graphHeight = height * 0.9;

    const xLabelHeight = height * 0.1;
    const yLabelWidth = height * 0.1;

    // Draw the axes
    ctx.strokeStyle = '#1c1b1a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(yLabelWidth, graphHeight);
    ctx.lineTo(yLabelWidth, 0); // x-axis
    ctx.moveTo(yLabelWidth, graphHeight);
    ctx.lineTo(width, graphHeight); // y-axis
    ctx.stroke();

    const labelTextHeight = 10;
    ctx.font = `${labelTextHeight}px serif`;

    //Loops through intensity labels
    for (let i = 0; i <= 100; i += 5) {
      const labelY = graphHeight - (graphHeight / 100) * i;

      let markerLength;
      if (i % 10 == 0) {
        ctx.lineWidth = 3;
        ctx.fillText(i, 15, labelY + labelTextHeight / 2);
        ctx.lineWidth = 2;
        markerLength = 7;
      } else {
        ctx.lineWidth = 1;
        markerLength = 4;
      }
      ctx.beginPath();
      ctx.moveTo(yLabelWidth - markerLength, labelY);
      ctx.lineTo(yLabelWidth, labelY);
      ctx.stroke();
    }

    //Loops through time/duration labels
    for (let i = 0; i <= tapDuration; i += 0.25) {
      const labelX = (graphWidth / tapDuration) * i + yLabelWidth;

      let markerLength;
      if (i % 0.5 == 0) {
        ctx.lineWidth = 3;
        //ctx.fillText(i, 15, labelY + (labelTextHeight / 2));
        ctx.fillText(i, labelX, height - 15);
        ctx.lineWidth = 2;
        markerLength = 7;
      } else {
        ctx.lineWidth = 1;
        markerLength = 4;
      }
      ctx.beginPath();
      ctx.moveTo(labelX, graphHeight + markerLength);
      ctx.lineTo(labelX, graphHeight);
      ctx.stroke();
    }

    //Draw the parabola
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.beginPath();

    a = vibrationParameters['a'];
    h = vibrationParameters['h'];
    k = vibrationParameters['k'];

    for (let x = 0; x <= tapDuration * 1000; x += 0.001) {
      const y = a * Math.pow(x - h, 2) + k; // Parabola equation: y = a(x - h)^2 + k
      if (y < 0) {
        continue;
      }

      const canvasX = (graphWidth / tapDuration) * x + yLabelWidth;
      const canvasY = graphHeight - (graphHeight / 100) * y;

      if (x === 0) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }
    ctx.stroke();
  }, [vibrationParameters, width, height, tapDuration]);

  const changeParameter = (parameter, value) => {
    const updatedParameters = {
      ...vibrationParameters,
      [parameter]: parseFloat(value),
    };
    setVibrationParameters(updatedParameters);
  };

  const changeA = (value) => {
    changeParameter('a', value);
  };

  const formatA = (a) => {
    return Math.round(a * 100) / 100;
  };

  const changeH = (value) => {
    changeParameter('h', value);
  };

  const formatH = (h) => {
    return h;
  };

  const changeK = (value) => {
    changeParameter('k', value);
  };

  const formatK = (k) => {
    return k;
  };

  const resetCurve = () => {
    const updatedH = tapDuration / 2;
    const updatedA = (0 - vibrationParameters.k) / Math.pow(0 - updatedH, 2);
    const updatedK = 100;

    const updatedParameters = {
      ...vibrationParameters,
      a: parseFloat(updatedA),
      h: parseFloat(updatedH),
      k: parseFloat(updatedK),
    };
    setVibrationParameters(updatedParameters);
  };

  return (
    <div className='vibration_curve_editor'>
      <div className='canvas_container'>
        <canvas ref={canvasRef} width={width} height={height} />
      </div>
      <div className='input_container'>
        <label className='input_label curve_input_label' htmlFor='parabola_a'>
          Width of Curve
        </label>
        <Slider
          min={-9999}
          max={-1}
          id={'parabola_a'}
          name={'parabola_a'}
          noOfMarkers={19}
          stateVar={vibrationParameters.a}
          setStateVar={changeA}
          formattingFunction={formatA}
        />
        <label className='input_label curve_input_label' htmlFor='parabola_h'>
          Max Vibration Intensity
        </label>
        <Slider
          min={0}
          max={100}
          id={'parabola_k'}
          name={'parabola_k'}
          noOfMarkers={19}
          stateVar={vibrationParameters.k}
          setStateVar={changeK}
          formattingFunction={formatK}
        />
        <label className='input_label curve_input_label' htmlFor='parabola_h'>
          Time of Max Vibration Intensity
        </label>
        <Slider
          min={0}
          max={tapDuration}
          id={'parabola_h'}
          name={'parabola_h'}
          step={0.1}
          noOfMarkers={19}
          stateVar={vibrationParameters.h}
          setStateVar={changeH}
          formattingFunction={formatH}
        />

        <button
          id='reset_curve_button'
          className='wide_button'
          onClick={() => resetCurve()}
        >
          Reset Curve
        </button>
      </div>
    </div>
  );
}

export default VibrationCurveEditor;
