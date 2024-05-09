/*import { Explosion } from "./Explosions.js";

let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext('2d');
ctx.fillRect(20, 20, 20, 20)
let rect_triangle_x = 20
let rect_triangle_y = 20
let player_health = 10


export class Distance_Calculator {
    constructor(currentX, currentY) {
        this.currentX = currentX;
        this.currentY = currentY;
    }

    calculateDistance(Mouse_x, Mouse_y) {
        let distance = Math.sqrt(Math.pow(this.currentX - Mouse_x, 2) + Math.pow(this.currentY - Mouse_y, 2));
        let threshold = 1;
        if (distance < threshold) {
            rect_triangle_x = 0;
            rect_triangle_y = 0;
            return 0;
        }
        return distance;
    }

    calculate_when_to_shoot(Mouse_x, Mouse_y) {
        let distance = Math.sqrt(Math.pow(this.currentX - Mouse_x, 2) + Math.pow(this.currentY - Mouse_y, 2));
        let threshold = 400;
        if (distance <= threshold) {
            return 400;
        }
        return distance;
    }
}


function animateDots(startX, startY, endX, endY, dotRadius, dotColor, dotSpeed, Mouse_x, Mouse_y) {

    let distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    let dx = (endX - startX) / distance;
    let dy = (endY - startY) / distance;
    let currentX = startX;
    let currentY = startY;

    // Define the animation loop
    function animate() {
        if (currentX >= endX && currentY >= endY) {
            cancelAnimationFrame(animationID);
            return;
        }
        // Move towards the destination
        currentX += dx * dotSpeed;
        currentY += dy * dotSpeed;

        let dist = new Distance_Calculator(currentX, currentY);
        let distValue = dist.calculateDistance(Mouse_x, Mouse_y);

        if (distValue <= 0) {
            let explosion = new Explosion(currentY, currentY);
            player_health--
        }
        console.log(player_health)
        if (player_health <= 0) {
            let x = new Explosion(Mouse_x, Mouse_y);
            x.animate()
        }

        if (distValue <= 400) {
            ctx.beginPath();
            ctx.fillStyle = dotColor;
            ctx.arc(currentX, currentY, dotRadius, 0, Math.PI * 2);
            ctx.fill();

            animationID = requestAnimationFrame(animate);
        }
    }

    let animationID = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let dotRadius = 7;
let dotColor = "red";

let dotSpeed = 30;

canvas.addEventListener('mousemove', (event) => {
    let rect = canvas.getBoundingClientRect();
    let Mouse_x = event.clientX - rect.left;
    let Mouse_y = event.clientY - rect.top;

    let dist = new Distance_Calculator(Mouse_x, Mouse_y);
    let time_to_shoot = dist.calculate_when_to_shoot(Mouse_x, Mouse_y);
    if (time_to_shoot >= 400) {
        animateDots(rect_triangle_x, rect_triangle_y, Mouse_x, Mouse_y, dotRadius, dotColor, dotSpeed, Mouse_x, Mouse_y);
    }
});
*/