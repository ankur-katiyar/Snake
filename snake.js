// JavaScript Snake example
// Author Ankur Katiyar
// http://zetcode.com/javascript/snake/

var canvas;
var ctx;

var head;
var apple;
var ball;

var dots;
var apple_x;
var apple_y;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RAND = 29;
var DELAY = 141;
const C_HEIGHT = 300;
const C_WIDTH = 300;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);

function init() {

    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    
    gametitle = document.getElementById('gametitle');
    gametitle.value = " Snake v1.4 ";

    loadImages();
    createSnake();
    locateApple();
    update_score();
    update_speed();
    setTimeout("gameCycle()", DELAY);
}

function loadImages() {

    head = new Image();
    head.src = 'head.png';

    ball = new Image();
    ball.src = 'dot.png';

    apple = new Image();
    apple.src = 'apple.png';
}

function createSnake() {

    dots = 3;

    for (var z = 0; z < dots; z++) {
        x[z] = 50 - z * 10;
        y[z] = 50;
    }
}

function doDrawing() {

    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    if (inGame) {

        ctx.drawImage(apple, apple_x, apple_y);

        for (var z = 0; z < dots; z++) {

            if (z == 0) {
                ctx.drawImage(head, x[z], y[z]);
            } else {
                ctx.drawImage(ball, x[z], y[z]);
            }
        }
    } else {

        gameOver();
    }
}

function gameOver() {

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal bold 18px serif';

    ctx.fillText('Game over!', C_WIDTH / 2, (C_HEIGHT / 2) - 25);
    ctx.fillText('Your Score - ' + (dots - 3), C_WIDTH / 2, C_HEIGHT / 2);
}

function update_score() {
    score = document.getElementById('score');
    score.value = dots - 3;
}


function update_speed() {
    speed = document.getElementById('speed');
    DELAY = DELAY - 1;
    
    if (DELAY <= 50) {
        DELAY = 50;
    }
    if (DELAY >= 120) {
        speed.value = "NORMAL";
    }
    if ((DELAY < 120) && (DELAY >= 100)) {
        speed.value = "FAST";
    }
    if ((DELAY < 100) && (DELAY >= 80)) {
        speed.value = "VERY FAST";
    }
    if ((DELAY < 80) && (DELAY >= 60)) {
        speed.value = "SUPER FAST";
    }
    if (DELAY < 60) {
        speed.value = "INSANE";
    }

}

function checkApple() {

    if ((x[0] == apple_x) && (y[0] == apple_y)) {

        dots++;
        locateApple();
        update_score();
        update_speed();
    }
}

function move() {

    for (var z = dots; z > 0; z--) {

        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (leftDirection) {

        x[0] -= DOT_SIZE;
    }

    if (rightDirection) {

        x[0] += DOT_SIZE;
    }

    if (upDirection) {

        y[0] -= DOT_SIZE;
    }

    if (downDirection) {

        y[0] += DOT_SIZE;
    }
}

function checkCollision() {

    for (var z = dots; z > 0; z--) {

        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            inGame = false;
        }
    }

    if (y[0] >= C_HEIGHT) {

        inGame = false;
    }

    if (y[0] < 0) {

        inGame = false;
    }

    if (x[0] >= C_WIDTH) {

        inGame = false;
    }

    if (x[0] < 0) {

        inGame = false;
    }
}

function locateApple() {

    apple_x = 0;
    while ((apple_x == 0) || (apple_x == C_HEIGHT)) {
        var r = Math.floor(Math.random() * MAX_RAND);
        apple_x = r * DOT_SIZE;
    }

    apple_y = 0;
    while ((apple_y == 0) || (apple_y == C_WIDTH)) {
        r = Math.floor(Math.random() * MAX_RAND);
        apple_y = r * DOT_SIZE;
    }

    applecord = document.getElementById('applecord');
    applecord.value = apple_x + ',' + apple_y;

}

function gameCycle() {

    if (inGame) {

        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

onkeydown = function (e) {

    var key = e.keyCode;

    if ((key == LEFT_KEY) && (!rightDirection)) {

        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {

        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) {

        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {

        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }
};
