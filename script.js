const buttons = document.querySelectorAll(".button");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector("#close");
const scoreText = document.querySelector("#score");
const scoreEnd = document.querySelector("#scoreEnd");
const scoreEndText = document.querySelector("#scoreEndText");
const missed3 = document.querySelector("#missed3");

let active = 0;
let score = 0;
let speed = 2000;
let clicked = false;
let miss = 0;

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const startGame = () => {
  let nextActive = pickNew(active);
  buttons.forEach((button) => (button.style.pointerEvents = "auto"));
  startButton.style.display = "none";
  stopButton.style.display = "inline";

  buttons[nextActive].classList.toggle("active");
  buttons[active].classList.remove("active");

  active = nextActive;
  clicked = false;
  miss++;

  timer = setTimeout(startGame, speed);
  if (miss > 3) {
    stopGame();
  }

  if (score !== 0 && score % 4 === 0) {
    speed = speed - 200;
  }

  function pickNew(active) {
    let nextActive = getRndInt(0, 3);

    if (nextActive != active) {
      return nextActive;
    } else {
      return pickNew(active);
    }
  }
};

const stopGame = () => {
  clearTimeout(timer);
  scoreEnd.textContent = score;

  if (score === 0) {
    scoreEndText.textContent = "Did you even try?";
  } else if (score > 0 && score < 9) {
    scoreEndText.textContent = "Nice try!";
  } else if (score > 9 && score < 19) {
    scoreEndText.textContent = "Really good!";
  } else if (score > 19 && score < 29) {
    scoreEndText.textContent = "You are really good!";
  } else if (score > 29 && score < 39) {
    scoreEndText.textContent = "Almost insane!";
  } else {
    scoreEndText.textContent = "INSANE!";
  }

  if (miss > 3) {
    missed3.textContent = "Dang, you missed 3 in a row.";
  } else {
    missed3.textContent = "";
  }

  overlay.style.visibility = "visible";
};

const reloadGame = () => {
  window.location.reload();
};

const clickedButton = (i) => {
  buttons[active].classList.remove("active");
  miss = 0;

  if (i === active && clicked !== true && !(miss === 3)) {
    score++;
    scoreText.textContent = score;
    clicked = true;
  } else {
    stopGame();
  }
};

buttons.forEach((button, i) => button.addEventListener("click", () => clickedButton(i)));

startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);
closeButton.addEventListener("click", reloadGame);

startButton.style.display = "inline";
stopButton.style.display = "none";
