const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let game_frame = 0
let Number_of_Enemies = 1;
let Enemy_array = [];

class AnimateEnemy {
    constructor() {
        this.playerImg = new Image();
        this.playerImg.src = "enemy4.png";
        this.speed = Math.random() * 4 + 1
        this.SPRITE_WIDTH = 213;
        this.SPRITE_HEIGHT = 212;
        this.width = this.SPRITE_WIDTH / 2.5;
        this.height = this.SPRITE_HEIGHT / 2.5;
        this.y = Math.random() * (canvas.width - this.width);
        this.x = Math.random() * (canvas.height - this.height);
        this.frames = 0;
        this.flap_speed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0
        this.angleSpeed = Math.random() * 1.5 + 0.5
        //this.depth_at_which_sin_and_cosine_should_ocilate = Math.random() * 200
    }
    update() {
        //* In This Context
        `Sine calculates the wavelength or the "period" of oscillation. It determines how frequently the object moves back and forth horizontally.
        Cosine, on the other hand, calculates the amplitude, which determines how far up and down the object moves vertically from its central position.`
        this.x = canvas.width * Math.sin(this.angle * Math.PI / 90) + (canvas.width / 2 - this.width / 2);
        if (this.x + this.width < 0) this.x = canvas.width;
        // this.y += this.sin_depth * Math.sin(this.angle)
        this.y = canvas.height * Math.cos(this.angle * Math.PI / 270) + (canvas.height / 2 - this.height / 2);
        this.angle += this.angleSpeed;
        if (game_frame % this.flap_speed === 0) {
            this.frames > 7 ? this.frames = 0 : this.frames++
        }
    }
    draw() {
        //* EXPLAINATION:  ctx.drawImage(this.playerImg,
        //* this.frames * this.SPRITE_WIDTH, 0,
        //* this.SPRITE_WIDTH, this.SPRITE_HEIGHT,
        //* this.x, this.y,
        //* this.width, this.height);

        //! this.playerImg,
        //* 1st - ARGUMENT: playerImg: THE ENTIRE IMAGE OF THE PLAYER
        //! this.frames * this.SPRITE_WIDTH, 0,
        //* 2nd - Argument: { this.frames * this.SPRITE_WIDTH } INDICATES THE SPECIFIC LOCATION WITHIN THE IMAGE WE ARE REFERRING TO
        //* The expression 'this.frames * this.SPRITE_WIDTH' enables iteration through the player's animation frames.
        //* It resets to 0 if the maximum frame count is exceeded. 
        //* if (game_frame % this.flap_speed === 0) {
        //*    this.frames > 7 ? this.frames = 0 : this.frames++
        //! 0
        //* 3rd - Argument: 0 DENOTES THE Y-COORDINATE WHERE WE ARE REFERRING TO IN THE IMAGE in this case it is 0
        //!  this.SPRITE_HEIGHT,
        //* 4th - Argument:  this.SPRITE_WIDTH DETERMINES THE WIDTH OF THE PORTION OF THE IMAGE TO DISPLAY
        //! this.x
        //* this.x REPRESENTS THE X-COORDINATE ON THE CANVAS TO PLACE THE IMAGE
        //! this.y
        //* this.y REPRESENTS THE Y-COORDINATE ON THE CANVAS TO PLACE THE IMAGE
        //! this.width
        //* this.width SPECIFIES THE WIDTH OF THE IMAGE TO BE DISPLAYED
        //! this.height
        //* this.height DETERMINES THE HEIGHT OF THE IMAGE TO BE DISPLAYED
        ctx.drawImage(this.playerImg,
            this.frames * this.SPRITE_WIDTH, 0,
            this.SPRITE_WIDTH, this.SPRITE_HEIGHT,
            this.x, this.y,
            this.width, this.height);
    }
}
for (let i = 0; i < Number_of_Enemies; i++) {
    Enemy_array.push(new AnimateEnemy())
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    Enemy_array.forEach((enemy) => [
        enemy.update(),
        enemy.draw()
    ])
    game_frame++;
    requestAnimationFrame(animate);
}

animate(); // Start the animation loop
