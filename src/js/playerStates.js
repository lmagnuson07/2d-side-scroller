const states = {
    IDLE: 0,
    RUNNING: 1,
    JUMPING: 2, 
    FALLING: 3
}

class State {
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class Idle extends State {
    constructor(game){
        super('IDLE', game);
    }
    enter(){
        // spritesheet frame data
    }
    handleInput(inputKeys){
        if (inputKeys.includes('a') || inputKeys.includes('d')){
            this.game.player.setState(states.RUNNING);
        } else if (inputKeys.includes(' ')){
            this.game.player.setState(states.JUMPING);
        }
    }
}

export class Running extends State {
    constructor(game){
        super('RUNNING', game);
    }
    enter(){
        // spritesheet frame data
    }
    handleInput(inputKeys){
        if (inputKeys.includes(' ')){
            this.game.player.setState(states.JUMPING);
        }
    }
}

export class Jumping extends State {
    constructor(game){
        super('JUMPING', game);
    }
    enter(){
        if (this.game.player.onGround()) this.game.player.vy = -27;
        // spritesheet frame data
    }
    handleInput(inputKeys){
        if (this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING);
        }
    }
}

export class Falling extends State {
    constructor(game){
        super('FALLING', game);
    }
    enter(){
        // spritesheet frame data
    }
    handleInput(inputKeys){
        if (this.game.player.onGround()){
            this.game.player.setState(states.RUNNING);
        }
    }
}