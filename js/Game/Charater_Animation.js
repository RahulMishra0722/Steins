import { InputHandler } from "./Input.js";

export class Game {
    constructor() {
        this.canvas = document.getElementById("Character");
        this.ctx = this.canvas.getContext("2d");
        this.SPRITE_CHARACTER_WIDTH = 56;
        this.SPRITE_CHARACTER_HEIGHT = 56;
        this.CANVAS_WIDTH = this.canvas.width = 70;
        this.CANVAS_HEIGHT = this.canvas.height = 70;
        this.stagger_Frame = 9;
        this.game_frame = 0;
        this.Input_Handler = new InputHandler();

        this.player_State = "run";
        this.controller();
        console.log(this.player_State);
        this.player = new Image();
        this.player.src = "char_blue.png";
        this.Animation_States = [
            {
                name: "idle",
                frames: 6
            },
            {
                name: "attack",
                frames: 6
            },
            {
                name: "run",
                frames: 8
            },
            {
                name: "run_and_jump",
                frames: 8
            },
            {
                name: "run_and_jumo_land",
                frames: 8
            },
            {
                name: "got_hit",
                frames: 8
            },
            {
                name: "dies",
                frames: 3
            }
        ];
        this.sprite_Animations(this.Animation_States);
        console.log(this.Animation_States)
    }


    sprite_Animations(Animation_States) {
        this.Animation_States.forEach((CurColumn) => {
            let frames = { loc: [] }
            for (let i = 0; i < CurColumn.frames; i++) {
                let X_Position = i * this.SPRITE_CHARACTER_WIDTH
                let Y_Position = this.Animation_States.indexOf(CurColumn) * this.SPRITE_CHARACTER_HEIGHT
                frames.loc.push({ x: X_Position, y: Y_Position })
            }
            CurColumn.frames = frames
        })
    }




    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.controller();
        if (this.player_State && this.Animation_States.find(state => state.name === this.player_State)) {
            let position = Math.floor(this.game_frame / this.stagger_Frame) % this.Animation_States.find(state => state.name === this.player_State).frames.loc.length;
            let frame_x = this.SPRITE_CHARACTER_WIDTH * position;

            if (this.Animation_States.find(state => state.name === this.player_State).frames.loc) {
                let frame_y = this.Animation_States.find(state => state.name === this.player_State).frames.loc[position].y;
                this.ctx.drawImage(this.player, frame_x, frame_y, this.SPRITE_CHARACTER_WIDTH, this.SPRITE_CHARACTER_HEIGHT, 0, 0, this.SPRITE_CHARACTER_WIDTH, this.SPRITE_CHARACTER_HEIGHT);
            } else {
                console.error("Animation state does not have 'loc' array:", this.Animation_States[this.player_State]);
            }
        } else {
            console.error("Player state is invalid or Animation state does not exist:", this.player_State);
        }
        this.game_frame++;
        requestAnimationFrame(this.animate.bind(this));
    }

    controller() {
        console.log(this.Input_Handler.isUpPressed("KeyW"));
        if (this.Input_Handler.isUpPressed("KeyW")) {
            this.player_State = "attack";
        }
        if (this.Input_Handler.isPlayerIdle()) {
            this.player_State = "idle";
        }
        if (this.Input_Handler.isRunning("KeyD")) {
            this.player_State = "run";
        }
        if (this.Input_Handler.isSittingDown("KeyS")) {
            this.player_State = "run_and_jumo_land";
        }
        if (this.Input_Handler.ifForwardRollPressed("KeyE")) {
            this.player_State = "run_and_jump";
        }
        if (this.Input_Handler.isDead("KeyY")) {
            this.player_State = "dies"
        }
        if (this.Input_Handler.wasHit("KeyG")) {
            this.player_State = "got_hit"
        }

    }
}
