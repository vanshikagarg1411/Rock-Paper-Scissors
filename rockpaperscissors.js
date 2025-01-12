let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updatescore();

function playgame(playerMove) {
  const computerMove = randomnumbercalculate();
  let result = "";
  if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "tie";
    } else if (computerMove === "Paper") {
      result = "you lose";
    } else {
      result = "you win";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "you win";
    } else if (computerMove === "Paper") {
      result = "tie";
    } else {
      result = "you lose";
    }
  } else if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "you lose";
    } else if (computerMove === "Paper") {
      result = "you win";
    } else {
      result = "tie";
    }
  }

  if (result === "you win") {
    score.wins++;
  } else if (result === "you lose") {
    score.losses++;
  } else if (result === "tie") {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updatescore();
  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-moves"
  ).innerHTML = ` You <img src="images/${playerMove}-emoji.png" class="move-png" />
  <img src="images/${computerMove}-emoji.png" class="move-png" /> Computer`;
}

function updatescore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
function randomnumbercalculate() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else {
    computerMove = "Scissors";
  }
  return computerMove;
}

let isautoplaying = false;

let intervalid;

function autoplay() {
  if (!isautoplaying) {
    intervalid = setInterval(function () {
      const playerMove = randomnumbercalculate();
      playgame(playerMove);
    }, 1000);
    isautoplaying = true;
  } else {
    clearInterval(intervalid);
    isautoplaying = false;
  }
}
