var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let newBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

var gameOver = false;
const xClass = "x";
const oClass = "o";
let currentPlayer;

let selectCharPage = document.querySelector(".select-character");
let currentBoard = document.querySelector(".board");
let charX = document.querySelector("#char-x");
let charO = document.querySelector("#char-o");
let gamePage = document.querySelector(".game");
let tileElements = document.querySelectorAll(".tile");
let historyBtnsContainer = document.querySelector(".history-buttons-container");
let buttons = document.querySelectorAll(".button");

let historyBoard = [];
let showBoard = [];
let lastItemDeleted = [];
let deleteBoard = [];

// Selecting which character will play first
charX.addEventListener("click", () => {
    currentPlayer = xClass;
    gamePage.style.backgroundColor = "var(--clr1)";
    firstPlayer(currentPlayer);
})

charO.addEventListener("click", function() {
    currentPlayer = oClass;
    gamePage.style.backgroundColor = "var(--clr2)";
    firstPlayer(currentPlayer);
})

function firstPlayer(className) {
    currentBoard.classList.add(className);
    selectCharPage.style.display = "none";
}

// Add click eventListener on each tile
tileElements.forEach(tile => {
    tile.addEventListener("click", tileClick, {once: true});
})

//functionality of click event of tiles
function tileClick() {

    if(gameOver === true) {
        return;
    }
    
    // To get the indices of the tile
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    newBoard = JSON.parse(JSON.stringify(board)); //deep copy
    historyBoard.push(newBoard); //store every change in an array

    this.classList.add(currentPlayer); // update board in HTML
    board[r][c] = currentPlayer; //update board in JS

    changeClass();      // Switch Characters on every click
    changeHover();      // Switch hover effects on every click
    changeBackground(); // Switch BG color on every click
    checkWin();         // Check if there is a win for every move/click
}

function changeClass() {
    if(currentPlayer === xClass) {
        currentPlayer = oClass;
    } else {
        currentPlayer = xClass;
    }
}

function changeHover() {
    if(currentPlayer === oClass) {
        currentBoard.classList.remove(xClass);
        currentBoard.classList.add(oClass);
    } else {
        currentBoard.classList.remove(oClass);
        currentBoard.classList.add(xClass);
    }
}

function changeBackground() {
    if(currentPlayer === oClass) {
        gamePage.style.backgroundColor = "var(--clr2)";
    } else {
        gamePage.style.backgroundColor = "var(--clr1)";
    }
}

function checkWin() {
    //Vertical Win
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != '') {
            for (let i = 0; i < 3; i++) {
                let tileWinner = document.getElementById(i.toString() + "-" + c.toString());                
                tileWinner.classList.add("winner");
            }
            gameOver = true;
            maintainBg();
            gameIsOver();
            return;
        }
    }

    //Horizontal Win
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] ==  board[r][2] && board[r][0] != '') {
            for (let i = 0; i < 3; i++) {
                let tileWinner = document.getElementById(r.toString() + "-" + i.toString());                
                tileWinner.classList.add("winner");
            }
            gameOver = true;
            maintainBg();
            gameIsOver();
            return;
        }
    }

    //Diagonal Win
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] != '') {
        for (let i = 0; i < 3; i++) {
            let tileWinner = document.getElementById(i.toString() + "-" + i.toString());                
            tileWinner.classList.add("winner");
        }
        gameOver = true;
        maintainBg();
        gameIsOver();
        return;
    }

    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] != '') {
        for (let i = 0; i < 3; i++) {
            let tileWinner = document.getElementById("0-2");
            tileWinner.classList.add("winner");

            tileWinner = document.getElementById("1-1");
            tileWinner.classList.add("winner");

            tileWinner = document.getElementById("2-0");                
            tileWinner.classList.add("winner");
        }
        gameOver = true;
        maintainBg();
        gameIsOver();
        return;
    }    
}

// Stop BG color from changing on last click before game is over
function maintainBg() {
    if (currentPlayer === "o") {
        gamePage.style.backgroundColor = "var(--clr1)";
    } else {
        gamePage.style.backgroundColor = "var(--clr2)";
    }
}

// When game is over
function gameIsOver(){
    currentBoard.classList.remove(currentPlayer); //to remove hover effects if game is over
    historyBtnsContainer.style.visibility = "visible"; // to show history buttons if game is over
    nextBtn.style.visibility = "hidden"; //Hide/Disable Next button when game is over

    showBoard = board;
    historyBoard.push(board);
}

// Functionality of Previous Button
let previousBtn = document.querySelector("#previous");
previousBtn.addEventListener("click", () => {

    //Manipulation on JS
    lastItemDeleted = historyBoard.pop();
    deleteBoard.push(lastItemDeleted);
    showBoard = historyBoard[historyBoard.length - 1];

    changeClass();
    updateBoard(); //Update in HTML

    // Hide/Disable Previous Button if board @ 0th move
    if (historyBoard.length === 1) {
        previousBtn.style.visibility = "hidden";
    }

    // Show Next Button @ move before last
    if (deleteBoard.length != 0) {
        nextBtn.style.visibility = "visible";
    } 
})

// Functionality of Next Button
let nextBtn = document. querySelector("#next");
nextBtn.addEventListener("click", () => {
    
    lastItemDeleted = deleteBoard.pop();
    historyBoard.push(lastItemDeleted);
    showBoard = historyBoard[historyBoard.length - 1];
    
    // Hide/Disable Next Button @ last move
    if (deleteBoard.length === 0) {
        nextBtn.style.visibility = "hidden";
    }

    // Show Previous Button @ 1st move
    if (historyBoard.length !== 1) {
        previousBtn.style.visibility = "visible";
    }

    updateBoard(); // Update in HTML
    changeClass();
})

// Functionality of Restart Button
let restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", () => {
    document.location.reload();
})

function updateBoard() {
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if(showBoard[r][c] === '') {
                const tileUpdate = document.getElementById(r.toString() + "-" + c.toString());
                tileUpdate.classList.remove(currentPlayer);
            } else if(showBoard[r][c] === currentPlayer) {
                let tileUpdate = document.getElementById(r.toString() + "-" + c.toString());
                tileUpdate.classList.add(currentPlayer);
            }
        }
    }
}