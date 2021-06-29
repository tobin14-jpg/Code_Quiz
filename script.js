var quizQuestions = document.getElementById("quiz-questions");
var timer = document.getElementById("timer");
var btnStart = document.getElementById("btn-start");
var timecounter = document.getElementById("timecounter");
var titleitem = document.getElementById("title-item");
var nextQuestions 
var highScoresArea = document.querySelector("#highScoresList");
var backBtn = document.querySelector("#backButton");
var clearBtn = document.querySelector("#clearScores");
var questionanswers = document.getElementById("question-answers");
var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnScore");
var currentindex = 0;
var score = 0;
var count = 75;
var alert =document.getElementById("alert");
var info = document.getElementById("info");
var addscore = document.getElementById("addscore");
var highScores = document.getElementById("highScores");
var allScores = [];
var storedScores = JSON.parse(localStorage.getItem("userData"));
var questions = [
    {
        title: "What does HTML stand for?",
        choices: ["Hyper Tool Makeup Language","Hyper Text Makeup Language","Hyper Text Markup Language", "Hyper Tool Markup Linguistics"],
        answer : "Hyper Text Markup Language"    
    },
    {
        title: "What does CSS stand for?",
        choices: ["Cascading Stylized Systems","Curly Style Sheets","Cascading Style Sheets", "Cascading Stylized Syncronomous"],
        answer : "Cascading Style Sheets"    
    },
    {
        title: "Arrays in JavaScript can be used to store?",
        choices: ["numbers and strings","others Arrays","booleances", "all of the above"],
        answer : "all of the above"    
    },
    {
        title: "What is JSON?",
        choices: ["A Function","An Object","Data Structures","Object Notation"],
        answer : "Data Structures"    
    },
    {
        title: "A very useful tool for printing and testing if code runs to the window is?",
        choices: ["JavaScript","terminal/bash","alerts", "console.log"],
        answer : "console.log"    
    },
]
btnStart.addEventListener("click", starQuiz);
function starQuiz(){
    if(storedScores !==null) {
        allScores = storedScores;
    }
    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timecounter.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")
    nextQuestions= questions[currentindex]
    console.log(nextQuestions.title)
    
        displayQuestion(nextQuestions)

    gametime()
}
btnScore.addEventListener("click" , function(){
    let name = document.getElementById("inputScore").value
    scorePage(name, count)
    addscore.classList.add('d-none')
    highScores.classList.remove('d-none')
});

function gametime(){

    var timeinterval = setInterval(function(){
        timer.innerText = count
         count--; 
         if (count === 0) {
             clearInterval(timeinterval)
             endgame()
         }
        }, 1000);

}

function scorePage(a, b) {

    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    
}

function displayQuestion(question){
    titleitem.innerText=question.title
    question.choices.forEach(element => {
     var button =document.createElement("button")
    button.className="btn-primary btn-block text-left"
    button.innerText=element
    questionanswers.appendChild(button)
    button.addEventListener("click", displaynextQuestion)
    });
}


function displaynextQuestion(e){
    currentindex++
    if(currentindex < questions.length){
        correction(e.target.innerText == nextQuestions.answer)
        questionanswers.innerHTML=""
        if(currentindex < questions.length){    
            nextQuestions= questions[currentindex]
            displayQuestion(nextQuestions)  
        }else {
            currentindex = 0
            displayQuestion(nextQuestions)  
        }

    }else{
        console.log("endgame")
        endgame()
        

    }
    
     
}
function correction(response){
    
    if(response){
        alert.innerText= "Good"
        console.log("Good")
    }else {
        alert.innerText="Wrong"
        count = count -15
        timer.innerHTML = count
        console.log("Wrong")

    }
    setTimeout(function(){
        alert.innerText=""
    
        }, 1000);

}
 function endgame (){
    myScore.innaText = count
    addscore.classList.remove("d-none")
    timecounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
    addscore.classList.remove("d-none")


 }

 function displayScores() {
    if (storedScores !== null) {
        var scoreList = document.createElement("ol");
        scoreList.className = "scoreListClass";
        for (var i = 0; i < storedScores.length; i++) {
            var initials = storedScores[i].inits;
            var scores = storedScores[i].userScore
            var scoreEntry = document.createElement("li");
            scoreEntry.innerHTML = initials + " - " + scores;
            scoreList.appendChild(scoreEntry);
        }
        highScoresArea.appendChild(scoreList);
    }
};

displayScores();

backBtn.addEventListener("click", function () {
    location.href = "index.html";
});

clearBtn.addEventListener("click", function () {
    highScoresArea.innerHTML = "";
    window.localStorage.clear();

});
        