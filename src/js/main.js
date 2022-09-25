import { Player } from './player';
import { InputHandler } from './input';
import { SquareEnemy } from './enemy';

window.addEventListener('load', function(){
    // hides loading message
    const loading = document.getElementById('loading');
    loading.style.display = 'none';

    // canvas setup
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 720;
    
    // implements the full screen functionality 
    const fullScreenBtn = document.getElementById('fullScreenBtn');
    const toggleFullScreen = function(){
        if (!document.fullScreenElement){
            canvas.requestFullscreen().catch(err => {
                alert(`Error, can't enable full-screen mode: ${err.message}`);
            })
        } else {
            document.exitFullscreen();
        }
    }
    fullScreenBtn.addEventListener('click', toggleFullScreen);

    // Game class ////////////////////////////////
    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.enemy = new SquareEnemy(this);
        }
        update(deltaTime){
            this.player.update(this.input.keys, deltaTime);
            this.enemy.update(deltaTime);
        }
        draw(ctx){
            this.player.draw(ctx);
            this.enemy.draw(ctx);
        }
        addEnemy(){

        }
    }

    const game = new Game(canvas.width, canvas.height);

    // Animation loop ////////////////////////////
    let lastTime = 0;
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});