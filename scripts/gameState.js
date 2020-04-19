import {
    ctx,
    canvas
} from "./context.js"
import {
    gameLogic
} from "./gameLogic.js"
import Animation from "./Animation.js"

//TODO
function checkCollision(gameObject1, gameObject2) {
    if (gameObject1.hitBox.x < gameObject2.hitBox.x + gameObject2.hitBox.width &&
        gameObject1.hitBox.x + gameObject1.hitBox.width > gameObject2.hitBox.x &&
        gameObject1.hitBox.y < gameObject2.hitBox.y + gameObject2.hitBox.height &&
        gameObject1.hitBox.y + gameObject1.hitBox.height > gameObject2.hitBox.y) {
        return true;
    }
    return false;
}

let collidedGameObjects = [];

function isGameObjectsCollided(gameObject1, gameObject2) {
    return collidedGameObjects.find(arr => (arr[0] === gameObject1 && arr[1] === gameObject2) || (arr[0] === gameObject2 && arr[1] === gameObject1)) ? true : false;
}

const gameState = class GameState {

    constructor() {
        this.objects = [];

    }

    add(o) {
        this.objects.push(o);

    }

    remove(o) {
        let i = this.objects.indexOf(o);
        this.objects.splice(i, 1);

    }

    update(delta) {
        for (let o of this.objects) {
            o.update(delta);
            this.collisionUpdate();
        }
        if (gameLogic.score <= 0) {
            document.getElementById("gameOver").style.display = "block";
            gameLogic.scrollSpeed = 0;
            Animation.stop();
        }
        if (gameLogic.score >= 15000) {
            document.getElementById("win").style.display = "block";
            gameLogic.scrollSpeed = 0;
            Animation.stop();
        }

    }


    collisionUpdate() {
        collidedGameObjects = [];
        for (let i = 0; i < this.objects.length; i++) {
            for (let j = i + 1; j < this.objects.length; j++) {
                if (this.objects[i].collisionEnable && this.objects[j].collisionEnable)
                    if (checkCollision(this.objects[i], this.objects[j])) {
                        if (this.objects[i].onCollision)
                            this.objects[i].onCollision(this.objects[j]);
                        if (this.objects[j].onCollision)
                            this.objects[j].onCollision(this.objects[i]);
                    }
            }
        }
    }

    render() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let o of this.objects) {
            o.render(ctx);
        }

    }

}

export default new gameState(ctx);