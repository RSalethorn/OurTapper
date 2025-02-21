import React from "react";
import './VibrationFlatEditor.css';

function VibrationFlatEditor({vibrationParameters, setVibrationParameters }) {
    const changeParameter = (parameter, value) => {
        const updatedParameters = { ...vibrationParameters, [parameter]: parseFloat(value)}
        setVibrationParameters(updatedParameters);
    };

    return (
        <div className="vibration_flat_editor">
            <h3>Intensity</h3>
            <input type="range" id="intensity" name="intensity" min="1" max="100" onChange={e => changeParameter("intensity", e.target.value)} value={vibrationParameters.intensity} />
            <p>{vibrationParameters.intensity}%</p>
        </div>
    );
}


export default VibrationFlatEditor;