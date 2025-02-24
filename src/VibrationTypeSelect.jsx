import React from "react";
import "./VibrationTypeSelect.css"

function VibrationTypeSelect({vibrationParameters, setVibrationParameters}) {
    const changeVibrationType = (type) => {
        if (type === vibrationParameters.type) { return; }

        if (type === "flat") {
            setVibrationParameters({type: "flat", intensity: 100});
        } else if (type == "parabola") {
            setVibrationParameters({type: "parabola", a: -64, h: 1.25, k: 100})
        }
    }
    
    return (
        
      <div class="vibration_type_selector_container">
        <input type="radio" name="vibration_type" id="vibration_type_flat" class="vibration_type_option" onClick={() => changeVibrationType("flat")}/>
        <label htmlFor="vibration_type_flat" className="vibration_type_button">Flat</label>
        <input type="radio" name="vibration_type" id="vibration_type_parabola" class="vibration_type_option" onClick={() => changeVibrationType("parabola")}/>
        <label htmlFor="vibration_type_parabola" className="vibration_type_button">Curve</label>
      </div>
    );
}


export default VibrationTypeSelect;