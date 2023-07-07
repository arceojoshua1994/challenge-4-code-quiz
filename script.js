// Quiz data structure
const quiz = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Madrid"],
        answer: "Paris"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Mars", "Saturn", "Jupiter"],
        answer: "Jupiter"
    },
    {
        question: "Which programming language is often used for web development?",
        options: ["Java", "JavaScript", "Python"],
        answer: "JavaScript"
    }
];

let score = 0; // Initialize the score variable

// Function to display questions
function displayQuestions() {
    const questionContainer = document.getElementById("question-container");

    quiz.forEach((questionObj, index) => {
        const questionElement = document.createElement("div");
        questionElement.innerHTML = `<p>${index + 1}. ${questionObj.question}</p>`;

        questionObj.options.forEach(option => {
            const optionElement = document.createElement("input");
            optionElement.type = "radio";
            optionElement.name = `question${index}`;
            optionElement.value = option;
            questionElement.appendChild(optionElement);

            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;
            questionElement.appendChild(optionLabel);

            questionElement.appendChild(document.createElement("br"));
        });

        questionContainer.appendChild(questionElement);
    });
}

// Function to calculate and display the score
function calculateScore() {
    const answers = document.querySelectorAll("input[type='radio']:checked");

    answers.forEach(answer => {
        const questionIndex = answer.name.substring(8);
        const selectedAnswer = answer.value;

        if (selectedAnswer === quiz[questionIndex].answer) {
            score++;
        }
    });

    // Store the score in browser storage
    localStorage.setItem("quizScore", JSON.stringify(score));

    // Display the score
    alert(`Your score is: ${score}`);
}

// Event listener for the submit button
const submitButton = document.getElementById("submit-btn");
submitButton.addEventListener("click", calculateScore);

// Display the questions when the page loads
displayQuestions();
