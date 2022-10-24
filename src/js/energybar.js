export class EnergyBar {
    constructor(game){
        this.game = game;
        this.x = 20;
        this.y = 140;
        this.width = 140;
        this.height = 36;
        this.maxEnergy = 100;
        this.maxWidth = this.width;
        this.energy = this.maxEnergy;
        this.color = "green";
    }
    draw(ctx){
        ctx.save();
        ctx.strokeStyle = "000";
        ctx.lineWidth = 5;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.maxWidth, this.height);
        ctx.restore();
    }
    update(deltaTime, energyModifier){
        if (this.game.controlFpsTimer > this.game.controlFpsInterval){
            this.game.controlFpsTimer -= this.game.controlFpsInterval;
            this.game.energy += energyModifier;
            this.width = (this.energy / this.maxEnergy) * this.maxWidth;
        } else {
            this.controlFpsTimer += deltaTime;
        }
    }
}