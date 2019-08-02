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
let quizChoices = document.getElementsByClassName("quiz_choice");
for (let quiz of quizChoices) {
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
    });
}
let quizCheckboxes = document.getElementsByClassName("quiz_checkbox");
for (let quiz of quizCheckboxes) {
    quiz.addEventListener("submit", e => {
        e.preventDefault();
        let feedbackCorrect = quiz.querySelector(".feedback-correct");
        let feedbackIncorrect = quiz.querySelector(".feedback-incorrect");
        feedbackCorrect.style.display = "none";
        feedbackIncorrect.style.display = "none";
        let correctness = true;
        let choices = quiz.querySelectorAll("input");
        for (let choice of choices) {
            if ((choice.checked && choice.value == "incorrect") || (!choice.checked && choice.value == "correct")) {
                correctness = false;
                break;
            }
        }
        if (correctness) {
            feedbackCorrect.style.display = "block";
        }
        else {
            feedbackIncorrect.style.display = "block";
        }
    });
}
let quizOpens = document.getElementsByClassName("quiz_open");
for (let quiz of quizOpens) {
    quiz.addEventListener("submit", e => {
        e.preventDefault();
        let feedbackCorrect = quiz.querySelector(".feedback-correct");
        feedbackCorrect.style.display = "block";
    });
}

/*
// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyD7zIk-8V20QqJNSs0cAV0uNL3qjeqLMdM",
    authDomain: "isptutor.firebaseapp.com",
    projectId: "isptutor"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    var confirmationMessage = "hi i'm here as a filler";
    db.collection("STUDY1").doc("testinguserboy4").update({
        brmtest: "cool",
        brmcode: 1
    })
    .catch(function (error) {
        console.error("Error writing document: ", error);
    });

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage;                            //Webkit, Safari, Chrome
});
window.addEventListener("unload", function (e) {
    db.collection("STUDY1").doc("testinguserboy4").update({
        brmtest: "done",
        brmcode: 2
    })
    .catch(function (error) {
        console.error("Error writing document: ", error);
    });  
});
*/