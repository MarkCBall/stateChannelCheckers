



let NWValid = (boardMatrix, piece) => {
    return ((piece.row > 0) && (piece.col > 0) && !boardMatrix[piece.row - 1][piece.col - 1].active && (!piece.red || piece.queen))
}
let NEValid = (boardMatrix, piece) => {
    return ((piece.row > 0) && (piece.col < 7) && !boardMatrix[piece.row - 1][piece.col + 1].active && (!piece.red || piece.queen))
}
let SEValid = (boardMatrix, piece) => {
    return ((piece.row < 7) && (piece.col < 7) && !boardMatrix[piece.row + 1][piece.col + 1].active && (piece.red || piece.queen))
}
let SWValid = (boardMatrix, piece) => {
    return ((piece.row < 7) && (piece.col > 0) && !boardMatrix[piece.row + 1][piece.col - 1].active && (piece.red || piece.queen))
}
let NWValidAttack = (boardMatrix, piece) => {
    return ((piece.row > 1) && (piece.col > 1) && boardMatrix[piece.row - 1][piece.col - 1].active && (!piece.red || piece.queen)
        && !boardMatrix[piece.row - 2][piece.col - 2].active && (boardMatrix[piece.row - 1][piece.col - 1].red !== piece.red))
}
let NEValidAttack = (boardMatrix, piece) => {
    return ((piece.row > 1) && (piece.col < 6) && boardMatrix[piece.row - 1][piece.col + 1].active && (!piece.red || piece.queen)
        && !boardMatrix[piece.row - 2][piece.col + 2].active && (boardMatrix[piece.row - 1][piece.col + 1].red !== piece.red))
}
let SEValidAttack = (boardMatrix, piece) => {
    return ((piece.row < 6) && (piece.col < 6) && boardMatrix[piece.row + 1][piece.col + 1].active && (piece.red || piece.queen)
        && !boardMatrix[piece.row + 2][piece.col + 2].active && (boardMatrix[piece.row + 1][piece.col + 1].red !== piece.red))
}
let SWValidAttack = (boardMatrix, piece) => {
    return ((piece.row < 6) && (piece.col > 1) && boardMatrix[piece.row + 1][piece.col - 1].active && (piece.red || piece.queen)
        && !boardMatrix[piece.row + 2][piece.col - 2].active && (boardMatrix[piece.row + 1][piece.col - 1].red !== piece.red))
}

let createEmptyValidMovesMatrix= () => {
    let validMovesMatrix = []
    for (let row = 0; row < 8; row++) {
        validMovesMatrix.push([])
        for (let col = 0; col < 8; col++) {
            validMovesMatrix[row][col] = false;
        }
    }
    return validMovesMatrix
}

export default {
    createEmptyValidMovesMatrix: () => {
        let validMovesMatrix = []
        for (let row = 0; row < 8; row++) {
            validMovesMatrix.push([])
            for (let col = 0; col < 8; col++) {
                validMovesMatrix[row][col] = false;
            }
        }
        return validMovesMatrix
    },

    getValidMoves: (boardMatrix, piece) => {
        let validMovesMatrix = createEmptyValidMovesMatrix()
        if (NWValid(boardMatrix, piece))
            validMovesMatrix[piece.row - 1][piece.col - 1] = true;
        if (NEValid(boardMatrix, piece))
            validMovesMatrix[piece.row - 1][piece.col + 1] = true;
        if (SEValid(boardMatrix, piece))
            validMovesMatrix[piece.row + 1][piece.col + 1] = true;
        if (SWValid(boardMatrix, piece))
            validMovesMatrix[piece.row + 1][piece.col - 1] = true;
        if (NWValidAttack(boardMatrix, piece))
            validMovesMatrix[piece.row - 2][piece.col - 2] = true;
        if (NEValidAttack(boardMatrix, piece))
            validMovesMatrix[piece.row - 2][piece.col + 2] = true;
        if (SEValidAttack(boardMatrix, piece))
            validMovesMatrix[piece.row + 2][piece.col + 2] = true;
        if (SWValidAttack(boardMatrix, piece))
            validMovesMatrix[piece.row + 2][piece.col - 2] = true;
        return validMovesMatrix
    }
}