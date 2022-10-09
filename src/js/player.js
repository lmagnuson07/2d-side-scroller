import {
    IdleRight, IdleLeft,
    RunningRight, RunningLeft,
    JumpingRight, JumpingLeft, 
    FallingRight, FallingLeft,
    DodgingRight, DodgingLeft
} from './playerStates';

export class Player {
    constructor(game){
        this.game = game;
        // movement and position properties
        this.width = 180;
        this.height = 192;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.vy = 0;
        this.weight = 1;
        this.speed = 0;
        this.maxSpeed = 10;
        // image properties
        this.imageRight = document.getElementById('player');
        this.imageLeft = document.getElementById('playerMirrored');
        this.image = this.imageRight;
        // spritesheet frame properties
        this.frameX = -1;
        this.totalFrameX = -1;
        this.frameY = 0;
        this.maxFrame;
        // hitbox properties
        this.playerRadius = this.width * 0.5;
        this.playerRadiusModifier = 0.50;
        this.hitboxOffsetX = 0;
        this.hitboxOffsetY = 18;
        // sprite animation fps properties
        this.spriteFps = 30;
        this.spriteFrameInterval = 1000 / this.spriteFps;
        this.spriteFrameTimer = 0;
        // controls fps properties
        this.controlFps = 60;
        this.controlFpsInterval = 1000 / this.controlFps;
        this.controlFpsTimer = 0;
        // state properties
        this.states = [
            new IdleRight(this.game), new IdleLeft(this.game), 
            new RunningRight(this.game), new RunningLeft(this.game),
            new JumpingRight(this.game), new JumpingLeft(this.game), 
            new FallingRight(this.game), new FallingLeft(this.game),
            new DodgingRight(this.game), new DodgingLeft(this.game)
        ];
        this.currentState = null;
    }
    update(inputKeys, deltaTime){
        //console.log(inputKeys)
        this.checkCollision();
        this.currentState.handleInput(inputKeys);
        // Fps check
        if (this.controlFpsTimer > this.controlFpsInterval){
            // horizontal movement
            this.controlFpsTimer -= this.controlFpsInterval;
            this.x += this.speed;
           
            // vertical movement
            this.y += this.vy;
            if (!this.onGround()) this.vy += this.weight;
            else {
                this.vy = 0;
                // fixes a bug with the onCeiling method that was causing player to appear slightly below the bottom boundry. 
                this.y = this.game.height - this.height;
            }
        } else {
            this.controlFpsTimer += deltaTime;
        }

        // horizontal movement inputs
        if (inputKeys.includes('d')) this.speed = this.maxSpeed;
        else if (inputKeys.includes('a')) this.speed = -this.maxSpeed;
        else this.speed = 0;

        // horizontal boundries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        // Vertical boundries
        if (this.onCeiling()){
            this.vy = 0;
            this.y = 1;
        }

        // sprite animation
        if (this.spriteFrameTimer > this.spriteFrameInterval){
            this.spriteFrameTimer -= this.spriteFrameInterval;
            if (this.totalFrameX < this.maxFrame){
                this.frameX++;
                this.totalFrameX++;
                if (this.totalFrameX === this.game.frameXMaxFrame){
                    this.frameY++;
                    this.frameX = 0;
                }
                //console.log(`Initial totalFrameX: ${this.totalFrameX}/${this.maxFrame} FrameX: ${this.frameX} | FrameY ${this.frameY}`)
            } else {
                this.frameX = 0;
                this.totalFrameX = 0;
                this.frameY--;
                //console.log(`Reset totalFrameX: ${this.totalFrameX}/${this.maxFrame} FrameX: ${this.frameX} | FrameY ${this.frameY}`)
            }
        } else {
            this.spriteFrameTimer += deltaTime;
        }
    }
    draw(ctx){
        // hitboxes (toggle debug mode to see)
        if (this.game.debugMode){
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.arc(this.x + this.hitboxOffsetX + this.playerRadius, this.y + this.hitboxOffsetY + (this.height * 0.5), this.playerRadius * this.playerRadiusModifier, 
                0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.playerRadius, 
                0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        } 

        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height,
            this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height;
    }
    onCeiling(){
        return this.y <= 0;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollision(){
        this.game.enemies.forEach(enemy => {
            // the vy value makes the hitboxes overlap a bit when there is a collision vertically (player landing on enemy head)
            const dx = (enemy.x + enemy.hitboxOffsetX + enemy.enemyRadius) - (this.x + this.hitboxOffsetX + this.playerRadius);
            const dy = (enemy.y + enemy.hitboxOffsetY + enemy.enemyRadius) - (this.y + this.hitboxOffsetY + this.playerRadius);
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < (enemy.enemyRadius * enemy.enemyRadiusModifier) + (this.playerRadius * this.playerRadiusModifier)){
                this.game.gameOver = true;
            }
        });
    }
}
