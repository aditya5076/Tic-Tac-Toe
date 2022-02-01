function openOverlay(event) {
  editedPlayer = +event.target.dataset.playerid;
  configOverLayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closeOverlay(event) {
  configOverLayElement.style.display = "none";
  backdropElement.style.display = "none";
  configErrorElement.textContent = "";
  formElement.firstElementChild.classList.remove("errors");
  formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayersConfigs(event) {
  event.preventDefault();
  // console.log(event.target);
  let formData = new FormData(event.target);
  let enteredPlayerName = formData.get("playername").trim();

  if (!enteredPlayerName) {
    event.target.firstElementChild.classList.add("errors");
    configErrorElement.textContent = "Please Enter Valid Name";
    return;
  }

  players[editedPlayer - 1].name = enteredPlayerName;
  let playerConfigName = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  playerConfigName.children[1].textContent = players[editedPlayer - 1].name;
  closeOverlay();
}
