const userScoreSpan = document.getElementById("score_user");
const computerScoreSpan = document.getElementById("score_computer");
const resultText = document.getElementById("winner");
const userChoiceDiv = document.getElementById("user-choice");
const computerChoiceDiv = document.getElementById("computer-choice");
const playButton = document.getElementById("play");
const ruleButton = document.querySelector(".rule-btn");
const closeButton = document.querySelector(".close_btn");
const nextButton = document.querySelector("#next-btn")
const rulesContainer = document.querySelector(".rules-container");
const resultContainer = document.querySelector(".result-container");
const optionsContainer = document.querySelector(".options-container");

let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

updateScoreUI();

resultContainer.style.display = "none";

document.querySelectorAll(".choice").forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.id;
    const computerChoice = getComputerChoice();
    displayChoices(userChoice, computerChoice);
    updateScore(userChoice, computerChoice);
    hideOptionsShowResult();
  });
});

playButton.addEventListener("click", playAgain);
ruleButton.addEventListener("click", showRules);
closeButton.addEventListener("click", closeRules);

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

function displayChoices(userChoice, computerChoice) {
  const userIcon = `<i class="fas ${convertToIcon(userChoice)}"></i>`;
  const computerIcon = `<i class="fas ${convertToIcon(computerChoice)}"></i>`;
  userChoiceDiv.innerHTML = userIcon;
  computerChoiceDiv.innerHTML = computerIcon;
  userChoiceDiv.className = `choice ${userChoice}`;
  computerChoiceDiv.className = `choice ${computerChoice}`;
}

function updateScore(userChoice, computerChoice) {
  const result = getResult(userChoice, computerChoice);
  if (result === "win") {
    userScore++;
  } else if (result === "lose") {
    computerScore++;
  }
  updateScoreUI();
  displayResultMessage(result);
  localStorage.setItem("userScore", userScore); localStorage.setItem("computerScore", computerScore);
}

function updateScoreUI() {
  userScoreSpan.textContent = userScore;
  computerScoreSpan.textContent = computerScore;
}

function getResult(userChoice, computerChoice) {
  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "rock")
  ) {
    return "win";
  } else if (userChoice === computerChoice) {
    return "draw";
  } else {
    return "lose";
  }
}

function convertToIcon(choice) {
  switch (choice) {
    case "rock":
      return "fa-hand-rock";
    case "paper":
      return "fa-hand-paper";
    case "scissors":
      return "fa-hand-scissors";
  }
}

function playAgain() {
  updateScoreUI();
  resultText.textContent = "";
  userChoiceDiv.innerHTML = "";
  computerChoiceDiv.innerHTML = "";
  resultContainer.style.display = "none";
  optionsContainer.style.display = "flex";
  nextButton.style.display = "none";
}


function showRules() {
  rulesContainer.style.display = "flex";
}

function closeRules() {
  rulesContainer.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  updateScoreUI();
});

function hideOptionsShowResult() {
  const resultContainer = document.querySelector(".result-container");
  const optionsContainer = document.querySelector(".options-container");

  resultContainer.style.display = "flex";
  optionsContainer.style.display = "none";
}

function displayResultMessage(result) {
  switch (result) {
    case "win":
      resultText.textContent = "YOU WIN";
      playButton.textContent = "PLAY AGAIN";
      nextButton.style.display = "block";
      break;
    case "lose":
      resultText.textContent = "YOU LOST";
      playButton.textContent = "PLAY AGAIN";
      break;
    case "draw":
      resultText.textContent = "TIE UP";
      playButton.textContent = "REPLAY";
      break;
    default:
      resultText.textContent = "";
  }
}
