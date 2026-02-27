function GameBoard() {

    const rows = 3;
    const colums = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < colums; j++) {
            const newCell = Cell();
            board[i].push(newCell);
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return {
        getBoard,
        printBoard,
    };
}

function Cell() {

    let value = " ";

    const addToken = (player) => {
        value = player; 
    };

    const getValue = () => value;

    return {
        addToken,
        getValue,
    };
}

function GameController(
    playerOneName = "Player one",
    playerTwoName = "Player two"
) {
    let board = GameBoard();

    const gui = Gui();
    gui.Buttons();

    const players = [
        {
            name: playerOneName,
            token: "O",
            divClass: ".player-one-score",
            score: 0
        },
        {
            name: playerTwoName,
            token: "X",
            divClass: ".player-two-score",
            score: 0
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        gui.printPlayerTurn();
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gui.printScore(players);
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };

    const playRound = (row, column) => {
        const chosenCell = board.getBoard()[row][column];

        if (chosenCell.getValue() === " ") {
            chosenCell.addToken(getActivePlayer().token);
        } else {
            console.log(chosenCell);
            console.log("Please choose a different cell.");
            return;
        }

        checkForWin();
        printNewRound();
        switchPlayerTurn();
    };

    const checkForTie = () => {
        let result = board.getBoard().concat();
        for (let i = 0; i < result.length; i++) {
            result[i] = result[i].filter((cell) => cell.getValue() === " ");
        }

        if (result[0].length === 0 && result[1].length === 0 && result[2].length === 0) {
            console.log("You tied!");
        }
    };

    const checkForWin = () => {
        let colums = [
            {
                x: 0,
                o: 0
            },
            {
                x: 0,
                o: 0
            },
            {
                x: 0,
                o: 0
            }
        ];

        const verticalWinCondition = (token) => {
            return colums[0][token] === 3 | colums[1][token] === 3 | colums[2][token] === 3;
        }

        const diagonalWinCondition = (token) => {
            const gameboard = board.getBoard();
            return (gameboard[0][0].getValue() === token && gameboard[1][1].getValue() === token && gameboard[2][2].getValue() === token) | 
                (gameboard[0][2].getValue() === token && gameboard[1][1].getValue() === token && gameboard[2][0].getValue() === token)
            
        }

        const horizontalWinCondition = (token) => {
            let win = false
            board.getBoard().forEach(row => {

                let counter = 0;
                for (let i = 0; i < row.length; i++) {
                    if (row[i].getValue() === token) {
                        colums[i].o++;
                        counter++;
                    } 
                }  

                if (counter === 3) {
                    win = true;
                }           
            });

            return win;
        }   

        if (horizontalWinCondition("O") | verticalWinCondition("o") | diagonalWinCondition("O")) {
            players[0].score++
            console.log("Player One has won!");
            gui.printResult("Player One has won!")
        } else if (horizontalWinCondition("X") | verticalWinCondition("x") | diagonalWinCondition("X")) {
            players[1].score++
            console.log("Player Two has won!");
            gui.printResult("Player Two has won!")
        } else if (checkForTie()) {
            console.log("You Tied!");
            gui.printResult("You Tied!");
        } 
        else {
            console.log("no winner yet.");
        };
    };

    const clearPlayingBoard = () => {
        board = GameBoard();
        gui.clearScreen()
    }

    return {
        playRound,
        checkForWin,
        clearPlayingBoard,
        getActivePlayer
    };
}

function Gui() {

    const Buttons = () => {
        const cells = Array.from(document.querySelectorAll(".cell"));

        for (const cell of cells) {
            cell.addEventListener("click", function() {
                if (!cell.hasChildNodes()) {
                    const token = document.createElement("p")
                    token.textContent = game.getActivePlayer().token;
                    cell.append(token);
                    addTokenToCell(this.classList[this.classList.length - 1])
                }
            });
        };

        const newGameButton = document.querySelector(".new-round");
        newGameButton.addEventListener("click", () => game.clearPlayingBoard());
    };

    const addTokenToCell = (id) => {
        const placement = id.split(",");
        game.playRound(placement[0], placement[1]);
    };

    const printPlayerTurn = () => {
        const div = document.querySelector(".player-turn");
        if (div.hasChildNodes()) {
            div.innerHTML = "";
        }

        const par = document.createElement("p");
        par.textContent = `Player ${game.getActivePlayer().token}'s turn`;

        div.append(par);

    }

    const clearScreen = () => {
        const cells = Array.from(document.querySelectorAll(".cell"));

        for (const cell of cells) {
            cell.innerHTML = "";
        };

        const resultDiv = document.querySelector(".game-result");
        if (resultDiv.hasChildNodes) {
            resultDiv.innerHTML = "";
        }
    };

    const printResult = (message) => {
        const div = document.querySelector(".game-result")
        const par = document.createElement("p");
        par.textContent = message;

        div.append(par);
    };

    const printScore = (players) => {
        const playerOne = document.querySelector(".player-one-score");
        console.log(players[1].score)
        playerOne.textContent = `Score: ${players[0].score}`;

        const playerTwo = document.querySelector(".player-two-score");
        playerTwo.textContent = `Score: ${players[1].score}`;
    }

    

    return {
        Buttons,
        printPlayerTurn,
        printScore,
        clearScreen,
        printResult
    };
}

const game = GameController();
