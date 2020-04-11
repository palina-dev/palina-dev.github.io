const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: 'What is the meaning for the <br><span class="word">Adapt</span>?',
        choice1: 'to change ideas or behavior in order to deal with something successfully',
        choice2: 'to explain something in order to make it easier to understand',
        choice3: 'done by two or more people working together',
        answer: 1,
    },

    {
        question: 'What is the meaning for the <br><span class="word">Clarify</span>?',
        choice1: 'to change ideas or behavior in order to deal with something successfully',
        choice2: 'to explain something in order to make it easier to understand',
        choice3: 'done by two or more people working together',
        answer: 2,
    },

    {
        question: 'What is the meaning for the <br><span class="word">Collaborative</span>?',
        choice1: 'to change ideas or behavior in order to deal with something successfully',
        choice2: 'to explain something in order to make it easier to understand',
        choice3: 'done by two or more people working together',
        answer: 3,
    },
    
    {
        question: 'What is the meaning for the <br><span class="word">Conflict</span>?',
        choice1: 'a serious argument about something important',
        choice2: 'to find or discover that something is present',
        choice3: 'done by two or more people working together',
        answer: 1,
    },

    {
        question: 'What is the meaning for the <br><span class="word">Impulsive</span>?',
        choice1: 'to complain in an annoying way about something unimportant',
        choice2: 'doing and saying things suddenly without thinking about it carefully',
        choice3: 'the money remaining after your bills are paid',
        answer: 2,
    },

    {
        question: 'What is the meaning for the <br><span class="word">Knowledge</span>?',
        choice1: 'to disappear',
        choice2: 'a big problem',
        choice3: 'information and understanding about a subject',
        answer: 3,
    },
    {
        question: 'What is the meaning for the <br><span class="word">Possess</span>?',
        choice1: 'to have or to own',
        choice2: 'a plan that shows the amount of money available to spend',
        choice3: 'to return money that you owe someone',
        answer: 1,
    },

    {
        question: 'What is the meaning for the <br><span class="word">Remark</span>?',
        choice1: 'to continue to exist',
        choice2: 'something that you say (fact or opinion)',
        choice3: 'the money remaining after your bills are paid',
        answer: 2,
    },

    {
        question: 'What is the meaning for the <br><span class="word">Sensitive</span>?',
        choice1: 'to disappear',
        choice2: 'the money remaining after your bills are paid',
        choice3: 'to attach importance to something',
        answer: 3,
    },
    {
        question: 'What is the meaning for the <br><span class="word">Switch</span>?',
        choice1: 'to change',
        choice2: 'a method that allows you to buy things and pay for them later',
        choice3: 'to give up something valuable to help yourself or others',
        answer: 1,
    },

    {
        question: 'What is the meaning for the <br><span class="word">Whine</span>?',
        choice1: 'careful with money',
        choice2: 'to complain in an annoying way about something unimportant',
        choice3: 'a situation that is calm and not likely to change suddenly',
        answer: 2,
    },

    {
        question: 'What is the meaning for the <br><span class="word">Convey</span>?',
        choice1: 'showing an understanding of others’ feelings',
        choice2: 'endangered',
        choice3: 'to express a thought or feeling so that it is understood',
        answer: 3,
    },
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 12;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("./end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
