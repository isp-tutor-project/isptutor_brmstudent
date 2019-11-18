/*global db */

// these are set when you register/login so that other pages can access/manipulate student data in firebase
let collectionID = localStorage.getItem("collectionID");
let userID = localStorage.getItem("userID");

// controls research question text
let rq = "Your Research Question:\nDoes the water temperature affect the weight of crystal growth on a string in water after two weeks?";
if (localStorage.getItem("isptutor_rq") != undefined) {
    rq = "Your Research Question:\n" + localStorage.getItem("isptutor_rq");
}
document.getElementById("research-question").innerHTML = rq;

// // logging functions
// function logEntry(entry) {
//     let brmStr = localStorage.getItem("isptutor_brmHistory");
//     if (brmStr == null) {
//         brmStr = "[]";
//     }
    
//     let brmHistory = JSON.parse(brmStr);
//     brmHistory.push(entry);
//     localStorage.setItem("isptutor_brmHistory", JSON.stringify(brmHistory));
// }

function dumpBrmHistory() {
    db.collection(collectionID).doc(userID).get().then((doc) => {
        let data = doc.data();
        let brmStr = data.brm || "[]";
        let brmHistory = JSON.parse(brmStr);
        console.log(JSON.stringify(brmHistory, null, 4));
    })
    .catch(function(error) {
        console.error(error);
    });
}

function logEntry(entry) {
    db.collection(collectionID).doc(userID).get()
    .then((doc) => {
        if (doc.exists) {
            console.log("document exists.");
            let data = doc.data();
            let brmStr = data.brm || "[]";
            let brmHistory = JSON.parse(brmStr);
            brmHistory.push(entry);
            db.collection(collectionID).doc(userID).update({
                brm: JSON.stringify(brmHistory)
            })
            .then(() => {
                console.log('brm history updated in firebase');
            })
            .catch(function(error) {
                console.error(error);
            });
        } else {
            console.log("document does not exist");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

logEntry({
    type: "LINK",
    link: location.href
});

// quiz choice control
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
        // else no choice selected, so ignore everything
        else {
            return;
        }
        let choices = quiz.querySelectorAll("input");
        let labels = quiz.querySelectorAll(".label");
        if (choices.length != labels.length) {
            console.error("The number of input elements should match the number of label elements!");
        }
        let selected = "";
        for (let i = 0; i < choices.length; i++) {
            let choice = choices[i];
            if (choice.checked) {
                selected = labels[i].innerHTML;
                break;
            }
        }
        let quizEntry = {
            type: "QUIZ",
            title: quiz.querySelector("b").innerHTML,
            selected: selected,
            isCorrect: (formData.get("question") == "correct")
        }
        console.log(quizEntry);
        //logQuizEntry(quizEntry);
        logEntry(quizEntry);

    });
}
// quiz checkbox control
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
        let labels = quiz.querySelectorAll(".label");
        if (choices.length != labels.length) {
            console.error("The number of input elements should match the number of label elements!");
        }
        let selected = "";
        for (let i = 0; i < choices.length; i++) {
            let choice = choices[i];
            if (choice.checked) {
                selected += labels[i].innerHTML + "; ";
            }
        }
        let quizEntry = {
            type: "QUIZ",
            title: quiz.querySelector("b").innerHTML,
            selected: selected,
            isCorrect: correctness
        }
        console.log(quizEntry);
        logEntry(quizEntry);
    });
}
// quiz open control
let quizOpens = document.getElementsByClassName("quiz_open");
for (let quiz of quizOpens) {
    quiz.addEventListener("submit", e => {
        e.preventDefault();
        let feedbackCorrect = quiz.querySelector(".feedback-correct");
        feedbackCorrect.style.display = "block";
        let quizEntry = {
            type: "QUIZ",
            title: quiz.querySelector("b").innerHTML,
            selected: quiz.querySelector("textarea").value,
            isCorrect: true
        }
        console.log(quizEntry);
        logEntry(quizEntry);
    });
}
// quiz grid control
let quizGrids = document.getElementsByClassName("quiz_grid");
for (let quiz of quizGrids) {
    quiz.addEventListener("submit", e => {
        e.preventDefault();
        let formData = new FormData(quiz);
        let feedbackCorrect = quiz.querySelector(".feedback-correct");
        let feedbackIncorrect = quiz.querySelector(".feedback-incorrect");
        feedbackCorrect.style.display = "none";
        feedbackIncorrect.style.display = "none";
        let selected = "";
        let isCorrect = true;
        for (let pair of formData.entries()) {
            selected += pair[0]+":"+pair[1]+";";
            if (pair[1] == "incorrect") isCorrect = false;
        }
        if (isCorrect) {
            feedbackCorrect.style.display = "block";
        }
        else {
            feedbackIncorrect.style.display = "block";
        }
        let quizEntry = {
            type: "QUIZ",
            title: quiz.querySelector("b").innerHTML,
            selected: selected,
            isCorrect: isCorrect
        }
        console.log(quizEntry);
        logEntry(quizEntry);
    });
}


//this is for brm reminder image, 
let overlay = document.createElement("div");
overlay.id = "brm-reminder-overlay";
let box = document.createElement("div");
box.id = "brm-reminder-box";
let image = document.createElement("img");
image.id = "brm-reminder-img"
image.src = "../_assets/brmReminder1.png";
let button = document.createElement("button");
button.innerHTML = "Okay";
button.id = "brm-reminder-btn";
let imgIndex = 1;
button.addEventListener("click", e => {
    imgIndex++;
    if (imgIndex == 4) {
        overlay.style.display = "none";
        box.style.display = "none";
        imgIndex = 1;
    } 
    image.src = "../_assets/brmReminder" + imgIndex + ".png";
})
box.appendChild(image);
box.appendChild(button);
document.body.appendChild(overlay);
document.body.appendChild(box);

//numSecondsDelay = number of seconds until teacher pops up
let numSecondsDelay = 15*60;
if (localStorage.getItem("isptutor_brmStartTime") != null && Date.now() - localStorage.getItem("isptutor_brmStartTime") >= numSecondsDelay * 1000) {
    localStorage.removeItem("isptutor_brmStartTime");
    overlay.style.display = "block";
    box.style.display = "block";
}
