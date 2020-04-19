import GameObject from "./GameObject.js";
import {
    gameLogic
} from "./gameLogic.js"

export default class ImageMoveGameObject extends GameObject {
    constructor(x, y) {
        super(x, y);
        this.collisionEnable = false;
        this.imageWidth = 0;
    }

    update(dt) {
        if (gameLogic.moveDirection === "right") {
            this.imageWidth += -gameLogic.scrollSpeed * dt;
            if (this.imageWidth <= -this.sprite.width)
                this.imageWidth = 0;
        } else if (gameLogic.moveDirection === "left") {
            this.imageWidth += gameLogic.scrollSpeed * dt;
            if (this.imageWidth >= this.sprite.width)
                this.imageWidth = 0;
        }
    }

    render(ctx) {
        if (this.sprite) {
            ctx.drawImage(this.sprite, this.imageWidth, 0);
            if (this.imageWidth >= 0)
                ctx.drawImage(this.sprite, this.imageWidth - this.sprite.width + 2, 0);
            else
                ctx.drawImage(this.sprite, this.sprite.width + this.imageWidth - 2, 0);

        }
    }
}