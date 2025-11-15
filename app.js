let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true -> O's turn, false -> X's turn
let moveCount = 0;

// Load sounds
const clickSound = new Audio("click.mp3");
const winSound = new Audio("win.mp3");
const drawSound = new Audio("draw.mp3");

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    moveCount = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickSound.play();

        if (turnO) {
            box.innerText = "O";
            box.style.color = "#1e1e1e";
        } else {
            box.innerText = "X";
            box.style.color = "#b0413e";
        }

        box.disabled = true;
        moveCount++;
        checkWinner();
        turnO = !turnO;
    });
});

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = ""; // reset background color
    }
};

const showWinner = (winner, winBoxes) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();

    // Highlight winning boxes
    for (let index of winBoxes) {
        boxes[index].style.backgroundColor = "#90ee90"; // light green
    }

    winSound.play();
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val, pattern);
                return;
            }
        }
    }

    // If all 9 moves played and no winner
    if (moveCount === 9) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        drawSound.play();
        disabledBoxes();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
