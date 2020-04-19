import GameObject from "./GameObject.js";
import Animation from "./Animation.js"
import loader from "./loader.js"
import {
    gameLogic
} from "./gameLogic.js"

export default class Player extends GameObject {

    spacePressed = false;
    downPressed = false;
    // jumpAnimation = new Animation({a:2,0:2},{1:200},"once");
    runAnimation = new Animation({
        0: {
            leftTop: {
                x: 0,
                y: 3
            },
            rightBottom: {
                x: 95,
                y: 294
            }
        },
        1: {
            leftTop: {
                x: 96,
                y: 8
            },
            rightBottom: {
                x: 96 + 130,
                y: 287 + 8
            }
        },
        2: {
            leftTop: {
                x: 226,
                y: 10
            },
            rightBottom: {
                x: 226 + 141,
                y: 283 + 10
            }
        },
        3: {
            leftTop: {
                x: 367,
                y: 9
            },
            rightBottom: {
                x: 150 + 367,
                y: 284 + 9
            }
        },
        4: {
            leftTop: {
                x: 517,
                y: 4
            },
            rightBottom: {
                x: 128 + 517,
                y: 294
            }
        },
        5: {
            leftTop: {
                x: 645,
                y: 5
            },
            rightBottom: {
                x: 125 + 645,
                y: 295
            }
        },
        6: {
            leftTop: {
                x: 770,
                y: 10
            },
            rightBottom: {
                x: 149 + 770,
                y: 294
            }
        },
        7: {
            leftTop: {
                x: 919,
                y: 8
            },
            rightBottom: {
                x: 919 + 150,
                y: 295
            }
        },
        8: {
            leftTop: {
                x: 1069,
                y: 2
            },
            rightBottom: {
                x: 1069 + 91,
                y: 294
            }
        }
    }, {
        0: 100,
        1: 100,
        2: 100,
        3: 100,
        4: 100,
        5: 100,
        6: 100,
        7: 100,
        8: 100
    }, "repeat");

    duckAnimation = new Animation({
        0: {
            leftTop: {
                x: 0,
                y: 0
            },
            rightBottom: {
                x: 95,
                y: 292
            }
        },
        1: {
            leftTop: {
                x: 96,
                y: 12
            },
            rightBottom: {
                x: 208,
                y: 292
            }
        },
        2: {
            leftTop: {
                x: 209,
                y: 68
            },
            rightBottom: {
                x: 313,
                y: 292
            }
        },
        3: {
            leftTop: {
                x: 96,
                y: 12
            },
            rightBottom: {
                x: 208,
                y: 292
            }
        },
        4: {
            leftTop: {
                x: 0,
                y: 0
            },
            rightBottom: {
                x: 95,
                y: 292
            }
        },
    }, {
        0: 50,
        1: 50,
        2: 50,
        3: 50,
        4: 50
    }, "once");

    runSprite = null;
    duckSprite = null;



    constructor(x, y, gameLogic) {
        super(x, y);
        document.addEventListener("keydown", (event) => {
            if (event.keyCode === 32)
                this.spacePressed = true;
            if (event.keyCode === 83 || event.keyCode === 40)
                this.downPressed = true;
        });

        document.addEventListener("keyup", (event) => {
            if (event.keyCode === 32)
                this.spacePressed = false;
            if (event.keyCode === 83 || event.keyCode === 40)
                this.downPressed = false;
        });
    }

    async init() {
        this.runSprite = await loader.load("../images/robot move.png");
        this.duckSprite = await loader.load("../images/robot sit.png");
        this.duckAnimation.done = true;
        this.sprite = this.runSprite;
        this.animation = this.runAnimation;
        window.a = this;
    }

    update(delta) {
        if (this.spacePressed) this.onSpacePress();
        if (this.downPressed) this.onDownPress();
        if (!this.spacePressed) {
            this.runAnimation.run();
            gameLogic.scrollSpeed = gameLogic.defaultScrollSpeed
        }
        this.animation.onDone = () => {
            this.animation = this.runAnimation;
            this.sprite = this.runSprite;
            this.animation.run();
        }
        super.update(delta);
    }

    onCollision(gameObject) {
        if (gameObject.constructor.name === "Enemy") {
            //TODO score code on enemy collision
            gameObject.collisionEnable = true;
            gameLogic.score -= 5;
        } else if (gameObject.constructor.name === "Ingredient") {
            //TODO score++
            gameObject.collisionEnable = true;
            gameLogic.score += 100;



        }
    }
    render(ctx) {
        if (this.animation) {
            // super.render(ctx);
            if (gameLogic.moveDirection === "left") {
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(this.sprite, this.animation.currentSpritePosition.leftTop.x, this.animation.currentSpritePosition.leftTop.y, this.width, this.height, this.x * -1 - (this.animation.currentSpritePosition.leftTop.y + this.animation.currentSpritePosition.rightBottom.y) / 2, this.y + this.animation.currentSpritePosition.leftTop.y, this.width, this.height);
                ctx.restore();
            } else if (gameLogic.moveDirection === "right") {
                ctx.drawImage(this.sprite, this.animation.currentSpritePosition.leftTop.x, this.animation.currentSpritePosition.leftTop.y, this.width, this.height, this.x, this.y + this.animation.currentSpritePosition.leftTop.y, this.width, this.height);
            }
        }
    }

    onSpacePress() {
        this.runAnimation.pause();
        gameLogic.scrollSpeed = 0;
    }

    onDownPress() {
        if (this.duckAnimation.done) {
            this.runAnimation.stop();
            this.sprite = this.duckSprite;
            this.animation = this.duckAnimation;
            this.duckAnimation.stop();
            this.duckAnimation.run();
        }
    }
}