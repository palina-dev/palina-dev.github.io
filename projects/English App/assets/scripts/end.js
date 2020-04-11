const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 3;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();

    const score = {
        name: username.value,
        score: mostRecentScore,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    // highScores.splice(3);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("./index.html");
};
