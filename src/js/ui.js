export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30; 
        this.fontFamily = 'Lakki Reddy, cursive';
        this.heartEmpty = document.getElementById('heartEmpty');
        this.heartFull = document.getElementById('heartFull');
        this.heartHalf = document.getElementById('heartHalf');
        this.heartArray = [];
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
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        if (this.game.lives !== this.game.totalLives){
            let flag = false;
            this.heartArray = this.heartArray.map((heart, i) => {
                if (Math.floor(this.game.lives * 0.5) === i){
                    flag = true;
                    if (this.game.lives % 2 !== 0){
                        return heart = this.heartHalf;
                    } else {
                        return heart = this.heartEmpty;
                    }
                }
                else {
                    if (flag){
                        return heart = this.heartEmpty;
                    } else {
                        return heart = this.heartFull;
                    }
                }
            });
        }
        this.heartArray.forEach((heart, i) => {
            ctx.drawImage(heart, 25 * i + 20, 95, 25, 25);
        });
        // game messages
        ctx.textAlign = 'center';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = '#000';
        ctx.font = `${this.fontSize * 2}px ${this.fontFamily}`;
        if (this.game.gameOver){
            ctx.fillText('Sorry...', this.game.width * 0.5, this.game.height * 0.5 - 20);
            ctx.font = `${this.fontSize}px ${this.fontFamily}`;
            ctx.fillText(`Better luck next time!`, this.game.width * 0.5, this.game.height * 0.5 + 20);
        } else if (this.game.gameWon) {
            ctx.fillText('Congratulations!!', this.game.width * 0.5, this.game.height * 0.5 - 20);
            ctx.font = `${this.fontSize}px ${this.fontFamily}`;
            ctx.fillText(`You survived with a score of ${this.game.score}!`, this.game.width * 0.5, this.game.height * 0.5 + 20);
        }
        ctx.restore();
    }
}
