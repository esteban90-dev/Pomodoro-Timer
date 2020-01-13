//Event Listeners for hovering over and clicking buttons
let x;
let allButtons = document.querySelectorAll('button');
for(x = 0; x < allButtons.length; x++){
    allButtons[x].addEventListener("mouseover",hoverOn);
    allButtons[x].addEventListener("mouseout",hoverOff);
    allButtons[x].addEventListener("mousedown",mouseDown);
    allButtons[x].addEventListener("mouseup",mouseUp);
}

function hoverOn(e){
    e.target.style.boxShadow = "1px 2px rgb(194, 194, 194)";
}

function hoverOff(e){
    e.target.style.boxShadow = '';
    e.target.style.backgroundColor = "white";
}

function mouseDown(e){
    e.target.style.backgroundColor = "rgb(194, 194, 194)";
}

function mouseUp(e){
    e.target.style.backgroundColor = "white";
}

