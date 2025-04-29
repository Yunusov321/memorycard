const board = document.getElementById('game-board');
const movesElement = document.getElementById('moves');
const timerElement = document.getElementById('timer');
const winMessage = document.getElementById('win-message');
const finalMoves = document.getElementById('final-moves');
const finalTime = document.getElementById('final-time');

const emojis = ['🍎', '🍎', '🚗', '🚗', '🐶', '🐶', '⚽', '⚽', '🎵', '🎵', '🎲', '🎲', '🌟', '🌟', '🍕', '🍕'];
let shuffledEmojis = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;
let timer = 0;
let timerInterval;

function shuffle() {
    return emojis.sort(() => 0.5 - Math.random());
}

function startGame() {
    shuffledEmojis = shuffle();
    board.innerHTML = '';
    moves = 0;
    matchedPairs = 0;
    movesElement.textContent = moves;
    timer = 0;
    timerElement.textContent = timer;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        timerElement.textContent = timer;
    }, 1000);

    shuffledEmojis.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerText = '';
        card.dataset.emoji = emoji;
        board.appendChild(card);

        card.addEventListener('click', () => flipCard(card));
    });
}

function flipCard(card) {
    if (lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.innerText = card.dataset.emoji;

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        lockBoard = true;
        moves++;
        movesElement.textContent = moves;

        if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
            matchedPairs++;
            resetCards();

            if (matchedPairs === emojis.length / 2) {
                gameWon();
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard.innerText = '';
                secondCard.innerText = '';
                resetCards();
            }, 1000);
        }
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function gameWon() {
    clearInterval(timerInterval);
    winMessage.classList.remove('hidden');
    finalMoves.textContent = moves;
    finalTime.textContent = timer;
}

function restartGame() {
    winMessage.classList.add('hidden');
    startGame();
}

startGame();