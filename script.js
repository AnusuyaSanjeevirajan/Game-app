let player = '';
let currentPlayer = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('player-x').addEventListener('click', () => selectPlayer('X'));
document.getElementById('player-o').addEventListener('click', () => selectPlayer('O'));
document.getElementById('reset').addEventListener('click', resetGame);

function startGame() {
    document.getElementById('start-page').classList.add('hidden');
    document.getElementById('select-player').classList.remove('hidden');
}

function selectPlayer(mark) {
    player = mark;
    currentPlayer = mark;
    document.getElementById('select-player').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('turn').textContent = `Player ${currentPlayer}'s turn`;
    setupBoard();
}

function setupBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
}

function handleCellClick(event) {
    const cell = event.target;
    const index = Array.from(cell.parentElement.children).indexOf(cell) + Array.from(cell.parentElement.parentElement.children).indexOf(cell.parentElement) * 3;
   
    if (board[index] || gameOver) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWinner(currentPlayer)) {
        gameOver = true;
        document.getElementById('result').textContent = `Player ${currentPlayer} wins!🥳🎊`;
        document.getElementById('result').classList.remove('hidden');
    } else if (board.every(cell => cell !== '')) {
        gameOver = true;
        document.getElementById('result').textContent = 'It\'s a draw!🙄';
        document.getElementById('result').classList.remove('hidden');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('turn').textContent = `Player ${currentPlayer}'s turn`;

        if (currentPlayer === 'O') {
            setTimeout(cpuTurn, 500);
        }
    }
}

function checkWinner(player) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination =>
        combination.every(index => board[index] === player)
    );
}

function cpuTurn() {
    if (gameOver) return;

    let availableSpots = board.map((value, index) => value === '' ? index : null).filter(value => value !== null);
    let randomMove = availableSpots[Math.floor(Math.random() * availableSpots.length)];

    board[randomMove] = 'O';
    document.querySelectorAll('.cell')[randomMove].textContent = 'O';
   
    if (checkWinner('O')) {
        gameOver = true;
        document.getElementById('result').textContent = 'CPU wins!🥳🎊';
        document.getElementById('result').classList.remove('hidden');
    } else if (board.every(cell => cell !== '')) {
        gameOver = true;
        document.getElementById('result').textContent = 'It\'s a draw!🙄';
        document.getElementById('result').classList.remove('hidden');
    } else {
        currentPlayer = 'X';
        document.getElementById('turn').textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = player;
    document.getElementById('result').classList.add('hidden');
    document.getElementById('turn').textContent = `Player ${currentPlayer}'s turn`;
    setupBoard();
}
