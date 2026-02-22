function GameBoard() {

    const rows = 3;
    const colums = 3;
    let board = []
    let cellId = 1;

    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < colums; j++) {
            const newCell = Cell();
            newCell.giveId(cellId++);
            console.log(newCell.getId)
            board[i].push(newCell)
        }
    }

    const getBoard = () => board;

    const makePlay = (player) => {
        const isAvailable = board.forEach((row) => row.filter((element) => element.getValue() === 0));
        console.log(isAvailable)
    }


    return {
        getBoard,
        makePlay
    };
}

function Cell() {

    let value = 0;
    let id;

    const addToken = (player) => {
        value = player; 
    };

    const getValue = () => value;

    const giveId = (id_number) => {
        id = id_number;
    }

    const getId = () => id;

    return {
        addToken,
        getValue,
        giveId,
        getId
    };
}

function GameController() {

}