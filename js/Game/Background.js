let canvas = document.getElementById("canvas2");
let ctx = canvas.getContext('2d');
import { Game } from "./Charater_Animation.js";
import { Layer } from "./Layer.js";
const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;

let background_layer_1 = new Image();
background_layer_1.src = "layer_1.png";
let background_layer_2 = new Image();
background_layer_2.src = "layer_2.png";
let background_layer_3 = new Image();
background_layer_3.src = "layer_3.png";



let layer_1 = new Layer(background_layer_1, 1, CANVAS_WIDTH, CANVAS_HEIGHT)
let layer_2 = new Layer(background_layer_2, 1.5, CANVAS_WIDTH, CANVAS_HEIGHT)
let layer_3 = new Layer(background_layer_3, 2, CANVAS_WIDTH, CANVAS_HEIGHT)

const Game_Layers = [layer_1, layer_2, layer_3]
let char = new Game();

let background = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    char.animate()
    Game_Layers.forEach((layer) => {

        layer.update()
        layer.draw()
    })


    requestAnimationFrame(background);
};

background()
