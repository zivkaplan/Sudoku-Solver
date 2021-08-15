(function sudoku() {
    const board = [
        [null, 5, 4, 6, 7, 8, 9, 1, 2], //0
        [6, null, 2, 1, 9, 5, 3, 4, 8], //1
        [1, 9, null, 3, 4, 2, 5, 6, 7], //2

        [8, 5, 9, null, 6, 1, 4, 2, 3], //3
        [4, 2, 6, 8, null, 3, 7, 9, 1], //4
        [7, 1, 3, 9, 2, null, 8, 5, 6], //5

        [9, 6, 1, 5, 3, 7, null, 8, 4], //6
        [2, 8, 7, 4, 1, 9, 6, null, 5], //7
        [3, 4, 5, 2, 8, 6, 1, 7, null], //8
    ];

    function checkRow(currentCell, num) {
        for (let i = 0; i < 9; i++) {
            if (board[currentCell.x][i] == num && i !== currentCell.y) {
                return false;
            }
        }
        return true;
    }

    function checkCol(currentCell, num) {
        for (let i = 0; i < 9; i++) {
            if (board[i][currentCell.y] == num && i !== currentCell.x) {
                return false;
            }
        }
        return true;
    }

    function checkSquare(currentCell, num) {
        const limits = [
            { start: 0, end: 2 },
            { start: 3, end: 5 },
            { start: 6, end: 8 },
        ];
        const squareRange = { x: limits.find((element) => element.end >= currentCell.x), y: limits.find((element) => element.end >= currentCell.y) };
        for (let i = squareRange.x.start; i <= squareRange.x.end; i++) {
            for (let j = squareRange.y.start; j <= squareRange.y.end; j++) {
                if (board[i][j] === num && (i !== currentCell.x || j !== currentCell.y)) {
                    return false;
                }
            }
        }
        return true;
    }

    function validateCell(currentCell, num) {
        return checkRow(currentCell, num) && checkCol(currentCell, num) && checkSquare(currentCell, num);
    }

    let cell = { x: 3, y: 3 };
    let num = 7;

    function solve() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (board[x][y] === null) {
                    const cell = { x, y };
                    for (let num = 1; num <= 9; num++) {
                        if (validateCell(cell, num)) {
                            board[x][y] = num;
                            solve();
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    solve();
    console.log(board);
})();
