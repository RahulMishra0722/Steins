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
        this.frameInterval = 200
        this.current_frame = 0
        this.maxFrame = 5
        this.frame = 0
        this.abc = 0
    }
    update() {
        this.x -= this.background_speed;
        if (this.x <= - this.canvas_width) {
            this.x = 0;
        }
    }

    draw() {
        if (input.ifForwardRollPressed() || input.isRunning() || input.jump_in_position() || input.is_moving_backwords()) {
            this.background_speed = this.backSppedSaver;
            this.backgroundCanvasctx.drawImage(this.image, this.x, this.y, this.canvas_width, this.canvas_height);
            this.backgroundCanvasctx.drawImage(this.image, this.x + this.canvas_width - this.background_speed, this.y, this.canvas_width, this.canvas_height);
        } else if (input.isPlayerIdle() || input.isSittingDown() || input.is_Attacking()) {
            this.background_speed = 0
            this.backgroundCanvasctx.drawImage(this.image, this.x, this.y, this.canvas_width, this.canvas_height);
            this.backgroundCanvasctx.drawImage(this.image, this.x + this.canvas_width - this.background_speed, this.y, this.canvas_width, this.canvas_height);
        } else if (input.is_moving_backwords()) {

        }
    }



    show_update(deltaTime) {

        if (this.current_frame >= this.frameInterval) {
            if (this.frame >= this.maxFrame) this.frame = 0
            else this.frame++
        } else {
            this.current_frame += deltaTime
        }
    }
    draw_shop(distanceTraveled) {
        console.log(distanceTraveled)
        let shop_ani = shop_animation
        const Sprite_Width = 118
        const Sprite_Height = 128
        const width = Sprite_Width * 2
        const height = Sprite_Height * 2

        const slideSpeed = 1; // Adjust this value to control the speed of sliding

        // Calculate the x-coordinate based on distance traveled
        const slideOffset = distanceTraveled * slideSpeed;

        // Calculate the position where the image starts to disappear
        const slideDisappearPosition = this.canvas_width - width;

        // Draw the image if it's still visible on the canvas
        if (this.canvas_width - slideOffset > 0) {
            // Draw the image with the adjusted x-coordinate
            this.backgroundCanvasctx.drawImage(
                shop_ani,
                this.frame * Sprite_Width,
                0,
                Sprite_Width,
                Sprite_Height,
                this.canvas_width - width - slideOffset, // Adjusted x-coordinate for sliding
                this.canvas_height - height,
                width,
                height
            );
        } else if (slideOffset > slideDisappearPosition) {
            // If the image has slid beyond the canvas width, but not completely disappeared
            const remainingSlide = slideOffset - slideDisappearPosition;
            // Draw the remaining part of the image within the canvas
            this.backgroundCanvasctx.drawImage(
                shop_ani,
                this.frame * Sprite_Width + width, // Adjusted x-coordinate for the remaining part
                this.x,
                Sprite_Width - remainingSlide, // Adjusted width for the remaining part
                Sprite_Height,
                0,
                this.canvas_height - height,
                width - remainingSlide, // Adjusted width for the remaining part
                height
            );
        }


    }

}