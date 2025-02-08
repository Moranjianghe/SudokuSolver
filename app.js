function solveSudoku(board) {
    const emptySpot = findEmptySpot(board);
    if (!emptySpot) return true; // 解決完成
    const [row, col] = emptySpot;

    for (let num = 1; num <= 9; num++) {
        if (isValid(board, num, row, col)) {
            board[row][col] = num;

            if (solveSudoku(board)) {
                return true;
            }

            board[row][col] = 0; // 回溯
        }
    }
    return false;
}

function findEmptySpot(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}

function isValid(board, num, row, col) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num || 
            board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3] === num) {
            return false;
        }
    }
    return true;
}

document.getElementById('solveButton').addEventListener('click', function(event) {
    event.preventDefault();
    const board = [];
    const inputs = document.querySelectorAll('.sudoku-input');
    for (let i = 0; i < 9; i++) {
        board[i] = [];
        for (let j = 0; j < 9; j++) {
            const value = inputs[i * 9 + j].value;
            board[i][j] = value ? parseInt(value) : 0;
        }
    }

    if (solveSudoku(board)) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                inputs[i * 9 + j].value = board[i][j] || '';
            }
        }
    } else {
        alert('無法解決此數獨！');
    }
});