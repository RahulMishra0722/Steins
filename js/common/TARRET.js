let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let turret = document.getElementById("enemy");

let bullets = [];

// Function to calculate the angle between two points
function calculateAngle(playerX, playerY, turretX, turretY) {
    let deltaX = turretX - playerX;
    let deltaY = turretY - playerY;
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    return (angle < 0) ? angle + 360 : angle;
}

function launchBullet(playerX, playerY, angle) {
    let speed = 5; // Adjust the speed as needed
    let velocityX = Math.cos(angle) * speed;
    let velocityY = Math.sin(angle) * speed;
    bullets.push({ x: playerX, y: playerY, vx: velocityX, vy: velocityY });
}

function updateBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].x += bullets[i].vx;
        bullets[i].y += bullets[i].vy;
    }
}

function drawBullets() {
    for (let i = 0; i < bullets.length; i++) {
        ctx.beginPath();
        ctx.arc(bullets[i].x, bullets[i].y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "red"; // Set the color of the bullets
        ctx.fill();
        ctx.closePath();
    }
}

function updateBirdPosition(newX, newY) {
    // Calculate angle between bird and turret
    let turretRect = turret.getBoundingClientRect();
    let turretX = turretRect.left + turretRect.width / 2;
    let turretY = turretRect.top + turretRect.height / 2;
    let angle = calculateAngle(newX, newY, turretX, turretY);

    // Launch bullet towards the turret
    launchBullet(newX, newY, angle);

    // Update bullets positions
    updateBullets();

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bullets
    drawBullets();
}

export { updateBirdPosition };
