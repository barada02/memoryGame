let username = '';
let gridSize = 0;
let currentLevel = '';
let flippedCards = [];
let matchedCards = [];
let time = 0;
let score = 0;
let timer;
let cards = [];
let gameSound = document.getElementById('gameSound');
let winSound = document.getElementById('winSound');

// List of fruit emojis to use on the cards
const fruits = [
    // List of fruit emojis to use on the cards

    // Fruits
    '\u{1F34E}', '\u{1F34A}', '\u{1F347}', '\u{1F349}', '\u{1F34C}', '\u{1F353}', '\u{1F352}', '\u{1F34D}',
    '\u{1F95D}', '\u{1F34B}', '\u{1F96D}', '\u{1F350}', '\u{1F351}', '\u{1F965}', '\u{1F348}', '\u{1F34F}',

    // Additional decorative emojis
    '\u{1F496}', '\u{1F31F}', '\u{1F308}', '\u{1F338}', '\u{1F43E}', '\u{1F984}', '\u{1F48E}', '\u{1F680}',
    '\u{1F340}', '\u{2728}',

    // Face emojis
    '\u{1F60C}', '\u{1F60D}', '\u{1F60E}', '\u{1F60F}', '\u{1F610}', '\u{1F611}', '\u{1F612}', '\u{1F613}',
    '\u{1F614}', '\u{1F615}', '\u{1F616}', '\u{1F617}', '\u{1F618}', '\u{1F619}', '\u{1F61A}', '\u{1F61B}',
    '\u{1F61C}', '\u{1F61D}', '\u{1F61E}', '\u{1F61F}', '\u{1F620}', '\u{1F621}', '\u{1F622}', '\u{1F623}',
    '\u{1F624}', '\u{1F625}', '\u{1F626}', '\u{1F627}', '\u{1F628}', '\u{1F629}', '\u{1F62A}', '\u{1F62B}',
    '\u{1F62C}', '\u{1F62D}', '\u{1F62E}', '\u{1F62F}', '\u{1F630}', '\u{1F631}', '\u{1F632}', '\u{1F633}',
    '\u{1F634}', '\u{1F635}'

];

function startGame() {
    username = document.getElementById('username').value.trim();
    if (username.length < 2) {
        alert('Please enter a valid name (minimum 2 characters)!');
        return;
    }
    document.getElementById('userNameDisplay').textContent = `Welcome, ${username}!`;
    document.getElementById('titleScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
}

function selectGrid(difficulty) {
    currentLevel = difficulty;
    let gridSize;
    let levelText;

    switch (difficulty) {
        case 'easy':
            gridSize = 4;
            levelText = "Easy (4x4)";
            break;
        case 'medium':
            gridSize = 6;
            levelText = "Medium (6x6)";
            break;
        case 'hard':
            gridSize = 8;
            levelText = "Hard (8x8)";
            break;
    }

    // Update the selected level display
    document.getElementById("currentLevel").textContent = levelText;
    document.getElementById("selectedLevel").style.display = "block";
    document.getElementById("gridSelection").style.display = "none";

    // Generate the grid with the selected size
    generateGrid(gridSize);
}


function generateGrid(size) {
    gridSize = size; // Store the grid size
    cards = [];
    matchedCards = [];
    flippedCards = [];
    time = 0;
    score = 0;
    clearInterval(timer);
    document.getElementById('time').textContent = time;
    document.getElementById('score').textContent = score;

    let totalCards = gridSize * gridSize;
    let fruitPairs = fruits.slice(0, totalCards / 2);
    let shuffledFruits = shuffle([...fruitPairs, ...fruitPairs]); // Create pairs and shuffle

    let board = document.getElementById('gameBoard');
    board.style.gridTemplateColumns = `repeat(${gridSize}, 70px)`;
    board.innerHTML = '';

    for (let i = 0; i < totalCards; i++) {
        let card = {
            id: i,
            value: shuffledFruits[i],
            flipped: false
        };
        cards.push(card);

        let div = document.createElement('div');
        div.classList.add('card');
        div.setAttribute('data-id', card.id);
        let content = document.createElement('span');
        content.classList.add('card-content');
        content.textContent = card.value;
        div.appendChild(content);
        div.addEventListener('click', () => flipCard(card));
        board.appendChild(div);
    }

    document.getElementById('gameBoard').style.display = 'grid';
    startTimer();
}

function flipCard(card) {
    if (flippedCards.length >= 2 || card.flipped || matchedCards.includes(card.value)) {
        return;
    }

    let cardElement = document.querySelector(`[data-id="${card.id}"]`);
    cardElement.classList.add('flipped');
    card.flipped = true;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    let [card1, card2] = flippedCards;

    if (card1.value === card2.value) {
        matchedCards.push(card1.value);
        flippedCards = [];
        updateScore();

        if (matchedCards.length === cards.length / 2) {
            winGame();
        }
    } else {
        let card1Element = document.querySelector(`[data-id="${card1.id}"]`);
        let card2Element = document.querySelector(`[data-id="${card2.id}"]`);

        setTimeout(() => {
            card1Element.classList.remove('flipped');
            card2Element.classList.remove('flipped');
            card1.flipped = false;
            card2.flipped = false;
            flippedCards = [];
        }, 500);
    }
}

function updateScore() {
    score += 10;
    document.getElementById('score').textContent = score;
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        document.getElementById('time').textContent = time;
    }, 1000);
}

function winGame() {
    clearInterval(timer);
    winSound.play();
    celebrateWin();
    setTimeout(() => {
        alert('Congratulations! You won!\nTime: ' + time + ' seconds\nScore: ' + score);
    }, 500);
}

function resetGame() {
    clearInterval(timer);
    gameSound.pause();
    gameSound.currentTime = 0;
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('gridSelection').style.display = 'block';
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function sendUserData() {
    if (!username || !currentLevel) {
        alert('Error: Missing game data');
        return;
    }

    const submitButton = document.querySelector('button[onclick="sendUserData()"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    $.ajax({
        url: "insert_user.php",
        type: "POST",
        data: {
            UserName: username,
            Level: currentLevel,
            Time: time,
            Score: score,
        },
        success: function(response) {
            alert('Score submitted successfully!');
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
            alert("Failed to submit score. Please try again.");
        },
        complete: function() {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Score';
        }
    });
}

function celebrateWin() {
    // Initial burst of confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Create a confetti cannon on each side
    function shootFromSide(startX) {
        confetti({
            particleCount: 50,
            angle: startX === 0 ? 60 : 120,
            spread: 50,
            origin: { x: startX, y: 0.7 },
            colors: ['#FFD700', '#FFA500', '#FF69B4', '#00FF00', '#4169E1']
        });
    }

    // Shoot confetti from both sides
    shootFromSide(0);
    shootFromSide(1);

    // Rain confetti for 3 seconds
    let end = Date.now() + 3000;
    let colors = ['#FFD700', '#FFA500', '#FF69B4', '#00FF00', '#4169E1'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}