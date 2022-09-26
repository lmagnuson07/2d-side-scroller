import {
    Idle, Running,
    Jumping, Falling
} from './playerStates';

export class Player {
    constructor(game){
        this.game = game;
        this.width = 360;
        this.height = 384;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.vy = 0;
        this.weight = 1;
        this.speed = 0;
        this.maxSpeed = 20;
        this.controlFps = 60;
        this.controlFpsInterval = 1000 / this.controlFps;
        this.controlFpsTimer = 0;
        this.states = [
            new Idle(this.game), new Running(this.game),
            new Jumping(this.game), new Falling(this.game)
        ];
        this.currentState = null;
    }
    update(inputKeys, deltaTime){
        this.currentState.handleInput(inputKeys);
        // horizontal movement
        if (this.controlFpsTimer > this.controlFpsInterval){
            this.controlFpsTimer -= this.controlFpsInterval;
            this.x += this.speed;
        } else {
            this.controlFpsTimer += deltaTime;
        }
        if (inputKeys.includes('d')) this.speed = this.maxSpeed;
        else if (inputKeys.includes('a')) this.speed = -this.maxSpeed;
        else this.speed = 0;

        // horizontal boundries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        // vertical movement
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        // sets idle state when no input keys are read
        if (inputKeys.length === 0 && this.onGround()) {
            this.currentState = this.states[0];
            this.currentState.enter();
        }  
    }
    draw(ctx){
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height;
    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}
