let x = []
let y = []

let asyncFunction = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("waiting here lol")
        }, 1000)
    })
}

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

            if (dx <= 200 && dy <= 200) {
                return 200
            }

            const distX = Math.max(dx, 0);
            const distY = Math.max(dy, 0);

            return Math.sqrt(distX * distX + distY * distY);


        }

    }
    let distance_from_ememy = new CalculateDistanceFromRectangles(newX, newY, rect_enemy_x, rect_enemy_y, rect_enemy_width, rect_enemy_height);

    let dist = distance_from_ememy.calculateDistance();

    if (dist === 200) {
        asyncFunction()
        x.push(newX)
        y.push(newY)
        let last_val = x[x.length - 1]
        let last_y_val = y[y.length - 1]
        console.log(last_val)
        let bullets = document.createElement("div");
        bullets.classList.add("bullet");
        bullets.style.width = "20px";
        bullets.style.height = "20px";
        bullets.style.borderRadius = "50%";
        bullets.style.backgroundColor = "white";
        bullets.style.position = "absolute";
        bullets.style.top = last_y_val + "px";
        bullets.style.left = last_val + "px";
        bullets.style.transform = "translate(-50%, -50%)";
        container.appendChild(bullets);
        function attack() {
            let bullet = document.querySelector(".bullet");


        }

        // Call the attack function whenever necessary
        attack();


    } else {
        let bullets = container.querySelector(".bullet");
        if (bullets) {
            container.removeChild(bullets);
        }
    }
}
export { updateBirdPosition };
