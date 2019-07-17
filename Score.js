class Score {
    constructor(max) {
        this.value = 0;
        this.max = max;
    }

    draw(ctx) {
        ctx.save();
        ctx.font = '16px Verdana, Geneva, sans-serif';
        ctx.fillStyle = 'black';
        ctx.fillText(`${this.value}/${this.max}`, 5, 20);
        ctx.restore();
    }

    increment() {
        this.value++;
    }

    set score(value) {
        this.value = value;
    }

    get score() {
        return this.value;
    }
}