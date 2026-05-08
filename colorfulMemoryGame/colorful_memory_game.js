const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startbtn");

let score = 0;
let timeLeft = 30;
let timer;

let firstCard = null;
let secondCard = null;

startBtn.addEventListener("click", startGame);

function startGame() {

    // RESET
    clearInterval(timer);

    score = 0;
    timeLeft = 30;

    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Left: ${timeLeft}`;

    firstCard = null;
    secondCard = null;

    generateCards();

    // START TIMER ONLY AFTER BUTTON CLICK
    timer = setInterval(() => {

        timeLeft--;

        timerDisplay.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft <= 0) {

            clearInterval(timer);

            alert("Game Over!");

        }

    }, 1000);
}

function generateCards() {

    gameContainer.innerHTML = "";

    const colors = [
        "red", "blue",
        "green", "yellow",
        "red", "blue",
        "green", "yellow"
    ];

    colors.sort(() => 0.5 - Math.random());

    colors.forEach(color => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.dataset.color = color;

        card.style.backgroundColor = "gray";

        card.addEventListener("click", () => flipCard(card));

        gameContainer.appendChild(card);
    });
}

function flipCard(card) {

    if (secondCard) return;

    card.style.backgroundColor = card.dataset.color;

    if (!firstCard) {

        firstCard = card;

    } else {

        secondCard = card;

        if (
            firstCard.dataset.color === secondCard.dataset.color
        ) {

            score++;

            scoreDisplay.textContent = `Score: ${score}`;

            firstCard = null;
            secondCard = null;

        } else {

            setTimeout(() => {

                firstCard.style.backgroundColor = "gray";
                secondCard.style.backgroundColor = "gray";

                firstCard = null;
                secondCard = null;

            }, 1000);
        }
    }
}