import { InputHandler } from "./Input.js";

let input = new InputHandler

export class Layer {
    constructor(image, background_speed, canvas_width, canvas_height) {
        this.backgroundCanvas = document.getElementById("canvas2");
        this.backgroundCanvasctx = this.backgroundCanvas.getContext('2d');
        this.x = 0;
        this.y = 0;
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.background_speed = background_speed;
        this.backSppedSaver = background_speed
        this.image = image;
    }
    update() {
        this.x -= this.background_speed;
        if (this.x <= -this.canvas_width) {
            this.x = 0;
        }
    }
    draw() {
        if (input.ifForwardRollPressed() || input.isRunning() || input.jump_in_position() || input.is_moving_backwords()) {
            this.background_speed = this.backSppedSaver;
            this.backgroundCanvasctx.drawImage(this.image, this.x, this.y, this.canvas_width, this.canvas_height);
            this.backgroundCanvasctx.drawImage(this.image, this.x + this.canvas_width - this.background_speed, this.y, this.canvas_width, this.canvas_height);
        } else if (input.isPlayerIdle() || input.isSittingDown()) {
            this.background_speed = 0
            this.backgroundCanvasctx.drawImage(this.image, this.x, this.y, this.canvas_width, this.canvas_height);
            this.backgroundCanvasctx.drawImage(this.image, this.x + this.canvas_width - this.background_speed, this.y, this.canvas_width, this.canvas_height);
        } else if (input.is_moving_backwords()) {
            //Todo 
            //*Make The animation go right when the player is moving backwards


        }


    }
}