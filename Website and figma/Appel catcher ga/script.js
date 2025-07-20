const gameContainer = document.querySelector('.game-container');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const goalMessage = document.getElementById('goal-message');
const moveLeftButton = document.getElementById('move-left');
const moveRightButton = document.getElementById('move-right');
const playerSpeed = 10;
let moveLeftInterval, moveRightInterval;
let score = 0; // Make sure to initialize the score

// Handle player movement with smooth transitions (using arrow keys)
document.addEventListener('keydown', (e) => {
  let left = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
  if (e.key === 'ArrowLeft' && left > 0) {
    player.style.left = left - playerSpeed + 'px';
  }
  if (e.key === 'ArrowRight' && left < 250) {
    player.style.left = left + playerSpeed + 'px';
  }
});

// Function to handle touch events for left and right movement
let touchStartX = 0;

gameContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX; // Store the starting X position of touch
});

gameContainer.addEventListener('touchmove', (e) => {
  let touchMoveX = e.touches[0].clientX; // Get the current X position of touch
  let left = parseInt(window.getComputedStyle(player).getPropertyValue('left'));

  if (touchMoveX < touchStartX && left > 0) {
    // Move left if touch moves to the left
    player.style.left = left - playerSpeed + 'px';
  } else if (touchMoveX > touchStartX && left < 250) {
    // Move right if touch moves to the right
    player.style.left = left + playerSpeed + 'px';
  }

  touchStartX = touchMoveX; // Update touchStartX for smooth dragging
});

// Add event listeners for the buttons (mouse)
moveLeftButton.addEventListener('mousedown', () => {
  moveLeftInterval = setInterval(() => {
    let left = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    if (left > 0) {
      player.style.left = left - playerSpeed * 2 + 'px'; // Move faster when button is held
    }
  }, 50); // Keep moving faster while holding
});

moveLeftButton.addEventListener('mouseup', () => {
  clearInterval(moveLeftInterval); // Stop moving when button is released
});

moveRightButton.addEventListener('mousedown', () => {
  moveRightInterval = setInterval(() => {
    let left = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    if (left < 250) {
      player.style.left = left + playerSpeed * 2 + 'px'; // Move faster when button is held
    }
  }, 50); // Keep moving faster while holding
});

moveRightButton.addEventListener('mouseup', () => {
  clearInterval(moveRightInterval); // Stop moving when button is released
});

// Function to create and drop apples (slow them down and reduce spawn rate)
function createApple() {
  const apple = document.createElement('div');
  apple.classList.add('apple');
  apple.style.left = Math.floor(Math.random() * 280) + 'px';
  gameContainer.appendChild(apple);

  // Slow down the apple fall speed by increasing the animation duration
  apple.style.animationDuration = `${Math.random() + 2}s`; // Random fall duration between 2s and 3s

  apple.addEventListener('animationiteration', () => {
    apple.remove();
  });

  // Check for collision between player and apple
  let appleFallInterval = setInterval(() => {
    if (detectCollision(player, apple)) {
      apple.remove(); // Remove the apple if the player catches it
      updateScore();
      playCatchSound();
      clearInterval(appleFallInterval); // Stop the fall animation when caught
    }
  }, 30); // Check every 30ms for a collision during the fall
}

// Generate a new apple every 1.5 seconds (increased time)
setInterval(createApple, 1500);

// Collision detection function (wider collision area)
function detectCollision(player, apple) {
  const playerRect = player.getBoundingClientRect();
  const appleRect = apple.getBoundingClientRect();

  return !(
    playerRect.top > appleRect.bottom ||
    playerRect.bottom < appleRect.top ||
    playerRect.right < appleRect.left ||
    playerRect.left > appleRect.right
  );
}

// Update score and handle goal completion
function updateScore() {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;

  if (score >= 10) {
    goalMessage.textContent = "Goal Complete!";
    goalMessage.style.display = "block";
    resetGame();
    playGoalSound();
  }
}

// Reset the game after reaching the goal
function resetGame() {
  setTimeout(() => {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    goalMessage.style.display = "none";
    const apples = document.querySelectorAll('.apple');
    apples.forEach(apple => apple.remove());
  }, 2000);
}

// Sound Effects
function playCatchSound() {
  const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
  audio.play();
}

function playGoalSound() {
  const audio = new Audio('https://www.soundjay.com/button/beep-08b.wav');
  audio.play();
}
