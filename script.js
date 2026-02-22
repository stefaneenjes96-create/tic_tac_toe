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

        switchPlayerTurn();
        printNewRound();
    }

    const checkForWin = () => {
        console.log(board.getBoard())
    }

    return {
        playRound,
        checkForWin
    }
}

const game = GameController();