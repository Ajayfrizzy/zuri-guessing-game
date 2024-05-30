let randomNumber = parseInt(Math.random() * 100 + 1);

const userInput = document.querySelector("#guess-field");
const submit = document.querySelector("#sub");
const startover = document.querySelector(".resultpress");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastresult");
const loworhigh = document.querySelector(".loworhigh");

const p = document.createElement("p");

let previousGuesses = [];
let numGuesses = 1;
let playGame = true;

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess < 1) {
    alert("Please enter a number greater than 1!");
  } else if (guess > 100) {
    alert("Please enter a number less than 100!");
  } else {
    previousGuesses.push(guess);

    if (numGuesses === 3) {
      displayGuesses(guess);
      displayMessage(`Game Over! Number was ${randomNumber}`);
      endGame();
    } else {
      displayGuesses(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage("You guessed correctly");
    endGame();
  } else if (guess < randomNumber) {
    displayMessage("Too low! Try again!");
  } else if (guess > randomNumber) {
    displayMessage("Too High! Try again!");
  }
}

function displayGuesses(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess} `;
  numGuesses++;
  remaining.innerHTML = `${3 - numGuesses} `;
}

function displayMessage(message) {
  loworhigh.innerHTML = `<h1>${message}</h1>`;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = '<h1 id="newGame">Start New Game</h1>';

  startover.appendChild(p);
  playGame = false;
  newGame();

  // Add code here to handle the end of the game
  // For example, you can disable the input field and submit button
  //playGame = false;
  //userInput.disabled = true;
  //submit.disabled = true;
}

function newGame() {
  const newGameButton = document.querySelector("#newGame");
  newGameButton.addEventListener("click", function () {
    randomNumber = parseInt(Math.random() * 100 + 1);
    previousGuesses = [];
    numGuesses = 1;
    guessSlot.innerHTML = "";
    loworhigh.innerHTML = "";
    remaining.innerHTML = `${3 - numGuesses} `;
    userInput.removeAttribute("disabled");
    startover.removeChild(p);
    playGame = true;
  });
}
