// script.js
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    if (gameBoard[clickedIndex] !== '' || !gameActive) {
        return;
    }

    gameBoard[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer); // Añade la clase correspondiente para el color

    if (checkWin()) {
        statusDisplay.textContent = `¡Jugador ${currentPlayer} gana!`;
        gameActive = false;
        return;
    }

    if (!gameBoard.includes('')) {
        statusDisplay.textContent = '¡Empate!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Jugador ${currentPlayer}, ¡tu turno!`;
}

function checkWin() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function handleResetButton() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = `Jugador ${currentPlayer}, ¡tu turno!`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O'); // Elimina las clases para reiniciar el estilo
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', handleResetButton);
