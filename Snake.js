class Snake {
    constructor(len, maxLength, cellSize) {
        this.x = 0;
        this.y = 0;
        this.cellSize = cellSize;
        this.len = len;
        this.maxLength = maxLength;
        this.items = new Array(len).fill([this.x, this.y]);
    }

    updatePosition([dx, dy]) {
        for (let i = this.len - 1; i > 0; i--) {
            this.items[i] = this.items[i - 1].slice();
        }
        this.items[0][0] += dx;
        this.items[0][1] += dy;
    }

    eat() {
        this.len++;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = '#343434';
        for (const item of this.items) {
            ctx.fillRect(item[0] * this.cellSize, item[1] * this.cellSize, this.cellSize, this.cellSize)
        }
        ctx.restore();
    }

    intersects({ x, y }) {
        return this.items.some(item => item[0] === x && item[1] === y);
    }

    get isMaximal() {
        return this.len === this.maxLength;
    }

    get isCollapsed() {
        const [ first, ...rest ] = this.items;
        return rest.some((item) => item[0] === first[0] && item[1] === first[1]);
    }

    stayInBounds(w, h) {
        const [ x, y ] = this.items[0];
        return x >= 0 && x < w && y >= 0 && y < h;
    }
}