"use strict"

let randomNumber = parseInt(Math.random() * 100 + 1);

const inputField = document.querySelector("#input-field");
const submit = document.querySelector("#sub");
const startNewGame= document.querySelector(".start-new-game");
const numberGuessed = document.querySelector(".number-guessed");
const remainingGuesses = document.querySelector(".remaining-guesses");
const loworhigh = document.querySelector(".loworhigh");

const p = document.createElement("p");

let previousGuesses = [];
let numGuesses = 1;
let playGame = true;

if (playGame) {
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const guess = parseInt(inputField.value);
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
  inputField.value = "";
  numberGuessed.innerHTML += `${guess} `;
  numGuesses++;
  remainingGuesses.innerHTML = `${3 - numGuesses} `;
}

function displayMessage(message) {
  loworhigh.innerHTML = `<h1>${message}</h1>`;
}

  /*
  Add code here to handle the end of the game
  For example, you can disable the input field and submit button
  playGame = false;
  userInput.disabled = true;
  submit.disabled = true;  */

function endGame() {
  inputField.value = "";
  inputField.setAttribute("disabled", "");
  //p.classList.add("button");
  p.innerHTML = '<h2 id="newGame">Start New Game</h2>';

  startNewGame.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector("#newGame");
  newGameButton.addEventListener("click", function () {
    randomNumber = parseInt(Math.random() * 100 + 1);
    previousGuesses = [];
    numGuesses = 1;
    numberGuessed.innerHTML = "";
    loworhigh.innerHTML = "";
    remainingGuesses.innerHTML = `${3 - numGuesses} `;
    inputField.removeAttribute("disabled");
    startNewGame.removeChild(p);
    playGame = true;
  });
}
