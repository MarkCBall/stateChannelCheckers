
export default {


    calcPieceNumJumped: (board, validSpot, activeSquare) => {
        let pieceNumJumped
        if (Math.abs(validSpot.row - activeSquare.row) > 1) {
            let killedRow = (validSpot.row + activeSquare.row) / 2
            let killedCol = (validSpot.col + activeSquare.col) / 2
            pieceNumJumped = board[killedRow][killedCol].id
        } else {
            pieceNumJumped = 0
        }
        return pieceNumJumped;
    },

    calcNewBoardMatrix: (board, validSpot, activeSquare) => {
        let pieceNumJumped
        let killedRow
        let killedCol
        if (Math.abs(validSpot.row - activeSquare.row) > 1) {
            killedRow = (validSpot.row + activeSquare.row) / 2
            killedCol = (validSpot.col + activeSquare.col) / 2
            pieceNumJumped = board[killedRow][killedCol].id
        }

        let boardMatrix = JSON.parse(JSON.stringify(board))
        let dataToUpdate = { row: validSpot.row, col: validSpot.col }
        //if you get to the end of the board, make the piece a queen
        if (validSpot.row === 7 || validSpot.row === 0) {
            dataToUpdate = { ...dataToUpdate, queen: true }
        }
        //if you moved two squares, it was an attack - kill the jumped piece
        if (pieceNumJumped > 0) {
            boardMatrix[killedRow][killedCol] = { active: 0, row: killedRow, col: killedCol }
        }
        //copy the old piece into the new location
        boardMatrix[validSpot.row][validSpot.col] = {
            ...boardMatrix[activeSquare.row][activeSquare.col],
            ...dataToUpdate
        }
        //delete the old piece from the old location
        boardMatrix[activeSquare.row][activeSquare.col] = { active: 0, row: activeSquare.row, col: activeSquare.col }

        return boardMatrix
    }
}