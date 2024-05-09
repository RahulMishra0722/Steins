const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

class Enemy {
    constructor() {
        this.stagger_Frame = 10;
        this.game_frame = 0;
        this.SPRITE_WIDTH = 128.8;
        this.SPRITE_HEIGHT = 133.33333333333334;
        this.Tiger = new Image();
        this.Tiger.src = "some.png";
        this.width = this.SPRITE_WIDTH;
        this.height = this.SPRITE_HEIGHT;
        this.x = 0;
        this.y = 0;
        this.frameIndex = 0;

        this.Animation_States = [
            {
                name: "run",
                frames: 4
            },
            {
                name: "run_and_shoot",
                frames: 4
            },
            {
                name: "throw_punches",
                frames: 4
            },
        ];

        this.player_State = "throw_punches";
        this.updateFrameLocations();
    }

    updateFrameLocations() {
        this.Animation_States.forEach(element => {
            let frames = [];
            for (let i = 0; i < element.frames; i++) {
                let X_Position = i * this.SPRITE_WIDTH;
                let Y_Position = this.Animation_States.indexOf(element) * this.SPRITE_HEIGHT;
                //* To understand how y retrives y just think what would happend if you added the same height twice :
                //* Youll get to the second row if you add thrice you get to the third row and so on so when we muliply we do the same thing we find what row are we on
                //* then muluply that by height giving us the y cordinate of the whole line for INSTANCE height: 200 and indexof function returns 0 we when you do height * 200
                //* you get 0 which means you are at the first row of the sprite sheet 
                frames.push({ x: X_Position, y: Y_Position });
            }
            element.frames = frames;
        });
    }

    draw() {
        if (this.player_State && this.Animation_States.find(state => state.name === this.player_State)) {
            let state = this.Animation_States.find(state => state.name === this.player_State);
            //* Find the what animation state we are on
            let position = Math.floor(this.game_frame / this.stagger_Frame) % state.frames.length;
            //* incrrease or decrease the spped of the animation 
            //!also the % modulo is used for resetting the frame back to what it was 
            let frame_x = state.frames[position].x; //*Find the x of the current animation state that we updated above in the updateFrameLocations function
            let frame_y = state.frames[position].y; //*Find the y of the current animation state and pass it draw image 
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.drawImage(this.Tiger, frame_x, frame_y, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 0, 0, this.SPRITE_WIDTH, this.SPRITE_HEIGHT);
            this.game_frame++;
        } else {
            console.error("Player state is invalid or Animation state does not exist:", this.player_State);
        }
    }
}
const enemy = new Enemy();

const animate = () => {
    enemy.draw();
    requestAnimationFrame(animate);
};

animate();
