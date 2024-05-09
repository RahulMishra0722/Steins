export class InputHandler {
    constructor() {
        this.inputs = [];
        this.timer = 0;

        document.addEventListener('keydown', (e) => {
            if (e.code === "KeyE") {
                this.timer = 1
            }

            if (!this.inputs.includes(e.code)) {
                if (e.code === "KeyW" || e.code === 'KeyS' || e.code === 'KeyA' || e.code === 'KeyD' || e.code === "KeyE" || e.code === "KeyY" || e.code === "KeyG") {
                    this.inputs.push(e.code);
                }
            }
        });

        document.addEventListener('keyup', (e) => {

            const index = this.inputs.indexOf(e.code);
            if (index !== -1) {
                this.inputs.splice(index, 1);

            }
        });
    }

    i_just_wait() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 400);
        });
    }

    async is_In_The_Air() {
        if (this.timer === 1) {
            this.timer = 0
            await this.i_just_wait();

            return true;
        } else {
            return false;
        }
    }
    is_moving_backwords() {
        if (this.inputs.includes('KeyA')) {
            return true
        } else {
            return false
        }
    }
    jump_in_position() {
        if (this.inputs.includes("KeyW")) {
            return true
        }
        return false
    }
    wasHit() {
        if (this.inputs.includes("KeyG")) {
            return true
        }
        return false
    }
    isDead() {
        if (this.inputs.includes("KeyY")) {
            return true
        }
        return false
    }
    isSittingDown() {
        if (this.inputs.includes("KeyS")) {
            return true
        }
        return false

    }

    ifForwardRollPressed() {
        if (this.inputs.includes("KeyE")) {
            return true
        }
        return false

    }
    isRunning(key) {
        if (this.inputs.includes("KeyD")) {
            return true
        }
        return false
    }
    isPlayerIdle() {
        if (this.inputs.length === 0) {

            return true
        }
        return false
    }

}
