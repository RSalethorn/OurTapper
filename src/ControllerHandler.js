
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
        console.log(`Timeout Set - Intensity: ${intensity}, Delay: ${delay}`);
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
                console.error("Vibration failed:", error);
            });
        } else {
            console.log("Vibration not supported on this gamepad.");
        }
    }

    startSession(sessionLength, intensity, tapDuration, breakDuration) {
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