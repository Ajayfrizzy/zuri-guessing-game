// Game state object to better organize variables
const gameState = {
  randomNumber: Math.floor(Math.random() * 100) + 1,
  previousGuesses: [],
  numGuesses: 0,
  maxGuesses: 3,
  isPlaying: true
};

// DOM elements - more descriptive names
const elements = {
  inputField: document.querySelector("#input-field"),
  submitButton: document.querySelector("#sub"),
  gameContainer: document.querySelector(".start-new-game"),
  guessedNumbers: document.querySelector(".number-guessed"),
  guessesRemaining: document.querySelector(".remaining-guesses"),
  messageDisplay: document.querySelector(".loworhigh"),
  newGameButton: document.createElement("p")
};

// Initialize the game
function initGame() {
  elements.submitButton.addEventListener("click", handleGuess);
  updateGuessesRemaining();
}

// Handle guess submission
function handleGuess(e) {
  e.preventDefault();
  
  if (!gameState.isPlaying) return;
  
  const guess = parseInt(elements.inputField.value);
  
  if (validateGuess(guess)) {
    processGuess(guess);
  }
}

// Validate the user's guess
function validateGuess(guess) {
  if (isNaN(guess)) {
    showMessage("Please enter a valid number", "error");
    return false;
  }
  
  if (guess < 1 || guess > 100) {
    showMessage("Please enter a number between 1 and 100", "error");
    return false;
  }
  
  return true;
}

// Process a valid guess
function processGuess(guess) {
  gameState.previousGuesses.push(guess);
  gameState.numGuesses++;
  
  updateGameDisplay(guess);
  
  if (guess === gameState.randomNumber) {
    endGame(`You guessed right! The number was ${gameState.randomNumber}`, "win");
  } else if (gameState.numGuesses >= gameState.maxGuesses) {
    endGame(`Game Over! The number was ${gameState.randomNumber}`, "lose");
  } else {
    giveHint(guess);
  }
}

// Update the game display
function updateGameDisplay(guess) {
  elements.inputField.value = "";
  elements.guessedNumbers.textContent = gameState.previousGuesses.join(", ");
  updateGuessesRemaining();
}

// Update remaining guesses display
function updateGuessesRemaining() {
  elements.guessesRemaining.textContent = gameState.maxGuesses - gameState.numGuesses;
}

// Provide hint to player
function giveHint(guess) {
  const hint = guess < gameState.randomNumber ? "Too low!" : "Too high!";
  showMessage(`${hint} Try again!`);
}

// Show messages with optional type (for styling)
function showMessage(message, type = "info") {
  elements.messageDisplay.innerHTML = `<h2 class="${type}">${message}</h2>`;
}

// End the game
function endGame(message, outcome) {
  showMessage(message, outcome);
  disableInput();
  setupNewGameButton();
  gameState.isPlaying = false;
}

// Disable input when game ends
function disableInput() {
  elements.inputField.disabled = true;
  elements.submitButton.disabled = true;
}

// Enable input for new game
function enableInput() {
  elements.inputField.disabled = false;
  elements.submitButton.disabled = false;
}

// Setup new game button
function setupNewGameButton() {
  elements.newGameButton.classList.add("button");
  elements.newGameButton.innerHTML = '<button id="newGame">Start New Game</button>';
  elements.gameContainer.appendChild(elements.newGameButton);
  
  document.querySelector("#newGame").addEventListener("click", startNewGame);
}

// Start a new game
function startNewGame() {
  // Reset game state
  gameState.randomNumber = Math.floor(Math.random() * 100) + 1;
  gameState.previousGuesses = [];
  gameState.numGuesses = 0;
  gameState.isPlaying = true;
  
  // Reset UI
  elements.guessedNumbers.textContent = "";
  elements.messageDisplay.textContent = "";
  updateGuessesRemaining();
  enableInput();
  
  // Remove new game button
  if (elements.gameContainer.contains(elements.newGameButton)) {
    elements.gameContainer.removeChild(elements.newGameButton);
  }
}

// Initialize the game when loaded
document.addEventListener("DOMContentLoaded", initGame);