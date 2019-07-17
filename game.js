const CANVAS_ID = 'canvas';
const FRAME_RATE = 10;
const FRAME_TIME = 1000 / FRAME_RATE; // milliseconds
const SIZE = 16;
const WIDTH = 30;
const HEIGHT = 20;

const SNAKE_LENGTH = 3;
const SNAKE_MAX_LENGTH = 21;

const DIR = {
    'ArrowUp': [0, -1],
    'ArrowDown': [0, 1],
    'ArrowLeft': [-1, 0],
    'ArrowRight': [1, 0],
};

const DIR_OPPOSITE = {
    'ArrowUp': 'ArrowDown',
    'ArrowDown': 'ArrowUp',
    'ArrowLeft': 'ArrowRight',
    'ArrowRight': 'ArrowLeft',
}

let canvas
let ctx
let time
let food
let snake
let score

let state = tick;
let dir = 'ArrowDown';

function setup() {
    canvas = document.getElementById(CANVAS_ID);
    ctx = canvas.getContext('2d');
    canvas.width = SIZE * WIDTH;
    canvas.height = SIZE * HEIGHT;
    time = Date.now()
    food = new Food(WIDTH, HEIGHT, SIZE);
    snake = new Snake(SNAKE_LENGTH, SNAKE_MAX_LENGTH, SIZE);
    score = new Score(SNAKE_MAX_LENGTH - SNAKE_LENGTH);

    bindInput();
    state();
}

function bindInput() {
    document.addEventListener('keydown', input);
    // document.addEventListener('keyup', handleKeyUp);
}
function unbindInput() {
    document.removeEventListener('keydown', input);
}

function input(e) {
    if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)
        && dir !== DIR_OPPOSITE[e.code]
    ) {
        dir = e.code;
    }
}

function update() {
    snake.updatePosition(DIR[dir]);
    if (!snake.stayInBounds(WIDTH, HEIGHT) || snake.isCollapsed) {
        state = loose;
    } else if (snake.intersects(food.position)) {
        snake.eat();
        score.increment();
        if (snake.isMaximal) {
            state = win;
        }
        food.randomizePosition();
    }
}

function draw() {
    // clear canvas
    ctx.save();
    ctx.fillStyle = 'orange';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    food.draw(ctx);
    snake.draw(ctx);
    score.draw(ctx);
}

function tick() {
    const timestamp = Date.now();
    if (timestamp - time >= FRAME_TIME) {
        time = timestamp;
        update();
        draw();
    }
    requestAnimationFrame(state);
}

document.addEventListener('DOMContentLoaded', setup);



const win = () => showMessageScreen('You win', 'white', 'black');
const loose = () => showMessageScreen('You loose', 'red', 'black');

function showMessageScreen(message, bgColor, textColor) {
    unbindInput();
    ctx.save();
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '48px Verdana, Geneva, sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.fillText(message, canvas.width / 2, canvas.height / 2);
    ctx.restore();
}