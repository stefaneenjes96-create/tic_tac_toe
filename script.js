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

function GameController() {
    const board = GameBoard();

    const playRound = (row, column, player) => {
        const chosenCell = board.getBoard()[row][column];

        if (chosenCell.getValue() === " ") {
            chosenCell.addToken(player);
        } else {
            console.log(chosenCell)
            console.log("Please choose a different cell.")
        }

        board.printBoard();
    }

    return {
        playRound
    }
}