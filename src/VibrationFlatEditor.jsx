import React from 'react';
import './VibrationFlatEditor.css';
import Slider from './Slider';

function VibrationFlatEditor({ vibrationParameters, setVibrationParameters }) {
  const changeIntensity = (value) => {
    const updatedParameters = {
      ...vibrationParameters,
      ['intensity']: parseFloat(value),
    };
    setVibrationParameters(updatedParameters);
  };

  const formatIntensity = (intensity) => {
    return `${intensity}%`;
  };

  return (
    <div className='vibration_flat_editor'>
      <label class='input_label' for='intensity'>
        Intensity
      </label>
      <Slider
        min={1}
        max={100}
        id={'intensity'}
        name={'intensity'}
        noOfMarkers={19}
        stateVar={vibrationParameters.intensity}
        setStateVar={changeIntensity}
        formattingFunction={formatIntensity}
      />
    </div>
  );
}

export default VibrationFlatEditor;
