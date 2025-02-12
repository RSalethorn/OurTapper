import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [sessionDuration, setSessionDuration] = useState(50);
  const [intensity, setIntensity] = useState(50);
  const [tapDuration, setTapDuration] = useState(50);
  const [breakDuration, setBreakDuration] = useState(50);


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
      <input type="range" id="tap_duration" name="tap_duration" min="1" max="100" onChange={e => setTapDuration(e.target.value)} value={tapDuration} />
      <p>{tapDuration/10} seconds</p>

      <h3>Duration Between Taps</h3>
      <input type="range" id="break_duration" name="break_duration" min="0" max="100" onChange={e => setBreakDuration(e.target.value)} value={breakDuration} />
      <p>{breakDuration/10} seconds</p>

      <button>Begin</button>
    </>
  );
}

export default App;
 