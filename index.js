const sudoku = (function () {
    let board;
    let boardCopyForValidation;

    function checkRow(currentCell, num) {
        for (let i = 0; i < 9; i++) {
            if (board[currentCell.x][i] === num && i !== currentCell.y) {
                return false;
            }
        }
        return true;
    }

    function checkCol(currentCell, num) {
        for (let i = 0; i < 9; i++) {
            if (board[i][currentCell.y] === num && i !== currentCell.x) {
                return false;
            }
        }
        return true;
    }

    function checkSquare(currentCell, num) {
        const innerSquares = [
            { start: 0, end: 2 },
            { start: 3, end: 5 },
            { start: 6, end: 8 },
        ];
        const squareRange = {
            x: innerSquares.find((element) => element.end >= currentCell.x),
            y: innerSquares.find((element) => element.end >= currentCell.y),
        };
        for (let i = squareRange.x.start; i <= squareRange.x.end; i++) {
            for (let j = squareRange.y.start; j <= squareRange.y.end; j++) {
                if (
                    board[i][j] === num &&
                    (i !== currentCell.x || j !== currentCell.y)
                ) {
                    return false;
                }
            }
        }
        return true;
    }

    function validateCell(currentCell, num) {
        return (
            checkRow(currentCell, num) &&
            checkCol(currentCell, num) &&
            checkSquare(currentCell, num)
        );
    }

    //board input validation before solving
    function findFullCellOnBoardCopyForValidation() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (boardCopyForValidation[x][y]) {
                    return { x, y };
                }
            }
        }
        return false;
    }

    function validateBoard() {
        const fullCell = findFullCellOnBoardCopyForValidation();
        if (!fullCell) return true;
        else if (
            validateCell(
                fullCell,
                boardCopyForValidation[fullCell.x][fullCell.y]
            )
        ) {
            boardCopyForValidation[fullCell.x][fullCell.y] = '';
            if (validateBoard()) return true;
        }

        return false;
    }

    // board solving
    function findEmptyCell() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (!board[x][y]) {
                    return { x, y };
                }
            }
        }
        return false;
    }

    function solve() {
        const emptyCell = findEmptyCell();
        if (!emptyCell) return true;
        for (let num = 1; num <= 9; num++) {
            if (validateCell(emptyCell, num)) {
                board[emptyCell.x][emptyCell.y] = num;
                if (solve()) {
                    return true;
                }
            }
            board[emptyCell.x][emptyCell.y] = '';
        }
        return false;
    }

    function setBoard(newBoard) {
        if (Array.isArray(newBoard)) {
            board = newBoard.slice();
            boardCopyForValidation = newBoard.slice();
        }
    }

    function getBoard() {
        return board;
    }

    return { setBoard, getBoard, solve, validateBoard };
})();

const htmlGame = {
    buildGridBoard: function () {
        const board = document.querySelector('.board');
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('input');
                cell.classList.add('cell', `x-${i + 1}`, `y-${j + 1}`);
                cell.setAttribute('type', 'number');
                cell.setAttribute('min', '0');
                cell.setAttribute('max', '9');
                cell.dataset.x = i;
                cell.dataset.y = j;
                board.append(cell);
            }
        }
    },

    get2DArray: function () {
        const board = [...Array(9)].map((e) => Array(9));
        const cells = document.querySelectorAll('.cell');
        cells.forEach(
            (cell) =>
                (board[cell.dataset.x][cell.dataset.y] =
                    parseInt(cell.value) || '')
        );
        return board;
    },

    solve: function () {
        const board = this.get2DArray();
        sudoku.setBoard(board);
        if (!sudoku.validateBoard()) {
            return { status: false, data: 'Invalid Board' };
        }
        if (!sudoku.solve()) {
            return { status: false, data: 'Unsovable Board' };
        }
        return { status: true, data: sudoku.getBoard() };
    },

    showSolution: function (board) {
        const cells = document.querySelectorAll('.cell');

        cells.forEach(
            (cell) => (cell.value = board[cell.dataset.x][cell.dataset.y])
        );
    },

    clearBoard: function () {
        const cells = document.querySelectorAll('.cell');

        cells.forEach((cell) => (cell.value = ''));
    },

    solveBtn: document.querySelector('.solve-btn'),

    clearBtn: document.querySelector('.clear-btn'),
};

const main = (function () {
    window.addEventListener('load', function (e) {
        htmlGame.buildGridBoard();
    });

    htmlGame.solveBtn.addEventListener('click', function (e) {
        const result = htmlGame.solve();
        if (result.status) {
            htmlGame.showSolution(result.data);
        } else {
            alert(result.data);
        }
    });

    htmlGame.clearBtn.addEventListener('click', htmlGame.clearBoard);
})();
