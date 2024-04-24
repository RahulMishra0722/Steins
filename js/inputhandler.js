let gravity = 7
let velocity = 0


document.addEventListener('keydown', function (e) {
    if (e.code === "KeyD") bird.vx = 6;
    if (e.code === "KeyA") bird.vx = -6;
    if (e.code === "KeyW") bird.vy = -6;
    if (e.code === "KeyS") bird.vy = 6;
});


document.addEventListener('keyup', function (e) {
    console.log(is_not_touching)

    if (e.code === "KeyD") bird.vx = velocity;
    if (e.code === "KeyA") bird.vx = velocity;
    if (e.code === "KeyW" || e.code === "KeyS") bird.vy = gravity;
});

