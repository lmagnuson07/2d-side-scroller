

export class Player {
    constructor(game){
        this.game = game;
        this.width = 360;
        this.height = 384;
        this.x = 0;
        this.y = this.game.height - this.height;
    }
    update(){
        this.x++;
    }
    draw(ctx){
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}
