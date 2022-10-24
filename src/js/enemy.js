class Enemy {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.markedForDeletion = false;
        // sprite fps
        this.spriteFps = 30;
        this.spriteFrameInterval = 1000 / this.spriteFps;
        this.spriteFrameTimer = 0;
        // control fps
        this.controlFps = 60;
        this.controlFpsInterval = 1000 / this.controlFps;
        this.controlFpsTimer = 0;
    }   
    update(deltaTime){
        // horizontal movement
        if (this.controlFpsTimer > this.controlFpsInterval){
            this.controlFpsTimer -= this.controlFpsInterval;
            this.x -= this.speedX + this.game.speed;
        } else {
            this.controlFpsTimer += deltaTime;
        }
        this.speedX = this.maxSpeedX;

        // sprite animation
        if (this.spriteFrameTimer > this.spriteFrameInterval){
            this.spriteFrameTimer -= this.spriteFrameInterval;
            if (this.totalFrameX < this.maxFrame){
                this.frameX++;
                this.totalFrameX++;
                if (this.totalFrameX % this.game.frameXMaxFrame === 0){
                    this.frameY++;
                    this.frameX = 0;
                }
                //console.log(`Initial totalFrameX: ${this.totalFrameX}/${this.maxFrame} FrameX: ${this.frameX} | FrameY ${this.frameY}`)
            } else {
                this.frameX = 0;
                this.totalFrameX = 0;
                this.frameY = 0;
                //console.log(`Reset totalFrameX: ${this.totalFrameX}/${this.maxFrame} FrameX: ${this.frameX} | FrameY ${this.frameY}`)
            }
        } else {
            this.spriteFrameTimer += deltaTime;
        }

        // off screen check
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(ctx){
        if (this.game.debugMode){
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.arc(this.x + this.hitboxOffsetX + this.enemyRadius, this.y + + this.hitboxOffsetY + this.height * 0.5, this.enemyRadius * this.enemyRadiusModifier, 
                0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.enemyRadius, 
                0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height,
            this.x, this.y, this.width * this.sizeModifier, this.height * this.sizeModifier);
    }
}

export class Beetle extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.enemyType = "Beetle";
        // movement and position properties
        this.width = 143;
        this.height = 125;
        this.sizeModifier = Number((Math.random() * 0.05 + 0.96).toFixed(2));
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin - this.game.grondMarginModifier;
        this.image = document.getElementById('beetle');
        // speed properties
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeedX = 5;
        // spritesheet frame properties
        this.maxFrame = 27;
        this.totalFrameX = 0;
        // hitbox properties
        this.enemyRadius = this.width * 0.5;
        this.enemyRadiusModifier = 0.45;
        this.hitboxOffsetX = 0;
        this.hitboxOffsetY = 25;
    }
}

export class Spirit extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.enemyType = "Spirit";
        // movement and position properties
        this.width = 143;
        this.height = 125;
        this.sizeModifier = Number((Math.random() * 0.2 + 0.81).toFixed(2));
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5 + 50;
        this.image = document.getElementById('spirit');
        // speed properties
        this.speedX = Math.random() + 1; // not sure why I have Math.random() here. Check at home.
        this.speedY = 0;
        this.maxSpeedX = 8;
        // spritesheet frame properties
        this.maxFrame = 19;
        this.totalFrameX = 0;
        // vertical movement properties
        this.angle = 0;
        this.va = Number((Math.random() * 0.015 + 0.015).toFixed(5));
        // hitbox properties
        this.enemyRadius = this.width * 0.5;
        this.enemyRadiusModifier = 0.5;
        this.hitboxOffsetX = 0;
        this.hitboxOffsetY = -10;
    }
    update(deltaTime){
        super.update(deltaTime);
        if (this.controlFpsTimer > this.controlFpsInterval){
            this.controlFpsTimer -= this.controlFpsInterval;
            this.angle += this.va;
            this.y += Math.sin(this.angle);
        } else {
            this.controlFpsTimer += deltaTime;
        }
    }
}

export class Spider extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.enemyType = "Spider";
        // movement and position properties
        this.width = 143;
        this.height = 125;
        this.sizeModifier = 1;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.yWebModifier = 0;
        this.image = document.getElementById('spider');
        // speed properties
        this.speedX = 0;
        this.speedY = 2;
        this.maxSpeedX = 0;
        // spritesheet frame properties
        this.maxFrame = 19;
        this.totalFrameX = 0;
         // hitbox properties
         this.enemyRadius = this.width * 0.5;
         this.enemyRadiusModifier = 0.5;
         this.hitboxOffsetX = 0;
         this.hitboxOffsetY = 0;
    }
    update(deltaTime){
        super.update(deltaTime);    
        if (this.controlFpsTimer > this.controlFpsInterval){
            this.controlFpsTimer -= this.controlFpsInterval;
            this.y += this.speedY;
            if (this.y >= this.game.height - this.height - this.game.groundMargin - this.game.grondMarginModifier){
                this.speedY = 0;
                this.maxSpeedX = 6;
            }
        } else {
            this.controlFpsTimer += deltaTime;
        }
    }
    draw(ctx){
        ctx.save();
        if (this.maxSpeedX <= 0){
            ctx.beginPath();
            ctx.strokeStyle = "#fff";
            ctx.moveTo(this.x + this.width * 0.5 ,0);
            ctx.lineTo(this.x + this.width * 0.5, this.y + 50);
            ctx.stroke();
        } else {
            if (this.yWebModifier < this.y){
                this.yWebModifier += 10;
                ctx.beginPath();
                ctx.strokeStyle = "#fff";
                ctx.moveTo((this.x + this.width * 0.5) + this.speedX + this.game.speed, 0 + this.yWebModifier);
                ctx.lineTo(this.x + this.width * 0.5, this.y + 50);
                ctx.stroke();
            } 
        }
        super.draw(ctx);
        ctx.restore();
    }
}