// controls research question text
// TODO: use sessionStorage to set the research question
let rq = "Your Research Question:\nDoes the water temperature affect the weight of crystal growth on a string in water after two weeks?";
document.getElementById("research-question").innerHTML = rq;

// header button control
document.getElementById("home-btn").addEventListener("click", e => {
    location.href = "../home";
});
document.getElementById("forces-btn").addEventListener("click", e => {
    location.href = "../area_forcesmotion";
});
document.getElementById("plant-btn").addEventListener("click", e => {
    location.href = "../Area_PlantReproduction";
});
document.getElementById("chemical-btn").addEventListener("click", e => {
    location.href = "../areachemphys";
});
document.getElementById("heat-btn").addEventListener("click", e => {
    location.href = "../area_heattemp";
});

// quiz control
let quizzes = document.getElementsByClassName("quiz");
for (let quiz of quizzes) {
    quiz.addEventListener("submit", e => {
        e.preventDefault();
        let formData = new FormData(quiz);
        let feedbackCorrect = quiz.querySelector(".feedback-correct");
        let feedbackIncorrect = quiz.querySelector(".feedback-incorrect");
        feedbackCorrect.style.display = "none";
        feedbackIncorrect.style.display = "none";
        if (formData.get("question") == "correct") {
            feedbackCorrect.style.display = "block";
        }
        else if (formData.get("question") == "incorrect") {
            feedbackIncorrect.style.display = "block";
        }
    })
}