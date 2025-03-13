import React from 'react';
import './VibrationTypeSelect.css';

function VibrationTypeSelect({ vibrationParameters, setVibrationParameters }) {
  // Swap between flat and parabola curves
  const changeVibrationType = (type) => {
    // Do nothing if type parameter is same as current type
    if (type === vibrationParameters.type) {
      return;
    }

    // Set default vibrationParameters for the vibration type
    if (type === 'flat') {
      setVibrationParameters({ type: 'flat', intensity: 100 });
    } else if (type == 'parabola') {
      setVibrationParameters({ type: 'parabola', a: -64, h: 1.25, k: 100 });
    }
  };

  return (
    <div className='vibration_type_selector_container'>
      <button
        id='vibration_type_flat'
        aria-labelledby='vibration_type_label'
        className={
          'vibration_type_button first_button' +
          (vibrationParameters.type === 'flat' ? ' selected' : '')
        }
        onClick={() => changeVibrationType('flat')}
      >
        Flat
      </button>
      <button
        name='vibration_type'
        id='vibration_type_parabola'
        aria-labelledby='vibration_type_label'
        className={
          'vibration_type_button last_button' +
          (vibrationParameters.type === 'parabola' ? ' selected' : '')
        }
        onClick={() => changeVibrationType('parabola')}
      >
        Curve
      </button>
    </div>
  );
}

export default VibrationTypeSelect;
