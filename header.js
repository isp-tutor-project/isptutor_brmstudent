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