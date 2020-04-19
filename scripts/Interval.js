export default class Interval {
    constructor(time) {
        this.time = time;
        this.currentTime = 0;
    }

    onTime() {}

    calculate(dt) {
        this.currentTime += dt;
        if (this.time <= this.currentTime) {
            this.onTime();
            this.currentTime -= this.time;
        }
    }
}