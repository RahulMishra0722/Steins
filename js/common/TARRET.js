let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let bullets = {
    x: [],
    y: []
};

function updateBirdPosition(newX, newY) {
    let enemy = document.getElementById("enemy");
    let rect_enemy = enemy.getBoundingClientRect();
    let rect_enemy_x = rect_enemy.left;
    let rect_enemy_y = rect_enemy.top;
    let rect_enemy_width = rect_enemy.width;
    let rect_enemy_height = rect_enemy.height;
    let container = document.getElementById("container");

    let bird = {
        x: 50,
        y: 50,
        width: 50,
        height: 50,
        vx: 0,
        vy: 0
    };

    class CalculateDistanceFromRectangles {
        constructor(birdX, birdY, rectX, rectY, rectWidth, rectHeight) {
            this.pointX = birdX + bird.width / 2;
            this.pointY = birdY + bird.height / 2;
            this.rectCenterX = rectX + rectWidth / 2;
            this.rectCenterY = rectY + rectHeight / 2;
            this.rectWidth = rectWidth;
            this.rectHeight = rectHeight;
        }

        calculateDistance() {
            const dx = Math.abs(this.pointX - this.rectCenterX) - this.rectWidth / 2;
            const dy = Math.abs(this.pointY - this.rectCenterY) - this.rectHeight / 2;
            return Math.sqrt(Math.max(dx, 0) ** 2 + Math.max(dy, 0) ** 2);
        }
    }

    let distance_from_enemy = new CalculateDistanceFromRectangles(newX, newY, rect_enemy_x, rect_enemy_y, rect_enemy_width, rect_enemy_height);
    let dist = distance_from_enemy.calculateDistance();

    if (dist <= 500) {
        follow(newX, newY);
    } else {
        bullets.x = [];
        bullets.y = [];
    }

    function follow(newX, newY) {
        bullets.x.push(newX);
        bullets.y.push(newY);
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bullets
    for (let i = 0; i < bullets.x.length; i++) {
        ctx.beginPath();
        ctx.arc(bullets.x[i], bullets.y[i], 10, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}

export { updateBirdPosition };
