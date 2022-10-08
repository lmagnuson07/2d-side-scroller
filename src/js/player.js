import {
    IdleRight, IdleLeft,
    RunningRight, RunningLeft,
    JumpingRight, JumpingLeft, 
    FallingRight, FallingLeft,
    DodgingRight, DodgingLeft
} from './playerStates';

export class Player {
    constructor(game){
        this.game = game;
        this.width = 360;
        this.height = 384;
        this.x = 0;
        this.y = this.game.height - this.height * 0.5;
        this.vy = 0;
        this.weight = 1;
        this.speed = 0;
        this.maxSpeed = 20;
        this.imageRight = document.getElementById('player');
        this.imageLeft = document.getElementById('playerMirrored');
        this.image = this.imageRight;
        this.frameX = -1;
        this.totalFrameX = -1;
        this.frameY = 0;
        this.maxFrame;
        this.spriteFps = 30;
        this.spriteFrameInterval = 1000 / this.spriteFps;
        this.spriteFrameTimer = 0;
        this.controlFps = 60;
        this.controlFpsInterval = 1000 / this.controlFps;
        this.controlFpsTimer = 0;
        this.states = [
            new IdleRight(this.game), new IdleLeft(this.game), 
            new RunningRight(this.game), new RunningLeft(this.game),
            new JumpingRight(this.game), new JumpingLeft(this.game), 
            new FallingRight(this.game), new FallingLeft(this.game),
            new DodgingRight(this.game), new DodgingLeft(this.game)
        ];
        this.currentState = null;
    }
    update(inputKeys, deltaTime){
        //console.log(inputKeys)
        this.currentState.handleInput(inputKeys);
        // Fps check
        if (this.controlFpsTimer > this.controlFpsInterval){
            // horizontal movement
            this.controlFpsTimer -= this.controlFpsInterval;
            this.x += this.speed;
           
            // vertical movement
            this.y += this.vy;
            if (!this.onGround()) this.vy += this.weight;
            else this.vy = 0;
        } else {
            this.controlFpsTimer += deltaTime;
        }

        // horizontal movement inputs
        if (inputKeys.includes('d')) this.speed = this.maxSpeed;
        else if (inputKeys.includes('a')) this.speed = -this.maxSpeed;
        else this.speed = 0;

        // horizontal boundries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width * 0.5) this.x = this.game.width - this.width * 0.5;

        // Vertical boundries
        if (this.onCeiling()){
            this.vy = 0;
            this.y = 0.1;
        }

        // sprite animation
        if (this.spriteFrameTimer > this.spriteFrameInterval){
            this.spriteFrameTimer -= this.spriteFrameInterval;
            if (this.totalFrameX < this.maxFrame){
                this.frameX++;
                this.totalFrameX++;
                if (this.totalFrameX === this.game.frameXMaxFrame){
                    this.frameY++;
                    this.frameX = 0;
                }
                //console.log(`Initial totalFrameX: ${this.totalFrameX}/${this.maxFrame} FrameX: ${this.frameX} | FrameY ${this.frameY}`)
            } else {
                this.frameX = 0;
                this.totalFrameX = 0;
                this.frameY--;
                //console.log(`Reset totalFrameX: ${this.totalFrameX}/${this.maxFrame} FrameX: ${this.frameX} | FrameY ${this.frameY}`)
            }
        } else {
            this.spriteFrameTimer += deltaTime;
        }
    }
    draw(ctx){
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height,
            this.x, this.y, this.width * 0.5, this.height * 0.5);
    }
    onGround(){
        return this.y >= this.game.height - this.height * 0.5;
    }
    onCeiling(){
        return this.y <= 0;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
}
