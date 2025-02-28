import React from 'react';
import './SessionControlBar.css';
import play_icon from '../assets/play.png';
import stop_icon from '../assets/stop.png';

function SessionControlBar({
  controllerHandler,
  sessionDuration,
  tapDuration,
  breakDuration,
  vibrationParameters,
}) {
  return (
    <div id='session_control_bar'>
      <button
        id='start_button'
        className='control_button'
        onClick={() =>
          controllerHandler.startSession(
            sessionDuration * 1000,
            tapDuration * 1000,
            breakDuration * 1000,
            vibrationParameters,
          )
        }
      >
        <img id='play_icon' alt='Play Icon' src={play_icon}></img>
      </button>
      <button
        id='stop_button'
        className='control_button'
        onClick={() => controllerHandler.stopSession()}
      >
        <img id='stop_icon' alt='Stop Icon' src={stop_icon}></img>
      </button>
      <div></div>
    </div>
  );
}

export default SessionControlBar;
