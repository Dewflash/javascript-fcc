// Scope declarations for execution variables
let playerScore = 0;
let computerScore = 0;

const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const resultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const resetGameBtn = document.getElementById("reset-game-btn");
const optionsContainer = document.querySelector(".options-container");

// New Interactive Node references
const appWrapper = document.getElementById("app-wrapper");
const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");
const fxCanvas = document.getElementById("fx-canvas");
const ctx = fxCanvas.getContext("2d");

// Manage Canvas scaling 
function resizeCanvas() {
  fxCanvas.width = window.innerWidth;
  fxCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Particle Engine Configuration Arrays
let particles = [];

class Particle {
  constructor(x, y, color, type) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.type = type; // 'confetti' or 'firework'
    this.radius = type === 'confetti' ? Math.random() * 4 + 4 : Math.random() * 3 + 1;
    
    if (type === 'confetti') {
      // Slanted upwards out of corners
      this.vx = x < window.innerWidth / 2 ? Math.random() * 10 + 5 : -(Math.random() * 10 + 5);
      this.vy = -(Math.random() * 15 + 10);
      this.gravity = 0.4;
    } else {
      // Firework explosion vectors
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.gravity = 0.15;
    }
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.01;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.alpha -= this.decay;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Particle Rendering Loop Execution
function renderFX() {
  ctx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
  particles = particles.filter(p => p.alpha > 0);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  if (particles.length > 0) {
    requestAnimationFrame(renderFX);
  }
}

function triggerConfetti() {
  const colors = ['#feac32', '#f1be32', '#ff3333', '#33ff33', '#3333ff'];
  // Launch from bottom-left corner
  for (let i = 0; i < 40; i++) {
    particles.push(new Particle(0, fxCanvas.height, colors[Math.floor(Math.random() * colors.length)], 'confetti'));
  }
  // Launch from bottom-right corner
  for (let i = 0; i < 40; i++) {
    particles.push(new Particle(fxCanvas.width, fxCanvas.height, colors[Math.floor(Math.random() * colors.length)], 'confetti'));
  }
  renderFX();
}

function triggerFireworks() {
  const colors = ['#feac32', '#ff3333', '#00ffff', '#ffff00', '#ff00ff'];
  // Launch sequential explosion centers from the bottom arena field
  for (let f = 0; f < 3; f++) {
    setTimeout(() => {
      const targetX = Math.random() * (fxCanvas.width * 0.6) + (fxCanvas.width * 0.2);
      const targetY = Math.random() * (fxCanvas.height * 0.4) + (fxCanvas.height * 0.1);
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 60; i++) {
        particles.push(new Particle(targetX, targetY, chosenColor, 'firework'));
      }
      renderFX();
    }, f * 400);
  }
}

// Helper mapper to clean visual string values
function getHandEmoji(choice) {
  if (choice === "Rock") return "✊️";
  if (choice === "Paper") return "✋";
  if (choice === "Scissors") return "✌️";
  return "✊️";
}

function getRandomComputerChoice() {
  const options = ["Rock", "Paper", "Scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

function hasPlayerWonRound(player, computer) {
  return (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Scissors" && computer === "Paper") ||
    (player === "Paper" && computer === "Rock")
  );
}

function showResults(playerOption) {
  const computerOption = getRandomComputerChoice();
  
  // Set icons immediately before execution paths clash
  playerHand.textContent = getHandEmoji(playerOption);
  computerHand.textContent = getHandEmoji(computerOption);

  // Trigger side punch animations instantly
  playerHand.classList.remove("animate-player");
  computerHand.classList.remove("animate-computer");
  void playerHand.offsetWidth; // Force CSS repaint trigger 
  playerHand.classList.add("animate-player");
  computerHand.classList.add("animate-computer");

  if (playerOption === computerOption) {
    resultsMsg.innerText = `It's a tie! Both chose ${playerOption}`;
  } else if (hasPlayerWonRound(playerOption, computerOption)) {
    playerScore++;
    playerScoreSpanElement.innerText = playerScore;
    resultsMsg.innerText = `Player wins the round! ${playerOption} beats ${computerOption}`;
    
    // Feature: Win Round FX Trigger
    triggerConfetti();
  } else {
    computerScore++;
    computerScoreSpanElement.innerText = computerScore;
    resultsMsg.innerText = `Computer wins the round! ${computerOption} beats ${playerOption}`;
    
    // Feature: Lose Round Whole Screen Shaking Effect
    appWrapper.classList.add("vibrate-screen");
    setTimeout(() => {
      appWrapper.classList.remove("vibrate-screen");
    }, 400);
  }

  // Evaluate full match termination boundaries
  if (playerScore === 3 || computerScore === 3) {
    winnerMsgElement.innerText = `${
      playerScore === 3 ? "Player" : "Computer"
    } has won the game!`;

    // Feature: Match Over Ground Rocket Fireworks
    triggerFireworks();

    resetGameBtn.style.display = "block";
    optionsContainer.style.display = "none";
  }
}

// Global reset template method structure context hook 
const resetGame = () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreSpanElement.textContent = playerScore;
  computerScoreSpanElement.textContent = computerScore;
  
  // Reset initial base hands
  playerHand.textContent = "✊️";
  computerHand.textContent = "✊️";
  
  resetGameBtn.style.display = "none";
  optionsContainer.style.display = "block";
  winnerMsgElement.innerText = "";
  resultsMsg.innerText = "";
};

resetGameBtn.addEventListener("click", resetGame);

const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

rockBtn.addEventListener("click", function () {
  showResults("Rock");
});
paperBtn.addEventListener("click", function () {
  showResults("Paper");
});
scissorsBtn.addEventListener("click", function () {
  showResults("Scissors");
});