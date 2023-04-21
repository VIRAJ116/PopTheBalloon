const userName = document.getElementById("userName");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight - 220;

const balloons = [];

const colors = [
  { name: "Red", hex: "#FF0000" },
  // { name: "Green", hex: "#00FF00" },
  // { name: "Blue", hex: "#0000FF" },
  // { name: "Yellow", hex: "#FFFF00" },
  // { name: "Purple", hex: "#800080" },
];

let randomIndex = Math.floor(Math.random() * colors.length);
let randomColor = colors[randomIndex];
let colorValue = randomColor.name;
const pTag = document.getElementById("color-display");
pTag.textContent = colorValue;

setInterval(() => {
  randomIndex = Math.floor(Math.random() * colors.length);
  randomColor = colors[randomIndex];
  colorValue = randomColor.name;const pTag = document.getElementById("color-display");
  pTag.textContent = colorValue;
  }, 5000);

const balloonSpeed = 7;

canvas.addEventListener("click", popBalloon);

let gameOver = false;

function animate() {
  if (gameOver) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move and draw the balloons
  for (let i = 0; i < balloons.length; i++) {
    balloons[i].y -= balloonSpeed;
    drawBalloon(balloons[i]);
  }
  requestAnimationFrame(animate);
}

// Start the animation loop
requestAnimationFrame(animate);

function drawBalloon(balloon) {
  ctx.beginPath();
  ctx.arc(balloon.x, balloon.y, balloon.radius, 0, Math.PI * 2);
  ctx.fillStyle = balloon.color;
  ctx.fill();
  ctx.closePath();
}

function createBalloon() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  const colorValue = randomColor.name;

  const balloon = {
    x: Math.random() * canvas.width,
    y: canvas.height,
    radius: 50,
    color: colors.find((c) => c.name === colorValue).hex,
    name: colorValue,
  };
  balloons.push(balloon);
}

const gameDuration = 30;

let timer = gameDuration;
const timerLabel = document.getElementById("timer");

const countdownInterval = setInterval(() => {
  timer--;
  timerLabel.textContent = `Timer: ${timer} sec`;

  if (timer === 0) {
    setTimeout(() => {
      setTimeout(() => {
        window.alert("Game Over!!", 2);
      })
      window.location.href = "final.html";
    }, 3000);
    clearInterval(countdownInterval);
    gameOver = true;
    canvas.removeEventListener("click", popBalloon);
    clearTimeout(myTimeout);
  }
}, 1000);

let score = 0;

function updateScore() {
  const scoreLabel = document.querySelector(".score");
  scoreLabel.textContent = `Score: ${score}`;
}

function popBalloon(event) {
  const clickedX = event.clientX - canvas.offsetLeft;
  const clickedY = event.clientY - canvas.offsetTop;

  for (let i = 0; i < balloons.length; i++) {
    const balloon = balloons[i];
    const dx = balloon.x - clickedX;
    const dy = balloon.y - clickedY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (balloon.name === colorValue && distance < balloon.radius) {
      balloons.splice(i, 1);
      score++;
      updateScore();
      break;
    }
  }
}

const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", restartGame);

function restartGame() {
  // Reset timer and score
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  const colorValue = randomColor.name;
  const pTag = document.getElementById("color-display");
  pTag.textContent = colorValue;

  canvas.addEventListener("click", popBalloon);
  function popBalloon(event) {
    const clickedX = event.clientX - canvas.offsetLeft;
    const clickedY = event.clientY - canvas.offsetTop;

    for (let i = 0; i < balloons.length; i++) {
      const balloon = balloons[i];
      const dx = balloon.x - clickedX;
      const dy = balloon.y - clickedY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (balloon.name === colorValue && distance < balloon.radius) {
        balloons.splice(i, 1);
        score++;
        updateScore();
        break;
      }
    }
  }
  timer = gameDuration;
  score = 0;
  updateScore();
  gameOver = false;
  animate();
  balloons.length = 0;
}

// Create new balloons every second
setInterval(createBalloon, 200);



