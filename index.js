const sudoku = {
    // board: [
    //     [null, 3, 4, 6, 7, 8, 9, 1, 2], //0
    //     [6, null, 2, 1, 9, 5, 3, 4, 8], //1
    //     [1, 9, null, 3, 4, 2, 5, 6, 7], //2

    //     [8, 5, 9, null, 6, 1, 4, 2, 3], //3
    //     [4, 2, 6, 8, null, 3, 7, 9, 1], //4
    //     [7, 1, 3, 9, 2, null, 8, 5, 6], //5

    //     [9, 6, 1, 5, 3, 7, null, 8, 4], //6
    //     [2, 8, 7, 4, 1, 9, 6, null, 5], //7
    //     [3, 4, 5, 2, 8, 6, 1, 7, null], //8
    // ]
    board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],

    setBoard: function (newBoard) {
        this.board = newBoard;
    },

    checkRow: function (currentCell, num) {
        for (let i = 0; i < 9; i++) {
            if (this.board[currentCell.x][i] === num && i !== currentCell.y) {
                return false;
            }
        }
        return true;
    },

    checkCol: function (currentCell, num) {
        for (let i = 0; i < 9; i++) {
            if (this.board[i][currentCell.y] === num && i !== currentCell.x) {
                return false;
            }
        }
        return true;
    },

    checkSquare: function (currentCell, num) {
        const limits = [
            { start: 0, end: 2 },
            { start: 3, end: 5 },
            { start: 6, end: 8 },
        ];
        const squareRange = { x: limits.find((element) => element.end >= currentCell.x), y: limits.find((element) => element.end >= currentCell.y) };
        for (let i = squareRange.x.start; i <= squareRange.x.end; i++) {
            for (let j = squareRange.y.start; j <= squareRange.y.end; j++) {
                if (this.board[i][j] === num && (i !== currentCell.x || j !== currentCell.y)) {
                    return false;
                }
            }
        }
        return true;
    },

    validateCell: function (currentCell, num) {
        return this.checkRow(currentCell, num) && this.checkCol(currentCell, num) && this.checkSquare(currentCell, num);
    },

    solve: function () {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (!this.board[x][y]) {
                    const cell = { x, y };
                    for (let num = 1; num <= 9; num++) {
                        if (this.validateCell(cell, num)) {
                            this.board[x][y] = num;
                            console.log(this.board);
                            this.solve();
                        }
                    }
                    return false;
                }
            }
        }
        console.log(this.board);
        return true;
    },
};

const buildGridBoard = (function () {
    const board = document.querySelector(".board");
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement("input");
            cell.classList.add("cell");
            cell.setAttribute("type", "number");
            cell.setAttribute("min", "0");
            cell.setAttribute("max", "9");
            cell.dataset.x = i;
            cell.dataset.y = j;
            cell.value = 0;
            board.append(cell);
        }
    }
})();

const solveBtn = document.querySelector(".solve-btn");
solveBtn.addEventListener("click", function (e) {
    get2DArray();
});

function get2DArray() {
    const board = [[], [], [], [], [], [], [], [], []];
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => (board[cell.dataset.x][cell.dataset.y] = parseInt(cell.value)));
    console.log(board);
    sudoku.setBoard(board);
    sudoku.solve();
}
// console.log(sudoku.board);
// sudoku.solve();
