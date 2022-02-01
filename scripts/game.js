function resetFinishedGame() {
  activePlayer = 0;
  currentRound = 1;
  gameOverElement.firstElementChild.innerHTML =
    '<h2>You won <span id="winner-name">PLAYER NAME</span> !</h2>';
  activeGameElement.style.display = "none";
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      gameBoardElement.children[gameBoardIndex].textContent = "";
      gameBoardElement.children[gameBoardIndex].classList.remove("disabled");
      gameBoardIndex++;
    }
  }
  isGameOver = false;
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please enter both the names for players");
    return;
  }
  // resetFinishedGame();
  activePlayerNameElement.textContent = players[activePlayer].name;
  activeGameElement.style.display = "block";
}

function switchPlayer() {
  activePlayer === 1 ? (activePlayer = 0) : (activePlayer = 1);
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName != "LI" || isGameOver) return;

  const selectedRow = event.target.dataset.row - 1;
  const selectedCol = event.target.dataset.col - 1;

  if (gameData[selectedRow][selectedCol] > 0) {
    alert("please select empty field");
    return;
  }

  event.target.textContent = players[activePlayer].symbol;
  event.target.classList.add("disabled");

  gameData[selectedRow][selectedCol] = activePlayer + 1;

  let result = checkForGameOver();
  if (result > 0) {
    gameOverElement.style.display = "block";
    winnerplayerNameElement.textContent = players[result - 1].name;
    isGameOver = true;
    return;
  }
  if (currentRound === 9) {
    gameOverElement.style.display = "block";
    gameOverElement.firstElementChild.textContent = "Game is draw";
    winnerplayerNameElement.style.display = "none";
    isGameOver = true;
    return;
  }
  currentRound++;

  switchPlayer();
}

function checkForGameOver() {
  // row equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // column equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // diagonally from top-left to bottom-right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // diagonally from bottom-left to top-right
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  return 0;
}
