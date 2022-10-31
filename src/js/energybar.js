export class EnergyBar {
    constructor(game){
        this.game = game;
        this.x = 20;
        this.y = 140;
        this.width = 140;
        this.height = 36;
        //this.maxEnergy = 100;
        this.maxWidth = this.width;
        this.energy = this.maxEnergy;
        this.color = "#14532d";
        this.noEnergy = false;
    }
    draw(ctx){
        ctx.save();
        ctx.strokeStyle = "000";
        ctx.lineWidth = 3;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.roundRect(ctx, this.x, this.y, this.maxWidth, this.height);
        ctx.restore();
    }
    update(deltaTime, energyModifier){
        if (this.game.controlFpsTimer > this.game.controlFpsInterval){
            this.game.controlFpsTimer -= this.game.controlFpsInterval;
            this.game.energy += energyModifier;

            if (this.game.energy >= this.game.maxEnergy) this.game.energy = this.game.maxEnergy;
            else if (this.game.energy <= 0) this.game.energy = 0;
            this.width = (this.game.energy / this.game.maxEnergy) * this.maxWidth;

            if (this.game.energy === 0) this.noEnergy = true;
            if (this.game.energy > this.game.maxEnergy * 0.99 && this.noEnergy) this.noEnergy = false;
        } else {
            this.game.controlFpsTimer += deltaTime;
        }
    }
    roundRect(ctx, x, y, width, height, radius = 6){
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
        
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        ctx.stroke();
      }
}