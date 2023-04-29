const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");
// generate letter
lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let theletter = document.createTextNode(letter);
  span.appendChild(theletter);
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

const words = {
  programing: [
    "Java",
    "HTML",
    "CSS",
    "React",
    "Angular",
    "Objective C",
    "Scala",
    "Python",
    "PHP",
    "Perl",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Marilyn Monroe",
    "Abraham Lincoln",
    "Nelson Mandela",
    "Queen Elizabeth",
    "Winston Churchill",
    "Donald Trump",
    "Bill Gates",
    "Muhammad Ali",
    "Zeinab"
  ],
  country: [
    "Egypt",
    "Iraq",
    "Jordan",
    "Libya",
    "Oman",
    "Sudan",
    "Syria",
    "Tunisia",
  ],
};
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValu = words[`${randomPropName}`];

let randomValueNumber = [Math.floor(Math.random() * randomPropValu.length)];
let randomWord = randomPropValu[randomValueNumber];

document.querySelector(
  ".game-info .category span"
).innerHTML = `${randomPropName}`;
// console.log(randomWord);

let lettersGussContainer = document.querySelector(".letters-guss");
let letterAndSpace = Array.from(randomWord);
// console.log(letterAndSpace);

let emArr = [];
letterAndSpace.forEach((letter) => {
  let span = document.createElement("span");
  if (letter === " ") {
    span.className = "with-space";
    emArr.push(letter);
  }
  lettersGussContainer.appendChild(span);
});

let gessSpan = document.querySelectorAll(".letters-guss span");
let wrongAtt = 0;
let drow = document.querySelector(".hangman-drow");

document.addEventListener("click", (e) => {
  let theStatus = false;
  muteAll();
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    let arrayFromChoosWoSrd = Array.from(randomWord.toLowerCase());
    arrayFromChoosWoSrd.forEach((wordLetter, wordindex) => {
      if (theClickedLetter == wordLetter) {
        theStatus = true;
        gessSpan.forEach((span, spanindex) => {
          if (wordindex === spanindex) {
            span.innerHTML = theClickedLetter;
            emArr.push(theClickedLetter);
          }
        });
      }
    });
    if (theStatus !== true) {
      wrongAtt++;
      drow.classList.add(`wrong-${wrongAtt}`);
      document.getElementById("fail").play();
      // document.getElementById("success").pause();
      if (wrongAtt === 8) {
        lettersContainer.classList.add("finish");
        endGame();
      }
    } else {
      document.getElementById("success").play();
      // document.getElementById("fail").pause();
    }
    console.log(emArr);
    if (emArr.length === letterAndSpace.length) {
      winGame();
    }
  }
});
function winGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`You won`);
  div.appendChild(divText);
  div.className = "popup";
  document.body.appendChild(div);
  document.getElementById("win").play();
}
function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`Game Over, The word is ${randomWord}`);
  div.appendChild(divText);
  div.className = "popup";
  document.body.appendChild(div);
  soundPlay();
}

function soundPlay() {
  muteAll();
  document.getElementById("end").play();
}
function muteAll() {
  var elems = document.querySelectorAll("audio");
  elems.forEach((elem) => {
    elem.pause();
  });
}
