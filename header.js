
// controls research question text
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
/*
// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyD7zIk-8V20QqJNSs0cAV0uNL3qjeqLMdM",
    authDomain: "isptutor.firebaseapp.com",
    projectId: "isptutor"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();*/
// https://firestore.googleapis.com/v1beta1/projects/isptutor/databases/(default)/documents/STUDY1/RICHARDGU_JAN_1
/*
let xhr = new XMLHttpRequest();
xhr.open("PATCH", 'https://firestore.googleapis.com/v1beta1/', true);
xhr.setRequestHeader('Content-Type', 'application/json');
let data = {
    updateMask: {
            'fieldPaths': [
            "{'brm': 'meh'}"
        ]
    }
}
let doc = {
    'name': 'projects/isptutor/databases/(default)/documents/STUDY1/RICHARDGU_JAN_1',
    'fields': {
        'brm': 'meh'
    }
}
xhr.send(doc);*/

// logging functions
function logEntry(entry) {
    let brmStr = localStorage.getItem("isptutor_brmHistory");
    if (brmStr == null) {
        brmStr = "[]";
    }
    
    let brmHistory = JSON.parse(brmStr);
    brmHistory.push(entry);
    localStorage.setItem("isptutor_brmHistory", JSON.stringify(brmHistory));
}

/*
function logLink(link) {
    let brmHistory = localStorage.getItem("isptutor_brmHistory");
    if (brmHistory == null) {
        brmHistory = [];
    }
    brmHistory.push({
        type: "LINK",
        link: link
    });
    localStorage.setItem("isptutor_brmHistory", brmHistory);
    /*
    db.collection(collectionID).doc(userID).get().then(doc => {
        let brmStr = doc.data().brm;
        let brmData;
        if (brmStr == undefined) {
            brmData = {};
            brmData.linkHistory = [];
            brmData.quizHistory = [];
        }
        else {
            brmData = JSON.parse(brmStr);
        }
        brmData.linkHistory.push(link);
        console.log(brmData);
        return brmData;
    }).then(brmData => {
        db.collection(collectionID).doc(userID).update({
            brm: JSON.stringify(brmData)
        });
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}*/
//logLink(location.href);
logEntry({
    type: "LINK",
    link: location.href
});
/*
function logQuizEntry(quizEntry) {
    let brmHistory = localStorage.getItem("isptutor_brmHistory");
    if (brmHistory == null) {
        brmHistory = [];
    }
    quizEntry.type = "QUIZ";
    brmHistory.push(quizEntry);
    localStorage.setItem("isptutor_brmHistory", brmHistory);
    
    db.collection(collectionID).doc(userID).get().then(doc => {
        let brmStr = doc.data().brm;
        let brmData;
        if (brmStr == undefined) {
            brmData = {};
            brmData.linkHistory = [];
            brmData.quizHistory = [];
        }
        else {
            brmData = JSON.parse(brmStr);
        }
        brmData.quizHistory.push(quizEntry);
        console.log(brmData);
        return brmData;
    }).then(brmData => {
        db.collection(collectionID).doc(userID).update({
            brm: JSON.stringify(brmData)
        });
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}*/

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
let numSecondsDelay = 30*60;
if (localStorage.getItem("isptutor_brmStartTime") != null && Date.now() - localStorage.getItem("isptutor_brmStartTime") >= numSecondsDelay * 1000) {
    localStorage.removeItem("isptutor_brmStartTime");
    overlay.style.display = "block";
    box.style.display = "block";
}