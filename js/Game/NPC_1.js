const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
const Number_of_Enemies = 10;
let game_frame = 0

let Enemy_array = [];
let number_of_sprites_of_ghost = 10;

class ENEMY {
    constructor() {
        this.GHOST = new Image();
        this.GHOST.src = "enemy4.png"
        this.speed = Math.random() * 4 + 1
        this.SPRITE_WIDTH = 213;
        this.SPRITE_HEIGHT = 213;
        this.width = this.SPRITE_WIDTH / 2.5;
        this.height = this.SPRITE_HEIGHT / 2.5;
        this.y = Math.random() * (canvas.height - this.height);
        this.x = Math.random() * (canvas.width - this.width);
        this.newX = Math.random() * (canvas.height - this.height);
        this.newY = Math.random() * (canvas.width - this.width);
        this.frames = 0;
        this.flap_speed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 200 + 50)
    }
    update() {
        //this.x -= this.speed
        if (game_frame % this.interval === 0) {
            this.newX = Math.random() * (canvas.height - this.height);
            this.newY = Math.random() * (canvas.width - this.width);
        }
        let dx = this.x - this.newX
        let dy = this.y - this.newY
        this.x -= dx / 20
        this.y -= dy / 20
        //*  Math.sin(this.angle * Math.PI / 90) :  Here these 90 and 270 is the horizontal and vertical relation between each other like for every 3 horizontal waves/ocilation 
        //* There should be 1 vertical ocilation / wave  90/270 = 1/3
        //this.x = 0
        if (this.x + this.width < 0) this.x = canvas.width
        // this.y += this.sin_depth * Math.sin(this.angle)
        //this.y = 0
        this.angle += this.angleSpeed
        if (game_frame % this.flap_speed === 0) {
            this.frames > 4 ? this.frames = 0 : this.frames++;
        }
    }
    draw() {
        ctx.drawImage(this.GHOST, this.frames * this.SPRITE_WIDTH, 0, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.x, this.y, this.width, this.height);
    }
}

for (let i = 0; i < Number_of_Enemies; i++) {
    Enemy_array.push(new ENEMY());
}

let generate_enemy = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    Enemy_array.forEach((enemy) => {
        enemy.update();
        if (enemy.x > CANVAS_WIDTH) enemy.x = 0;
        if (enemy.y > CANVAS_HEIGHT) enemy.y = 0;
        enemy.draw();
    });
    game_frame++;
    requestAnimationFrame(generate_enemy);
}

generate_enemy();
