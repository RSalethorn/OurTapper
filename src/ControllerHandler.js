export default class ControllerHandler {
  constructor() {
    window.addEventListener('gamepadconnected', (event) => {
      console.log('Gamepad connected:', event.gamepad.id);
    });

    window.addEventListener('gamepaddisconnected', (event) => {
      console.log('Gamepad disconnected:', event.gamepad.id);
    });

    this.timeouts = [];
  }

  // Schedules a vibration event for the gamepad after a delay
  // gamepad: Gamepad object from Gamepad API
  // duration: Duration of the vibration
  // intensity: Intensity of the vibration
  // delay: The delay in milliseconds before the vibration happens
  delayVibrateGamepad(gamepad, duration, intensity, delay) {
    let timeoutID = setTimeout(() => {
      console.log(
        `Timeout Activated - Intensity: ${intensity}, Delay: ${delay}`,
      );
      this.vibrateGamepad(gamepad, duration + 100, intensity);
    }, delay);

    this.timeouts.push(timeoutID);
  }

  // Starts a vibration event for the gamepad
  // gamepad: Gamepad object from Gamepad API
  // duration: Duration of the vibration
  // intensity: Intensity of the vibration
  vibrateGamepad(gamepad, duration, intensity) {
    // Checks that the gamepad has vibration capabilities
    if (gamepad.vibrationActuator) {
      gamepad.vibrationActuator
        .playEffect('dual-rumble', {
          startDelay: 0,
          duration: duration,
          weakMagnitude: intensity,
          strongMagnitude: intensity,
        })
        .then(() => {
          console.log('Vibration complete! Intensity: ', intensity, '\n', {
            startDelay: 0,
            duration: duration,
            weakMagnitude: intensity,
            strongMagnitude: intensity,
          });
        })
        .catch((error) => {
          console.error('Vibration failed:', error);
        });
    } else {
      console.log('Vibration not supported on this gamepad.');
    }
  }

  // Ends a tapping session
  stopSession() {
    // Stops all scheduled vibrations
    this.timeouts.forEach((timeoutID) => clearTimeout(timeoutID));
    // Loops through all connected controllers and stops any currently happening vibrations
    navigator.getGamepads().forEach((gamepad) => {
      if (gamepad != null) {
        this.vibrateGamepad(gamepad, 1000, 0);
      }
    });
  }

  // Starts a tapping session with parabola vibrations
  // sessionLength: The length of the session in seconds.
  // tapDuration: The length of time the controller vibrates for before a break.
  // breakDuration: The length of time the controller stops vibrating between vibrations
  // vibrationParameters: Takes a vibration parameter object:
  //            { type: 'flat', intensity: 100 }
  //            type: pattern type of vibration (either 'flat' or 'parabola')
  //            intensity: vibration intensity (percentage)
  //            { type: 'parabola', a: -64, h: 1.25, k: 100 }
  //            a: width of the parabola
  //            h: x value (time) that parabola peaks at
  //            k: y value (vibration intensity) that parabola peaks at
  startSession(sessionLength, tapDuration, breakDuration, vibrationParameters) {
    console.log('Session begins');

    // Get list of gamepad objects
    const gamepads = navigator.getGamepads();
    console.log(gamepads);

    let gamepad1 = gamepads[0];
    let gamepad2 = gamepads[1];

    // Check that there are two gamepads connected
    if (gamepad1 == null || gamepad2 == null) {
      console.log('There are not two gamepads connected');
      // If not end session
      return null;
    }

    // nextDelay is the delay of the next timeout
    let nextDelay = 0;
    if (vibrationParameters.type == 'flat') {
      const intensity = vibrationParameters.intensity / 100; //Convert intensity percentage to between 0 and 1
      // Loops through the entire session and schedules all vibrations
      while (nextDelay < sessionLength) {
        // Schedule vibration on the first gamepad
        this.delayVibrateGamepad(gamepad1, tapDuration, intensity, nextDelay);
        nextDelay += tapDuration;

        // Schedule vibrations to stop on gamepads
        this.delayVibrateGamepad(gamepad1, breakDuration, 0, nextDelay);
        this.delayVibrateGamepad(gamepad2, breakDuration, 0, nextDelay);
        nextDelay += breakDuration;

        // Schedule vibration on the second gamepad
        this.delayVibrateGamepad(gamepad2, tapDuration, intensity, nextDelay);
        nextDelay += tapDuration;

        // Schedule vibrations to stop on gamepads
        this.delayVibrateGamepad(gamepad1, breakDuration, 0, nextDelay);
        this.delayVibrateGamepad(gamepad2, breakDuration, 0, nextDelay);
        nextDelay += breakDuration;
      }
    } else if (vibrationParameters.type == 'parabola') {
      const vibrationStepDuration = 0.1; //ms (amount of time between changing vibration intensity)

      // a: width of the parabola
      const a = vibrationParameters.a;
      // h: x value (time) that parabola peaks at
      const h = vibrationParameters.h;
      // k: y value (vibration intensity) that parabola peaks at
      const k = vibrationParameters.k;

      // list of gamepad objects
      const gamepads = [gamepad1, gamepad2];

      // Loops through the entire session and schedules all vibrations
      while (nextDelay < sessionLength) {
        gamepads.forEach((gamepad) => {
          // Loop through duration of tap
          for (let x = 0; x <= tapDuration / 1000; x += vibrationStepDuration) {
            let intensity = a * Math.pow(x - h, 2) + k; // Parabola equation: y = a(x - h)^2 + k

            // If statements keep intensity above 0 and below 100
            if (intensity < 0) {
              intensity = 0;
            } else if (intensity > 100) {
              intensity = 100;
            }

            intensity = intensity.toFixed(2);

            // Schedule vibration
            this.delayVibrateGamepad(
              gamepad,
              vibrationStepDuration * 1000,
              intensity / 100,
              nextDelay,
            );
            nextDelay += vibrationStepDuration * 1000; //seconds to ms
          }
          // Schedule vibration to stop
          this.delayVibrateGamepad(gamepad, breakDuration, 0, nextDelay);
          nextDelay += breakDuration;
        });
      }
    }
  }
}
