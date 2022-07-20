let letters = document.querySelectorAll(".letters > div");
let image = document.querySelector(".image img");
let text = document.querySelector(".clue p");
let gameOver = document.querySelector(".gameover p");
let words = ["never", "break", "that", "bullet", "under"];
let randomWord = "";
let checked = [];
let letter;
let result;
let mistake = 0;

function selectRandomWord() {
    randomWord = words[Math.floor(Math.random() * words.length)];
    letters.forEach(item => {
        item.addEventListener("click", buttonHandeler);
        window.addEventListener("keydown", keyHandeler);
    })
}

function letterHandeler(letter) {
    letter = letter.toLowerCase();
    checked.indexOf(letter) == -1 ? checked.push(letter) : null;
    document.getElementById(letter.toUpperCase()).classList = "used";
    if (randomWord.indexOf(letter) >= 0) {
        setUnderscore();
        checkIfWon();
    } else if (randomWord.indexOf(letter) == -1) {
        mistake++;
        checkIflost();
        updateImagehangMan();
    }
}

function buttonHandeler(event) {
    letterHandeler(event.target.id);

}
function keyHandeler(event) {
    letterHandeler(event.key);
}
function setUnderscore() {
    let splitWord = randomWord.split("");
    let mapSplit = splitWord.map(letter => checked.indexOf(letter) >= 0 ? letter : "_")
    result = mapSplit.join("");
    text.innerHTML = result;
}
function checkIfWon() {
    if (randomWord === result) {
        gameOver.style.display = "block";
        image.src = "./images/winner.png";
      disablePage();
    }
}
function checkIflost() {
    if (mistake === 6) {
        gameOver.style.display = "block";
        text.innerHTML = `<p>random word is :${randomWord}</p>`;
        disablePage();
    }
}
function updateImagehangMan() {
    image.src = `./images/hangman${mistake}.png`;

}
function disablePage(){
    document.addEventListener("click", handler, true);
    function handler(e) {
      e.stopPropagation();
      e.preventDefault();
    }
}
selectRandomWord()
