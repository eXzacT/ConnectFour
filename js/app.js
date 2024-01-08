import ConnectFour from "./connectFour.js";


document.addEventListener("DOMContentLoaded", async function ready() {
    var boardEl = document.getElementById("board");
    var restartGameBtn = document.getElementById("reset-game-btn");

    ConnectFour.draw(boardEl);

    boardEl.addEventListener("click", onClick, false);
    boardEl.addEventListener("mouseover", onMouseOver, false);
    boardEl.addEventListener("mouseleave", onMouseExit, false);
    restartGameBtn.addEventListener("click", reset, false);

    function onMouseOver(evt) {
        var mouseOverEl = evt.target;
        if (mouseOverEl.matches("#board > div > div")) {
            ConnectFour.highlightCol(mouseOverEl);
        }
    }

    function onMouseExit() {
        ConnectFour.removeAllHighlights();
    }

    function onClick(evt) {
        var clickedEl = evt.target;
        if (clickedEl.matches("#board > div > div")) {
            ConnectFour.push(clickedEl);
        }
    }

    function reset() {
        ConnectFour.reset();
    }

});