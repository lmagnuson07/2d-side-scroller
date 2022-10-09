class Enemy {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.markedForDeletion = false;
        // sprite fps
        this.spriteFps = 30;
        this.spriteFrameInterval = 1000 / this.spriteFps;
        this.spriteFrameTimer = 0;
        // control fps
        this.controlFps = 60;
        this.controlFpsInterval = 1000 / this.controlFps;
        this.controlFpsTimer = 0;
    }   
    update(deltaTime){
        // horizontal movement
        if (this.controlFpsTimer > this.controlFpsInterval){
            this.controlFpsTimer -= this.controlFpsInterval;
            this.x -= this.speedX + this.game.speed;
        } else {
            this.controlFpsTimer += deltaTime;
        }
        this.speedX = this.maxSpeedX;

        // sprite animation
        if (this.spriteFrameTimer > this.spriteFrameInterval){
            this.spriteFrameTimer -= this.spriteFrameInterval;
            if (this.totalFrameX < this.maxFrame){
                this.frameX++;
                this.totalFrameX++;
                if (this.totalFrameX % this.game.frameXMaxFrame === 0){
                    this.frameY++;
                    this.frameX = 0;
                }
                //console.log(`Initial totalFrameX: ${this.totalFrameX}/${this.maxFrame} FrameX: ${this.frameX} | FrameY ${this.frameY}`)
            } else {
                this.frameX = 0;
                this.totalFrameX = 0;
                this.frameY = 0;
                //console.log(`Reset totalFrameX: ${this.totalFrameX}/${this.maxFrame} FrameX: ${this.frameX} | FrameY ${this.frameY}`)
            }
        } else {
            this.spriteFrameTimer += deltaTime;
        }

        // off screen check
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(ctx){
        let radius = this.width * 0.5;

        if (this.game.debugMode){
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.arc(this.x + radius, this.y + this.height * 0.5, radius, 
                0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 
                0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height,
            this.x, this.y, this.width, this.height);
    }
}

export class Beetle extends Enemy {
    constructor(game){
        super();
        this.enemyType = "Beetle";
        this.game = game;
        this.width = 143;
        this.height = 125;
        this.x = this.game.width;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('beetle');
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeedX = 5;
        this.maxFrame = 27;
        this.totalFrameX = 0;
        this.totalFrameY = 2;
    }
}