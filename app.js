let gameSequence = [];
let userSequence = [];
let highscore = 0;

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

preventClick();

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is started");
        started = true;
        removeClick(); // Enable clicks only when the game starts

        levelUp();
    }
});

// White color flash for game sequence
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Dark Purple color flash for user button press
function userBtnFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSequence = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Generate a random index within the range of the `btns` array length
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    // Update the game sequence
    gameSequence.push(randColor);
    // console.log(gameSequence);       // Cheating should not be done :)

    gameFlash(randBtn);
}

function checkSequence(index) {
    if (userSequence[index] === gameSequence[index]) {
        // Check if the user completed the sequence
        if (userSequence.length === gameSequence.length) {
            setTimeout(levelUp, 800);
        }
    } else {
        preventClick();
        h2.innerHTML = `Game Over! Your score was <b>${
            level - 1
        }</b> <br>Highest Score: ${printHighScore()} Press any key to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "#54f2f2";
        }, 150);
        resetGame();
    }
}

function btnPress() {
    let btn = this;
    userBtnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSequence.push(userColor);
    checkSequence(userSequence.length - 1);
}

// Adding event listeners to each button
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function resetGame() {
    started = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
    // Note: No call to removeClick() here, so clicks stay disabled until restart
}

function printHighScore() {
    // ========== HIGHSCORE FUNCTIONALITY ========== // 
    if (highscore < level) {
        highscore = level-1;
    }
    return highscore;
    // ============================================= // 
}

function preventClick() {
    document.querySelectorAll(".btn").forEach((btn) => {
        btn.style.pointerEvents = "none";
    });
}

function removeClick() {
    document.querySelectorAll(".btn").forEach((btn) => {
        btn.style.pointerEvents = "auto";
    });
}
