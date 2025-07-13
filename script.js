
function winner(playerPosition) {
    const winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]

    for (const combo of winCombos) {
        let count = 0;
        for (const number of combo) {
            if (playerPosition.includes(number)) count++;
        }
        if (count === 3) return true;
    }
    return false
}


function getBoxClicked(marker) {
    return new Promise((resolve) => {
        const board = document.querySelector(".game-board");

        function handleClick(event) {
            const target = event.target;
            if (!target.classList.contains("box") || target.classList.contains("clicked")) return;

            board.removeEventListener("click", handleClick);

            const targetClasses = target.classList;
            const boxNumberString = targetClasses[targetClasses.length - 1];

            targetClasses.add("clicked");
            target.innerText = marker;
            resolve(boxNumberString);
        }

        board.addEventListener("click", handleClick);
    });
}


function playersMove(playerPositions, playerNumber, boxNumberString) {
    const gameBoard = {
        "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9
    };
    const boxNumber = gameBoard[boxNumberString];

    playerPositions[playerNumber].push(boxNumber);

    return playerPositions;
};


function displayMatchInfo(playerName) {
    const nameContainer = document.querySelector(".player-info");

    nameContainer.innerText = `${playerName}`;
    nameContainer.style.border = "4px solid rgb(255 16 0)";
};


async function gameController() {
    const playerOne = "Player One";
    const playerTwo = "Player Two";

    let playerPositions = {
        "one": [],
        "two": []
    };

    for (let i = 1; i < 6; i++) {

        let boxNumberString;

        displayMatchInfo(`${playerOne}'s Turn`);
        boxNumberString = await getBoxClicked("X");
        playerPositions = playersMove(playerPositions, "one", boxNumberString)

        if (i > 2) {
            if (winner(playerPositions["one"])) {
                return "Match Over: Player One wins";
            }
        }

        if (i > 4) {
            return "Match Draws";
        }

        displayMatchInfo(`${playerTwo}'s Turn`);
        boxNumberString = await getBoxClicked("O");
        playerPositions = playersMove(playerPositions, "two", boxNumberString)

        if (i > 2) {
            if (winner(playerPositions["two"])) {
                return "Match Over: Player Two wins";
            }
        }
    }
}


const startBtn = document.querySelector(".start-btn");
startBtn.innerText = "Start Game";
const overlay = document.querySelector(".overlay");

async function startGame() {
    startBtn.classList.toggle("display-none");
    overlay.classList.toggle("display-none");

    let a = await gameController();
    displayMatchInfo(a);

    startBtn.innerText = "Restart";
    startBtn.classList.toggle("display-none");
    overlay.classList.toggle("display-none");

}


startBtn.addEventListener("click", () => {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        box.innerText = "";
        box.classList.remove("clicked");
    });

    startGame();
})
