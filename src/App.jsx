import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import ControllerHandler from './ControllerHandler';
import VibrationCurveEditor from './VibrationCurveEditor';
import VibrationFlatEditor from './VibrationFlatEditor';
import Slider from './Slider';
import './App.css';
import VibrationTypeSelect from './VibrationTypeSelect';
import SessionControlBar from './SessionControlBar';
import ProfileManager from './ProfileManager';

function App() {
  const [sessionDuration, setSessionDuration] = useState(50);
  const [tapDuration, setTapDuration] = useState(2.5);
  const [breakDuration, setBreakDuration] = useState(1.5);
  const [controllerHandler, setControllerHandler] = useState(null);
  const [vibrationParameters, setVibrationParameters] = useState({
    type: 'flat',
    intensity: 100,
  });

  useEffect(() => {
    setControllerHandler(new ControllerHandler());
  }, []);

  const changeVibrationType = (e) => {
    if (e.target.value == 'flat') {
      setVibrationParameters({ type: 'flat', intensity: 100 });
    } else {
      setVibrationParameters({ type: 'parabola', a: -64, h: 1.25, k: 100 });
    }
  };

  const formatSessionDuration = (session_duration) => {
    return `${Math.floor(session_duration / 60)}m ${session_duration % 60}s`;
  };

  const formatBreakDuration = (session_duration) => {
    return `${session_duration}s`;
  };

  return (
    <>
      <h1>OurTapper</h1>
      <ProfileManager
        currentSessionDuration={sessionDuration}
        setCurrentSessionDuration={setSessionDuration}
        currentBreakDuration={breakDuration}
        setCurrentBreakDuration={setBreakDuration}
        currentTapDuration={tapDuration}
        setCurrentTapDuration={setTapDuration}
        currentVibrationParameters={vibrationParameters}
        setCurrentVibrationParameters={setVibrationParameters}
      />

      <label class='input_label' for='session_duration'>
        Session Length
      </label>
      <Slider
        min={1}
        max={300}
        id={'session_duration'}
        name={'session_duration'}
        noOfMarkers={17}
        stateVar={sessionDuration}
        setStateVar={setSessionDuration}
        formattingFunction={formatSessionDuration}
      />

      <label class='input_label' for='break_duration'>
        Duration between taps
      </label>
      <Slider
        min={0.1}
        max={10}
        step={0.1}
        id={'break_duration'}
        name={'break_duration'}
        noOfMarkers={17}
        stateVar={breakDuration}
        setStateVar={setBreakDuration}
        formattingFunction={formatBreakDuration}
      />

      <label class='input_label' for='tap_duration'>
        Tap duration
      </label>
      <Slider
        min={0.1}
        max={10}
        step={0.1}
        id={'tap_duration'}
        name={'tap_duration'}
        noOfMarkers={17}
        stateVar={tapDuration}
        setStateVar={setTapDuration}
        formattingFunction={formatBreakDuration}
      />

      <label className='input_label' id='vibration_type_label'>
        Vibration type
      </label>
      <VibrationTypeSelect
        vibrationParameters={vibrationParameters}
        setVibrationParameters={setVibrationParameters}
      />

      {vibrationParameters.type == 'flat' ? (
        <VibrationFlatEditor
          vibrationParameters={vibrationParameters}
          setVibrationParameters={setVibrationParameters}
        />
      ) : (
        <VibrationCurveEditor
          vibrationParameters={vibrationParameters}
          tapDuration={tapDuration}
          setVibrationParameters={setVibrationParameters}
        />
      )}
      <SessionControlBar
        controllerHandler={controllerHandler}
        sessionDuration={sessionDuration}
        tapDuration={tapDuration}
        breakDuration={breakDuration}
        vibrationParameters={vibrationParameters}
      />
    </>
  );
}

export default App;
