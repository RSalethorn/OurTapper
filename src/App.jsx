import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import ControllerHandler from "./ControllerHandler";
import VibrationCurveEditor from "./VibrationCurveEditor";
import VibrationFlatEditor from "./VibrationFlatEditor";
import "./App.css";

function App() {
  const [sessionDuration, setSessionDuration] = useState(50);
  const [tapDuration, setTapDuration] = useState(2.5);
  const [breakDuration, setBreakDuration] = useState(1.5);
  const [controllerHandler, setControllerHandler] = useState(null);
  const [vibrationParameters, setVibrationParameters] = useState({type: "flat", intensity: 100});

  useEffect(() => { 
    setControllerHandler(new ControllerHandler());
  }, []);

  return (
    <>
      <h1>Tapping</h1>

      <h3>Session Length</h3>
      <input type="range" id="session_duration" name="session_duration" min="1" max="300" onChange={e => setSessionDuration(e.target.value)} value={sessionDuration} />
      <p>{sessionDuration} seconds</p>

      <h3>Duration Between Taps</h3>
      <input type="range" id="break_duration" name="break_duration" min="0" max="10" step="0.1" onChange={e => setBreakDuration(e.target.value)} value={breakDuration} />
      <p>{breakDuration} seconds</p>

      <h3>Tap Duration</h3>
      <input type="range" id="tap_duration" name="tap_duration" min="0.1" max="10" step="0.1" onChange={e => setTapDuration(e.target.value)} value={tapDuration} />
      <p>{tapDuration} seconds</p>

      <h3>Vibration Type</h3>
      <select name="vibration_type" id="vibration_type">
        <option value="flat">Flat</option>
        <option value="parabola">Wave/Curve</option>
      </select>

      <VibrationFlatEditor vibrationParameters={vibrationParameters} setVibrationParameters={setVibrationParameters}/>

      <button onClick={() => controllerHandler.startSession(sessionDuration*1000, vibrationParameters.intensity/100, tapDuration*1000, breakDuration*1000)}>Begin</button>
      <button onClick={() => controllerHandler.stopSession()}>Stop</button>
      {/*<VibrationCurveEditor vibrationParameters={vibrationParameters} tapDuration={tapDuration} setVibrationParameters={setVibrationParameters}/>*/}
    </>
  );
}

export default App;
 