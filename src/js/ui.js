export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Arial';
        this.heartsEmpty = document.getElementById('heartEmpty');
        this.heartsFull = document.getElementById('heartFull');
        this.heartsHalf = document.getElementById('heartHalf');
    }
    draw(ctx){
        ctx.save();
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = '#050402';
        ctx.shadowBlur = 0;
        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        ctx.textAlign = 'left';
        ctx.fillStyle = this.game.fontColor;
        // score
        ctx.fillText(`Score: ${this.game.score}`, 20, 50);
        // time
        ctx.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
        ctx.fillText(`Time: ${(this.game.time * 0.001).toFixed(1)}`, 20, 80);
        // lives

        // game messages
        ctx.restore();
    }
}