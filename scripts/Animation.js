//sprite; sprite chunks dimensions; speed of each frame
// spriteDimensionsArray = {
//     0: {
//         leftTop: {
//             x: 0,
//             y: 0
//         },
//         rightBottom: {
//             x: 50,
//             y: 50
//         }
//     },
//     1: {
//         leftTop: {
//             x: 70,
//             y: 0
//         },
//         rightBottom: {
//             x: 120,
//             y: 50
//         }
//     },
//     2: {
//         leftTop: {
//             x: 130,
//             y: 0
//         },
//         rightBottom: {
//             x: 190,
//             y: 50
//         }
//     }
// }
// speedOfFrame = {
//     0: 500,
//     1: 200,
//     2: 400
// }
// animationType = "repeat" || "once"
export default class Animation {
    constructor(spriteDimensionsArray, speedOfFrame, animationType) {
        this.spriteDimensionsArray = spriteDimensionsArray;
        this.speedOfFrame = speedOfFrame;
        this.animationType = animationType || "once";
        this.currentAnimationTime = 0;
        this.eachFrameDuration = Object.values(this.speedOfFrame);
        this.eachFrameStartTime = [0, this.eachFrameDuration[0]];
        this.done = false;
        this.paused = false;
        this.currentFrame = 0;
        this.currentSpritePosition = this.spriteDimensionsArray[0];
        this.eachFrameDuration.reduce((acc, currentValue) => {
            this.eachFrameStartTime.push(acc + currentValue);
            return acc + currentValue;
        });
    }

    setCurrentAnimationFrame(frameNumber){
        this.currentFrame = frameNumber;
        this.currentAnimationTime = this.eachFrameStartTime[frameNumber];
    }

    setSpeedOfFrame(speedOfFrame) {
        this.speedOfFrame = speedOfFrame;
        this.eachFrameDuration = Object.values(this.speedOfFrame);
        this.eachFrameStartTime = [0, this.eachFrameDuration[0]];
        this.eachFrameDuration.reduce((acc, currentValue) => {
            this.eachFrameStartTime.push(acc + currentValue);
            return acc + currentValue;
        });
        this.setCurrentAnimationFrame(this.currentFrame);
    }

    onDone(){

    }

    pause(){
        this.paused = true;
    }

    stop(){
        this.pause();
        this.currentAnimationTime = 0;
        this.currentFrame = 0;
    }
 
    run(){
        this.paused = false;
    }

    render(dt) {
        if(this.paused) return this.currentSpritePosition;
        this.currentAnimationTime += dt;

        let type = null;
        if (this.currentAnimationTime >= this.eachFrameStartTime[this.eachFrameStartTime.length - 1]) {
            if (this.animationType === "repeat") {
                type = "repeat";
                this.currentAnimationTime = this.currentAnimationTime - this.eachFrameStartTime[this.eachFrameStartTime.length - 1]
            }

            if (this.animationType === "once") type = "stop";
        }

        if (type === "repeat" || !type) {
            this.done = false;
            for (let i = 0; i < this.eachFrameStartTime.length; i++) {
                if (this.eachFrameStartTime[i] <= this.currentAnimationTime && this.eachFrameStartTime[i + 1] > this.currentAnimationTime) {
                    this.currentFrame = i;
                    break;
                }
            }

            const values = Object.values(this.spriteDimensionsArray);
            this.currentSpritePosition = values[this.currentFrame];
            return this.currentSpritePosition;
        }

        if (type === "stop") {
            this.done = true;
            this.onDone();
            const values = Object.values(this.spriteDimensionsArray);
            this.currentFrame = values.length - 1;
            this.currentSpritePosition = values[values.length - 1];
            return this.currentSpritePosition;
        }
    }
}