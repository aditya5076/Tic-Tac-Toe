let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let isGameOver = false;

let gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

const configOverLayElement = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const configErrorElement = document.getElementById("config-errors");
const activeGameAreaElement = document.getElementById("active-game");
const gameBoardElement = document.getElementById("game-board");
const activePlayerNameElement = document.getElementById("active-player-name");
const gameOverElement = document.getElementById("game-over");
const footerElement = document.querySelector("footer");

const player1EditBtn = document.getElementById("edit-player-1-btn");
const player2EditBtn = document.getElementById("edit-player-2-btn");
const cancelBtnElement = formElement.lastElementChild.children[0];
const submitBtnElement = formElement.lastElementChild.children[1];
const startGameBtnElement = document.getElementById("start-game-btn");

player1EditBtn.addEventListener("click", openOverlay);
player2EditBtn.addEventListener("click", openOverlay);
backdropElement.addEventListener("click", closeOverlay);
cancelBtnElement.addEventListener("click", closeOverlay);
formElement.addEventListener("submit", savePlayersConfigs);
startGameBtnElement.addEventListener("click", startNewGame);
gameBoardElement.addEventListener("click", selectGameField);
gameOverElement.addEventListener("click", resetGameStatus);
