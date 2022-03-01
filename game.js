const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "The United States bought Alaska from which country?",
    choice1: "Russia",
    choice2: "Canada",
    choice3: "Mexico",
    choice4: "Finland",
    answer: 1,
  },
  {
    question: "In 16th-century Japan, who was Yasuke?",
    choice1: "Actor",
    choice2: "Soldier",
    choice3: "Chef",
    choice4: "Foreign-born Samurai",
    answer: 4,
  },
  {
    question: "What is considered the world’s oldest writing system?",
    choice1: "Chinese",
    choice2: "Cyrillic script",
    choice3: "Cuneiform",
    choice4: "Egyptian",
    answer: 3,
  },
  {
    question: "Where was Napoleon Bonaparte born?",
    choice1: "Germany",
    choice2: "Spain",
    choice3: "United States",
    choice4: "France",
    answer: 4,
  },
  {
    question: "What is the name of the first human civilization?",
    choice1: "Mesopotamia",
    choice2: "Magenta",
    choice3: "Homo-sapiens",
    choice4: "Humans",
    answer: 1,
  },
  {
    question: "Neil Armstrong, Buzz Aldrin and…? Who was the third astronaut involved in the Apollo 11 mission that landed on the moon?",
    choice1: "Jhon Stickman",
    choice2: "Andrew Garfield",
    choice3: "Michael Collins",
    choice4: "Joe Biden",
    answer: 3,
  },
  {
    question: "In which year was John F. Kennedy assassinated?",
    choice1: "1963",
    choice2: "1972",
    choice3: "1974",
    choice4: "1971",
    answer: 1,
  },
  {
    question: "When did the first Space Shuttle go into space?",
    choice1: "February 18/ 1981",
    choice2: "July 9/1979",
    choice3: "April 17/1982",
    choice4: "April 12/1981",
    answer: 4,
  },
  {
    question: "Which Greek historian is known as the “Father of History”?",
    choice1: "Aristoteles",
    choice2: "Platon",
    choice3: "Herodotus",
    choice4: "Pitagoras",
    answer: 3,
  },
  {
    question: "Who built the first car in America?",
    choice1: "George Bush",
    choice2: "Henry Ford",
    choice3: "Barack Obama",
    choice4: "Tom Hanks",
    answer: 2,
  },
  
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = questions.length;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostResentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
  console.log(score)
};

startGame();
