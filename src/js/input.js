export class InputHandler {
    constructor(game){
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((e.key === 'a' ||
                e.key === 'd' ||
                e.key === ' ' ||
                e.key === 's') && 
                this.keys.indexOf(e.key) === -1)
            {
                this.keys.push(e.key);
            } else if (e.key === 'F1'){
                this.game.debugMode = !this.game.debugMode;
            }
        });
        window.addEventListener('keyup', e => {
            if (e.key === 'a' ||
                e.key === 'd' ||
                e.key === ' ' || 
                e.key === 's')
            {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}