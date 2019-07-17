class Food {
    constructor(w, h, cellSize) {
        this.w = w;
        this.h = h;
        this.cellSize = cellSize;

        this.randomizePosition();
    }
    randomizePosition() {
        this.x = Math.floor(Math.random() * this.w);
        this.y = Math.floor(Math.random() * this.h);
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = "red";
        ctx.fillRect(this.x * this.cellSize, this.y * this.cellSize, this.cellSize, this.cellSize)
        ctx.restore();
    }
    get position() {
        return {
            x: this.x,
            y: this.y,
        };
    }
    set position({ x, y }) {
        this.x = x;
        this.y = y;
    }
}