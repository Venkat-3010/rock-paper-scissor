const ruleButton = document.querySelector(".rule-btn");
const closeButton = document.querySelector(".close_btn");
const rulesContainer = document.querySelector(".rules-container");

ruleButton.addEventListener("click", showRules);
closeButton.addEventListener("click", closeRules);

function showRules() {
    rulesContainer.style.display = "flex";
}
  
function closeRules() {
    rulesContainer.style.display = "none";
}