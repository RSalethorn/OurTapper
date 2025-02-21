
export default class ControllerHandler {
    constructor() {
        window.addEventListener("gamepadconnected", (event) => {
            console.log("Gamepad connected:", event.gamepad.id);
        });

        window.addEventListener("gamepaddisconnected", (event) => {
            console.log("Gamepad disconnected:", event.gamepad.id);
        });

        this.timeouts = []
    }

    delayVibrateGamepad(gamepad, duration, intensity, delay) {
        let timeoutID = setTimeout(() => {
            console.log(`Timeout Activated - Intensity: ${intensity}, Delay: ${delay}`);
            this.vibrateGamepad(gamepad, duration + 100, intensity);
        }, delay);

        this.timeouts.push(timeoutID);
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
                console.log("Vibration complete! Intensity: ", intensity,"\n",{
                    startDelay: 0,
                    duration: duration,
                    weakMagnitude: intensity,
                    strongMagnitude: intensity
                });
            }).catch((error) => {
                console.error("Vibration failed:", error);
            });
        } else {
            console.log("Vibration not supported on this gamepad.");
        }
    }

    stopSession() {
        this.timeouts.forEach(timeoutID => clearTimeout(timeoutID));
        navigator.getGamepads().forEach(gamepad => {
            if (gamepad != null) {
                this.vibrateGamepad(gamepad, 1000, 0);
            }
        });
    }

    startSession(sessionLength, tapDuration, breakDuration, vibrationParameters) {
        //console.log(`sessionLength ${sessionLength}, intensity ${intensity}, tapDuration ${tapDuration}, breakDuration ${breakDuration}`)
        console.log("Test Begins")
        const gamepads = navigator.getGamepads();
        console.log(gamepads)

        let gamepad1 = gamepads[0];
        let gamepad2 = gamepads[1];

        if (gamepad1 == null || gamepad2 == null) {
            console.log("There are not two gamepads connected")
            return null
        }

        let nextDelay = 0;
        if (vibrationParameters.type == "flat") {
            const intensity = vibrationParameters.intensity / 100 //Convert intensity percentage to between 0 and 1
            while (nextDelay < sessionLength) {
                this.delayVibrateGamepad(gamepad1, tapDuration, intensity, nextDelay)
                nextDelay += tapDuration;

                this.delayVibrateGamepad(gamepad1, breakDuration, 0, nextDelay)
                this.delayVibrateGamepad(gamepad2, breakDuration, 0, nextDelay)
                nextDelay += breakDuration;

                this.delayVibrateGamepad(gamepad2, tapDuration, intensity, nextDelay)
                nextDelay += tapDuration;

                this.delayVibrateGamepad(gamepad1, breakDuration, 0, nextDelay)
                this.delayVibrateGamepad(gamepad2, breakDuration, 0, nextDelay)
                nextDelay += breakDuration;
            }
        } else if (vibrationParameters.type == "parabola") {
            const vibrationStepDuration = 0.1 //ms
            const a = vibrationParameters.a
            const h = vibrationParameters.h
            const k = vibrationParameters.k

            const gamepads = [gamepad1, gamepad2]

            console.log(tapDuration)
            console.log("----------------", nextDelay, " < ", sessionLength, " ", nextDelay < sessionLength, " (Before While) ----------------")
            while (nextDelay < sessionLength) {
                console.log("----------------", nextDelay, " < ", sessionLength, " ", nextDelay < sessionLength, "----------------")
                gamepads.forEach(gamepad => {
                    for (let x = 0; x <= tapDuration/1000; x += vibrationStepDuration) {
                        let intensity = a * Math.pow(x - h, 2) + k; // Parabola equation: y = a(x - h)^2 + k
                        
                        // Is the default parabola values assuming that tapDuration is in seconds not ms????????
                        if (intensity < 0) { intensity = 0; } 
                        else if (intensity > 100) { intensity = 1 }
                        
                        intensity = intensity.toFixed(2)

                        console.log(" x = ", x, "nextDelay = ",nextDelay, "intensity = ",intensity)
                        this.delayVibrateGamepad(gamepad, vibrationStepDuration * 1000, intensity/100, nextDelay);
                        console.log(`this.delayVibrateGamepad(gamepad=${gamepad}, tapDuration=${tapDuration}, intensity/100=${intensity/100}, nextDelay=${nextDelay});`)
                        nextDelay += vibrationStepDuration * 1000 //seconds to ms
                    }
                    this.delayVibrateGamepad(gamepad, breakDuration, 0, nextDelay)
                    console.log("Break at ", nextDelay)
                    nextDelay += breakDuration;
                });
            }
        }
    }

    startFlatSession(sessionLength, intensity, tapDuration, breakDuration) {
        console.log(`sessionLength ${sessionLength}, intensity ${intensity}, tapDuration ${tapDuration}, breakDuration ${breakDuration}`)
        console.log("Test Begins")
        const gamepads = navigator.getGamepads();
        console.log(gamepads)

        let gamepad1 = gamepads[0];
        let gamepad2 = gamepads[1];

        if (gamepad1 == null || gamepad2 == null) {
            console.log("There are not two gamepads connected")
            return null
        }

        let nextDelay = 0;

        while (nextDelay < sessionLength) {
            this.delayVibrateGamepad(gamepad1, tapDuration, intensity, nextDelay)
            nextDelay += tapDuration;

            this.delayVibrateGamepad(gamepad1, breakDuration, 0, nextDelay)
            this.delayVibrateGamepad(gamepad2, breakDuration, 0, nextDelay)
            nextDelay += breakDuration;

            this.delayVibrateGamepad(gamepad2, tapDuration, intensity, nextDelay)
            nextDelay += tapDuration;

            this.delayVibrateGamepad(gamepad1, breakDuration, 0, nextDelay)
            this.delayVibrateGamepad(gamepad2, breakDuration, 0, nextDelay)
            nextDelay += breakDuration;
        } 
    }
}