function randomGenerator() {
    return Math.floor(Math.random() * 9);
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function checkGrid(grid) {
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid.length; j++) {
            if(grid[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

// check if given value wasnt used in row
function usedInRow(matrix, i, num) {
    for(let j = 0; j < matrix.length; j++) {
        if(matrix[i][j] === num) return true;
    }
    return false;
}

// check if given value wasnt used in columns
function usedInCol(matrix, j, num) {
    for(let i = 0; i < matrix.length; i++) {
        if(matrix[i][j] === num) return true;
    }
    return false;
}

// check if given value wasnt used in squares 3 x 3
function usedInBox(matrix, x, y, num) {
    x = x - x % 3;
    y = y - y % 3;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(matrix[x + i][y + j] === num) return true
        }
    }
    return false;
}

function fillGrid(grid) {
    let row = 0;
    let col = 0;
    let numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for(let e = 0; e < 81; e++) {
        row = parseInt(e / 9);
        col = e % 9;
        if(grid[row][col] === 0) {
            shuffle(numberList);
            for(let i = 0 ; i < numberList.length; i++) {
                let value = numberList[i];
                if(!usedInRow(grid, row, value)) {
                    if(!usedInCol(grid, col, value)) {
                        if(!usedInBox(grid, row, col, value)) {
                            grid[row][col] = value;
                            if(checkGrid(grid)) return true;
                            else if(fillGrid(grid)) return true;
                        }
                    }
                }
            }
            break;
        }
    }
    grid[row][col] = 0;
    return false;
}

function getGrid(i) {
    let grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    fillGrid(grid);

    while(i > 0) {
        let row = randomGenerator();
        let col = randomGenerator();
        while(grid[row][col] === 0) {
            row = randomGenerator();
            col = randomGenerator();
        }
        grid[row][col] = 0;
        i--;
    }

    return grid;
}

function checkIfGridIsCompleted(grid) {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(grid[i][j] === ' ') return false;
        }
    }
    return true;
}

function validRow(grid, row) {
    const array = [...new Set(grid[row])];
    if(array.length === grid[row].length) return true;
    else return false; 
}

function validColumn(grid, column) {
    const array = grid.map(e => {
        return e[column]; 
    });
    if(array.length === [...new Set(array)].length) return true;
    else return false;
}

function validSquare(grid, square) {
    let x = parseInt(square / 3) * 3;
    let y = parseInt(square % 3) * 3;
    let array = [];
    for(let i = x; i < x + 3; i++) {
        for(let j = y; j < y + 3; j++) {
            array.push(grid[i][j]);
        }
    }
    if(array.length === [...new Set(array)].length) return true;
    else return false;
}

function validGrid(grid) {
    for(let i = 0; i < 9; i++) {
        if(!validRow(grid, i) || !validColumn(grid, i) || !validSquare(grid, i)) return false;
    }
    return true;
}

module.exports.getGrid = getGrid;
module.exports.checkIfGridIsCompleted = checkIfGridIsCompleted;
module.exports.validGrid = validGrid;
module.exports.validSquare = validSquare;