function resetGameStatus() {
  currentRound = 1;
  activePlayer = 0;
  gameOverElement.firstElementChild.innerHTML =
    '<h2>You won <span id="winner-name">PLAYER NAME</span> !</h2>';
  gameOverElement.style.display = "none";
  activeGameAreaElement.style.display = "none";
  footerElement.style.position = "fixed";
  let gameBoardIndex = 0;
  isGameOver = false;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      gameBoardElement.children[gameBoardIndex].textContent = "";
      gameBoardElement.children[gameBoardIndex].classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame(event) {
  if (!players[0].name || !players[1].name) {
    alert("Please enter both the players' name");
    return;
  }
  resetGameStatus();
  footerElement.style.position = "relative";
  activeGameAreaElement.style.display = "block";
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function switchActivePlayer() {
  activePlayer == 1 ? (activePlayer = 0) : (activePlayer = 1);
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName !== "LI" || isGameOver) return;

  let selectedRow = event.target.dataset.row - 1;
  let selectedColumn = event.target.dataset.col - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select empty field");
    return;
  }

  event.target.textContent = players[activePlayer].symbol;
  event.target.classList.add("disabled");
  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  let result = checkForGameOver();

  if (result > 0) {
    gameOverElement.style.display = "block";
    gameOverElement.firstElementChild.firstElementChild.textContent =
      players[activePlayer].name;
    isGameOver = true;
    return;
  }
  if (currentRound == 9) {
    gameOverElement.style.display = "block";
    gameOverElement.firstElementChild.innerHTML = "<h2>The game is draw!</h2>";
    isGameOver = true;
    return;
  }
  currentRound++;
  switchActivePlayer();
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

  if (currentRound === 9) return -1;

  return 0;
}
