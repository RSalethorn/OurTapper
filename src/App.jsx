import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import ControllerHandler from "./ControllerHandler";
import VibrationCurveViewer from "./VibrationCurveViewer";
import "./App.css";

function App() {
  const [sessionDuration, setSessionDuration] = useState(50);
  const [intensity, setIntensity] = useState(75);
  const [tapDuration, setTapDuration] = useState(2.5);
  const [breakDuration, setBreakDuration] = useState(1.5);
  const [controllerHandler, setControllerHandler] = useState(null);

  useEffect(() => { 
    setControllerHandler(new ControllerHandler());
  }, []);

  return (
    <>
      <h1>Tapping</h1>

      <h3>Session Length</h3>
      <input type="range" id="session_duration" name="session_duration" min="1" max="300" onChange={e => setSessionDuration(e.target.value)} value={sessionDuration} />
      <p>{sessionDuration} seconds</p>

      <h3>Intensity</h3>
      <input type="range" id="intensity" name="intensity" min="1" max="100" onChange={e => setIntensity(e.target.value)} value={intensity} />
      <p>{intensity}%</p>

      <h3>Tap Duration</h3>
      <input type="range" id="tap_duration" name="tap_duration" min="0.1" max="10" step="0.1" onChange={e => setTapDuration(e.target.value)} value={tapDuration} />
      <p>{tapDuration} seconds</p>

      <h3>Duration Between Taps</h3>
      <input type="range" id="break_duration" name="break_duration" min="0" max="10" step="0.1" onChange={e => setBreakDuration(e.target.value)} value={breakDuration} />
      <p>{breakDuration} seconds</p>

      <button onClick={() => controllerHandler.startSession(sessionDuration*1000, intensity/100, tapDuration*1000, breakDuration*1000)}>Begin</button>
      <button onClick={() => controllerHandler.stopSession()}>Stop</button>
      <VibrationCurveViewer a={-60} h={1.25} k={100} tapDuration={tapDuration}/>
    </>
  );
}

export default App;
 