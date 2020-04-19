import GameObject from "./GameObject.js"
import {
    gameLogic
} from "./gameLogic.js"
import loader from "./loader.js"


export default class Ingredient extends GameObject {
    ingsNames = [
        "cheese",
        "eggs",
        "flour",
        "mashrooms",
        "olives",
        "onion",
        "pepper",
        "tomato"
    ];


    constructor(x, y) {
        super(x, y);
        this.dx = 1000;
        loader.sprites["../images/ingredients/" + this.ingsNames[~~(Math.random() * this.ingsNames.length)] + ".png"].then((img) => {
            this.sprite = img;
        });

    }

    onCollision(gameObject) {
        if (gameObject.constructor.name === "Player")
            this.remove();
    }

    async init() {
        this.sprite = await loader.sprites["../images/ingredients/" + this.ingsNames[~~(Math.random() * this.ingsNames.length)] + ".png"];
        this.setDisplayDimesions(this.sprite.width, this.sprite.height);
    }

    update(dtime) {
        super.update(dtime);
        this.dx = gameLogic.scrollSpeed;
        if (gameLogic.moveDirection === "right")
            this.x -= this.dx * dtime;
        else if (gameLogic.moveDirection === "left")
            this.x += this.dx * dtime;
    }

    render(ctx) {
        super.render(ctx);
    }

}