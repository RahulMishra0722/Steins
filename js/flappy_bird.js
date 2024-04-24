import { updateBirdPosition } from "./common/common.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let pipe1 = document.getElementById("pipe1");
let pipe2 = document.getElementById("pipe2");
let portal = document.getElementById("portal")
let portal_exit = document.getElementById("portal_exit")
let floor = document.getElementById("floor")
let container = document.getElementById("container")


let is_in_portal = false
let last_known_Location = {
    x: [],
    y: []
};
let bird = {
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    vx: 0,
    vy: 0
};
let gravity = 7
let velocity = 0


document.addEventListener('keydown', function (e) {
    if (e.code === "KeyD") bird.vx = 6;
    if (e.code === "KeyA") bird.vx = -6;
    if (e.code === "KeyW") bird.vy = -6;
    if (e.code === "KeyS") bird.vy = 6;
});


document.addEventListener('keyup', function (e) {


    if (e.code === "KeyD") bird.vx = velocity;
    if (e.code === "KeyA") bird.vx = velocity;
    if (e.code === "KeyW" || e.code === "KeyS") bird.vy = gravity;
});


//!!Pipe_1
let rectX = pipe1.offsetLeft;
let rectY = pipe1.offsetTop;
let rectWidth = pipe1.offsetWidth;
let rectHeight = pipe1.offsetHeight;
//!!Pipe_2
let rectXP2 = pipe2.offsetLeft;
let rectYp2 = pipe2.offsetTop;
let rectP2Width = pipe2.offsetWidth;
let rectP2Height = pipe2.offsetHeight;
//!!Portal
let rect_portal = portal.getBoundingClientRect();
let rect_PortalX = rect_portal.left;
let rect_PortalY = rect_portal.top
let rect_portal_width = rect_portal.width
let rect_portal_hieght = rect_portal.height
//!!Portal_Exit
let rect_exit = portal_exit.getBoundingClientRect();
let rect_Portal_ExitX = rect_exit.left;
let rect_Portal_ExitY = rect_exit.top;
let rect_portal_exit_width = rect_exit.width
let rect_portal_exit_height = rect_exit.height
//!!floor
let rect_floor = floor.getBoundingClientRect();
let rect_floor_x = rect_floor.left
let rect_floor_y = rect_floor.top;
let rect_floor_width = rect_floor.width
let rect_floor_hight = rect_floor.height
let is_not_touching = false;

let is_Around_Terrret = false

export class CalculateDistanceFromRectangles {
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
class CalculateDistanceFromPortal {
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

        if (dx <= 0 && dy <= 0) {
            return 0
        }

        const distX = Math.max(dx, 0);
        const distY = Math.max(dy, 0);

        return Math.sqrt(distX * distX + distY * distY);


    }

}
const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (bird.y + 50 >= canvas.height) {
        bird.y = 0; // Resetting the bird's position
        return;
    }
    function attack() {
        let bullet = document.querySelectorAll(".bullet"); // Get all bullets
        bullet.forEach((bullet) => {
            bullet.style.top = bird.x + 10; // Set the top position to 200px
            bullet.style.left = bird.y + 10; // Set the left position to 300px
        });

    }


    bird.x += bird.vx
    bird.y += bird.vy

    updateBirdPosition(bird.x += bird.vx, bird.y += bird.vy)
    if (is_Around_Terrret) {
        last_known_Location.x.push(bird.x += bird.vx);
        last_known_Location.y.push(bird.y += bird.vy);

        if (last_known_Location.x.length > 10 && last_known_Location.y.length > 10) {
            let index_To_remove = 0; // Index of the oldest element
            last_known_Location.x.splice(index_To_remove, 1);
            last_known_Location.y.splice(index_To_remove, 1);
        }


    }

    ctx.fillStyle = 'yellow';


    ctx.fillRect(bird.x, bird.y, 50, 50);

    attack()


    let calculate1 = new CalculateDistanceFromRectangles(bird.x, bird.y, rectX, rectY, rectWidth, rectHeight);
    let calculate2 = new CalculateDistanceFromRectangles(bird.x, bird.y, rectXP2, rectYp2, rectP2Width, rectP2Height);
    let portal_distance = new CalculateDistanceFromPortal(bird.x, bird.y, rect_PortalX, rect_PortalY, rect_portal_width, rect_portal_hieght);
    let portal_exit_distance = new CalculateDistanceFromPortal(bird.x, bird.y, rect_Portal_ExitX, rect_Portal_ExitY, rect_portal_exit_width, rect_portal_exit_height);
    let floor_distance_from_player = new CalculateDistanceFromRectangles(bird.x, bird.y, rect_floor_x, rect_floor_y, rect_floor_width, rect_floor_hight);



    if (calculate1.calculateDistance() === 20 || calculate2.calculateDistance() === 20) {
        console.log("Oops collided with a pole");
        bird.x = 0;
        bird.y = 0;
    }

    if (portal_distance.calculateDistance() === 0) {
        is_in_portal = true;
        bird.x = rect_Portal_ExitX + 100;
        bird.y = rect_Portal_ExitY + 100;
    }

    if (portal_exit_distance.calculateDistance() === 0 && is_in_portal === true) {
        bird.x = rect_PortalX + 100;
        bird.y = rect_PortalY + 100;
    }

    if (floor_distance_from_player.calculateDistance() === 20) {
        // When the bird is touching the floor
        bird.vy = 0;
        gravity = 0;

    } else {
        // When the bird is not touching the floor
        gravity = 6;
    }

    requestAnimationFrame(update);

};

update();

