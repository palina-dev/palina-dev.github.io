const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
    .map(score => {
        return `<tr class="high-score">
                    <td>${score.name}</td>
                    <td>${score.score}</td>
                </tr>`;
    })
    .join("");

