const header = document.getElementById('header');
const startButton = document.querySelector('#start-button');
const questionCard = document.querySelector('#question-card');
const startCard = document.querySelector('#start-card');
const questionTitle = document.querySelector('#question-title');
let count = 0;

const questions = [{
    title: 'Question1',
    choices: ['a', 'b', 'c'],
    answer: 'a'
}, {
    title: 'Question2',
    choices: ['a', 'b', 'c'],
    answer: 'a'
}, {
    title: 'Question3',
    choices: ['a', 'b', 'c'],
    answer: 'a'
}]


function startQuiz () {
    questionCard.style.display = 'block'
    startCard.style.display = 'none'
    nextQuestion();
}

function nextQuestion () {
    questionTitle.textContent = questions[count].title
// create a loop that targets line 10 to create a button for each choice
}

startButton.addEventListener('click', startQuiz)

