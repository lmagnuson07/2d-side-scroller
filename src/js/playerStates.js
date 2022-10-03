const states = {
    IDLE_RIGHT: 0,
    IDLE_LEFT: 1,
    RUNNING_RIGHT: 2,
    RUNNING_LEFT: 3,
    JUMPING_RIGHT: 4, 
    JUMPING_LEFT: 5, 
    FALLING_RIGHT: 6, 
    FALLING_LEFT: 7, 
    SITTING: 8
}

class State {
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class IdleRight extends State {
    constructor(game){
        super('IDLE RIGHT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageRight;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 20; // total number of frames for the animation - 1
        this.game.player.frameY = 0;
    }
    handleInput(inputKeys){
        if (inputKeys.includes('d')){
            this.game.player.setState(states.RUNNING_RIGHT);
        } else if (inputKeys.includes('a')){
            this.game.player.setState(states.RUNNING_LEFT);
        } else if (inputKeys.includes(' ')){
            this.game.player.setState(states.JUMPING_RIGHT);
        } else if (inputKeys.includes('s')){
            this.game.player.setState(states.SITTING);
        }
    }
}

export class IdleLeft extends State {
    constructor(game){
        super('IDLE LEFT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageLeft;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 20; // total number of frames for the animation - 1
        this.game.player.frameY = 0;
    }
    handleInput(inputKeys){
        if (inputKeys.includes('d')){
            this.game.player.setState(states.RUNNING_RIGHT);
        } else if (inputKeys.includes('a')){
            this.game.player.setState(states.RUNNING_LEFT);
        } else if (inputKeys.includes(' ')){
            this.game.player.setState(states.JUMPING_LEFT);
        } else if (inputKeys.includes('s')){
            this.game.player.setState(states.SITTING);
        }
    }
}


export class RunningRight extends State {
    constructor(game){
        super('RUNNING RIGHT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageRight;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 18; 
        this.game.player.frameY = 2;
    }
    handleInput(inputKeys){
        if (inputKeys.includes('a')){
            this.game.player.setState(states.RUNNING_LEFT);
        } else if (inputKeys.includes(' ')){
            this.game.player.setState(states.JUMPING_RIGHT);
        } else if (inputKeys.includes('s')){
            this.game.player.setState(states.SITTING);
        } else if (inputKeys.length === 0){
            this.game.player.setState(states.IDLE_RIGHT);
        }
    }
}

export class RunningLeft extends State {
    constructor(game){
        super('RUNNING LEFT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageLeft;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 18; 
        this.game.player.frameY = 2;
    }
    handleInput(inputKeys){
        if (inputKeys.includes('d')){
            this.game.player.setState(states.RUNNING_RIGHT);
        } else if (inputKeys.includes(' ')){
            this.game.player.setState(states.JUMPING_LEFT);
        } else if (inputKeys.includes('s')){
            this.game.player.setState(states.SITTING);
        } else if (inputKeys.length === 0){
            this.game.player.setState(states.IDLE_LEFT);
        }
    }
}

export class JumpingRight extends State {
    constructor(game){
        super('JUMPING RIGHT', game);
    }
    enter(){
        if (this.game.player.onGround()) this.game.player.vy = -27;
        // spritesheet frame data
        this.game.player.image = this.game.player.imageRight;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 10; 
        this.game.player.frameY = 4;
    }
    handleInput(inputKeys){
        if (this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING_RIGHT);
        } else if (inputKeys.includes('a')) {
            this.game.player.setState(states.JUMPING_LEFT);
        }
    }
}

export class JumpingLeft extends State {
    constructor(game){
        super('JUMPING LEFT', game);
    }
    enter(){
        if (this.game.player.onGround()) this.game.player.vy = -27;
        // spritesheet frame data
        this.game.player.image = this.game.player.imageLeft;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 10; 
        this.game.player.frameY = 4;
    }
    handleInput(inputKeys){
        if (this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING_LEFT);
        } else if (inputKeys.includes('d')) {
            this.game.player.setState(states.JUMPING_RIGHT);
        }
    }
}

export class FallingRight extends State {
    constructor(game){
        super('FALLING RIGHT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageRight;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 10; 
        this.game.player.frameY = 5;
    }
    handleInput(inputKeys){
        if (this.game.player.onGround()){
            if (inputKeys.includes('d')){
                this.game.player.setState(states.RUNNING_RIGHT);
            } else if (inputKeys.includes('a')){
                this.game.player.setState(states.RUNNING_LEFT);
            } else if (inputKeys.length === 0){
                this.game.player.setState(states.IDLE_RIGHT);
            }
        } else {
            if (inputKeys.includes('a')){
                this.game.player.setState(states.FALLING_LEFT);
            }
        }
    }
}

export class FallingLeft extends State {
    constructor(game){
        super('FALLING LEFT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageLeft;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 10; 
        this.game.player.frameY = 5;
    }
    handleInput(inputKeys){
        if (this.game.player.onGround()){
            if (inputKeys.includes('d')){
                this.game.player.setState(states.RUNNING_RIGHT);
            } else if (inputKeys.includes('a')){
                this.game.player.setState(states.RUNNING_LEFT);
            } else if (inputKeys.length === 0){
                this.game.player.setState(states.IDLE_LEFT);
            }
        } else {
            if (inputKeys.includes('d')){
                this.game.player.setState(states.FALLING_RIGHT);
            }
        }
    }
}

export class Sitting extends State {
    constructor(game){
        super('SITTING', game);
    }
    enter(){
        // spritesheet frame data
    }
    handleInput(inputKeys){
        
    }
}