import React from "react";
import "./Slider.css"

function Slider({min, max, step=1, id, name, noOfMarkers, stateVar, setStateVar, formattingFunction}) {

    const markers = Array.from({ length: noOfMarkers }, (_, index) => {
        const markerClass = index % 2 === 0 ? "slider_marker small_marker" : "slider_marker";
        return <span key={index} className={markerClass}></span>;
      });

    return (
        <div className="slider_container">
            <div className="slider_end_marker"></div>
            <input type="range" id={id} name={name} min={min} max={max} step={step} list="markers" value={stateVar} onChange={e => setStateVar(e.target.value)}/>
            <div className="slider_end_marker"></div>
            <div class="slider_rail_value_gap"></div>
            <span class="slider_value">{formattingFunction(stateVar)}</span>
            <div class="slider_marker_container">
                <span className={"slider_marker blank"}></span>
                {markers}
                <span className={"slider_marker blank"}></span>
            </div>
        </div>
    );
}


export default Slider;