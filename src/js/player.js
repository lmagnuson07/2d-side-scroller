

export class Player {
    constructor(game){
        this.game = game;
        this.width = 360;
        this.height = 384;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.speed = 0;
        this.maxSpeed = 20;
        this.controlFps = 60;
        this.controlFpsInterval = 1000 / this.controlFps;
        this.controlFpsTimer = 0;
    }
    update(inputKeys, deltaTime){
        // horizontal movement
        if (this.controlFpsTimer > this.controlFpsInterval){
            this.controlFpsTimer -= this.controlFpsInterval;
            this.x += this.speed;
        } else {
            this.controlFpsTimer += deltaTime;
        }
        if (inputKeys.includes('d')) this.speed = this.maxSpeed;
        else if (inputKeys.includes('a')) this.speed = -this.maxSpeed;
        else this.speed = 0;

        // horizontal boundries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
    }
    draw(ctx){
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}
