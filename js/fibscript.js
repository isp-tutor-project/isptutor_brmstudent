/* fibscript.js v0.3
   Fill In Blank helper scripts 
   original version by Chris Maverick 
   11-24-19 */


function fibUpdate(mySelectId) {
    // sets a select's color based on the value sent to it

    var fibSel = document.getElementById(mySelectId);
    var answercolor = fibSel.options[fibSel.selectedIndex].value;
    fibSel.style.backgroundColor = answercolor;
}

function HideSeeText(myButtonID) {
//do stuff
var button = document.getElementById(myButtonID);
button.onclick = function()
  
}