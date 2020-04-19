import GameObject from "./GameObject.js"
import {
    gameLogic
} from "./gameLogic.js"
import {
    canvas
} from "./context.js"

export default class Enemy extends GameObject {
    constructor(x, y, ySpeed) {
        super(x, y);
        this.ySpeed = ySpeed || 0;
    }

    update(dtime) {
        super.update(dtime);
        this.y += dtime * this.ySpeed * gameLogic.defaultScrollSpeed / 500;
        if (gameLogic.moveDirection === "right")
            this.x += dtime * -gameLogic.scrollSpeed;
        else if (gameLogic.moveDirection === "left")
            this.x -= dtime * -gameLogic.scrollSpeed;
        if (this.y >= canvas.height) {
            this.remove();
        }
    }

    render(ctx) {
        super.render(ctx);
    }

}