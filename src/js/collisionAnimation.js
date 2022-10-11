export class CollisionAnimation {
    constructor(game, x, y){
        this.game = game;
        this.image = document.getElementById('boom');
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxFrame = 4;
        // this.angle = Math.random() * 6.2; //360 degrees is roughly 6.2 radians
        this.markedForDeletion = false;
        this.fps = Math.random() * 10 + 5;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
    }   
    draw(ctx){
        // ctx.save();
        // ctx.translate(this.x, this.y);
        // ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height);
        // ctx.restore();
    } 
    update(deltaTime){
        this.x -= this.game.speed;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer -= this.frameInterval;
            this.frameX++;
        } else {
            this.frameTimer += deltaTime;
        }
        if (this.frameX > this.maxFrame) this.markedForDeletion = true;
    }
}