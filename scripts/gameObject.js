import loader from "./loader.js"
import GameState from "./GameState.js"

export default class GameObject {

    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = 0;
        this.height = 0;
        this.collisionEnable = true;
        this.updateHitBoxFromSprite = true;
        this.hitBoxFunction = null;
        this.sprite = null;
        this.spriteDimensionsArray = [];
        this.spriteChangeSpeed = 0;
        this.animation = null;
        this.hitBox = {
            x: this.x,
            y: this.y,
            height: this.height,
            width: this.width
        }
    }

    onCollision(collideObject) {

    }

    loadSprite(spriteURL) {
        return loader.load(spriteURL).then((sprite) => {
            this.sprite = sprite;
            this.setDisplayDimesions(this.sprite.width, this.sprite.height);
        });
    }


    setPhysicalDimensions(width, height) {
        this.hitBox.width = width;
        this.hitBox.height = height;
    }

    setDisplayDimesions(width, height) {
        this.width = width;
        this.height = height;
    }

    remove() {
        GameState.remove(this);
    }

    updateHitBoxToSprite() {
        this.hitBox.x = this.x;
        this.hitBox.y = this.y;
        this.setPhysicalDimensions(this.width, this.height);
    }
    update(dt) {
        if (this.collisionEnable && this.updateHitBoxFromSprite) {
            this.updateHitBoxToSprite();
        }

        if (this.collisionEnable && this.hitBoxFunction) {
            this.hitBoxFunction(this.hitBox, this);
        }
        if (this.animation) {
            this.animation.render(dt * 1000);
            const spritePosition = this.animation.currentSpritePosition;
            const width = spritePosition.rightBottom.x - spritePosition.leftTop.x;
            const height = spritePosition.rightBottom.y - spritePosition.leftTop.y;
            this.setPhysicalDimensions(width, height);
            this.setDisplayDimesions(width, height);
        }
    }

    render(ctx) {
        if (this.sprite && this.animation)
            ctx.drawImage(this.sprite, this.animation.currentSpritePosition.leftTop.x, this.animation.currentSpritePosition.leftTop.y, this.width, this.height, this.x, this.y, this.width, this.height);
        else if (this.sprite)
            // debugger;
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);

        if (this.type === 10) {
            ctx.drawImage(this.sprite, this.x, this.y);

        }

    }

}