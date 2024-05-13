import { InputHandler } from "../js/Game/Input.js"
import { Layer } from "../js/Game/Layer.js";
window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas2');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 800;
    const CANVAS_HEIGHT = canvas.height = 700;
    const player_image = player_image1
    let lastTime = 0
    let game_over = false
    let enemies = []
    let shop_ani = shop_animation

    let val = 0


    let layer_4 = new Layer(shop_ani, 1, canvas.width, canvas.height)


    let player_state = "";

    let input = new InputHandler()
    class Player {
        constructor(gameWidth, gameHeight) {
            this.game_frame = 0;
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.frame_x;
            this.frame_y;
            this.SPRITE_WIDTH = 56;
            this.SPRITE_HEIGHT = 56;
            this.width = this.SPRITE_WIDTH * 3;
            this.height = this.SPRITE_HEIGHT * 3;
            this.groundLevel = canvas.height - this.height;
            this.x = 0;
            this.y = gameHeight - this.height;
            this.player_health = 100

            this.gravity = 10;
            this.vX = 0;
            this.maxFrame = 12;
            this.vY = 0

            this.Animation_States = [
                {
                    name: "idle",
                    frames: 6
                },
                {
                    name: "attack",
                    frames: 6
                },
                {
                    name: "run",
                    frames: 8
                },
                {
                    name: "run_and_jump",
                    frames: 8
                },
                {
                    name: "run_and_jumo_land",
                    frames: 8
                },
                {
                    name: "got_hit",
                    frames: 8
                },
                {
                    name: "dies",
                    frames: 3
                }
            ];

            this.frame_segment_location();
        }
        frame_segment_location() {
            this.Animation_States.forEach(element => {
                let frames = [];
                for (let i = 0; i < element.frames; i++) {
                    let X_Position = i * this.SPRITE_WIDTH;
                    let Y_Position = this.Animation_States.indexOf(element) * this.SPRITE_HEIGHT;
                    frames.push({ x: X_Position, y: Y_Position });
                }
                element.frames = frames;
            });
        }

        update(enemyArray) {

            if (input.is_moving_backwords()) {
                val--
            } else {
                if (input.isRunning() || input.ifForwardRollPressed()) {
                    val++

                }
            }

            layer_4.draw_shop(val)
            layer_4.draw_lamp(val)
            layer_4.update0()
            //*Colition Detection


            enemyArray.forEach(obj => {
                let dx = obj.x - this.x
                let dy = obj.y - this.y
                let distance = Math.sqrt(dx * dx + dy * dy)
                if (distance < obj.width / 2 + this.width / 2) {
                    this.player_health -= 0.1
                    if (this.player_health < 0) {
                        input.dead()
                        if (input.isDead()) {
                            player_state = "dies"
                            this.game_over()
                        }
                        this.player_health = 0
                    }


                } if (distance < obj.width / 2 + this.width / 2 && input.is_Attacking()) {
                    obj.enemy_health -= 7
                }
                if (obj.enemy_health < 0) {
                    obj.isMarkedForDeletion = true
                }
            })


            //* Controls
            if (input.isPlayerIdle()) {
                player_state = "idle";
            }
            if (input.is_moving_backwords() && !input.isRunning()) {
                player_state = "run_and_jump"
            }


            if (player_state && this.Animation_States.find(state => state.name === player_state)) {
                let state = this.Animation_States.find(state => state.name === player_state);

                let position = Math.floor(this.game_frame / this.maxFrame) % state.frames.length;

                this.frame_x = state.frames[position].x;
                this.frame_y = state.frames[position].y;
            }
            if (input.isSittingDown()) {
                player_state = 'sit'
            }
            if (input.is_Attacking()) {
                player_state = "attack"
            }

            if (input.jump_in_position() && !input.is_moving_backwords() && this.onGround()) {
                this.vY -= 20
            }
            // Check if the player is currently rolling and limit the height
            if (input.ifForwardRollPressed() && !input.is_moving_backwords() && this.onGround()) {
                player_state = 'roll';
                this.vX += 5
                this.vY -= 20
            }
            this.y += this.vY
            if (!this.onGround()) {
                this.vY += 1
                this.vX += 10
                player_state = "run_and_jumo_land"
            } else {
                this.vY = 0
            }

            if (this.vX > 700) this.vX = 700
            else if (this.vX <= 0) this.vX = 0
            this.x = this.vX
            this.y += this.vY

            if (this.x < 0) this.x = 0
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height
            if (input.isRunning() && !input.is_moving_backwords() && !input.is_Attacking()) {
                this.vX += 2
                player_state = "run";
            } else if (input.is_Attacking()) {
                player_state = "attack";
            } if (input.is_moving_backwords() && !input.isRunning()) {
                this.vX -= 10
            }
            if (input.wasHit()) {
                player_state = "got_hit";
            }
        }
        game_over() {
            ctx.font = '100px Ariel'
            ctx.fillStyle = "red"
            ctx.fillText("Game Over", 200, 350)
            ctx.font = '100px Ariel'
            ctx.fillStyle = "black"
            ctx.fillText("Game Over", 202, 350)
        }
        onGround() {
            return this.y >= this.gameHeight - this.height
        }

        show_Health() {
            ctx.font = '30px Arial'
            ctx.fillStyle = "black"
            ctx.fillText('HP: ' + Math.floor(this.player_health), 50, 75)
            ctx.fillStyle = "white"
            ctx.fillText('HP: ' + Math.floor(this.player_health), 52, 78)
        }

        draw(context) {

            context.beginPath();
            context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            context.strokeStyle = "transparent";
            context.stroke();
            context.drawImage(player_image, this.frame_x, this.frame_y, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.x, this.y, this.width, this.height);
            this.game_frame += 10;
        }
    }

    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.Sprite_Width = 159;
            this.Sprite_Height = 119;
            this.width = this.Sprite_Width / 2
            this.height = this.Sprite_Height / 2
            this.enemy = worm;
            this.frameX = 0;
            this.maxFrame = 5;
            // Position the enemy at the bottom right corner
            this.x = this.gameWidth - this.width; // Adjusted to bottom right corner
            this.y = this.gameHeight - this.height; // Adjusted to bottom right corner
            this.time_since_last_increased_frame = 0;
            this.fps = 20
            this.frameInterval = 1000 / this.fps;
            this.speed = Math.random() * 2 + 1
            this.isMarkedForDeletion = false
            this.enemy_health = 50

        }
        update(deltaTime) {

            if (this.time_since_last_increased_frame >= this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0
                else this.frameX++
                this.time_since_last_increased_frame = 0
            } else {
                this.time_since_last_increased_frame += deltaTime
            }


            new Player(this.gameWidth, this.gameHeight, this.x, this.y)

            if (this.x < 0 - this.width) {
                this.isMarkedForDeletion = true;
            }
            this.x -= this.speed
        }
        show_Health() {
            ctx.font = "20px Arial"
            ctx.fillStyle = 'black'
            ctx.fillText(this.enemy_health, this.width, this.x * 1.5, this.y * 1.5)
        }

        draw(context) {
            context.beginPath()
            context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2)
            context.stroke()
            if (this.enemy) {
                context.drawImage(
                    this.enemy,
                    this.frameX * this.Sprite_Width, // Adjusted for width
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

    let background_layer_1 = background0;
    let background_layer_2 = background1
    let background_layer_3 = background2;


    let layer_1 = new Layer(background_layer_1, 1, canvas.width, canvas.height)
    let layer_2 = new Layer(background_layer_2, 1.5, canvas.width, canvas.height)
    let layer_3 = new Layer(background_layer_3, 2, canvas.width, canvas.height)



    const Game_Layers = [layer_1, layer_2, layer_3]
    const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT);


    let i_spawn_enemies = 0
    let some_extra_delay = 2000
    let i_create_random_stall_before_creating_a_new_enemy = Math.random() * 2000 + 500


    const handleEnemies = (deltaTime) => {
        if (val > 1000) {
            if (i_spawn_enemies > i_create_random_stall_before_creating_a_new_enemy + some_extra_delay) {
                enemies.push(new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT))

                i_spawn_enemies = 0
            } else {
                i_spawn_enemies += deltaTime
            }
            enemies = enemies.filter((obj) => !obj.isMarkedForDeletion)
            enemies.forEach((enemy) => {
                enemy.draw(ctx)
                enemy.update(deltaTime)

            })
        }
    }
    const animate = (timestamp) => {
        let deltaTime = timestamp - lastTime
        lastTime = timestamp
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        Game_Layers.forEach((layer) => {
            layer.update()
            layer.draw()
        })
        layer_4.show_update(deltaTime)
        handleEnemies(deltaTime)
        player.update(enemies);
        player.draw(ctx);
        player.show_Health()



        if (!game_over) requestAnimationFrame(animate);
    };
    animate(0);
});
