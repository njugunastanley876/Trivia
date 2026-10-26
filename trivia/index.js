const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "A. Hyper Text Markup Language",
            "B. High Tech Modern Language",
            "C. Hyper Transfer Machine Language",
            "D. None of the above"
        ],
        answer: "A"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: [
            "A. font-color",
            "B. text-color",
            "C. color",
            "D. background-color"
        ],
        answer: "C"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: [
            "A. <javascript>",
            "B. <script>",
            "C. <js>",
            "D. <scripting>"
        ],
        answer: "B"
    }
];

let score = 0;
let currentQuestionIndex = 0;
let timer;
const TIME_LIMIT = 10;

function startQuiz() {
    console.log("=========================================");
    console.log("      WELCOME TO THE CLI TRIVIA QUIZ!    ");
    console.log("=========================================");
    console.log(`You have ${TIME_LIMIT} seconds to answer each question.\n`);
    
    askQuestion();
}

function askQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const q = quizQuestions[currentQuestionIndex];
        
        console.log(`\nQuestion ${currentQuestionIndex + 1}: ${q.question}`);
        q.options.forEach(option => console.log(option));

      
        let timeLeft = TIME_LIMIT;
        timer = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timer);
                console.log("\n Time's up for this question!");
                currentQuestionIndex++;
                askQuestion();
            }
        }, 1000);

        rl.question("\nEnter your choice (A, B, C, or D): ", (userInput) => {
            clearInterval(timer); 
            validateAnswer(userInput.trim().toUpperCase(), q.answer);
        });
    } else {
        endGame();
    }
}

function validateAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
        console.log("Correct!");
        score++;
    } else {
        console.log(` Incorrect. The correct answer was ${correctAnswer}.`);
    }

    currentQuestionIndex++;
    askQuestion();
}

function endGame() {
    console.log("\n=========================================");
    console.log("               GAME OVER!                ");
    console.log("=========================================");
    console.log(`Your Final Score: ${score} / ${quizQuestions.length}`);

   
    const percentage = ((score / quizQuestions.length) * 100).toFixed(2);
    console.log(`Performance Percentage: ${percentage}%`);

    if (score === quizQuestions.length) {
        console.log(" Excellent work! Perfect score!");
    } else {
        console.log(" Good effort! Keep practicing.");
    }

    rl.close();
}

// Start the game
startQuiz();
   