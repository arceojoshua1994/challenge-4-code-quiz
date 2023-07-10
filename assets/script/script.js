// Step 1: Define the quiz questions, structure and answers
const quizQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        correctAnswer: "Alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses"],
        correctAnswer: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        choices: ["Java", "JavaScript", "Python"],
        correctAnswer: "JavaScript"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes"],
        correctAnswer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops"],
        correctAnswer: "terminal / bash"
    }
    // Add more questions here...
];

// Define the quiz state variables
let currentQuestionIndex = 0;
let timeLeft = 60;
let score = 0;
let timerInterval;

// Function to start the quiz
function startQuiz() {
    // Hide the start button and show the quiz container
    document.getElementById("start-button").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";

    // Start the timer
    timerInterval = setInterval(function () {
        timeLeft--;
        document.getElementById("timer").textContent = "Time: " + timeLeft;

        if (timeLeft <= 0 || currentQuestionIndex >= quizQuestions.length) {
            endQuiz();
        }
    }, 1000);

    // Display the first question
    showQuestion();
}

// Function to display a question and its choices
function showQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    document.getElementById("question").textContent = question.question;

    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";

    // const choicesList =
    // document.createElement("ol");

    question.choices.forEach(function (choice) {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", function () {
            checkAnswer(choice);
        });
        choicesContainer.appendChild(choiceButton);
        
    });
}

// Function to check the answer and proceed to the next question
function checkAnswer(answer) {
    const question = quizQuestions[currentQuestionIndex];

    if (answer === question.correctAnswer) {
        score++;
        document.getElementById("result").textContent = "Correct!";
    } else {
        timeLeft -= 10; // Subtract 10 seconds for incorrect answers
        document.getElementById("result").textContent = "Incorrect!";
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timerInterval);

    // Hide the quiz container and show the end screen
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("end-screen").style.display = "block";

    // Display the final score
    document.getElementById("final-score").textContent = "Final Score: " + score;
}

// Add event listener to the start button
document.getElementById("start-button").addEventListener("click", startQuiz);
