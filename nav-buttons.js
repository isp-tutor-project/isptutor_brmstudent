
// nav button control
let numPages = document.getElementsByClassName("page").length;

let pageIndex = 0;  
let backButtonInactive = document.getElementById("back-btn-inactive");
let nextButtonInactive = document.getElementById("next-btn-inactive");
let backButtonActive = document.getElementById("back-btn-active");
let nextButtonActive = document.getElementById("next-btn-active");

// handle only one page event
if (numPages == 1) {
    nextButtonInactive.style.display = "none";
}

// handle mouse over
backButtonInactive.addEventListener("mouseover", e => {
    document.getElementById("back-btn-active").style.display = "block";
});
nextButtonInactive.addEventListener("mouseover", e => {
    document.getElementById("next-btn-active").style.display = "block";
});
backButtonActive.addEventListener("mouseout", e => {
    document.getElementById("back-btn-active").style.display = "none";
});
nextButtonActive.addEventListener("mouseout", e => {
    document.getElementById("next-btn-active").style.display = "none";
});

// manage clicks
backButtonActive.addEventListener("click", e => {
    pageIndex--;
    displayNavButtons();
    //document.getElementById("page" + (pageIndex + 2)).style.display = "none";
    clearPage();
    document.getElementById("page" + (pageIndex+1)).style.display = "block";
    scrollTo(0, 0);
});
nextButtonActive.addEventListener("click", e => {
    pageIndex++;
    displayNavButtons();
    //document.getElementById("page" + pageIndex).style.display = "none";
    clearPage();
    document.getElementById("page"+(pageIndex+1)).style.display = "block";
    scrollTo(0, 0);
});

function clearPage () {
    var tmpPages = document.getElementsByClassName("page");
    var i;
    for (i = 0; i < tmpPages.length; i++) {
        tmpPages[i].style.display = 'none';
    }
}

function displayNavButtons () {
    if (pageIndex == 0) {
        backButtonInactive.style.display = "none";
        backButtonActive.style.display = "none";
    }
    else {
        backButtonInactive.style.display = "block";
    }
    if (pageIndex == numPages - 1) {
        nextButtonInactive.style.display = "none";
        nextButtonActive.style.display = "none";
    }
    else {
        nextButtonInactive.style.display = "block";
    }
}

function tocPageJump (mySelectId) {
    //displays the page of the passed ID for Table of contents - MAV
    pageIndex = mySelectId-1;
    displayNavButtons();
    clearPage(); 
    document.getElementById("page" + mySelectId).style.display = "block";
 
}