/*import { InputHandler } from "./Input.js";
export class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.playerImage = new Image();
        this.playerImage.src = 'shadow_dog.png';
        this.spriteWidth = 575;
        this.spriteHeight = 523; // Corrected typo in variable name
        this.stagger_Frame = 4;
        this.game_frame = 0;
        this.Input_Handler = new InputHandler()
        this.controller();
        this.player_State = ""
        console.log(this.player_State)
        this.Animation_States = [
            {
                name: "idle",
                frames: 7
            },
            {
                name: "jump",
                frames: 7
            },
            {
                name: "fall",
                frames: 7
            },
            {
                name: "run",
                frames: 9
            },
            {
                name: "dizzy",
                frames: 11
            },
            {
                name: "sit",
                frames: 5
            },
            {
                name: "roll",
                frames: 7
            },
            {
                name: "bite",
                frames: 7
            },
            {
                name: "ko",
                frames: 12
            },
            {
                name: "getHit",
                frames: 12
            },

        ];
        this.sprite_Animations(this.Animation_States);
    }

    sprite_Animations(Animation_States) {
        Animation_States.forEach((state, index) => {
            let frames = {
                loc: []
            }
            for (let j = 0; j < state.frames; j++) {
                let Position_x = j * this.spriteWidth
                let Position_y = index * this.spriteHeight
                console.log({ index, message: "index" })
                frames.loc.push({ x: Position_x, y: Position_y })
            }
            // Assign frames to each state by name
            this.Animation_States[state.name] = frames;
        });
    }
    animate = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.controller();

        // Check if player_State is valid and Animation_States[player_State] exists
        if (this.player_State && this.Animation_States[this.player_State]) {
            let position = Math.floor(this.game_frame / this.stagger_Frame) % this.Animation_States[this.player_State].loc.length;
            let frame_x = this.spriteWidth * position;

            // Check if loc array exists in the animation state
            if (this.Animation_States[this.player_State].loc) {
                let frame_y = this.Animation_States[this.player_State].loc[position].y;
                this.ctx.drawImage(this.playerImage, frame_x, frame_y,
                    this.spriteWidth, this.spriteHeight, 0,
                    0, this.spriteWidth, this.spriteHeight);
            } else {
                console.error("Animation state does not have 'loc' array:", this.Animation_States[this.player_State]);
            }
        } else {
            console.error("Player state is invalid or Animation state does not exist:", this.player_State);
        }

        this.game_frame++;
        requestAnimationFrame(this.animate);
    }

     controller() {
         console.log(this.Input_Handler.isUpPressed("KeyW"));
         if (this.Input_Handler.isUpPressed("KeyW")) {
             this.player_State = "jump";
         }
         if (this.Input_Handler.isPlayerIdle()) {
             this.player_State = "idle"
         }
         if (this.Input_Handler.isRunning("KeyD")) {
             this.player_State = "run"
         }
         if (this.Input_Handler.isSittingDown("KeyS")) {
             this.player_State = "sit"
         }
         if (this.Input_Handler.ifForwardRollPressed("KeyE")) {
             this.player_State = "roll"
         }
     }

}

let x = new Game();
x.animate();
 */