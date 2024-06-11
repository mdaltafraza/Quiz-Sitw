// console.log();
const question = [
    {
        question: "Which is the largest animal in the world",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world",
        answers: [
            { text: "Vaticab City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Shri Lanka", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },

    {
        question: "Which is the smallest continent in the world",
        answers: [
            { text: "Asia", correct: false },
            { text: "Arctic", correct: false },
            { text: "Australia", correct: true },
            { text: "Africa", correct: false }
        ]
    }
];

// console.log(question[0].question);
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
            // console.log(button.dataset.correct);
        }
        button.addEventListener("click" , selectAnswer);
    });
}

function resetState() {
    nextButton.style.display= "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";    
    // console.log(selectedBtn.dataset.correct);
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        // console.log(button.dataset.correct);
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

}

function handleNextButton(){
    currentQuestionIndex++;
    // console.log(currentQuestionIndex);
    if (currentQuestionIndex < question.length) {
        showQuestion();
        }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < question.length) {
        handleNextButton();
        }else{
            startQuiz();
    }
})
    
startQuiz();
