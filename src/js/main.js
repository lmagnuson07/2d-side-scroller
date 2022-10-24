import { Player } from './player';
import { InputHandler } from './input';
import { Beetle, Spider, Spirit } from './enemy';
import { Background } from './background';
import { UI } from './ui';
import { EnergyBar } from './energybar';
// - vite build --emptyOutDir

window.addEventListener('load', function(){
    // hides loading message
    const loading = document.getElementById('loading');
    loading.style.display = 'none';

    // canvas setup
    const canvas = document.getElementById('canvas1');
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 768;
    
    // implements the fullscreen functionality 
    const fullScreenBtn = document.getElementById('fullScreenBtn');
    const toggleFullScreen = function(){
        if (!document.fullScreenElement){
            canvas.requestFullscreen()
            .catch(err => {
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
            this.groundMargin = 66;
            this.grondMarginModifier = Math.random() > 0.8 ? 3 : Math.random() > 0.6 ? 2 : 0;
            // game speed properties
            this.speed = 0;
            this.maxSpeed = 3; // 3 px per frame
            // frame properties
            this.frameXMaxFrame = 11;
            // composite classes
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.background = new Background(this);
            this.ui = new UI(this);
            this.energyBar = new EnergyBar(this);
            // object arrays
            this.enemies = [];
            this.floatingMessages = [];
            this.collisions = [];
            // enemy timer properties
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            // player state properties
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            // game function/settings properties
            this.debugMode = false;
            this.gameOver = false;
            this.gameWon = false;
            this.time = 0;
            this.maxTime = 30000;
            this.score = 0;
            this.lives = 10;
            this.totalLives = 10;
            this.maxEnergy = 100;
            this.energy = this.maxEnergy;
            // ui properties
            this.fontColor = '#fff';
            // controls fps properties
            this.controlFps = 60;
            this.controlFpsInterval = 1000 / this.controlFps;
            this.controlFpsTimer = 0;
        }
        update(deltaTime){
            // timer properties
            // console.log(this.player.currentState)
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameWon = true;
            // Update methods
            this.background.update(deltaTime);
            this.player.update(this.input.keys, deltaTime);
            [...this.enemies, ...this.floatingMessages, ...this.collisions].forEach(object => {
                object.update(deltaTime);
            });
            // handle enemies 
            if (this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer -= this.enemyInterval;
            } else {
                this.enemyTimer += deltaTime;
            }
            // array filtering
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.floatingMessages = this.floatingMessages.filter(messages => !messages.markedForDeletion)
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
        }
        draw(ctx){
            this.background.draw(ctx);
            this.player.draw(ctx);
            [...this.enemies, ...this.floatingMessages, ...this.collisions].forEach(object => {
                object.draw(ctx);
            })
            this.ui.draw(ctx);
            this.energyBar.draw(ctx);
        }
        addEnemy(){
            if (Math.random() < 0.5) this.enemies.push(new Beetle(this));
            if (Math.random() > 0.28) this.enemies.push(new Spirit(this));
            else if (Math.random() > 0.5) this.enemies.push(new Spider(this));
        }
    }
    const game = new Game(canvas.width, canvas.height);
    // Fill the heart array here so that it is only filled once, instead of every frame 
    for (let i = 0; i < game.totalLives * 0.5; i++){
        game.ui.heartArray.push(game.ui.heartFull);
    }

    // Animation loop ////////////////////////////
    let lastTime = 0;
    function animate(timeStamp){
        // Note: laptop deltatime is 31ish. Might need to limit controls to 30 fps. Jumping animation is slow (about half)
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        // console.log(Number((Math.random() * 0.015 + 0.015).toFixed(5)))
        if (!game.gameOver && !game.gameWon) requestAnimationFrame(animate);
        // requestAnimationFrame(animate);
    }
    animate(0);
});