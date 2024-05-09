class Enemy {
    constructor(ctx, gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.ctx = ctx
        this.Enemy_SPRITE_WIDTH = 229
        this.Enemy_SPRITE_HEIGHT = 171
        this.width = this.Enemy_SPRITE_WIDTH
        this.height = this.Enemy_SPRITE_HEIGHT
        this.enemy = enemy
        this.frame = 0
        this.maxFrame = 6
        this.x = Math.random() * 10
        this.y = 0
    }
    update() {
        if (this.frame > this.maxFrame) {
            this.frame++
        } else {
            this.frame = 0
        }
    }
    draw() {
        this.ctx.drawImage(this.enemy, this.Enemy_SPRITE_WIDTH, 0, this.Enemy_SPRITE_WIDTH, this.Enemy_SPRITE_HEIGHT, this.x, this.Enemy_SPRITE_HEIGHT, this.width, this.height)
    }
}