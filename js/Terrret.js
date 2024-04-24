let enemy = document.getElementById("enemy");
let rect_enemy = enemy.getBoundingClientRect();
let rect_enemy_x = rect_enemy.left;
let rect_enemy_y = rect_enemy.top;
let rect_enemy_width = rect_enemy.width;
let rect_enemy_height = rect_enemy.height;






let bullets = document.createElement("div");
bullets.classList.add("bullet");
bullets.style.width = "20px";
bullets.style.height = "20px";
bullets.style.borderRadius = "50%";
bullets.style.backgroundColor = "white";
bullets.style.top = "50%";
bullets.style.left = "50%";
bullets.style.transform = "translate(-50%, -50%)";
container.appendChild(bullets);
console.log("alert")
