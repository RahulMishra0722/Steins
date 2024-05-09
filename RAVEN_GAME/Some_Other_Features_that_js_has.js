document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas2')
    const ctx = canvas.getContext('2d')
    canvas.width = 800
    canvas.height = 700
    let lastTime = 0

    class Game {
        constructor(ctx, width, height) {
            this.ctx = ctx
            this.width = width
            this.height = height
            this.enemies = []
            this.enemyInterval = 500
            this.spawnEnemy = 0
            this.enemyTypes = ['worm', 'ghost', 'spider']
        }
        update(deltaTime) {
            if (this.spawnEnemy > this.enemyInterval) {
                this.#addNewEnemy()
                this.spawnEnemy = 0
            } else {
                this.spawnEnemy += deltaTime
            }
            this.enemies = this.enemies.filter((obj) => !obj.isMarkedForDeletion)
            this.enemies.forEach((obj) => {
                obj.update(deltaTime)
            })
            console.log(this.enemies)
        }
        draw(ctx) {
            this.enemies.forEach((obj) => {
                obj.draw(this.ctx)
            })
        }
        #addNewEnemy() {
            let randomSlelector = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)]
            if (randomSlelector === 'ghost') this.enemies.push(new Ghost(this))
            else if (randomSlelector === 'worm') this.enemies.push(new Worm(this))
            else if (randomSlelector === 'spider') this.enemies.push(new Spider(this))
            /*  this.enemies.sort((a, b) => {
                  return a.y - b.y
              })*/

        }
    }
    class Enemy {
        constructor(game) {
            this.game = game
            this.isMarkedForDeletion = false
            this.frameX = 0
            this.maxFrame = 5
            this.frameInterval = 200
            this.frameTimer = 0

        }
        update(deltaTime) {

            // Update frame animation
            if (this.frameTimer > this.frameInterval) {
                this.frameX = (this.frameX + 1) % this.maxFrame; // Increment frameX and loop
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }

            // Mark for deletion if enemy moves out of the screen
            if (this.x < 0 - this.width) {
                this.isMarkedForDeletion = true;
            }
            // Update position
            this.x -= this.xVelocity;
        }

        draw(ctx) {
            // Draw image
            if (this.image) {
                ctx.drawImage(
                    this.image,
                    this.frameX * this.Sprite_Width,
                    0,
                    this.Sprite_Width,
                    this.Sprite_Height,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }
        }

    }
    class Worm extends Enemy {
        constructor(game) {
            super(game);
            this.image = new Image()
            this.image.src = "enemy_worm.png";
            this.Sprite_Width = 229;
            this.Sprite_Height = 171;
            this.width = this.Sprite_Width / 2;
            this.height = this.Sprite_Height / 2;
            this.x = game.width;
            this.y = this.game.height - this.height
            this.xVelocity = Math.random() * 5;
            this.yVelocity = Math.random() * game.height;
        }
    }
    class Ghost extends Enemy {
        constructor(game) {
            super(game);
            this.image = ghost
            this.Sprite_Width = 261;
            this.Sprite_Height = 209;
            this.x = game.width;
            this.y = Math.random() * (canvas.height * 0.6);
            this.width = this.Sprite_Width / 2;
            this.height = this.Sprite_Height / 2;
            this.xVelocity = Math.random() * 5;
            this.yVelocity = Math.random() * game.height;
            this.angle = 0;
            this.curve = Math.random() * 7
        }
        update(deltaTime) {
            super.update(deltaTime);
            this.y += Math.sin(this.angle) * this.curve;
            this.x -= this.xVelocity; // Move the ghost horizontally
            this.angle += 0.05; // Increase the angle increment for smoother motion
        }
        draw(ctx) {
            ctx.save()
            ctx.globalAlpha = 0.5
            super.draw(ctx)
            ctx.restore()
        }
    }
    class Spider extends Enemy {
        constructor(game) {
            super(game);
            this.game = game
            this.image = spider
            this.Sprite_Width = 310;
            this.Sprite_Height = 175;
            this.width = this.Sprite_Width / 2;
            this.height = this.Sprite_Height / 2;
            this.x = Math.random() * this.game.width;
            this.y = 0 - this.height
            this.xVelocity = 0
            this.yVelocity = Math.random() * 0.1 + 0.1
            this.maxlength = Math.random() * this.game.height
        }
        update(deltaTime) {
            super.update(deltaTime)
            this.y += this.yVelocity * deltaTime
            if (this.y < 0 - this.height * 2) this.isMarkedForDeletion = true
            if (this.y > this.maxlength) this.yVelocity *= -1

        }

        draw(ctx) {
            ctx.beginPath()
            ctx.moveTo(this.x + this.width / 2, 0)
            ctx.lineTo(this.x + this.width / 2, this.y + 10)
            ctx.stroke()
            super.draw(ctx)
        }
    }

    const game = new Game(ctx, canvas.width, canvas.height)

    const animate = (timestamp) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        let deltaTime = timestamp - lastTime
        lastTime = timestamp

        game.update(deltaTime)
        game.draw()
        requestAnimationFrame(animate)
    }
    animate(0)
})
