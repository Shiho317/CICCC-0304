const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector("#finalScore");
const mostResentScore = localStorage.getItem("mostResentScore");
const form = document.querySelector('.end-form-container')

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostResentScore;

username.addEventListener("keyup", () => {
  if(username.value.length > 0){
    saveScoreBtn.removeAttribute('disabled')
  }
});

const saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: mostResentScore,
    name: username.value,
  };

  highScores.push(score);

  highScores.sort((a, b) => {
    return b.score - a.score;
  });

  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");

};

saveScoreBtn.addEventListener('click', saveHighScore)
