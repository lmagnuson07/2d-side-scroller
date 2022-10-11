class Layer {
    constructor(game, width, height, speedModifier, image, layerType){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
        // cloud check properties
        this.layerType = layerType;
        this.layerSpeedModifier = 0;
        this.speed = this.game.speed * this.speedModifier + this.layerSpeedModifier;
        // controls fps properties
        this.controlFps = 60;
        this.controlFpsInterval = 500 / this.controlFps;
        this.controlFpsTimer = 0;
    }
    update(deltaTime){
        if (this.controlFpsTimer > this.controlFpsInterval){
            this.controlFpsTimer -= this.controlFpsInterval;
            if (this.layerType === "slow") this.layerSpeedModifier = 0.5;
            else if (this.layerType === "fast") this.layerSpeedModifier = 2;
            else if (this.layerType === "lava-red") this.layerSpeedModifier = -2;
            else if (this.layerType === "lava-orange") this.layerSpeedModifier = 1;
            // background image movement (without Math.floor there are lines between the copied layers)
            this.speed = this.game.speed * this.speedModifier + this.layerSpeedModifier;
            this.x = Math.floor(this.x - this.speed) % this.width;
        } else {
            this.controlFpsTimer += deltaTime;
        }
    }
    draw(ctx){
        // the red lava travels from left to right, so an image must be drawn on both sides of the original image
        if (this.layerType === "lava-red"){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + -this.width, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width * 2, this.y, this.width, this.height);
        } else {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width * 2, this.y, this.width, this.height);
        }
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
        this.layer8Image = document.getElementById('layer8');
        this.layer1 = new Layer(this.game, this.width, this.height, 0.0025, this.layer1Image);
        this.layer2 = new Layer(this.game, this.width, this.height, 0.75, this.layer2Image, "slow"); // clouds
        this.layer3 = new Layer(this.game, this.width, this.height, 0.35, this.layer3Image);
        this.layer4 = new Layer(this.game, this.width, this.height, 1, this.layer4Image, "fast"); // clouds
        this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5Image);
        this.layer6 = new Layer(this.game, this.width, this.height, 1, this.layer6Image, "lava-red");
        this.layer7 = new Layer(this.game, this.width, this.height, 1, this.layer7Image);
        this.layer8 = new Layer(this.game, this.width, this.height, 1, this.layer8Image, "lava-orange");
        this.backgroundLayers = [
            this.layer1, this.layer2,
            this.layer3, this.layer4, 
            this.layer5, this.layer6,
            this.layer7, this.layer8
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