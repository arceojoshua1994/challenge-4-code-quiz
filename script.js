// Quiz data structure
const quiz = [
    {
      question: "Commonly used data types DO NOT include:",
      options: ["Strings", "Booleans", "Alerts", "Numbers"],
      answer: "Alerts"
    },
    {
      question: "The condition in an if / else statement is enclosed within ____.",
      options: ["Mars", "Saturn", "Jupiter"],
      answer: "Jupiter"
    },
    {
      question: "Arrays in JavaScript can be used to store ____.",
      options: ["Java", "JavaScript", "Python"],
      answer: "JavaScript"
    }
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
                options: ["commas", "curly brackets", "quotes"],
                answer: "quotes"
    }
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
                options: ["JavaScript", "terminal / bash", "for loops"],
                answer: "terminal / bash"
    }
  ];
  
  let currentSlide = 0;
  let score = 0;
  
  // Function to display the current slide
  function showSlide(slideIndex) {
    const slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active-slide");
    }
    slides[slideIndex].classList.add("active-slide");
  }
  
  // Function to display the current question and options
  function displayQuestion() {
    const questionContainer = document.querySelector(".slide.active-slide .question");
    const optionsContainer = document.querySelector(".slide.active-slide .options");
  
    questionContainer.innerHTML = `<p>${quiz[currentSlide].question}</p>`;
  
    let optionsHTML = "";
    quiz[currentSlide].options.forEach(option => {
      optionsHTML += `<input type="radio" name="question${currentSlide}" value="${option}">`;
      optionsHTML += `<label>${option}</label><br>`;
    });
  
    optionsContainer.innerHTML = optionsHTML;
  }
  
  // Function to calculate the score and navigate to the next slide
  function calculateScore() {
    const answers = document.querySelectorAll("input[type='radio']:checked");
  
    answers.forEach(answer => {
      const questionIndex = parseInt(answer.name.substring(8));
      const selectedAnswer = answer.value;
  
      if (selectedAnswer === quiz[questionIndex].answer) {
        score++;
      }
    });
  
    if (currentSlide === quiz.length - 1) {
      // Store the score in browser storage
      localStorage.setItem("quizScore", JSON.stringify(score));
  
      // Display the score
      alert(`Your score is: ${score}`);
    } else {
      // Move to the next slide
      currentSlide++;
      showSlide(currentSlide);
      displayQuestion();
    }
  }
  
  // Event listener for the next button
  const nextButton = document.querySelector(".slide.active-slide .next-btn");
  nextButton.addEventListener("click", calculateScore);
  
  // Show the first slide when the page loads
  showSlide(currentSlide);
  displayQuestion();
  