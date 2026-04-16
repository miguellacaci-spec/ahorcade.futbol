const players = ["MESSI", "RONALDO", "MBAPPE", "NEYMAR", "HAALAND", "MODRIC", "BENZEMA", "VINICIUS", "PEDRI", "KANE"];
let selectedPlayer = "";
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6;

const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

// Inicializar juego
function initGame() {
    selectedPlayer = players[Math.floor(Math.random() * players.length)].toUpperCase();
    guessedLetters = [];
    mistakes = 0;
    document.getElementById('usedLettersText').innerText = "";
    document.getElementById('attempts').innerText = maxMistakes;
    drawHangman(0);
    updateWordDisplay();
}

// Dibujar el ahorcado según los fallos
function drawHangman(step) {
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 3;
    
    if (step === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(10, 230); ctx.lineTo(150, 230); // Base
        ctx.moveTo(30, 230); ctx.lineTo(30, 20);   // Poste
        ctx.lineTo(120, 20); ctx.lineTo(120, 50);  // Travesaño y cuerda
        ctx.stroke();
    }
    if (step >= 1) { // Cabeza
        ctx.beginPath(); ctx.arc(120, 70, 20, 0, Math.PI * 2); ctx.stroke();
    }
    if (step >= 2) { // Cuerpo
        ctx.beginPath(); ctx.moveTo(120, 90); ctx.lineTo(120, 160); ctx.stroke();
    }
    if (step >= 3) { // Brazo izquierdo
        ctx.beginPath(); ctx.moveTo(120, 110); ctx.lineTo(90, 130); ctx.stroke();
    }
    if (step >= 4) { // Brazo derecho
        ctx.beginPath(); ctx.moveTo(120, 110); ctx.lineTo(150, 130); ctx.stroke();
    }
    if (step >= 5) { // Pierna izquierda
        ctx.beginPath(); ctx.moveTo(120, 160); ctx.lineTo(90, 200); ctx.stroke();
    }
    if (step >= 6) { // Pierna derecha
        ctx.beginPath(); ctx.moveTo(120, 160); ctx.lineTo(150, 200); ctx.stroke();
    }
}

function updateWordDisplay() {
    const display = selectedPlayer.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : "_"
    ).join(" ");
    document.getElementById('wordDisplay').innerText = display;

    if (!display.includes("_")) {
        alert("¡Golazo! Has adivinado a " + selectedPlayer);
        initGame();
    }
}

function handleGuess(letter) {
    letter = letter.toUpperCase();
    if (!letter || guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);
    document.getElementById('usedLettersText').innerText = guessedLetters.join(", ");

    if (selectedPlayer.includes(letter)) {
        updateWordDisplay();
    } else {
        mistakes++;
        document.getElementById('attempts').innerText = maxMistakes - mistakes;
        drawHangman(mistakes);
        if (mistakes >= maxMistakes) {
            alert("¡Tarjeta Roja! El jugador era: " + selectedPlayer);
            initGame();
        }
    }
}

// Opción para resolver la palabra completa
function solveWord() {
    const guess = document.getElementById('wordInput').value.toUpperCase();
    if (guess === selectedPlayer) {
        document.getElementById('wordDisplay').innerText = selectedPlayer.split('').join(' ');
        setTimeout(() => {
            alert("¡Increíble visión de juego! Correcto.");
            initGame();
        }, 100);
    } else {
        mistakes = maxMistakes;
        drawHangman(mistakes);
        alert("¡Fuera de juego! Te has equivocado de jugador.");
        initGame();
    }
    document.getElementById('wordInput').value = "";
}

// Event Listeners
document.getElementById('guessButton').addEventListener('click', () => {
    const input = document.getElementById('letterInput');
    handleGuess(input.value);
    input.value = "";
    input.focus();
});

document.getElementById('solveButton').addEventListener('click', solveWord);
document.getElementById('resetButton').addEventListener('click', initGame);

// Iniciar al cargar
initGame();
