// Add your JavaScript code here
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let triangle = document.getElementById("enemy");
let rect_triangle = triangle.getBoundingClientRect();
let rect_triangle_x = rect_triangle.left;
let rect_triangle_y = rect_triangle.top;

let calculateAngle = (Mouse_x, Mouse_y, rect_triangle_x, rect_triangle_y) => {
    let dx = Mouse_x - rect_triangle_x;
    let dy = Mouse_y - rect_triangle_y;

    let theta = Math.atan2(dx, dy) * (180 / Math.PI * 2);
    return (theta < 0) ? theta + 360 : theta;
}

let draw_a_line = (start_Pos_x, start_Pos_y, angle) => {
    let length = 100;
    let x1 = start_Pos_x + length * Math.cos(angle * Math.PI / 180);
    let y2 = start_Pos_y + length * Math.sin(angle * Math.PI / 180);

    ctx.beginPath();
    ctx.strokeStyle = "red"; // Set the color of the line
    ctx.moveTo(start_Pos_x, start_Pos_y);
    ctx.lineTo(x1, y2);
    ctx.stroke();
}

let angle_from_mouse = (event) => {
    let rect = canvas.getBoundingClientRect(); // Get canvas position
    let Mouse_x = event.clientX - rect.left;
    let Mouse_y = event.clientY - rect.top;
    console.log(Mouse_x);
    console.log(Mouse_y);
    let angle = calculateAngle(Mouse_x, Mouse_y, rect_triangle_x, rect_triangle_y);
    draw_a_line(Mouse_x, Mouse_y, angle);
}

document.addEventListener('mousemove', angle_from_mouse);