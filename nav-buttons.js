
// nav button control
let numPages = document.getElementsByClassName("page").length;
let pageIndex = 0;  
let backButton = document.getElementById("back-btn");
let nextButton = document.getElementById("next-btn");
backButton.addEventListener("click", e => {
    pageIndex--;
    if (pageIndex == 0) {
        backButton.style.display = "none";
    }
    else {
        backButton.style.display = "block";
    }
    if (pageIndex == numPages - 1) {
        nextButton.style.display = "none";
    }
    else {
        nextButton.style.display = "block";
    }
    document.getElementById("page" + (pageIndex + 1)).style.display = "none";
    document.getElementById("page" + pageIndex).style.display = "block";
});
nextButton.addEventListener("click", e => {
    pageIndex++;
    if (pageIndex == 0) {
        backButton.style.display = "none";
    }
    else {
        backButton.style.display = "block";
    }
    if (pageIndex == numPages - 1) {
        nextButton.style.display = "none";
    }
    else {
        nextButton.style.display = "block";
    }
    console.log(pageIndex);
    document.getElementById("page" + (pageIndex-1)).style.display = "none";
    document.getElementById("page"+pageIndex).style.display = "block";
});
