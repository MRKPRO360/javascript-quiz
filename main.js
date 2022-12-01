"use-strict";

const container = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
const startContainer = document.querySelector(".start");
const startBtn = document.querySelector(".start__btn");
const quizContainer = document.querySelector(".quiz");
const quizExit = document.querySelector(".quiz__exit");

const quizStats = document.querySelector(".quiz__stats");
const quizStatsProgress = document.querySelector(".quiz__stats-progress");
const quizBody = document.querySelector(".quiz__body");
const quizNextBtn = document.querySelector(".quiz__next-btn");
const end = document.querySelector(".end");
const endBtn = document.querySelector(".end__btn");
const results = document.querySelector(".results");
const againBtn = document.querySelector(".results__again-btn");
const close = document.querySelector(".close");
const resultsHeading = document.querySelector(".results__heading");
const quit = document.querySelector(".quit");
const quitHeading = document.querySelector(".quit__heading");
const quitBtn = document.querySelector(".quit__btn");
const quitAgainBtn = document.querySelector(".quit__again-btn");
const error = document.querySelector(".error");
const errorBackBtn = document.querySelector(".error__back-btn");

const btns = document.querySelectorAll(".btn");
const overlayQuitBtn = document.querySelector(".overlay__quit-btn");
const overlayStartBtn = document.querySelector(".overlay__start-btn");

const questions = [
  {
    question: "Which is not a programming language?",
    a: "JavaScript",
    b: "Python",
    c: "CSS",
    d: "GO",
    correct: "c",
  },
  {
    question: "Which is the most popular programming language?",
    a: "Node JS",
    b: "Python",
    c: "PHP",
    d: "Both a & b",
    correct: "d",
  },
  {
    question: "Which programming language uses JavaScript and C++ code?",
    a: "Node JS",
    b: "Python",
    c: "PHP",
    d: "Ruby",
    correct: "a",
  },
  {
    question: "Why we should use NodeJs?",
    a: "Fast and Scalble ",
    b: "Easy to write code",
    c: "Using JavaScript for the backend",
    d: "All",
    correct: "d",
  },
];

const emojis = ["😍", "😎", "🙂", "😥"];

quizExit.addEventListener("click", function () {
  this.classList.toggle("quiz__exit-active");
  overlay.classList.toggle("add");
});

btns.forEach((btn) =>
  btn.addEventListener("click", function () {
    quizExit.classList.toggle("quiz__exit-active");
    overlay.classList.toggle("add");
  })
);

// Creating Stats Element

const statsGenerator = function () {
  questions.forEach((el, i) => {
    const statsHtml = `<span data-statsactive=${i}
             class="quiz__stats-track" >${i + 1}</span
            >
           `;
    quizStats.insertAdjacentHTML("beforeend", statsHtml);
  });
};

statsGenerator();

let statsSpan = document.querySelector(".quiz__stats-track");
let statsSpanAll = document.querySelectorAll(".quiz__stats-track");

statsSpan.classList.add("quiz__stats--current");

// Initial Variable
let curQuestion = +quizNextBtn.dataset.curquestion;
let statsProgWidthUnit = 99 / (questions.length - 1);

let quizActivity = +quizNextBtn.dataset.curquestion;
let statsProgWidth = 0;
let score = 0;
let point = 0;
let emoji;

let curQuiz = questions[curQuestion];

// Display Quiz Function

const displayQuiz = function (curQuestion) {
  curQuiz = questions[curQuestion];
  const quizHtml = `
    <div class="quiz__questions">
            <h4>${curQuiz.question}</h4>
          </div>
        <ul class="quiz__questions-list">
          
           <li data-ans="a" onclick="checkAns('a')" class="quiz__questions-list-item">${curQuiz.a}
           </li>
           <li data-ans="b" onclick="checkAns('b')" class="quiz__questions-list-item"> ${curQuiz.b}
           </li>
           <li data-ans="c" onclick="checkAns('c')" class="quiz__questions-list-item">${curQuiz.c}
            </li>
           <li data-ans="d" onclick="checkAns('d')" class="quiz__questions-list-item"> ${curQuiz.d}</li>
        </ul>
  `;
  quizBody.innerHTML = "";
  quizBody.insertAdjacentHTML("afterbegin", quizHtml);
};

startBtn.addEventListener("click", function () {
  quizContainer.classList.remove("close");
  startContainer.classList.add("close");
  displayQuiz(curQuestion);
});

let list = document.querySelector(".quiz__questions-list");
let listItems = document.querySelectorAll(".quiz__questions-list-item");
let correctItem, wrongItems;
const toggleClass = function (ans) {
  if (ans === curQuiz.correct) {
    score++;
    correctItem.classList.add("correct");
    curStatsSpan.classList.add("quiz__stats-track--correct");
    quizNextBtn.classList.add("quiz__next-btn--correct");
  } else {
    correctItem.classList.add("correct");
    wrongItems.forEach((item) => item.classList.add("wrong"));
    curStatsSpan.classList.add("quiz__stats-track--wrong");
    quizNextBtn.classList.add("quiz__next-btn--wrong");
  }
};

const toggleNextClassBg = function () {
  if (
    quizNextBtn.classList.contains("quiz__next-btn--correct") ||
    quizNextBtn.classList.contains("quiz__next-btn--wrong")
  ) {
    quizNextBtn.classList.remove("quiz__next-btn--correct");
    quizNextBtn.classList.remove("quiz__next-btn--wrong");
  }
};

const statsProgress = function () {
  statsProgWidth = statsProgWidthUnit * curQuestion;
  quizStatsProgress.style.width = `${statsProgWidth}%`;
};

const displayQuizAgain = function () {
  curQuestion = 0;
  currentStateSpan = 0;
  score = 0;
  statsProgWidth = 0;
  point = 0;
  quizActivity = 0;

  toggleNextClassBg();
  statsProgress();

  quizStats.innerHTML = "";
  statsGenerator();

  displayQuiz(curQuestion);

  // Again Select Those Class Because Previous Selectors Don't Exist 😂
  statsSpan = document.querySelector(".quiz__stats-track");
  statsSpanAll = document.querySelectorAll(".quiz__stats-track");
};

overlayStartBtn.addEventListener("click", function () {
  displayQuizAgain();
});

function checkAns(ans) {
  list = document.querySelector(".quiz__questions-list");
  listItems = document.querySelectorAll(".quiz__questions-list-item");
  const listItemsArr = Array.from(listItems);

  correctItem = listItemsArr.find((el) => el.dataset.ans === curQuiz.correct);
  wrongItems = listItemsArr.filter((el) => el.dataset.ans !== curQuiz.correct);

  curStatsSpan = statsSpanAll[curQuestion];

  toggleClass(ans);
  list.classList.add("active");

  // Select Element For Only One Time
  const clickedItemArr = [];
  if (list.classList.contains("active")) {
    listItemsArr.forEach((el, i) => clickedItemArr.push(el.classList[0]));
  }
  const clickedItems = document.querySelectorAll(`.${clickedItemArr[0]}`);
  clickedItems.forEach((el) => {
    el.removeAttribute("onClick");
  });
}
quizNextBtn.addEventListener("click", function () {
  if (!list.classList.contains("active")) return;
  console.log("triggered");
  quizActivity++;
  list.classList.remove("active");
  curQuestion++;

  // To Remove The Wrong And Correct ClassList Every Click Of This Next Button

  toggleNextClassBg();
  if (curQuestion > questions.length - 1) {
    quizBody.innerHTML = "";
    quizContainer.style.transition = ".45s ease-in-out";
    quizContainer.classList.add("close");
    end.classList.remove("close");
  } else {
    quizBody.innerHTML = "";
    displayQuiz(curQuestion);
    statsProgress();
  }

  // Add stats current Class

  statsSpanAll.forEach((el) =>
    +el.dataset.statsactive === curQuestion
      ? el.classList.add("quiz__stats--current")
      : el.classList.remove("quiz__stats--current")
  );
});

const calculateScore = function (el) {
  point = Math.round((100 * score) / questions.length);

  emoji =
    point >= 90
      ? emojis[0]
      : point >= 75
      ? emojis[1]
      : point >= 50
      ? emojis[2]
      : emojis[3];

  el.innerHTML = `Your result is ${point} ${emoji}`;

  if (point >= 90) againBtn.style.display = "none";
};

endBtn.addEventListener("click", function () {
  end.classList.add("close");
  results.classList.remove("close");
  calculateScore(resultsHeading);
});

overlayQuitBtn.addEventListener("click", function () {
  quizContainer.classList.add("close");
  if (!list.classList.contains("active") && quizActivity === 0) {
    error.classList.remove("close");

    console.log("hey", quizActivity);
  } else {
    list.classList.remove("active");
    calculateScore(quitHeading);
    quit.classList.remove("close");
  }
});

againBtn.addEventListener("click", function () {
  results.classList.add("close");
  startContainer.classList.remove("close");
  displayQuizAgain();
});

quitAgainBtn.addEventListener("click", function () {
  quit.classList.add("close");
  displayQuizAgain();
  startContainer.classList.remove("close");
});

// Go To The Quiz Again
errorBackBtn.addEventListener("click", function () {
  error.classList.add("close");
  quizContainer.classList.remove("close");
});
