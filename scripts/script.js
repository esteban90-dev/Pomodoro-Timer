 //global variables
 let sessionSeconds;
 let sessionMinutes;
 let breakSeconds;
 let breakMinutes;
 let totalSeconds;
 let timer1;
 let noTimeChange = 0;
 let sessionTimerRunning = 0;
 let breakTimerRunning = 0;
 let lastPressedButtonIsStart = 0;
 
 //Event Listeners
let x;
let allButtons = document.querySelectorAll('button');
for(x = 0; x < allButtons.length; x++){
    allButtons[x].addEventListener("mouseover",hoverOn);
    allButtons[x].addEventListener("mouseout",hoverOff);
    allButtons[x].addEventListener("mousedown",mouseDown);
    allButtons[x].addEventListener("mouseup",mouseUp);
}

//actions on hover-on
function hoverOn(e){
    e.target.style.boxShadow = "1px 2px rgb(194, 194, 194)";
}

//actions on hover-off
function hoverOff(e){
    e.target.style.boxShadow = '';
    e.target.style.backgroundColor = "white";
}

//actions on mouse click
function mouseDown(e){
    e.target.style.backgroundColor = "rgb(194, 194, 194)";

    //increase session timer
    if(e.target.innerHTML == "+" && e.target.parentElement.className == "session-container-right" && noTimeChange == 0){
        sessionMinutes = parseInt(document.querySelector('.session-container-center').firstChild.innerHTML);
        if(sessionMinutes < 60){
            sessionMinutes = sessionMinutes + 1;        //can't increase time beyond one hour
        }
        document.querySelector('.session-container-center').firstChild.innerHTML = sessionMinutes.toString();
        document.querySelector('.timer-minutes').innerHTML = sessionMinutes.toString();
    }

    //decrease session timer
    else if(e.target.innerHTML == "-" && e.target.parentElement.className == "session-container-left" && noTimeChange == 0){
        sessionMinutes = parseInt(document.querySelector('.session-container-center').firstChild.innerHTML);
        if(sessionMinutes > 1){
            sessionMinutes = sessionMinutes - 1;        //can't increase time beyond one hour
        }
        document.querySelector('.session-container-center').firstChild.innerHTML = sessionMinutes.toString();
        document.querySelector('.timer-minutes').innerHTML = sessionMinutes.toString();
    }

    //increase break timer
    else if(e.target.innerHTML == "+" && e.target.parentElement.className == "break-container-right" && noTimeChange == 0){
        breakMinutes = parseInt(document.querySelector('.break-container-center').firstChild.innerHTML);
        if(breakMinutes < 60){
            breakMinutes = breakMinutes + 1;        //can't increase time beyond one hour
        }
        document.querySelector('.break-container-center').firstChild.innerHTML = breakMinutes.toString();
    }

    //decrease break timer
    else if(e.target.innerHTML == "-" && e.target.parentElement.className == "break-container-left" && noTimeChange == 0){
        breakMinutes = parseInt(document.querySelector('.break-container-center').firstChild.innerHTML);
        if(breakMinutes > 1){
            breakMinutes = breakMinutes - 1;        //can't increase time beyond one hour
        }
        document.querySelector('.break-container-center').firstChild.innerHTML = breakMinutes.toString();
    }

    //start timer
    else if(e.target.innerHTML == "Start" && lastPressedButtonIsStart == 0){
        lastPressedButtonIsStart = 1;
        timerController('start');
        noTimeChange = 1;
    }

    //stop timer
    else if(e.target.innerHTML == "Stop"){
        lastPressedButtonIsStart = 0;
        timerController('stop');
    }

    //reset timer
    else if(e.target.innerHTML == "Reset"){
        lastPressedButtonIsStart = 0;
        timerController('reset');
        noTimeChange = 0;
    }
}

//actions for mouse unclick
function mouseUp(e){
    e.target.style.backgroundColor = "white";
}

//starts, stops, and resets timer function
function timerController(p1){
    let input = p1;

    //start timer
    if(input == "start"){
        //if first page load, or if after reset, run session Timer first
        if(sessionTimerRunning == 0 && breakTimerRunning == 0){
            sessionTimerRunning = 1;
            breakTimerRunning = 0;
        }
        totalSeconds = (document.querySelector('.timer-minutes').innerHTML * 60) + parseInt(document.querySelector('.timer-seconds').innerHTML);
        timer1 = setInterval(timer, 1000);
    }

    //stop timer
    if(input == "stop"){
        //clear timer
        clearInterval(timer1);
    }

    //reset timer
    if(input == 'reset'){
        //clear timer
        clearInterval(timer1);

        //reset statuses
        breakTimerRunning = 0;
        sessionTimerRunning = 0;

        //reset display
        document.querySelector('.timer-minutes').innerHTML = document.querySelector('.session-container-center').firstChild.innerHTML;
        document.querySelector('.timer-seconds').innerHTML = '00';
        document.querySelector('.session-title').style.color = "rgb(88, 88, 88)";
        document.querySelector('.break-title').style.color = "rgb(88, 88, 88)";
        document.querySelector('.timer-minutes').style.color = "rgb(88, 88, 88)";
        document.querySelector('.timer-colon').style.color = "rgb(88, 88, 88)";
        document.querySelector('.timer-seconds').style.color = "rgb(88, 88, 88)";
    }

    //swap running timers
    if(input == 'swap'){
        if(sessionTimerRunning == 1){
            breakTimerRunning = 1;
            sessionTimerRunning = 0;
            totalSeconds = document.querySelector('.break-container-center').firstChild.innerHTML * 60;
        }
        else{
            breakTimerRunning = 0;
            sessionTimerRunning = 1;
            totalSeconds = document.querySelector('.session-container-center').firstChild.innerHTML * 60;
        }   
    }
}

function timer(){
    totalSeconds--;
    if(totalSeconds < 1){
        timerController('swap');
    } 
    updateDisplay(); 
}

function updateDisplay(){
    let displaySeconds;
    let displaySecondsString;
    let displayMinutes;
    let displayMinutesString;

    //convert time from total seconds to minutes:seconds
    displayMinutes = parseInt(totalSeconds / 60);
    displaySeconds = totalSeconds % 60;

    //convert to strings
    displayMinutesString = displayMinutes.toString();
    displaySecondsString = displaySeconds.toString();


    //add leading 0's if seconds are in the single digits
    if(displaySeconds < 10){
        displaySecondsString = '0' + displaySecondsString;
    }
    
    //modify display element
    document.querySelector('.timer-minutes').innerHTML = displayMinutesString;
    document.querySelector('.timer-seconds').innerHTML = displaySecondsString;

    //turn display green if session is active, red if break is active
    if(sessionTimerRunning == 1){
        document.querySelector('.session-title').style.color = "rgb(112, 184, 112)";
        document.querySelector('.break-title').style.color =  "rgb(88, 88, 88)";
        document.querySelector('.timer-minutes').style.color = "rgb(112, 184, 112)";
        document.querySelector('.timer-colon').style.color = "rgb(112, 184, 112)";
        document.querySelector('.timer-seconds').style.color = "rgb(112, 184, 112)";
    }
    
    if(breakTimerRunning == 1){
        document.querySelector('.session-title').style.color = "rgb(88, 88, 88)";
        document.querySelector('.break-title').style.color = "rgb(245, 115, 115)";
        document.querySelector('.timer-minutes').style.color = "rgb(245, 115, 115)";
        document.querySelector('.timer-colon').style.color = "rgb(245, 115, 115)";
        document.querySelector('.timer-seconds').style.color = "rgb(245, 115, 115)";
    }
}

