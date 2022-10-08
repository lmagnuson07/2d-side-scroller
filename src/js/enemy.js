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
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height,
            this.x, this.y, this.width * 0.25, this.height * 0.25);
    }
}

export class Beetle extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 1144;
        this.height = 1000;
        this.x = this.game.width;
        this.y = this.game.height - this.height * 0.25;
        this.image = document.getElementById('beetle');
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeedX = 8;
        this.maxFrame = 27;
        this.totalFrameX = 0;
        this.totalFrameY = 2;
    }
}