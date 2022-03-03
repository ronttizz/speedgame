const buttons = document.querySelectorAll(".button");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector("#close");
const scoreText = document.querySelector("#score");
const scoreEnd = document.querySelector("#scoreEnd");

let active = 0;
let score = 0;
let speed = 2000;

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
  console.log("active button: ", active);
  timer = setTimeout(startGame, speed);
  speed = speed - 100;

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
  console.log(speed);

  scoreEnd.textContent = score;

  overlay.style.visibility = "visible";
};

const reloadGame = () => {
  window.location.reload();
};

const clickedButton = (i) => {
  buttons[active].classList.remove("active");

  if (i === active) {
    score++;
    scoreText.textContent = score;
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
