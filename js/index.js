// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let baseSpeed = 10; // Lower base speed
let speed = baseSpeed;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];

food = { x: 6, y: 7 };

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function gameEngine() {
  // Part 1: Updating the snake array & Food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
    speed = baseSpeed; // Reset speed on game over
  }

  // If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    speed = baseSpeed + Math.floor(score / 5); // Increase speed every 5 points
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: Display the snake and Food
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

board.innerHTML = "";
snakeArr.forEach((e, index) => {
  snakeElement = document.createElement("div");
  snakeElement.style.gridRowStart = e.y;
  snakeElement.style.gridColumnStart = e.x;

  if (index === 0) {
    snakeElement.classList.add("head");
  } else {
    snakeElement.classList.add("snake");
  }
  board.appendChild(snakeElement);
});
