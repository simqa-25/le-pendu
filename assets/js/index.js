const words = [
  "javascript",
  "developpeur",
  "ordinateur",
  "pendu",
  "jeu",
  "programmation",
  "internet",
  "technologie",
  "algorithme",
  "logiciel",
  "data",
  "web",
  "serveur",
  "client",
  "réseau",
];
let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

const hangmanElement = document.querySelector("#hangman");
const wordDisplayElement = document.querySelector("#wordDisplay");
const lettersProposedElement = document.querySelector("#lettersProposed");
const letterInput = document.querySelector("#letterInput");
const submitLetterButton = document.querySelector("#submitLetter");
const messageElement = document.querySelector("#message");
const restartButton = document.querySelector("#restartButton");

function startGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  wrongGuesses = 0;
  updateDisplay();
  messageElement.textContent = "";
  restartButton.style.display = "none";
}

function updateDisplay() {
  let wordDisplay = "";
  // Parcours chaque lettre du mot et afficher soit la lettre si elle a été devinée, soit un underscore sinon
  for (let i = 0; i < selectedWord.length; i++) {
    if (guessedLetters.indexOf(selectedWord[i]) !== -1) {
      wordDisplay += selectedWord[i] + " ";
    } else {
      wordDisplay += "_ ";
    }
  }

  wordDisplayElement.textContent = wordDisplay.trim();

  // Affiche les lettres proposées
  let proposedLetters = "Lettres proposées : ";
  for (let i = 0; i < guessedLetters.length; i++) {
    proposedLetters +=
      guessedLetters[i] + (i < guessedLetters.length - 1 ? ", " : "");
  }
  lettersProposedElement.textContent = proposedLetters;

  // Affiche l'image du pendu en fonction des mauvais essais
  hangmanElement.innerHTML = `<img src="assets/images/pendu-img${
    wrongGuesses + 1
  }.png" alt="Pendu étape ${wrongGuesses + 1}" />`;

  // Vérifie la fin du jeu
  if (wrongGuesses >= maxWrongGuesses) {
    endGame(false);
  } else if (wordDisplay.indexOf("_") === -1) {
    endGame(true);
  }
}

function proposeLetter() {
  const letter = letterInput.value.toLowerCase();
  letterInput.value = "";

  if (letter && guessedLetters.indexOf(letter) === -1) {
    guessedLetters.push(letter);

    if (selectedWord.indexOf(letter) === -1) {
      wrongGuesses++;
    }

    updateDisplay();
  }
}

function endGame(isWin) {
  if (isWin) {
    messageElement.textContent = "Félicitations, vous avez gagné !";
  } else {
    messageElement.textContent = `Vous avez perdu ! Le mot était : ${selectedWord}`;
  }
  restartButton.style.display = "block";
}

submitLetterButton.addEventListener("click", proposeLetter);
restartButton.addEventListener("click", startGame);

letterInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    proposeLetter();
  }
});

// Démarre le jeu
startGame();
