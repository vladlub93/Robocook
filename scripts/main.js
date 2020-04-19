import gameState from "./GameState.js";
import loader from "./loader.js"
import Enemy from "./Enemy.js"
import ImageMoveGameObject from "./ImageMoveGameObject.js"
import Player from "./Player.js"
import {
    gameLogic
} from "./gameLogic.js"
import Interval from "./Interval.js"
import Ingredient from "./Ingredients.js";

(async function () {

    loader.load("../images/robot sit.png")
    loader.load("../images/icicle.png")
    loader.load("../images/background ice all.png")
    let ingsNames = [
        "cheese",
        "eggs",
        "flour",
        "mashrooms",
        "olives",
        "onion",
        "pepper",
        "tomato"
    ];
    for (const i of ingsNames) {
        loader.load("../images/ingredients/" + i + ".png");
    }

    loader.loaded().then(async (arr) => {
        let lastTime;

        const moveObject = new ImageMoveGameObject(0, 0);
        moveObject.sprite = await loader.sprites["../images/background ice all.png"];
        gameState.add(moveObject);

        const player = new Player(600, 696);
        await player.init();
        gameState.add(player)

        window.addEventListener("keypress", (ev) => {
            switch (ev.code) {
                case "KeyA":
                    gameLogic.moveDirection = "left";
                    break;
                case "KeyD":
                    gameLogic.moveDirection = "right";
                    break;
                default:
                    break;
            }
        });


        const enemySpawnInterval = new Interval(1000);
        enemySpawnInterval.onTime = async () => {
            const x = Math.random() * (1920 - 700) + 700
            const enemy = new Enemy(x, 0, 400);


            enemy.sprite = await loader.sprites["../images/icicle.png"];
            enemy.setDisplayDimesions(enemy.sprite.width, enemy.sprite.height)
            enemy.hitBoxFunction = (hitBox, gameObject) => {
                gameObject.updateHitBoxToSprite();
                hitBox.x += 30;
                hitBox.width -= 30;
            }
            gameState.add(enemy);
            // console.log(gameState);
        }

        const ingredientSpawnInterval = new Interval(1000);
        ingredientSpawnInterval.onTime = async () => {
            const x = Math.random() * (1920 - 600) + 600;
            const ingredient = new Ingredient(x, 880, 400);
            await ingredient.init();
            gameState.add(ingredient);

        }


        function main() {
            var now = Date.now();
            var dt = (now - lastTime) / 1000.0;
            if (dt) {
                update(dt);
                enemySpawnInterval.calculate(dt * 1000);
                ingredientSpawnInterval.calculate(dt * 1000);
            }
            render();
            lastTime = now;
            requestAnimationFrame(main);

        };

        function update(dt) {
            gameState.update(dt);
            document.getElementById("score").innerText = gameLogic.score;
        }

        function render() {
            gameState.render();

        }
        requestAnimationFrame(main);
    })
})();