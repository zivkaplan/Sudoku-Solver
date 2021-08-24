const sudoku = (function () {
    let board = null;

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

    function validateBoard() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (board[x][y]) {
                    if (!validateCell({ x, y }, board[x][y])) {
                        return false;
                    }
                }
            }
        }
        return true;
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
            board = JSON.parse(JSON.stringify(newBoard));
        }
    }

    function getBoard() {
        return board;
    }

    return {
        setBoard,
        getBoard,
        solve,
        validateBoard,
        validateCell,
    };
})();

const htmlGame = {
    solveBtn: document.querySelector('.solve-btn'),
    showSolutionBtn: document.querySelector('.show-solution-btn'),
    clearBtn: document.querySelector('.clear-btn'),
    board: document.querySelector('.board'),
    cells: null,
    toggleDarkModeBtn: document.querySelector('.toggleDarkMode'),

    buildGridBoard: function () {
        const board = document.querySelector('.board');
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('input');
                cell.classList.add('cell', `x-${i + 1}`, `y-${j + 1}`);
                cell.setAttribute('type', 'tex');
                cell.setAttribute('maxLength', '1');
                cell.setAttribute('inputmode', 'numeric');
                cell.dataset.x = i;
                cell.dataset.y = j;
                cell.dataset.solution = '';
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

    isBoardValid: function () {
        const board = this.get2DArray();
        sudoku.setBoard(board);
        return sudoku.validateBoard();
    },

    isCellValid: function (cell, value) {
        const board = this.get2DArray();
        sudoku.setBoard(board);
        return sudoku.validateCell(cell, value);
    },

    solve: function () {
        const board = this.get2DArray();
        sudoku.setBoard(board);
        if (!sudoku.solve()) {
            return { isSolvable: false, data: 'Unsovable Board' };
        }
        return { isSolvable: true, data: sudoku.getBoard() };
    },

    showSolution: function (board) {
<<<<<<< HEAD
        const cells = document.querySelectorAll('input.cell');
        cells.forEach((cell) => {
            cell.value = cell.dataset.solution;
            cell.setAttribute('title', '');
        });
    },
    revealCell: function (e) {
        if (!e.target.dataset.solution) return;
        e.target.classList.add('revealed');
        e.target.value = e.target.dataset.solution;
    },

    writeSolutionToHtml: function (board) {
        const cells = document.querySelectorAll('input.cell');
        cells.forEach((cell) => {
            cell.setAttribute('title', 'click to reveal');
            cell.dataset.solution = board[cell.dataset.x][cell.dataset.y];
        });
=======
        const cells = document.querySelectorAll('.cell');
        cells.forEach(
            (cell) => (cell.value = board[cell.dataset.x][cell.dataset.y])
        );
>>>>>>> parent of 361749a (update e.keyCode to e.code)
    },

    clearBoard: function () {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.value = '';
            cell.classList.remove('validInput');
            cell.classList.remove('invalidInput');
            cell.classList.remove('revealed');

            cell.dataset.solution = '';
            cell.readOnly = false;
            cell.setAttribute('title', '');
        });
        htmlGame.solveBtn.classList.remove('d-none');
        htmlGame.showSolutionBtn.classList.add('d-none');
    },

    markValidCell: function (cell) {
        cell.classList.add('validInput');
        cell.classList.remove('invalidInput');
    },

    markInvalidCell: function (cell) {
        cell.classList.add('invalidInput');
        cell.classList.remove('validInput');
    },

    blankCell: function (cell) {
        cell.value = '';
        cell.classList.remove('validInput');
        cell.classList.remove('invalidInput');
    },

    checkSolveButtonState: function () {
        if (htmlGame.isBoardValid()) {
            htmlGame.solveBtn.classList.remove('disabled');
            htmlGame.solveBtn.innerText = 'Solve!';
        } else {
            htmlGame.solveBtn.classList.add('disabled');
            htmlGame.solveBtn.innerText = 'Invalid board';
        }
    },

    validateUserInput: function (e) {
        const cell = e.target;
        const cellPosition = {
            x: parseInt(e.target.dataset.x),
            y: parseInt(e.target.dataset.y),
        };
        // enable solve button for valid boards only
        htmlGame.checkSolveButtonState();

        // validate user input
        if (/[0-9]/.test(e.target.value)) {
            // if input is number and makes valid board
            if (htmlGame.isCellValid(cellPosition, parseInt(e.target.value))) {
                htmlGame.markValidCell(cell);
                cell.nextElementSibling.focus();
            } else {
                htmlGame.markInvalidCell(cell);
            }
            // invalid characters
        } else {
            htmlGame.blankCell(cell);
        }
    },

    updateBoardAfterChange: function (cell) {
        if (!cell.value || cell.dataset.solution) return;
        const cellPosition = {
            x: parseInt(cell.dataset.x),
            y: parseInt(cell.dataset.y),
        };
        // enable solve button for valid boards only
        htmlGame.checkSolveButtonState();
        if (htmlGame.isCellValid(cellPosition, parseInt(cell.value))) {
            htmlGame.markValidCell(cell);
        } else {
            htmlGame.markInvalidCell(cell);
        }
    },
};

const main = (function () {
    window.addEventListener('load', (e) => {
        document.getElementById('toggle1').checked = false;
        htmlGame.buildGridBoard();
        htmlGame.cells = document.querySelectorAll('.cell');
        htmlGame.cells.forEach((cell) => {
            cell.addEventListener('input', htmlGame.validateUserInput);
        });
        document.querySelector('.cell').focus();
    });

    ['focusout', 'keydown', 'keyup', 'click', 'touchstart'].forEach(
        (eventType) => {
            htmlGame.board.addEventListener(eventType, (e) => {
                htmlGame.cells.forEach((cell) =>
                    htmlGame.updateBoardAfterChange(cell)
                );
            });
        }
    );

    htmlGame.solveBtn.addEventListener('click', (e) => {
        const result = htmlGame.solve();
        if (result.status) {
            htmlGame.showSolution(result.data);
        } else {
            alert(result.data);
        }
    });

    htmlGame.clearBtn.addEventListener('click', htmlGame.clearBoard);

    window.addEventListener('keydown', (e) => {
        if (!document.activeElement.classList.contains('cell')) return;
        // Checking for Backspace.
        if (e.keyCode == 8) {
            if (!e.target.value && document.activeElement.previousSibling) {
                return document.activeElement.previousSibling.focus();
            }
        }
        // left arrow
        if (e.keyCode == 37) {
            const previousCell = document.activeElement.previousSibling;
            if (previousCell) {
                previousCell.focus();
                previousCell.select();
                e.preventDefault();
                return;
            }
        }
        // right arrow
        if (e.keyCode == 39) {
            const nextCell = document.activeElement.nextSibling;
            if (nextCell) {
                nextCell.focus();
                nextCell.select();
                e.preventDefault();
                return;
            }
        }
        // up arrow
        if (e.keyCode == 38) {
            let currentEl = document.activeElement;
            for (let i = 0; i < 9; i++) {
                currentEl = currentEl.previousSibling;
            }
            if (currentEl) {
                currentEl.focus();
                currentEl.select();
                e.preventDefault();
                return;
            }
        }
        // down arrow
        if (e.keyCode == 40) {
            let currentEl = document.activeElement;
            for (let i = 0; i < 9; i++) {
                currentEl = currentEl.nextSibling;
            }
            if (currentEl) {
                currentEl.focus();
                currentEl.select();
                e.preventDefault();
                return;
            }
        }
<<<<<<< HEAD
    },
};

const main = (function () {
    window.addEventListener('load', (e) => {
        document.getElementById('toggle1').checked = false;
        htmlGame.buildGridBoard();
        htmlGame.cells = document.querySelectorAll('input.cell');
        htmlGame.cells.forEach((cell) => {
            cell.addEventListener('input', htmlGame.validateUserInput);
            cell.addEventListener('click', htmlGame.revealCell);
        });
        document.querySelector('input.cell').focus();
    });

    ['focusout', 'keydown', 'keyup', 'click', 'touchstart'].forEach(
        (eventType) => {
            htmlGame.board.addEventListener(eventType, (e) => {
                htmlGame.cells.forEach((cell) =>
                    htmlGame.updateBoardAfterChange(cell)
                );
            });
        }
    );

    htmlGame.solveBtn.addEventListener('click', (e) => {
        const result = htmlGame.solve();
        if (result.isSolvable) {
            htmlGame.writeSolutionToHtml(result.data);
            htmlGame.solveBtn.classList.add('d-none');
            htmlGame.showSolutionBtn.classList.remove('d-none');
            htmlGame.cells.forEach((cell) => {
                cell.readOnly = true;
                if (!cell.value) cell.value = '?';
            });
        } else {
            alert(result.data);
        }
    });

    htmlGame.showSolutionBtn.addEventListener('click', () => {
        htmlGame.showSolution();
    });

    htmlGame.clearBtn.addEventListener('click', htmlGame.clearBoard);

    window.addEventListener('keydown', htmlGame.handleKeyPress);

=======
    });

>>>>>>> parent of 361749a (update e.keyCode to e.code)
    htmlGame.toggleDarkModeBtn.addEventListener('click', (e) => {
        if (document.getElementById('toggle1').checked) {
            document.querySelector('body').classList.remove('light');
            document.querySelector('body').classList.add('dark');
            return;
        }
        document.querySelector('body').classList.add('light');
        document.querySelector('body').classList.remove('dark');
    });
})();
