
var startButton = document.getElementById("startButton")

var titleBlock = document.getElementById("titleBlock")
var questionBlock = document.getElementById("questionBlock")

startButton.addEventListener("click", start)

function start(){
    console.log("starting");
    titleBlock.style.display = "none";
    questionBlock.style.display = "block";

    document.getElementById("timer").style.display = "block"
    timer();
    questions();

}

var timeLeft = 60;
var timerEl = document.getElementById("timer");

var timerInt;

function timer(){
    timerInt = setInterval(function(){
                        timeLeft--;
                        timerEl.textContent = timeLeft + " Seconds";
                        console.log("timer running")
                        if (timeLeft < 0){
                            gameOver(true);
                        }
                    },1000);


}

var whichQ = 0;
var questionArrays = [
    ["In JavaScript a variable that can be read by all functions, objects and methods would be called a:", "Everything Variable", "Zoingy", "Global Variable", "Good Time","3"],
    ["The conditional statement (5 == '5') would return _______ while (5 === '5') would return ______", "True/True", "True/False", "False/False", "False/True","2"],
    ["The variable usually used to track the progression of for loops is", "i", "b", "l", "f","1"],
    ["Which is not a common value type", "numbers", "booleans", "strings", "index values","4"],
]

function questions(){

    if (whichQ >= questionArrays.length){
        gameOver();
        return;
    }

    console.log(whichQ)
    var qDisp =  document.getElementById("question");
    var aButtons = document.querySelectorAll(".answerButton");
    console.log(qDisp)
    console.log(aButtons);

    qDisp.textContent = questionArrays[whichQ][0]
    aButtons[0].textContent = questionArrays[whichQ][1];
    aButtons[1].textContent = questionArrays[whichQ][2];
    aButtons[2].textContent = questionArrays[whichQ][3];
    aButtons[3].textContent = questionArrays[whichQ][4];

    for (var i=0;i<aButtons.length;i++){
        aButtons[i].addEventListener("click", aButtonClick)
    }
}

function aButtonClick(event){

    var buttonNum = event.target.dataset.button
    if (buttonNum == questionArrays[whichQ][5]){
        correctAnswer();
        console.log("correct")
    } else {
        wrongAnswer();
        console.log("false")
    }

    whichQ++;
    questions();
}

var numCorrect = 0;

function correctAnswer(){
    numCorrect++;
}

function wrongAnswer(){
    timeLeft -= 10
}

function gameOver(timesUp){
    if (timesUp) {
        document.getElementById("timeUpP").style.display = "block"
    }

    questionBlock.style.display = "none"
    document.getElementById("gameOverBlock").style.display = "block";
    clearInterval(timerInt);

    document.getElementById("finalScore").textContent = numCorrect + "/4 correct";
    document.getElementById("timer").style.display = "none"
    drawScoreboard()
}

function drawScoreboard(){
    var scoreboard = document.getElementById('scoreBoard');
    var localEntries = JSON.parse(localStorage.getItem('entries'))
    for (var i=0;i<localEntries.length;i+=2){
        console.log("hey")
        var score = document.createElement('p')
        score.innerHTML = ((i/2)+1) + ". " + localEntries[i] + "..........." + localEntries[i+1] + "/4";
        scoreboard.appendChild(score)
    }
}

var submitScoreButton = document.getElementById("scoreSubmit")

var scoreBoardEntries;

submitScoreButton.addEventListener("click",function(event){
    console.log(event.target);
    event.preventDefault();

    var initialInput = document.getElementById("scoreInitials").value
    
    if (initialInput.length > 3) {
        console.log("more than 3")
        var alert = document.createElement("p");
        alert.innerHTML = "No more than 3 charecters";
        document.querySelector('form').appendChild(alert);
    }

    if (initialInput.length == 0){
        console.log("length = 0")
        var alertTwo = document.createElement("p");
        alertTwo.innerHTML = "Please input initials";
        document.querySelector('form').appendChild(alertTwo);
    }

    var outcome = [initialInput, numCorrect]

    scoreBoardEntries = localStorage.getItem('entries');

    if (typeof scoreBoardEntries != "string"){
        localStorage.setItem('entries',JSON.stringify(outcome))
    } else {
        var entriesArray = JSON.parse(localStorage.getItem('entries'));
        entriesArray.push(outcome[0])
        entriesArray.push(outcome[1]);
        localStorage.setItem('entries',JSON.stringify(entriesArray))
    }
})