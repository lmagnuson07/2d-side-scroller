export const states = {
    IDLE_RIGHT: 0, IDLE_LEFT: 1,
    RUNNING_RIGHT: 2, RUNNING_LEFT: 3,
    JUMPING_RIGHT: 4, JUMPING_LEFT: 5, 
    FALLING_RIGHT: 6, FALLING_LEFT: 7, 
    DODGING_RIGHT: 8, DODGING_LEFT: 9, 
    SLIDING_RIGHT: 10, SLIDING_LEFT: 11,
    ROLLING_RIGHT: 12, ROLLING_LEFT: 13,
    DIVING_RIGHT: 14, DIVING_LEFT: 15,
    HIT_RIGHT: 16, HIT_LEFT: 17,
    DIZZY_RIGHT: 18, DIZZY_LEFT:19
}

class State {
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
    updateEnergy(deltaTime, energyModifier){
        if (this.game.controlFpsTimer > this.game.controlFpsInterval){
            this.game.controlFpsTimer -= this.game.controlFpsInterval;
            this.game.energy += energyModifier;
        } else {
            this.controlFpsTimer += deltaTime;
        }
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
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (inputKeys.includes('w')){
            this.game.player.setState(states.SLIDING_RIGHT, 3);
        } else if (inputKeys.includes('d')){
            this.game.player.setState(states.RUNNING_RIGHT, 1);
        } else if (inputKeys.includes('a')){
            this.game.player.setState(states.RUNNING_LEFT, 0);
        } else if (inputKeys.includes(' ')){
            if (inputKeys.includes('d')){
                this.game.player.setState(states.JUMPING_RIGHT, 1);
            } else {
                this.game.player.setState(states.JUMPING_RIGHT, 0);
            }
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
        this.game.player.maxFrame = 20;
        this.game.player.frameY = 0;
    }
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (inputKeys.includes('w')){
            this.game.player.setState(states.SLIDING_LEFT, 0);
        } else if (inputKeys.includes('d')){
            this.game.player.setState(states.RUNNING_RIGHT, 1);
        } else if (inputKeys.includes('a')){
            this.game.player.setState(states.RUNNING_LEFT, 0);
        } else if (inputKeys.includes(' ')){
            if (inputKeys.includes('a')){
                this.game.player.setState(states.JUMPING_LEFT, 0);
            } else {
                this.game.player.setState(states.JUMPING_LEFT, 0);
            }
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
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (!(inputKeys.includes('a') && inputKeys.includes('d'))){ // fixes a bug that was swapping right and left states rapidly 
            if (inputKeys.includes('w')){
                this.game.player.setState(states.SLIDING_RIGHT, 3);
            } else if (inputKeys.includes('a')){
                this.game.player.setState(states.RUNNING_LEFT, 0);
            } else if (inputKeys.includes(' ')){
                this.game.player.setState(states.JUMPING_RIGHT, 1);
            } else if (inputKeys.includes('s')){
                this.game.player.setState(states.DODGING_RIGHT, 0);
            } else if (inputKeys.length === 0){
                this.game.player.setState(states.IDLE_RIGHT, 0);
            } 
        } else { // everything in this else is to allow character to jump, dodge if "a" and "d" are pressed simultaneously
            if (inputKeys.includes(' ')){
                this.game.player.setState(states.JUMPING_RIGHT, 1);
            } else if (inputKeys.includes('s')){
                this.game.player.setState(states.DODGING_RIGHT, 0);
            }
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
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (inputKeys.includes('w')){
            this.game.player.setState(states.SLIDING_LEFT, 0);
        } else if (inputKeys.includes('d')){
            this.game.player.setState(states.RUNNING_RIGHT, 1);
        } else if (inputKeys.includes(' ')){
            this.game.player.setState(states.JUMPING_LEFT, 0);
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
        if (this.game.player.onGround()) this.game.player.vy = this.game.player.jumpSpeed;
        // spritesheet frame data
        this.game.player.image = this.game.player.imageRight;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 10; 
        this.game.player.frameY = 4;
    }
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);
        
        if (this.game.player.vy > this.game.player.weight){
            if (inputKeys.includes('d')){
                this.game.player.setState(states.FALLING_RIGHT, 1);
            } else {
                this.game.player.setState(states.FALLING_RIGHT, 0);
            }
        } else {
            if (!(inputKeys.includes('a') && inputKeys.includes('d'))){ // fixes a bug that was swapping right and left states rapidly 
                if (inputKeys.includes('w')){
                    this.game.player.setState(states.ROLLING_RIGHT, 1);
                } else if (inputKeys.includes('a')){
                    this.game.player.setState(states.JUMPING_LEFT, 0);
                } else if (inputKeys.includes('d')){
                    this.game.player.setState(states.JUMPING_RIGHT, 1)
                } else if (inputKeys.length === 0){
                    this.game.player.setState(states.JUMPING_RIGHT, 0);
                }
            }
        }
    }
}

export class JumpingLeft extends State {
    constructor(game){
        super('JUMPING LEFT', game);
    }
    enter(){
        if (this.game.player.onGround()) this.game.player.vy = this.game.player.jumpSpeed;
        // spritesheet frame data
        this.game.player.image = this.game.player.imageLeft;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 10; 
        this.game.player.frameY = 4;
    }
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING_LEFT, 0);
        } else if (inputKeys.includes('w')){ 
            this.game.player.setState(states.ROLLING_LEFT, 0);
        } else if (inputKeys.includes('d')) {
            this.game.player.setState(states.JUMPING_RIGHT, 1);
        } else if (inputKeys.includes('a')){
            this.game.player.setState(states.JUMPING_LEFT, 0);
        } else if (inputKeys.length === 0){
            this.game.player.setState(states.JUMPING_LEFT, 0);
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
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (this.game.player.onGround()){
            if (inputKeys.includes('d')){
                this.game.player.setState(states.RUNNING_RIGHT, 1);
            } else if (inputKeys.includes('a')){
                this.game.player.setState(states.RUNNING_LEFT, 0);
            } else if (inputKeys.includes('s')){
                this.game.player.setState(states.DODGING_RIGHT, 0);
            } else if (inputKeys.length === 0){
                this.game.player.setState(states.IDLE_RIGHT, 0);
            }
        } else {
            if (!(inputKeys.includes('a') && inputKeys.includes('d'))){ // fixes a bug that was swapping right and left states rapidly 
                if (inputKeys.includes('w')){ 
                    this.game.player.setState(states.ROLLING_RIGHT, 1);
                } else if (inputKeys.includes('a')){
                    this.game.player.setState(states.FALLING_LEFT, 0);
                } else if (inputKeys.includes('d')){
                    this.game.player.setState(states.FALLING_RIGHT, 1);
                } else if (inputKeys.length === 0){
                    this.game.player.setState(states.FALLING_RIGHT, 0);
                }
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
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (this.game.player.onGround()){
            if (inputKeys.includes('d')){
                this.game.player.setState(states.RUNNING_RIGHT, 1);
            } else if (inputKeys.includes('a')){
                this.game.player.setState(states.RUNNING_LEFT, 0);
            } else if (inputKeys.includes('s')){
                this.game.player.setState(states.DODGING_LEFT, 0);
            } else if (inputKeys.length === 0){
                this.game.player.setState(states.IDLE_LEFT, 0);
            }
        } else {
            if (inputKeys.includes('w')){
                this.game.player.setState(states.ROLLING_LEFT, 0);
            } else if (inputKeys.includes('d')){
                this.game.player.setState(states.FALLING_RIGHT, 1);
            } else if (inputKeys.includes('a')){
                this.game.player.setState(states.FALLING_LEFT, 0);
            } else if (inputKeys.length === 0){
                this.game.player.setState(states.FALLING_LEFT, 0);
            }
        }
    }
}

export class DodgingRight extends State {
    constructor(game){
        super('DODGING RIGHT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageRight;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 20; 
        this.game.player.frameY = 7;
    }
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (!(inputKeys.includes('a') && inputKeys.includes('d'))){
            if (inputKeys.length === 0){
                this.game.player.setState(states.IDLE_RIGHT, 0);
            } else if (inputKeys.includes('d') && !inputKeys.includes('s')){
                this.game.player.setState(states.RUNNING_RIGHT, 1);
            } else if (inputKeys.includes('a') && !inputKeys.includes('s')){
                this.game.player.setState(states.RUNNING_LEFT, 0);
            } else if (inputKeys.includes('a') && inputKeys.includes('s')){
                this.game.player.setState(states.DODGING_LEFT, 0);
            } else {
                this.game.player.speed = 0;
            }
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
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (inputKeys.length === 0){
            this.game.player.setState(states.IDLE_LEFT, 0);
        } else if (inputKeys.includes('a') && !inputKeys.includes('s')){
            this.game.player.setState(states.RUNNING_LEFT, 0);
        } else if (inputKeys.includes('d') && !inputKeys.includes('s')){
            this.game.player.setState(states.RUNNING_RIGHT, 1);
        } else if (inputKeys.includes('d') && inputKeys.includes('s')){
            this.game.player.setState(states.DODGING_RIGHT, 0);
        } else {
            this.game.player.speed = 0;
        }
    }
}

export class SlidingRight extends State {
    constructor(game){
        super('SLIDING RIGHT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageRight;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 8; 
        this.game.player.frameY = 6;
    }
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        this.game.player.speed = 15;
        if (!inputKeys.includes('w')){
            if (inputKeys.includes('d')){
                this.game.player.setState(states.RUNNING_RIGHT, 1);
            } else if (inputKeys.includes('a')){
                this.game.player.setState(states.RUNNING_LEFT, 0);
            } else if (inputKeys.length === 0){
                this.game.player.setState(states.IDLE_RIGHT, 0);
            }
        } else if (this.game.player.frameX === this.game.player.maxFrame){
            this.game.player.setState(states.SLIDING_RIGHT, 3);
        }
    }
}

export class SlidingLeft extends State {
    constructor(game){
        super('SLIDING LEFT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageLeft;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 8; 
        this.game.player.frameY = 6;
    }
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        this.game.player.speed = -25;
        if (!inputKeys.includes('w')){
            if (inputKeys.includes('d')){
                this.game.player.setState(states.RUNNING_RIGHT, 1);
            } else if (inputKeys.includes('a')){
                this.game.player.setState(states.RUNNING_LEFT, 0);
            } else if (inputKeys.length === 0){
                this.game.player.setState(states.IDLE_RIGHT, 0);
            }
        } else if (this.game.player.frameX === this.game.player.maxFrame){
            this.game.player.setState(states.SLIDING_LEFT, 0);
        }
    }
}

export class RollingRight extends State {
    constructor(game){
        super('ROLLING RIGHT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageRight;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 6; 
        this.game.player.frameY = 9;
    }
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (!this.game.player.onGround()){
            if (!inputKeys.includes('w')){
                if (this.game.player.vy > this.game.player.weight){
                    this.game.player.setState(states.FALLING_RIGHT, 1);
                } else {
                    this.game.player.setState(states.JUMPING_RIGHT, 1);
                }
            } else {
                if (this.game.player.frameX === this.game.player.maxFrame){
                    if (inputKeys.includes('d')){
                        this.game.player.setState(states.ROLLING_RIGHT, 3);
                    } else {
                        this.game.player.setState(states.ROLLING_RIGHT, 1);
                    }
                }
                if (inputKeys.includes(' ') && this.game.player.vy > this.game.player.weight){
                    this.game.player.setState(states.DIVING_RIGHT, 0);
                } else if (inputKeys.includes('a')){
                    this.game.player.setState(states.ROLLING_LEFT, 0);
                } else if (inputKeys.includes('d')){
                    this.game.player.speed = this.game.player.maxSpeed * 1.75;
                }
            } 
        } else {
            if (inputKeys.includes('w')){
                this.game.player.setState(states.SLIDING_RIGHT, 3);
            } else {
                this.game.player.setState(states.IDLE_RIGHT, 0);
            }
        }
    }
}

export class RollingLeft extends State {
    constructor(game){
        super('ROLLING LEFT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageLeft;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 6; 
        this.game.player.frameY = 9;
    }
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (!this.game.player.onGround()){
            if (!inputKeys.includes('w')){
                if (this.game.player.vy > this.game.player.weight){
                    this.game.player.setState(states.FALLING_LEFT, 0);
                } else {
                    this.game.player.setState(states.JUMPING_LEFT, 0);
                }
            } else {
                if (this.game.player.frameX === this.game.player.maxFrame){
                    this.game.player.setState(states.ROLLING_LEFT, 0);
                } 
                if (inputKeys.includes(' ') && this.game.player.vy > this.game.player.weight){
                    this.game.player.setState(states.DIVING_LEFT, 0)
                } else if (inputKeys.includes('d')){
                    this.game.player.setState(states.ROLLING_RIGHT, 3);
                } else if (inputKeys.includes('a')){
                    this.game.player.speed = -this.game.player.maxSpeed * 2.5;
                } else if (!inputKeys.includes('a')){
                    this.game.player.setState(states.ROLLING_RIGHT, 3);
                }
            }
        } else {
            if (inputKeys.includes('w')){
                this.game.player.setState(states.SLIDING_LEFT, 0);
            } else {
                this.game.player.setState(states.IDLE_LEFT, 0);
            }
        }
    }
}

export class DivingRight extends State {
    constructor(game){
        super('DIVING RIGHT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageRight;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 6; 
        this.game.player.frameY = 9;
    }
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (!this.game.player.onGround()){
            this.game.player.vy = this.game.player.diveSpeed;
            if (this.game.player.frameX === this.game.player.maxFrame){
                this.game.player.setState(states.DIVING_RIGHT, 0);
            } 
        } else {
            if (inputKeys.includes('w')){
                this.game.player.setState(states.SLIDING_RIGHT, 3);
            } else {
                this.game.player.setState(states.IDLE_RIGHT, 0);
            }
        }
    }
}

export class DivingLeft extends State {
    constructor(game){
        super('DIVING LEFT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageLeft;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 6; 
        this.game.player.frameY = 9;
    }
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (!this.game.player.onGround()){
            this.game.player.vy = this.game.player.diveSpeed;
            if (this.game.player.frameX === this.game.player.maxFrame){
                this.game.player.setState(states.DIVING_LEFT, 0);
            }
        } else {
            if (inputKeys.includes('w')){
                this.game.player.setState(states.SLIDING_LEFT, 0);
            } else {
                this.game.player.setState(states.IDLE_LEFT, 0);
            }
        }
    }
}

export class HitRight extends State {
    constructor(game){
        super('HIT RIGHT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageRight;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 15; 
        this.game.player.frameY = 10;
    }
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (this.game.player.totalFrameX >= this.game.player.maxFrame && this.game.player.onGround()){
            this.game.player.setState(states.IDLE_RIGHT, 0);
        } else if (this.game.player.totalFrameX >= this.game.player.maxFrame && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING_RIGHT, 0);
        }
    }
}

export class HitLeft extends State {
    constructor(game){
        super('HIT LEFT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageLeft;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 15; 
        this.game.player.frameY = 10;
    }
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (this.game.player.totalFrameX >= this.game.player.maxFrame && this.game.player.onGround()){
            this.game.player.setState(states.IDLE_LEFT, 0);
        } else if (this.game.player.totalFrameX >= this.game.player.maxFrame && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING_LEFT, 0);
        }
    }
}

export class DizzyRight extends State {
    constructor(game){
        super('DIZZY RIGHT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageRight;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 20; 
        this.game.player.frameY = 12;
    }
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (this.game.player.totalFrameX >= this.game.player.maxFrame && this.game.player.onGround()){
            this.game.player.setState(states.IDLE_RIGHT, 0);
        } else if (this.game.player.totalFrameX >= this.game.player.maxFrame && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING_RIGHT, 0);
        }
    }
}

export class DizzyLeft extends State {
    constructor(game){
        super('DIZZY LEFT', game);
    }
    enter(){
        // spritesheet frame data
        this.game.player.image = this.game.player.imageLeft;
        this.game.player.frameX = 0; 
        this.game.player.totalFrameX = 0;
        this.game.player.maxFrame = 20; 
        this.game.player.frameY = 12;
    }
    handleInput(inputKeys, deltaTime){
        super.updateEnergy(deltaTime, 0);

        if (this.game.player.totalFrameX >= this.game.player.maxFrame && this.game.player.onGround()){
            this.game.player.setState(states.IDLE_LEFT, 0);
        } else if (this.game.player.totalFrameX >= this.game.player.maxFrame && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING_LEFT, 0);
        }
    }
}