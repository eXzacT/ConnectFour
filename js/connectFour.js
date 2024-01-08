export default {
    draw,
    push,
    reset,
    highlightCol,
    removeAllHighlights
};

var cols = new Array(7).fill().map(() => []);
var colsLastEmptyIdx, board_2d, highlighted, player, gameOver;

function init() {
    // In the beginning we can place only on last row in each column, so index 5, later we decrement
    colsLastEmptyIdx = new Array(7).fill(5);
    board_2d = new Array(6).fill().map(() => Array(7).fill(null));
    // Highlighted column where the mouse is over
    highlighted = [];
    player = 0; // Red always goes first
    gameOver = false;
}


function draw(board) {
    init();
    for (let i = 0; i < 6; i++) {
        let rowEl = document.createElement("div");
        for (let j = 0; j < 7; j++) {
            const tileEl = document.createElement("div");
            tileEl["col"] = j // Store column index inside the element

            cols[j].push(tileEl);

            rowEl.appendChild(tileEl);
        }
        board.appendChild(rowEl);
    }
}

function removeAllHighlights() {
    for (let el of highlighted) {
        el.classList.remove("highlighted");
    }
    highlighted.length = 0;
}

function highlightCol(tileEl) {
    removeAllHighlights();

    const col = tileEl["col"];
    for (let el of cols[col]) {
        el.classList.add("highlighted");
        highlighted.push(el);
    }
}

function push(tileEl) {
    if (gameOver) {
        return;
    }
    const col = tileEl["col"];
    const min_row = colsLastEmptyIdx[col]
    // Column already full
    if (min_row == -1) {
        return;
    }
    // Color the tile based on whose turn it was
    if (player == 0) {
        cols[col][min_row].classList.add("red-colored");
        board_2d[min_row][col] = 0;
    } else {
        cols[col][min_row].classList.add("yellow-colored");
        board_2d[min_row][col] = 1;
    }

    if (checkIfWon(min_row, col, player)) {
        let answer = confirm(`Player ${player} WON!!!, Start Again?`)
        gameOver = true;
        if (answer) {
            reset();
            return;
        }
    }
    // Swap player turn and decrement last index for that column
    colsLastEmptyIdx[col] -= 1;
    player ^= 1;
}

function reset() {
    for (let col of cols) {
        for (let el of col) {
            el.classList.remove("red-colored");
            el.classList.remove("yellow-colored");
        }
    }
    init();
}

function checkIfWon(row, col, player) {
    // Keep going in given direction until the other player color is reached or not defined
    function checkDir(row, col, x, y) {
        let colorCount = 0
        row += x
        col += y
        while (0 <= row && row < 6 && 0 <= col && col < 7 && board_2d[row][col] == player) {
            row = row + x;
            col = col + y;
            colorCount += 1
        }
        return colorCount;
    }
    for (let dir of [[1, 0], [0, 1], [1, 1], [-1, 1]]) {
        // For every direction and it's opposite, get the sum of current player colors
        if (1 + checkDir(row, col, ...dir) + checkDir(row, col, ...dir.map(x => -x)) == 4) {
            return true; // Early return if either direction had 4
        }
    }
    return false;
}