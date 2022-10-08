const states = {
    IDLE_RIGHT: 0,
    IDLE_LEFT: 1,
    RUNNING_RIGHT: 2,
    RUNNING_LEFT: 3,
    JUMPING_RIGHT: 4, 
    JUMPING_LEFT: 5, 
    FALLING_RIGHT: 6, 
    FALLING_LEFT: 7, 
    DODGING_RIGHT: 8,
    DODGING_LEFT: 9
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
            this.game.player.setState(states.RUNNING_RIGHT, 1);
        } else if (inputKeys.includes('a')){
            this.game.player.setState(states.RUNNING_LEFT, 1);
        } else if (inputKeys.includes(' ')){
            this.game.player.setState(states.JUMPING_RIGHT, 1);
        } else if (inputKeys.includes('s')){
            this.game.player.setState(states.DODGING_RIGHT, 0);
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
            this.game.player.setState(states.RUNNING_RIGHT, 1);
        } else if (inputKeys.includes('a')){
            this.game.player.setState(states.RUNNING_LEFT, 1);
        } else if (inputKeys.includes(' ')){
            this.game.player.setState(states.JUMPING_LEFT, 1);
        } else if (inputKeys.includes('s')){
            this.game.player.setState(states.DODGING_LEFT, 0);
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
            this.game.player.setState(states.RUNNING_LEFT, 1);
        } else if (inputKeys.includes(' ')){
            this.game.player.setState(states.JUMPING_RIGHT, 1);
        } else if (inputKeys.includes('s')){
            this.game.player.setState(states.DODGING_RIGHT, 0);
        } else if (inputKeys.length === 0){
            this.game.player.setState(states.IDLE_RIGHT, 0);
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
            this.game.player.setState(states.RUNNING_RIGHT, 1);
        } else if (inputKeys.includes(' ')){
            this.game.player.setState(states.JUMPING_LEFT, 1);
        } else if (inputKeys.includes('s')){
            this.game.player.setState(states.DODGING_LEFT, 0);
        } else if (inputKeys.length === 0){
            this.game.player.setState(states.IDLE_LEFT, 0);
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
            this.game.player.setState(states.FALLING_RIGHT, 1);
        } else if (inputKeys.includes('a')) {
            this.game.player.setState(states.JUMPING_LEFT, 1);
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
            this.game.player.setState(states.FALLING_LEFT, 1);
        } else if (inputKeys.includes('d')) {
            this.game.player.setState(states.JUMPING_RIGHT, 1);
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
                this.game.player.setState(states.RUNNING_RIGHT, 1);
            } else if (inputKeys.includes('a')){
                this.game.player.setState(states.RUNNING_LEFT, 1);
            } else if (inputKeys.length === 0){
                this.game.player.setState(states.IDLE_RIGHT, 0);
            }
        } else {
            if (inputKeys.includes('a')){
                this.game.player.setState(states.FALLING_LEFT, 1);
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
                this.game.player.setState(states.RUNNING_RIGHT, 1);
            } else if (inputKeys.includes('a')){
                this.game.player.setState(states.RUNNING_LEFT, 1);
            } else if (inputKeys.length === 0){
                this.game.player.setState(states.IDLE_LEFT, 0);
            }
        } else {
            if (inputKeys.includes('d')){
                this.game.player.setState(states.FALLING_RIGHT, 1);
            }
        }
    }
}

export class DodgingRight extends State {
    constructor(game){
        super('DODGING', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageRight;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 20; 
        this.game.player.frameY = 7;
    }
    handleInput(inputKeys){
        if (inputKeys.length === 0){
            this.game.player.setState(states.IDLE_RIGHT, 0);
        } else if (inputKeys.includes('d') && !inputKeys.includes('s')){
            this.game.player.setState(states.RUNNING_RIGHT, 1);
        } else if (inputKeys.includes('a') && !inputKeys.includes('s')){
            this.game.player.setState(states.RUNNING_LEFT, 1);
        } else {
            this.game.player.speed = 0;
        }
    }
}

export class DodgingLeft extends State {
    constructor(game){
        super('DODGING LEFT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageLeft;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 20; 
        this.game.player.frameY = 7;
    }
    handleInput(inputKeys){
        if (inputKeys.length === 0){
            this.game.player.setState(states.IDLE_LEFT, 0);
        } else if (inputKeys.includes('a') && !inputKeys.includes('s')){
            this.game.player.setState(states.RUNNING_LEFT, 1);
        } else if (inputKeys.includes('d') && !inputKeys.includes('s')){
            this.game.player.setState(states.RUNNING_RIGHT, 1);
        } else {
            this.game.player.speed = 0;
        }
    }
}