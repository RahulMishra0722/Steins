const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const colisionCanvas = document.getElementById('colisionCanvas')
const colisionCanvasCtx = colisionCanvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
colisionCanvas.width = window.innerWidth;
colisionCanvas.height = window.innerHeight;
let ravens = [];
let score = 0
ctx.font = '50px Impact'
let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;
let gameOver = false
let game_frame = 0;

class Raven {
    constructor() {
        this.SPRITE_WIDTH = 271;
        this.SPRITE_HEIGHT = 194;
        this.sizeModifier = Math.random() * 0.2 + 0.5
        this.width = this.SPRITE_WIDTH * this.sizeModifier;
        this.height = this.SPRITE_HEIGHT * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.positionX = Math.random() * 5 + 3;
        this.positionY = Math.random() * 5 - 2.5;
        this.isMarkedForDeletion = false;
        this.frame = 0;
        this.maxFrame = 4
        this.timeSinceLastFlapped = 0
        this.flapInterval = Math.random() * 50 + 50
        this.hasTrail = Math.random() > 0.5
        this.raven = new Image();
        this.randomColour = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.colors = 'rgb(' + this.randomColour[0] + ',' + this.randomColour[1] + ',' + this.randomColour[2] + ')';

        this.raven.onload = () => {
            this.draw();
        };
        this.raven.src = "raven.png";
    }

    update(deltaTime) {
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.positionY = this.positionY * -1
        }
        this.timeSinceLastFlapped += deltaTime
        if (this.timeSinceLastFlapped >= this.flapInterval) {
            this.frame++;
            this.timeSinceLastFlapped = 0
            if (this.hasTrail) {
                for (let i = 0; i < 5; i++) {
                    particles.push(new Particale(this.x, this.y, this.width, this.colors))
                }

            }

        }
        if (this.frame >= this.maxFrame) {
            this.frame = 0;
        }
        this.x -= this.positionX;
        if (this.x < 0 - this.width) this.isMarkedForDeletion = true;
        this.y += this.positionY;
        if (this.x < 0 - this.width) gameOver = true
    }

    draw() {
        colisionCanvasCtx.fillStyle = this.colors
        colisionCanvasCtx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(
            this.raven,
            this.frame * this.SPRITE_WIDTH,
            0,
            this.SPRITE_WIDTH,
            this.SPRITE_HEIGHT,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

let explosions = []
class Explotion {
    constructor(x, y, size) {
        this.SPRITE_WIDTH = 200;
        this.SPRITE_HEIGHT = 179;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = "boom.png";
        this.frame = 0;
        this.size = size
        this.audio = new Audio()
        this.audio.src = 'icei.wav'
        this.timeSinceLastFrame = 0
        this.frameinaterval = 200
        this.isMarkedForDeletion = false
    }
    update(deltaTime) {
        if (this.frame === 0) this.audio.play()
        this.timeSinceLastFrame += deltaTime
        if (this.timeSinceLastFrame > this.frameinaterval) {
            this.frame++
            this.timeSinceLastFrame = 0
            if (this.frame > 5) this.isMarkedForDeletion = true
        }

    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.SPRITE_WIDTH, 0, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.x, this.y - this.size / 4, this.size, this.size)
    }
}
let particles = []
class Particale {
    constructor(x, y, size, color) {
        this.size = size
        this.x = x + this.size / 2;
        this.y = y + this.size / 3;
        this.radius = Math.random() * this.size / 10
        this.maxRadius = Math.random() * 10 + 20
        this.speedX = Math.random() * 1 + 0.5
        this.color = color
        this.isMarkedForDeletion = false

    }
    update() {
        this.x += this.speedX
        this.radius += 0.1
        if (this.radius > this.maxRadius - 5) this.isMarkedForDeletion = true
    }
    draw() {
        ctx.save()
        ctx.globalAlpha = 1 - this.radius / this.maxRadius
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
    }
}
function updateScore() {
    ctx.fillStyle = "black"
    ctx.fillText('score: ' + score, 50, 75)
    ctx.fillStyle = "white"
    ctx.fillText('score: ' + score, 55, 80)
}
function game_Over() {
    ctx.fillStyle = 'black'
    ctx.fillText('GAME OVER, you Scored    ' + score, canvas.width * 0.4, canvas.height / 2)
}
window.addEventListener('click', function (e) {
    let ditectColour = colisionCanvasCtx.getImageData(e.x, e.y, 1, 1)
    console.log(ditectColour)
    let pc = ditectColour.data
    ravens.forEach((obj) => {
        if (obj.randomColour[0] === pc[0] && obj.randomColour[1] === pc[1] && obj.randomColour[2] === pc[2]) {
            obj.isMarkedForDeletion = true
            explosions.push(new Explotion(obj.x, obj.y, obj.width))
            console.log(explosions)
            score++
        }
    })
})
const animate = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    colisionCanvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    timeToNextRaven += deltaTime;
    lastTime = timestamp;

    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
    }

    [...particles, ...ravens, ...explosions].forEach(obj => obj.update(deltaTime));
    [...particles, ...ravens, ...explosions].forEach(obj => obj.draw())
    ravens.sort((a, b) => { return a.width - b.width })

    ravens = ravens.filter(object => !object.isMarkedForDeletion);
    explosions = explosions.filter(object => !object.isMarkedForDeletion)
    particles = particles.filter(object => !object.isMarkedForDeletion)

    if (!gameOver) requestAnimationFrame(animate);
    else game_Over()
};

animate(0); // Start the animation
