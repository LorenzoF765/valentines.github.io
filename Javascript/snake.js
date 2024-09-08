const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Constants
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const BIRD_WIDTH = 34;
const BIRD_HEIGHT = 24;
const PIPE_WIDTH = 52;
const PIPE_HEIGHT = 320;
const GAP = 400; // Much wider gap between pipes
const GRAVITY = 0.2; // Slower gravity
const FLAP_STRENGTH = 8; // Reduced flap strength
const PIPE_SPEED = 1; // Slower pipe speed

// Game State
let birdX = 10;
let birdY;
let birdVelocity = 0;
let pipes = [];
let score = 0;
let isGameOver = false;
let gameStarted = false;
let countdown = 3;

// Placeholder Colors
const BIRD_COLOR = '#FFD700'; // Gold
const BG_COLOR = '#70c5ce';   // Sky Blue
const FG_COLOR = '#228B22';   // Forest Green
const PIPE_COLOR = '#8B4513'; // Saddle Brown

// Event Listeners
document.addEventListener('keydown', handleKeyPress);
canvas.addEventListener('touchstart', handleTouch);
document.getElementById('startButton').addEventListener('click', startGame);

function handleKeyPress(event) {
    if (event.key === ' ') {
        flap();
    }
}

function handleTouch() {
    flap();
}

function flap() {
    if (!isGameOver && gameStarted) {
        birdVelocity = -FLAP_STRENGTH;
    }
}

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    gameStarted = true;
    initializeGame();
}

function initializeGame() {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    birdY = canvas.height / 2;
    pipes = [{ x: canvas.width, y: getRandomPipeY() }];
    score = 0;
    isGameOver = false;
    countdown = 3;
    document.getElementById('startButton').style.display = 'none';
    requestAnimationFrame(countdownLoop);
}

function getRandomPipeY() {
    return Math.floor(Math.random() * (canvas.height - PIPE_HEIGHT - GAP));
}

function countdownLoop() {
    if (countdown > 0) {
        renderCountdown();
        countdown--;
        setTimeout(() => requestAnimationFrame(countdownLoop), 1000);
    } else {
        requestAnimationFrame(gameLoop);
    }
}

function renderCountdown() {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#000";
    ctx.font = "40px Verdana";
    ctx.textAlign = "center";
    ctx.fillText(`Starting in ${countdown}`, canvas.width / 2, canvas.height / 2);
}

function gameLoop() {
    if (isGameOver) return;
    
    update();
    render();
    requestAnimationFrame(gameLoop);
}

function update() {
    birdY += birdVelocity;
    birdVelocity += GRAVITY;

    // Pipe movement and collision
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= PIPE_SPEED;

        if (pipes[i].x + PIPE_WIDTH < 0) {
            pipes.splice(i, 1);
            score++; // Increase score when pipes pass through
        } else if (pipes[i].x === canvas.width - PIPE_WIDTH - 200) { // Increase distance between pipes
            pipes.push({ x: canvas.width, y: getRandomPipeY() });
        }

        if (checkCollision(pipes[i])) {
            gameOver();
        }
    }

    if (birdY + BIRD_HEIGHT > canvas.height - 50) { // Adjusting for placeholder foreground
        gameOver();
    }
}

function render() {
    // Draw background
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw pipes
    pipes.forEach(pipe => {
        ctx.fillStyle = PIPE_COLOR;
        ctx.fillRect(pipe.x, pipe.y, PIPE_WIDTH, PIPE_HEIGHT);
        ctx.fillRect(pipe.x, pipe.y + PIPE_HEIGHT + GAP, PIPE_WIDTH, canvas.height - (pipe.y + PIPE_HEIGHT + GAP));
    });

    // Draw bird
    ctx.fillStyle = BIRD_COLOR;
    ctx.fillRect(birdX, birdY, BIRD_WIDTH, BIRD_HEIGHT);

    // Draw foreground
    ctx.fillStyle = FG_COLOR;
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50); // Placeholder foreground

    // Draw score
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText(`Score: ${score}`, 10, canvas.height - 20);
}

function checkCollision(pipe) {
    return birdX < pipe.x + PIPE_WIDTH &&
           birdX + BIRD_WIDTH > pipe.x &&
           (birdY < pipe.y + PIPE_HEIGHT ||
           birdY + BIRD_HEIGHT > pipe.y + PIPE_HEIGHT + GAP);
}

function gameOver() {
    isGameOver = true;
    alert(`Game Over! Your Score: ${score}`);
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('startButton').style.display = 'block';
}

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (gameStarted) {
        initializeGame();
    }
});
