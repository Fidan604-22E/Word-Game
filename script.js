let wordList = [
  {
    word: "book",
    hint: "A written or printed work consisting of pages.",
  },
  {
    word: "island",
    hint: "A land surrounded by water.",
  },
  {
    word: "gold",
    hint: "One of the most precious metals of yellow color.",
  },
  {
    word: "matrix",
    hint: "A rectangular array of quantities in rows and columns that is treated as a single entity.",
  },
  {
    word: "nile",
    hint: "The longest river in the world.",
  },
  {
    word: "moirai",
    hint: "Three Greek goddesses of fate — past, present and future — are called...",
  },
  {
    word: "bugs",
    hint: "Errors in programming. Synonym of insects.",
  },
  {
    word: "cronus",
    hint: "Greek god that ate his children.",
  },
];

let start = document.querySelector(".start");
let timer = document.querySelector(".timer");
let timeContainer = document.querySelector(".time");
let score = document.querySelector(".scoreNum");
let keys = document.querySelectorAll(".keys>input");
let nextWord = document.querySelector(".next_word");
let hintButton = document.querySelector(".hint");
let hintBox = document.querySelector(".hintBox");
let wordBoxes = document.querySelector("#word");
let header = document.querySelector(".game");
let note = document.querySelector(".note");
let selectedWord = "";
let selectedHint = "";
let gameLose = true;
let gameWin = true;
let wordNumber;
let time;
let interval;

start.addEventListener("click", onStartButton);

function goToNextWord() {

  clearInterval(interval);
  wordNumber++;
  if (wordNumber < wordList.length) {
    selectedWord = wordList[wordNumber].word;
    selectedHint = wordList[wordNumber].hint;
    createBoxes();
    hintBox.style.display = "none";
  } else {
    alert("You've completed all words!");
    gameWinStyle();
  }

  console.log(gameWin);
  if(!gameWin){
    resetKeys();
    startTimer();
  }
}

function showHint() {
  hintBox.style.display = "block";
  hintBox.innerHTML = "";
  let div = document.createElement("p");

  div.innerHTML = selectedHint;
  hintBox.appendChild(div);
}

function createBoxes() {
  wordBoxes.innerHTML = "";
  for (let i = 0; i < selectedWord.length; i++) {
    let div = document.createElement("div");
    div.classList.add("miniBoxes");
    wordBoxes.appendChild(div);
  }
}

function checkBoxes() {
  let boxes = document.querySelectorAll(".miniBoxes");
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].innerHTML === "") {
      return false;
    }
  }
  return true;
}

function changeScore(point) {
  score.innerHTML = Number(score.innerHTML) + point;
}

function resetKeys() {
  keys.forEach((e) => {
    e.style.backgroundColor = "aqua";
    e.disabled = false;
  });
  header.innerHTML = "Word Game";
  header.style.color = "white";
  nextWord.style.backgroundColor = "white";
  hintButton.style.backgroundColor = "white";
  note.innerHTML = "";
}

function gameLoseStyle(){
  keys.forEach((e) => {
    e.style.backgroundColor = "rgb(54, 137, 137)";
  });

  nextWord.style.backgroundColor = "grey";
  hintButton.style.backgroundColor = "grey";
  header.innerHTML = "End Game";
  header.style.color = "red";
  
  gameLose = true;
}

function gameWinStyle(){
  
  header.innerHTML = "Win Game";
  header.style.color = "green";
  keys.forEach((e) => {
    e.style.backgroundColor = "rgb(68, 255, 0)";
  });
  nextWord.style.backgroundColor = "grey";
  hintButton.style.backgroundColor = "grey";

  clearInterval(interval);
  nextWord.removeEventListener("click", goToNextWord);
  hintButton.removeEventListener("click", showHint);
  keys.forEach((element) => {
    element.removeEventListener("click",fillTheLetters); });

  if(score.innerHTML === ""){
    note.innerHTML = "That was cheating.";
  }
  else if(Number(score.innerHTML) < 0){
    note.innerHTML = "That was pretty tough, huh?";
  }

  gameWin = true;
}

function fillTheLetters(e) {
  let boxes = document.querySelectorAll(".miniBoxes");

  e.target.disabled = true;

  if (selectedWord.includes(e.target.value)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === e.target.value) {
        boxes[i].innerHTML = e.target.value;
        changeScore(10);
        e.target.style.backgroundColor = "green";

        if (checkBoxes()) {
          
          setTimeout(() => {
            
            resetKeys();
            clearInterval(interval);
            if(!gameLose ){
              startTimer();
            }
            if(!gameWin){
              goToNextWord();
            }
            
          }, 1000);
        }
      }
    }
  } else {
    changeScore(-10);
    e.target.style.backgroundColor = "red";
  }

}

function startTimer() {
  time = 30;
  interval = setInterval(() => {
    timeContainer.style.backgroundColor = "green";
    timer.innerHTML = " " + time;

    if (time === 0) {
      timeContainer.style.backgroundColor = "red";
      clearInterval(interval);
      setTimeout(() => {
        alert("Time is up!");
      }, 1);
      
      nextWord.removeEventListener("click", goToNextWord);
      hintButton.removeEventListener("click", showHint);
      keys.forEach((element) => {
        element.removeEventListener("click",fillTheLetters); });
      
      gameLoseStyle();
    }

    time--;
  }, 1000);
  
}

function onStartButton() {
  if(gameLose || gameWin){
    score.innerHTML = "";

    wordNumber = 0;
    selectedWord = wordList[wordNumber].word;
    selectedHint = wordList[wordNumber].hint;
    wordBoxes.style.backgroundColor = "rgb(197, 184, 184, 0)";
    wordBoxes.style.padding = "0px";
    wordBoxes.style.width = "40%";
    
    resetKeys();
    clearInterval(interval);
    startTimer();
    createBoxes();

    hintButton.addEventListener("click", showHint);
    nextWord.addEventListener("click", goToNextWord);
    hintBox.style.display = "none";

    keys.forEach((element) => {
      element.addEventListener("click", fillTheLetters);
    });
    gameLose = false;
    gameWin = false;
  }
}