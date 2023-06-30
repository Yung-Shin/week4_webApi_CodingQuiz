// declared variables
var countdownEl = document.querySelector(".countdown");
var scoreEl = document.querySelector("#score")
var secondsLeft = 30;
const startCard = document.querySelector("#start-card");
const correctWrong = document.querySelector("#correct-wrong");
const finalScore = document.querySelector("#final-score");
const highScore = document.querySelector("#high-score");
let questionsCard = document.querySelector("#questions-card");
let questionEl = document.querySelector("#question");
let initialsInput = document.querySelector("#initials");
let questionCount = 0;
let scoreListAll = document.querySelector(".score-list");
let scoreList = [];

// decalred variables for buttons
const answerButton = document.querySelectorAll("button.answer-button");
const startButton = document.querySelector("#start-button");
const answerA = document.querySelector("#a");
const answerB = document.querySelector("#b");
const answerC = document.querySelector("#c");
const answerD = document.querySelector("#d");
let viewButton = document.querySelector("#view-score"); 
let submitButton = document.querySelector("#submit-score"); 
let clearButton = document.querySelector("#clear"); 
let backButton = document.querySelector("#back"); 

// array of objects that contain questions and choices
const questions = [
    {
    question: 'Q1: What stylesheet language instructs the browser how we want our HTML to appear?',
    answers: ['a: CSI', 'b: CIA', 'c: CSS', 'd: CPU'],
    correctAnswer: '2'
}, {
    question: 'QQ2: What does CSS stands for?',
    answers: ['a: Cascading Southern Sandwich', 'b: Cascading Shogun Sushi', 'c: Cascading Style Sheet', 'd: Cascading Subperb Styling'],
    correctAnswer: '2'
}, {
    question: 'Q3: Why do we use console.log in Javascript?',
    answers: ['a: To identify errors and debug', 'b: To write additional code', 'c: To add dynamic user interface', 'd: To access local storage'],
    correctAnswer: '1'
}, {
    question: 'Q4: Where/how do you leave comments in Javascript?',
    answers: ['a: Between " "', 'b: Between ! !', 'c: Between $ $', 'd: Between / /'],
    correctAanswer: '3'
}, 
];

function setTime() {
    let countdown = setInterval(function () {
      secondsLeft--;
      countdownEl.textContent = `Remaining:${secondsLeft} Sec`;
  
      if (secondsLeft === 0 || questionCount === questions.length) {
        clearInterval(countdown);
        questionsCard.style.display = "none";
        finalScore.style.display = "block";
        scoreEl.textContent = secondsLeft;
      }
    }, 1000);
  }


function startQuiz () {
    questionsCard.style.display = "block";
    startCard.style.display = "none";
    questionCount = 0;
  
    setTime();
    setQuestion(questionCount);
}
    
startButton.addEventListener('click', startQuiz);


function setQuestion(id) {
    if (id < questions.length) {
      questionEl.textContent = questions[id].question;
      questionEl.setAttribute(
        "style",
        "font-size: 18px; font-weight: bold; padding-bottom:5px; line-height: 1.2em;"
      );
      answerA.textContent = questions[id].answers[0];
      answerB.textContent = questions[id].answers[1];
      answerC.textContent = questions[id].answers[2];
      answerD.textContent = questions[id].answers[3];
    }
  }

  // event fumction to check the answer when user click on the answer.
  function checkAnswer(event) {
    //prevent default
    event.preventDefault();
  
    //creating element for correct or wrong displaying as block
    correctWrong.style.display = "block";
    //create a p element to display the result of user click event
    let p = document.createElement("p");
    //setting attribute below for that p element and appending correctWrong variable as the child of that p
    p.setAttribute("style", "font-family:Courier, monospace;");
    correctWrong.appendChild(p);
  
    // display new element for amount of time
    setTimeout(function () {
      p.style.display = "none";
    }, 1000);
  
    // conditional statement for right and wrong answer once user click on one of their choices
    //if the user click on correct answer
    if (questions[questionCount].correctAnswer === event.target.value) {
      p.textContent = "Correct!";
      p.setAttribute(
        "style",
        "background-color: green; color: white; font-size: 20px; padding:5px; font-weight: bold; border-radius:5px;"
      );
    }
  
    // if the user click on the wrong answer, plus deuct 10 sec from the remaining secondsLeft
    else if (questions[questionCount].correctAnswer !== event.target.value) {
      secondsLeft = secondsLeft - 10;
      p.textContent = "Wrong!";
      p.setAttribute(
        "style",
        "background-color: red; color: white; font-size: 20px; padding:5px; font-weight: bold; border-radius:5px;"
      );
    }
  
    // cycle for the question list
    if (questionCount < questions.length) {
      questionCount++;
    }
    setQuestion(questionCount);
  }
  






// listen the event for checking answer
answerButton.forEach((item) => {
    item.addEventListener("click", checkAnswer);
  });
  //function to add socre upon the user click
  function addScore(event) {
    //prevent default
    event.preventDefault();
  
    finalScore.style.display = "none";
    highScore.style.display = "block";
  
    //variable to save initials making it upper case and add the initials and score in to the score list using push() method
    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });
  
    // sorting the highest score among the list using sort() method using comparision in the function in reverse order
    scoreList = scoreList.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      } else {
        return -1;
      }
    });
    // clear innerHTML
    scoreListAll.innerHTML = " ";
    //using for loop with the array named  scoreList using it's length property,
    //display all the initials and the score inside the array untill it meets the condition for the given loop
    for (let i = 0; i < scoreList.length; i++) {
      //create a li element
      let li = document.createElement("li");
      //adding the scoreList with index and initials and scoreList index with the score
      li.textContent = `${scoreList[i].initials} : ${scoreList[i].score}`;
      //setting the below attribute for those li
      li.setAttribute(
        "style",
        "background: white; color: black; padding:5px;margin: 5px;"
      );
      //append them within the scoreListEl
      scoreListAll.append(li);
    }
    storeScores();
    displayScores();
  }
  
  // adding a score event upon user click right or wrong
  submitButton.addEventListener("click", addScore);
  
  // function to store score using localStorage and JSON.stringify method
  function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
  }
  //function to display score
  function displayScores() {
    // Parsing the JSON string to an object
    let savedScores = JSON.parse(localStorage.getItem("scoreList"));
  
    //while retrieving from local array
    if (savedScores !== null) {
      scoreList = savedScores;
    }
  }
  
  // fumction to clear the score
  function clearScores() {
    localStorage.clear();
    scoreListAll.innerHTML = "";
  }
  
  // go back to listener event function and shows the home screen for next play
  backButton.addEventListener("click", function () {
    highScore.style.display = "none";
    startCard.style.display = "block";
    secondsLeft = 30;
    countdownEl.textContent = `Remaining:${secondsLeft}s`;
  });
  
  // to clear score
  clearButton.addEventListener("click", clearScores);
  
  // when click on high score button called score board
  viewButton.addEventListener("click", function () {
    if (highScore.style.display === "none") {
      highScore.style.display = "block";
    } else if (highScore.style.display === "block") {
      highScore.style.display = "none";
    } else {
      alert("Can't see the score until you take one ~ ");
    }
  });












