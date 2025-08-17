// Sudoku Game - Plain JavaScript Implementation
// Features: New game, difficulty selection, timer, error count, cell highlighting, input validation, solve, responsive UI

// --- Utility Functions ---

/**
 * Generate a new Sudoku puzzle and its solution.
 * Uses a simple backtracking generator for demonstration.
 * @param {string} difficulty - 'easy', 'medium', 'hard'
 * @returns {{puzzle: number[], solution: number[]}}
 */
function generateSudoku(difficulty = 'easy') {
    // For brevity, use static puzzles for each difficulty.
    // In production, replace with a robust generator.
    const puzzles = {
        easy: {
            puzzle: [
                5,3,0, 0,7,0, 0,0,0,
                6,0,0, 1,9,5, 0,0,0,
                0,9,8, 0,0,0, 0,6,0,
                8,0,0, 0,6,0, 0,0,3,
                4,0,0, 8,0,3, 0,0,1,
                7,0,0, 0,2,0, 0,0,6,
                0,6,0, 0,0,0, 2,8,0,
                0,0,0, 4,1,9, 0,0,5,
                0,0,0, 0,8,0, 0,7,9
            ],
            solution: [
                5,3,4, 6,7,8, 9,1,2,
                6,7,2, 1,9,5, 3,4,8,
                1,9,8, 3,4,2, 5,6,7,
                8,5,9, 7,6,1, 4,2,3,
                4,2,6, 8,5,3, 7,9,1,
                7,1,3, 9,2,4, 8,5,6,
                9,6,1, 5,3,7, 2,8,4,
                2,8,7, 4,1,9, 6,3,5,
                3,4,5, 2,8,6, 1,7,9
            ]
        },
        medium: {
            puzzle: [
                0,0,0, 2,6,0, 7,0,1,
                6,8,0, 0,7,0, 0,9,0,
                1,9,0, 0,0,4, 5,0,0,
                8,2,0, 1,0,0, 0,4,0,
                0,0,4, 6,0,2, 9,0,0,
                0,5,0, 0,0,3, 0,2,8,
                0,0,9, 3,0,0, 0,7,4,
                0,4,0, 0,5,0, 0,3,6,
                7,0,3, 0,1,8, 0,0,0
            ],
            solution: [
                4,3,5, 2,6,9, 7,8,1,
                6,8,2, 5,7,1, 4,9,3,
                1,9,7, 8,3,4, 5,6,2,
                8,2,6, 1,9,5, 3,4,7,
                3,7,4, 6,8,2, 9,1,5,
                9,5,1, 7,4,3, 6,2,8,
                5,1,9, 3,2,6, 8,7,4,
                2,4,8, 9,5,7, 1,3,6,
                7,6,3, 4,1,8, 2,5,9
            ]
        },
        hard: {
            puzzle: [
                0,0,0, 0,0,0, 0,0,0,
                0,0,0, 0,0,3, 0,8,5,
                0,0,1, 0,2,0, 0,0,0,
                0,0,0, 5,0,7, 0,0,0,
                0,0,4, 0,0,0, 1,0,0,
                0,9,0, 0,0,0, 0,0,0,
                5,0,0, 0,0,0, 0,7,3,
                0,0,2, 0,1,0, 0,0,0,
                0,0,0, 0,4,0, 0,0,9
            ],
            solution: [
                9,8,7, 6,5,4, 3,2,1,
                2,4,6, 1,7,3, 9,8,5,
                3,5,1, 9,2,8, 7,4,6,
                1,2,8, 5,3,7, 6,9,4,
                6,3,4, 8,9,2, 1,5,7,
                7,9,5, 4,6,1, 8,3,2,
                5,1,9, 2,8,6, 4,7,3,
                4,7,2, 3,1,9, 5,6,8,
                8,6,3, 7,4,5, 2,1,9
            ]
        }
    };
    return puzzles[difficulty] || puzzles['easy'];
}

/**
 * Format seconds as mm:ss
 * @param {number} seconds
 * @returns {string}
 */
function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
}

// --- Game State ---
let game = {
    puzzle: [],
    solution: [],
    userBoard: [],
    selectedCell: null,
    selectedNumber: null,
    errors: 0,
    timer: 0,
    timerInterval: null,
    isGameActive: false,
    difficulty: 'easy'
};

// --- DOM Elements ---
const boardEl = document.getElementById('sudoku-board');
const numberSelectEl = document.getElementById('number-select');
const timerEl = document.getElementById('timer');
const errorsEl = document.getElementById('errors');
const newGameBtn = document.getElementById('new-game');
const solveBtn = document.getElementById('solve');
const difficultyEl = document.getElementById('difficulty');

// --- Game Initialization ---

/**
 * Start a new game with the selected difficulty.
 */
function startNewGame() {
    const { puzzle, solution } = generateSudoku(game.difficulty);
    game.puzzle = puzzle.slice();
    game.solution = solution.slice();
    game.userBoard = puzzle.slice();
    game.errors = 0;
    game.timer = 0;
    game.isGameActive = true;
    clearInterval(game.timerInterval);
    game.timerInterval = setInterval(() => {
        game.timer++;
        timerEl.textContent = formatTime(game.timer);
    }, 1000);
    errorsEl.textContent = 'Errors: 0';
    renderBoard();
    renderNumberSelect();
    timerEl.textContent = '00:00';
}

/**
 * Render the Sudoku board.
 */
function renderBoard() {
    boardEl.innerHTML = '';
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (game.puzzle[i] !== 0) {
            cell.textContent = game.puzzle[i];
            cell.classList.add('prefilled');
        } else if (game.userBoard[i] !== 0) {
            cell.textContent = game.userBoard[i];
        } else {
            cell.textContent = '';
        }
        cell.dataset.index = i;
        if (game.selectedCell === i) {
            cell.classList.add('selected');
        }
        // Add thick borders for 3x3 boxes
        if (i % 9 === 0) cell.style.borderLeft = '4px solid #333';
        if (i % 9 === 8) cell.style.borderRight = '4px solid #333';
        if (Math.floor(i / 9) % 3 === 0) cell.style.borderTop = '4px solid #333';
        if (Math.floor(i / 9) % 3 === 2) cell.style.borderBottom = '4px solid #333';

        cell.addEventListener('click', () => selectCell(i));
        boardEl.appendChild(cell);
    }
}

/**
 * Render the number selection buttons.
 */
function renderNumberSelect() {
    numberSelectEl.innerHTML = '';
    for (let n = 1; n <= 9; n++) {
        const btn = document.createElement('button');
        btn.classList.add('number-btn');
        btn.textContent = n;
        if (game.selectedNumber === n) btn.classList.add('selected');
        btn.addEventListener('click', () => selectNumber(n));
        numberSelectEl.appendChild(btn);
    }
}

/**
 * Select a cell on the board.
 * @param {number} index
 */
function selectCell(index) {
    if (game.puzzle[index] !== 0) return; // Can't select prefilled
    game.selectedCell = index;
    renderBoard();
}

/**
 * Select a number to input.
 * @param {number} n
 */
function selectNumber(n) {
    game.selectedNumber = n;
    renderNumberSelect();
    if (game.selectedCell !== null) {
        inputNumber(game.selectedCell, n);
    }
}

/**
 * Handle number input into a cell.
 * @param {number} index
 * @param {number} n
 */
function inputNumber(index, n) {
    if (!game.isGameActive) return;
    if (game.puzzle[index] !== 0) return; // Can't overwrite prefilled
    if (!isValidMove(index, n)) {
        game.errors++;
        errorsEl.textContent = `Errors: ${game.errors}`;
        // Flash cell red for invalid move
        const cell = boardEl.children[index];
        cell.classList.add('invalid');
        setTimeout(() => cell.classList.remove('invalid'), 500);
        return;
    }
    game.userBoard[index] = n;
    renderBoard();
    if (isBoardComplete()) {
        endGame(true);
    }
}

/**
 * Check if a move is valid according to Sudoku rules.
 * @param {number} index
 * @param {number} n
 * @returns {boolean}
 */
function isValidMove(index, n) {
    const row = Math.floor(index / 9);
    const col = index % 9;
    // Check row
    for (let i = 0; i < 9; i++) {
        if (game.userBoard[row * 9 + i] === n && (row * 9 + i) !== index) return false;
    }
    // Check column
    for (let i = 0; i < 9; i++) {
        if (game.userBoard[i * 9 + col] === n && (i * 9 + col) !== index) return false;
    }
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const idx = (boxRow + r) * 9 + (boxCol + c);
            if (game.userBoard[idx] === n && idx !== index) return false;
        }
    }
    return true;
}

/**
 * Check if the board is completely and correctly filled.
 * @returns {boolean}
 */
function isBoardComplete() {
    for (let i = 0; i < 81; i++) {
        if (game.userBoard[i] === 0 || game.userBoard[i] !== game.solution[i]) return false;
    }
    return true;
}

/**
 * End the game.
 * @param {boolean} won
 */
function endGame(won) {
    game.isGameActive = false;
    clearInterval(game.timerInterval);
    setTimeout(() => {
        alert(won ? `Congratulations! You solved the puzzle in ${formatTime(game.timer)} with ${game.errors} errors.` : 'Game Over.');
    }, 100);
}

// --- Event Listeners ---

newGameBtn.addEventListener('click', startNewGame);

solveBtn.addEventListener('click', () => {
    if (!game.isGameActive) return;
    game.userBoard = game.solution.slice();
    renderBoard();
    endGame(true);
});

difficultyEl.addEventListener('change', (e) => {
    game.difficulty = e.target.value;
    startNewGame();
});

// Keyboard input support
document.addEventListener('keydown', (e) => {
    if (!game.isGameActive) return;
    if (game.selectedCell === null) return;
    if (e.key >= '1' && e.key <= '9') {
        inputNumber(game.selectedCell, parseInt(e.key, 10));
    }
    if (e.key === 'Backspace' || e.key === 'Delete') {
        if (game.puzzle[game.selectedCell] === 0) {
            game.userBoard[game.selectedCell] = 0;
            renderBoard();
        }
    }
    // Arrow keys navigation
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        let idx = game.selectedCell;
        if (e.key === 'ArrowUp' && idx >= 9) idx -= 9;
        if (e.key === 'ArrowDown' && idx < 72) idx += 9;
        if (e.key === 'ArrowLeft' && idx % 9 > 0) idx -= 1;
        if (e.key === 'ArrowRight' && idx % 9 < 8) idx += 1;
        selectCell(idx);
    }
});

// --- Initial Game Start ---
startNewGame();