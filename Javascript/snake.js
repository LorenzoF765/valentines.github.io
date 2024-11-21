// Get the canvas element and its context
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Add the canvas to the DOM
const gameContainer = document.querySelector('.game-container');
gameContainer.appendChild(canvas);

// Define game variables
const gridSize = 20;
let snake = [];
let direction = 'right';
let food = {};
let score = 0;
let gameStarted = false;

// Adjust snake movement speed
const snakeSpeed = 200; // in milliseconds

// Function to start the game
function startGame() {
  if (!gameStarted) {
    // Initialize snake
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    // Generate initial food
    generateFood();
    // Start game loop
    gameLoop();
    // Update game status
    gameStarted = true;
  }
}

// Function to draw the start button
function drawStartButton() {
  ctx.fillStyle = '#8000ff'; // Button color (purple)
  ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 20, 100, 40);
  ctx.fillStyle = '#FFFFFF'; // Text color (white)
  ctx.font = '16px Arial';
  ctx.fillText('Start', canvas.width / 2 - 20, canvas.height / 2 + 5);
}

// Function to check collision with self
function collisionWithSelf(head) {
  return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

// Function to generate food at a random position
function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / gridSize)),
    y: Math.floor(Math.random() * (canvas.height / gridSize))
  };
}

// Game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update snake position
  const head = { x: snake[0].x + (direction === 'left' ? -1 : direction === 'right' ? 1 : 0), y: snake[0].y + (direction === 'up' ? -1 : direction === 'down' ? 1 : 0) };

  // Check for collision with borders
  if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize || collisionWithSelf(head)) {
    // Game over
    gameOver();
    return;
  }

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    // Increase score
    score++;
    // Generate new food
    generateFood();
  } else {
    // Remove tail
    snake.pop();
  }

  // Add new head
  snake.unshift(head);

  // Render snake
  ctx.fillStyle = '#00FF00'; // Snake color (green)
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });

  // Render food
  ctx.fillStyle = '#FF0000'; // Food color (red)
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // Display score
  ctx.fillStyle = '#000000'; // Text color (black)
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 30);

  // Repeat the game loop
  setTimeout(gameLoop, snakeSpeed);
}

// Function to handle game over
function gameOver() {
  console.log("Game Over function called"); // Check if the function is called

  // Display game over message
  ctx.fillStyle = '#000000'; // Text color (black)
  ctx.font = '30px Arial';
  ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2 - 15);
  
  // Display score
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, canvas.width / 2 - 40, canvas.height / 2 + 15);

  // Display replay button
  ctx.fillStyle = '#8000ff'; // Button color (purple)
  ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 + 50, 100, 40);
  ctx.fillStyle = '#FFFFFF'; // Text color (white)
  ctx.font = '16px Arial';
  ctx.fillText('Replay', canvas.width / 2 - 25, canvas.height / 2 + 75);
  // Listen for click on replay button
  canvas.addEventListener('click', replayGame);
}


// Function to replay the game
function replayGame(event) {
  console.log("Replay button clicked"); // Check if the function is triggered

  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  console.log("Mouse coordinates: ", mouseX, mouseY); // Log mouse coordinates

  // Check if click is within replay button area
  if (mouseX >= canvas.width / 2 - 50 && mouseX <= canvas.width / 2 + 50 && mouseY >= canvas.height / 2 + 50 && mouseY <= canvas.height / 2 + 90) {
    console.log("Replay button clicked successfully"); // Log if the replay button is clicked successfully

    // Refresh the page
    window.location.reload();
  }
}
// Draw start button initially
drawStartButton();

// Add event listener for clicking start button
canvas.addEventListener('click', startGame);

// Add event listener for keyboard input
document.addEventListener('keydown', function(event) {
  if (!gameStarted) return; // Ignore input if game hasn't started
  switch(event.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
});