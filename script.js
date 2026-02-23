function GameBoard() {

    const rows = 3;
    const colums = 3;
    let board = []

    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < colums; j++) {
            const newCell = Cell();
            board[i].push(newCell)
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

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
    const board = GameBoard();

    const players = [
        {
            name: playerOneName,
            token: "O"
        },
        {
            name: playerTwoName,
            token: "X"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    }

    const playRound = (row, column) => {
        const chosenCell = board.getBoard()[row][column];

        if (chosenCell.getValue() === " ") {
            chosenCell.addToken(getActivePlayer().token);
        } else {
            console.log(chosenCell)
            console.log("Please choose a different cell.")
        }

        checkForWin();
        switchPlayerTurn();
        printNewRound();
    }

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
            console.log(`${gameboard[0][0].getValue()} and ${gameboard[1][1].getValue()} and ${gameboard[2][2].getValue()}`);
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

        console.log(diagonalWinCondition("O"))

        if (horizontalWinCondition("O") | verticalWinCondition("o") | diagonalWinCondition("O")) {
            console.log("Player One has won!")
        } else if (horizontalWinCondition("X") | verticalWinCondition("x") | diagonalWinCondition("X")) {
            console.log("Player Two has won!")
        } else {
            console.log("no winner yet.")
        };
    };

    return {
        playRound,
        checkForWin,
    }
}

const game = GameController();