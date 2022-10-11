export class FloatingMessage {
    constructor(value, x, y, targetX, targetY){
        this.value = value;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.markedForDeletion = false;
        this.timer = 0;
        this.controlFps = 60;
        this.controlFpsInterval = 1000 / this.controlFps;
        this.controlFpsTimer = 0;
    }
    update(deltaTime){
        this.timer += deltaTime;
        if (this.controlFpsTimer > this.controlFpsInterval){
            this.controlFpsTimer -= this.controlFpsInterval;
            this.x += (this.targetX - this.x) * 0.03;
            this.y += (this.targetY - this.y) * 0.03;
            if (this.timer > 1000) this.markedForDeletion = true;
        } else {
            this.controlFpsTimer += deltaTime;
        }
    }
    draw(ctx){
        ctx.font = '32px Lakki Reddy, cursive';
        ctx.fillStyle = 'black';
        ctx.fillText(this.value, this.x, this.y);
        ctx.fillStyle = 'white';
        ctx.fillText(this.value, this.x - 2, this.y -2);
    }
}