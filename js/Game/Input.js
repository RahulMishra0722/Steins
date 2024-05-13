export class InputHandler {
    constructor() {
        this.inputs = [];
        document.addEventListener('keydown', (e) => {
            if (!this.inputs.includes(e.code)) {
                if (e.code === "KeyW" || e.code === 'KeyS' || e.code === 'KeyA' || e.code === 'KeyD' || e.code === "KeyE" || e.code === "KeyY" || e.code === "KeyG" || e.code === "KeyT") {
                    this.inputs.push(e.code);
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            const digit_index = this.inputs.indexOf("Digit1")

            if (digit_index !== -1) {
                this.inputs.splice(digit_index, 1)
            }
            const index = this.inputs.indexOf(e.code);
            if (index !== -1) {
                this.inputs.splice(index, 1);

            }
        });
    }
    dead() {
        if (this.inputs.indexOf("Digit1") === -1) {
            this.inputs.push("Digit1")
        }
    }
    isDead() {
        if (this.inputs.includes("Digit1")) {
            return true
        } else {
            return false
        }
    }

    is_Attacking() {
        if (this.inputs.includes("KeyT")) {


            return true
        } else {
            return false
        }
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
    were_a_and_d_clicked() {
        if (this.inputs.indexOf("KeyA") !== -1 && this.inputs.indexOf("KeyD") !== -1) {
            return true
        }
        return false
    }
    is_moving_backwords() {
        if (!this.were_a_and_d_clicked() && !this.isRunning()) {
            if (this.inputs.includes('KeyA')) {


                return true;
            }
        }
        return false
    }
    jump_in_position() {
        if (!this.is_moving_backwords()) {
            if (this.inputs.includes("KeyW")) {
                return true
            }
        }
        return false
    }
    wasHit() {
        if (this.inputs.includes("KeyG")) {
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
        if (!this.is_moving_backwords()) {
            if (!this.were_a_and_d_clicked()) {
                if (this.inputs.includes("KeyE")) {
                    return true
                }
            }
        }

        return false

    }

    isRunning() {
        if (this.inputs.includes("KeyD")) {
            this.wasD_Clicked = 1
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
