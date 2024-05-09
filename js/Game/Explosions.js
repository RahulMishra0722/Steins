const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

let explosions = [];

class Explosion {
    constructor(x, y) {
        this.SPRITE_WIDTH = 200;
        this.SPRITE_HEIGHT = 179;
        this.width = this.SPRITE_WIDTH * 0.7;
        this.height = this.SPRITE_HEIGHT * 0.7;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = "boom.png";
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
        this.audio = new Audio()
        this.audio.src = 'icei.wav'
    }
    update() {
        if (this.frame === 0) this.audio.play()
        this.timer++;
        if (this.timer % 10 === 0) {
            this.frame++;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(
            this.image,
            this.SPRITE_WIDTH * this.frame,
            0,
            this.SPRITE_WIDTH,
            this.SPRITE_HEIGHT,
            0 - this.width / 2,
            0 - this.height / 2,
            this.width,
            this.height
        );
        ctx.restore(); // Restore the previous transformation matrix
    }
}

function createAnimation(e) {
    let mouse_x = e.clientX - canvas.getBoundingClientRect().left;
    let mouse_y = e.clientY - canvas.getBoundingClientRect().top;
    explosions.push(new Explosion(mouse_x, mouse_y));
}

window.addEventListener('click', createAnimation);
//window.addEventListener('mousemove', createAnimation);

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let i = 0; i < explosions.length; i++) {
        explosions[i].draw();
        explosions[i].update();
        if (explosions[i].frame === 5) {
            explosions.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}
animate();
