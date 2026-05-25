const BOARD_SIZE = 17;
const board = document.getElementById('board');
const statusEl = document.getElementById('status');
const newGameBtn = document.getElementById('new-game');
const themeToggle = document.getElementById('theme-toggle');

// Theme toggle logic
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️ Light Mode';
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙 Dark Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️ Light Mode';
    }
});

let boardState = [];
let currentPlayer = 'black';
let gameOver = false;

function initGame() {
    board.innerHTML = '';
    boardState = Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0));
    currentPlayer = 'black';
    gameOver = false;
    statusEl.textContent = 'Your turn (Black)';

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.style.top = `${(i * 30) + 15}px`;
            cell.style.left = `${(j * 30) + 15}px`;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }
}

function handleCellClick(e) {
    if (gameOver || currentPlayer !== 'black') return;

    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);

    if (boardState[row][col] === 0) {
        placeStone(row, col, 'black');
        boardState[row][col] = 1;

        if (checkWin(row, col, 1)) {
            endGame('You win!');
            return;
        }
         if (checkDraw()) {
            endGame('It\'s a draw!');
            return;
        }

        currentPlayer = 'white';
        statusEl.textContent = 'Computer\'s turn (White)';
        setTimeout(computerMove, 100);
    }
}

function computerMove() {
    if (gameOver) return;

    let bestMove = findBestMove();
    let { row, col } = bestMove;

    placeStone(row, col, 'white');
    boardState[row][col] = 2;

    if (checkWin(row, col, 2)) {
        endGame('Computer wins!');
        return;
    }
     if (checkDraw()) {
        endGame('It\'s a draw!');
        return;
    }

    currentPlayer = 'black';
    statusEl.textContent = 'Your turn (Black)';
}

function findBestMove() {
    let bestScore = -Infinity;
    let move = { row: -1, col: -1 };

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (boardState[i][j] === 0) {
                // Temporarily make the move
                boardState[i][j] = 2; // Computer's move
                let score = evaluateScore(i, j, 2);

                boardState[i][j] = 1; // Player's potential move
                score += evaluateScore(i, j, 1);

                boardState[i][j] = 0; // Revert the move

                if (score > bestScore) {
                    bestScore = score;
                    move = { row: i, col: j };
                }
            }
        }
    }
    // If no good move is found, pick a random available spot.
    if(move.row === -1){
        let emptyCells = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (boardState[i][j] === 0) {
                    emptyCells.push({row: i, col: j});
                }
            }
        }
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    return move;
}

function evaluateScore(row, col, player) {
    let score = 0;
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];

    for (const [dRow, dCol] of directions) {
        let consecutive = 1;
        let openEnds = 0;

        // Count consecutive stones in one direction
        for (let i = 1; i < 5; i++) {
            const newRow = row + i * dRow;
            const newCol = col + i * dCol;
            if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE && boardState[newRow][newCol] === player) {
                consecutive++;
            } else {
                if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE && boardState[newRow][newCol] === 0) {
                    openEnds++;
                }
                break;
            }
        }

        // Count consecutive stones in the opposite direction
        for (let i = 1; i < 5; i++) {
            const newRow = row - i * dRow;
            const newCol = col - i * dCol;
            if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE && boardState[newRow][newCol] === player) {
                consecutive++;
            } else {
                if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE && boardState[newRow][newCol] === 0) {
                    openEnds++;
                }
                break;
            }
        }

        // Assign scores based on patterns
        if (consecutive >= 5) return 100000; // Winning move
        if (consecutive === 4 && openEnds === 2) score += 5000; // Open four
        if (consecutive === 4 && openEnds === 1) score += 1000; // Closed four
        if (consecutive === 3 && openEnds === 2) score += 500;  // Open three
        if (consecutive === 3 && openEnds === 1) score += 100;  // Closed three
        if (consecutive === 2 && openEnds === 2) score += 50;   // Open two
        if (consecutive === 2 && openEnds === 1) score += 10;   // Closed two
        if (consecutive === 1 && openEnds === 2) score += 1;    // Single stone with open ends

    }
    return score;
}


function placeStone(row, col, player) {
    const stone = document.createElement('div');
    stone.classList.add('stone', player);
    const cell = board.querySelector(`[data-row='${row}'][data-col='${col}']`);
    cell.appendChild(stone);
}

function checkWin(row, col, playerValue) {
    return checkDirection(row, col, playerValue, 1, 0) || 
           checkDirection(row, col, playerValue, 0, 1) || 
           checkDirection(row, col, playerValue, 1, 1) || 
           checkDirection(row, col, playerValue, 1, -1);
}

function checkDirection(row, col, player, dRow, dCol) {
    let count = 1;
    for (let i = 1; i < 5; i++) {
        const newRow = row + i * dRow;
        const newCol = col + i * dCol;
        if (newRow < 0 || newRow >= BOARD_SIZE || newCol < 0 || newCol >= BOARD_SIZE || boardState[newRow][newCol] !== player) {
            break;
        }
        count++;
    }
    for (let i = 1; i < 5; i++) {
        const newRow = row - i * dRow;
        const newCol = col - i * dCol;
        if (newRow < 0 || newRow >= BOARD_SIZE || newCol < 0 || newCol >= BOARD_SIZE || boardState[newRow][newCol] !== player) {
            break;
        }
        count++;
    }
    return count >= 5;
}

function checkDraw() {
    return boardState.every(row => row.every(cell => cell !== 0));
}

function endGame(message) {
    gameOver = true;
    statusEl.textContent = message;
}

newGameBtn.addEventListener('click', initGame);

initGame();
