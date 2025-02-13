
export default class ControllerHandler {
    constructor() {
        window.addEventListener("gamepadconnected", (event) => {
            console.log("Gamepad connected:", event.gamepad.id);
        });

        window.addEventListener("gamepaddisconnected", (event) => {
            console.log("Gamepad disconnected:", event.gamepad.id);
        });
    }

    delayVibrateGamepad(gamepad, duration, intensity, delay) {
        setTimeout(() => {
            console.log(`Timeout Activated - Intensity: ${intensity}, Delay: ${delay}`);
            this.vibrateGamepad(gamepad, duration + 100, intensity);
        }, delay);
        //console.log(`Timeout Set - Intensity: ${intensity}, Delay: ${delay}`);
    }

    vibrateGamepad(gamepad, duration, intensity) {
        if (gamepad.vibrationActuator) {
            gamepad.vibrationActuator.playEffect("dual-rumble", {
                startDelay: 0,
                duration: duration,
                weakMagnitude: intensity,
                strongMagnitude: intensity
            }).then(() => {
                console.log("Vibration complete! Intensity: ", intensity);
            }).catch((error) => {
                //console.error("Vibration failed:", error);
            });
        } else {
            console.log("Vibration not supported on this gamepad.");
        }
    }

    startSession(sessionLength, intensity, tapDuration, durationBetweenTaps) {
        console.log("Test Begins")
        const gamepads = navigator.getGamepads();
        console.log(gamepads)
        if (gamepads[0] != null && gamepads[1] != null) {
            let gamepad1 = gamepads[0];
            let gamepad2 = gamepads[1];

            let stepDuration = 50; //ms
            let intensitySteps = 0.05;
            let nextDelay = 0;
            let waitBetweenTaps = 300;

            while (nextDelay < 50000) {
                this.delayVibrateGamepad(gamepad1, waitBetweenTaps, 0, nextDelay)
                this.delayVibrateGamepad(gamepad2, waitBetweenTaps, 0, nextDelay)
                nextDelay += waitBetweenTaps;

                let startIntensity = 0; //vibration intensity between 0 and 1
                let currentIntensity = startIntensity;

                while (currentIntensity < 1) {
                    this.delayVibrateGamepad(gamepad1, stepDuration, currentIntensity, nextDelay)
                    nextDelay += stepDuration;
                    currentIntensity += intensitySteps;
                }

                startIntensity = 1; //vibration intensity between 0 and 1
                currentIntensity = startIntensity;
                
                while (currentIntensity > 0) {
                    this.delayVibrateGamepad(gamepad1, stepDuration, currentIntensity, nextDelay)
                    nextDelay += stepDuration;
                    currentIntensity -= intensitySteps;
                }

                this.delayVibrateGamepad(gamepad1, waitBetweenTaps, 0, nextDelay)
                this.delayVibrateGamepad(gamepad2, waitBetweenTaps, 0, nextDelay)
                nextDelay += waitBetweenTaps;

                startIntensity = 0; //vibration intensity between 0 and 1
                currentIntensity = startIntensity;

                while (currentIntensity < 1) {
                    this.delayVibrateGamepad(gamepad2, stepDuration, currentIntensity, nextDelay)
                    nextDelay += stepDuration;
                    currentIntensity += intensitySteps;
                }

                startIntensity = 1; //vibration intensity between 0 and 1
                currentIntensity = startIntensity;
                
                while (currentIntensity > 0) {
                    this.delayVibrateGamepad(gamepad2, stepDuration, currentIntensity, nextDelay)
                    nextDelay += stepDuration;
                    currentIntensity -= intensitySteps;
                }
            }
        }
    }
}