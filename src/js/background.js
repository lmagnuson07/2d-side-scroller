class Layer {
    constructor(game, width, height, speedModifier, image, cloudType){
        this.game = game;
        // cloud check properties
        this.cloudType = cloudType;
        this.cloudSpeedModifier = 0;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
        // controls fps properties
        this.controlFps = 60;
        this.controlFpsInterval = 1000 / this.controlFps;
        this.controlFpsTimer = 0;
    }
    update(deltaTime){
        if (this.controlFpsTimer > this.controlFpsInterval){
            this.controlFpsTimer -= this.controlFpsInterval;
            if (this.cloudType === "slow") this.cloudSpeedModifier = 1;
            else if (this.cloudType === "fast")this.cloudSpeedModifier = 2;
            if (this.x < -this.width) this.x = 0;
            else this.x -= (this.game.speed * this.speedModifier) + this.cloudSpeedModifier;
        } else {
            this.controlFpsTimer += deltaTime;
        }
    }
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width * 2, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game; 
        this.width = 2048 * 0.5;
        this.height = 1536 * 0.5;
        this.layer1Image = document.getElementById('layer1');
        this.layer2Image = document.getElementById('layer2');
        this.layer3Image = document.getElementById('layer3');
        this.layer4Image = document.getElementById('layer4');
        this.layer5Image = document.getElementById('layer5');
        this.layer6Image = document.getElementById('layer6');
        this.layer7Image = document.getElementById('layer7');
        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1Image);
        this.layer2 = new Layer(this.game, this.width, this.height, 1, this.layer2Image, "fast"); // clouds
        this.layer3 = new Layer(this.game, this.width, this.height, 0, this.layer3Image);
        this.layer4 = new Layer(this.game, this.width, this.height, 1, this.layer4Image, "slow"); // clouds
        this.layer5 = new Layer(this.game, this.width, this.height, 0, this.layer5Image);
        this.layer6 = new Layer(this.game, this.width, this.height, 0, this.layer6Image);
        this.layer7 = new Layer(this.game, this.width, this.height, 0, this.layer7Image);
        this.backgroundLayers = [
            this.layer1, this.layer2,
            this.layer3, this.layer4, 
            this.layer5, this.layer6,
            this.layer7
        ];
    }
    update(deltaTime){
        this.backgroundLayers.forEach(layer => {
            layer.update(deltaTime);
        });
    }
    draw(ctx){
        this.backgroundLayers.forEach(layer => {
            layer.draw(ctx);
        });
    }
}