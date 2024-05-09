const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 800
const CANVAS_HEIGHT = canvas.height = 700

class ANIMATE {
    constructor() {
        this.pict = new Image()
        this.pict.src = "abc.png"
        this.SPRITE_WIDTH = 225
        this.SPRITE_HEIGHT = 225
        this.x = 0
        this.y = 0
        this.stagger_frame = 6
        this.game_frame = 0
        this.ANIMATIONS = [
            {
                name: "w",
                frames: 4
            },
            {
                name: "x",
                frames: 4
            },
            {
                name: "y",
                frames: 4
            },
        ]
        this.updateStatePosition()
        this.currenrt_state = "y"
    }
    updateStatePosition() {
        this.ANIMATIONS.forEach((row) => {
            let frames = []
            for (let i = 0; i < row.frames; i++) {
                let X_Position = i * this.SPRITE_WIDTH
                let Y_Position = this.ANIMATIONS.indexOf(row) * this.SPRITE_HEIGHT
                frames.push({ x: X_Position, y: Y_Position })
            }
            row.frames = frames
        })
    }
    draw() {
        if (this.currenrt_state && this.ANIMATIONS.find(state => state.name === this.currenrt_state)) {
            let state = this.ANIMATIONS.find(state => state.name === this.currenrt_state)
            let position = Math.floor(this.game_frame / this.stagger_frame) % state.frames.length

            let frame_x = state.frames[position].x
            let frame_y = state.frames[position].y
            ctx.drawImage(this.pict, frame_x, frame_y, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.x, this.y, this.SPRITE_WIDTH, this.SPRITE_HEIGHT)
            this.game_frame++
            console.log(frame_x)
        } else {
            console.error("state doesnt exist")
        }
    }
}
let frame = new ANIMATE()

const Animate = () => {
    frame.updateStatePosition
    frame.draw()
    requestAnimationFrame(Animate)
}
Animate()