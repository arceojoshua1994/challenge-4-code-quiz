// Step 1: Define the quiz questions, structure and answers
const quizQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: [" 1. Strings", " 2. Booleans", " 3. Alerts", " 4. Numbers"],
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
];

// Step 2: Define the quiz variables
let currentQuestionIndex = 0;
let timeLeft = 60;
let score = 0;
let timerInterval;

// Step 3: Create function to start the quiz
function startQuiz() {
    // Hide the start button and show the quiz container
    document.getElementById("start-button").style.display = "none";
    document.getElementById("opening-slide").style.display = "none";
    document.getElementById("opening-paragraph").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";

    // Step 4: Start the timer
    timerInterval = setInterval(function () {
        timeLeft--;
        document.getElementById("timer").textContent = "Time: " + timeLeft;

        if (timeLeft <= 0 || currentQuestionIndex >= quizQuestions.length) {
            endQuiz();
        }
    }, 1000);

    // Step 5A: Display the first question
    showQuestion();
}

// Step 5B: Create a function to display a question and its choices
function showQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    document.getElementById("question").textContent = question.question;

    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";


    question.choices.forEach(function (choice) {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", function () {
            checkAnswer(choice);
        });
        choicesContainer.appendChild(choiceButton);

    });
}

// Step 6: Create function to check the answer and proceed to the next question
function checkAnswer(answer) {
    const question = quizQuestions[currentQuestionIndex];

    if (answer === question.correctAnswer) {
        score++;
        document.getElementById("result").textContent = "Correct!";
    } else {
        timeLeft -= 10; // Note: Subtract 10 seconds for incorrect answers
        document.getElementById("result").textContent = "Incorrect!";
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// Step 7: Create function to end the quiz
function endQuiz() {
    clearInterval(timerInterval);

    // Hide the quiz container and show the end screen
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("end-screen").style.display = "block";

    // Step 8: Display the final score
    document.getElementById("final-score").textContent = "Your Final Score is " + timeLeft + ".";
}

// Step 8: Display the list of high scores

function saveHighScore() {
    const initials = document.getElementById("initials").value;
  
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: initials, score: timeLeft });
  
    localStorage.setItem("highScores", JSON.stringify(highScores));
  
    document.getElementById("end-screen").style.display = "none";
    document.getElementById("high-scores-list").style.display = "block";
  
    displayHighScores();
  }
  
  function displayHighScores() {
    const highScoresList = document.getElementById("high-scores-list");
    highScoresList.innerHTML = "";
  
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
    highScores.forEach(function (score) {
      const li = document.createElement("li");
      li.textContent = score.initials + " - " + score.score;
      highScoresList.appendChild(li);
    });
  }
  

// Step 9: Add event listener to the start button
document.getElementById("start-button").addEventListener("click", startQuiz);
