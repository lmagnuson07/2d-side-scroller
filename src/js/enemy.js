class Enemy {
    constructor(){
        this.controlFps = 60;
        this.controlFpsInterval = 1000 / this.controlFps;
        this.controlFpsTimer = 0;
        this.markedForDeletion = false;
    }   
    update(deltaTime){
        // horizontal movement
        if (this.controlFpsTimer > this.controlFpsInterval){
            this.controlFpsTimer -= this.controlFpsInterval;
            this.x -= this.speedX;
        } else {
            this.controlFpsTimer += deltaTime;
        }
        this.speedX = this.maxSpeedX;

        // off screen check
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(ctx){
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

export class SquareEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 400;
        this.height = 400;
        this.speedX = 0;
        this.maxSpeedX = 20;
        this.x = this.game.width - this.width;
        this.y = this.game.height - this.height;
    }
}