function updateBirdPosition(newX, newY) {

    let enemy = document.getElementById("enemy");
    let rect_enemy = enemy.getBoundingClientRect();
    let rect_enemy_x = rect_enemy.left;
    let rect_enemy_y = rect_enemy.top;
    let rect_enemy_width = rect_enemy.width;
    let rect_enemy_height = rect_enemy.height;
    let container = document.getElementById("container")

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

            if (dx <= 20 && dy <= 20) {
                return 20
            }

            const distX = Math.max(dx, 0);
            const distY = Math.max(dy, 0);

            return Math.sqrt(distX * distX + distY * distY);


        }

    }
    let distance_from_ememy = new CalculateDistanceFromRectangles(newX, newY, rect_enemy_x, rect_enemy_y, rect_enemy_width, rect_enemy_height);
    let dist = distance_from_ememy.calculateDistance();

    if (dist === 20) {
        let bullets = document.createElement("div");
        bullets.classList.add("bullet");
        bullets.style.width = "20px";
        bullets.style.height = "20px";
        bullets.style.borderRadius = "50%";
        bullets.style.backgroundColor = "white";
        bullets.style.position = "absolute";
        bullets.style.top = "50%";
        bullets.style.left = "50%";
        bullets.style.transform = "translate(-50%, -50%)";
        container.appendChild(bullets);

    } else {
        let bullets = container.querySelector(".bullet");
        if (bullets) {
            container.removeChild(bullets);
        }
    }
}
export { updateBirdPosition };
