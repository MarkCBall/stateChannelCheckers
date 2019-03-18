let prevMoveToHex = (boardMatrix, prevMove) => {
    let moveStr = ""
    moveStr += prevMove.rowFrom ? prevMove.rowFrom : "0"
    moveStr += prevMove.colFrom ? prevMove.colFrom : "0"
    moveStr += prevMove.rowTo ? prevMove.rowTo : "0"
    moveStr += prevMove.colTo ? prevMove.colTo : "0"
    if (Math.abs(prevMove.rowFrom - prevMove.rowTo)>1){
        moveStr += (prevMove.rowTo + prevMove.rowFrom)/2
        moveStr += (prevMove.colTo + prevMove.colFrom)/2
    }
    return moveStr.padEnd(16,"0")
}


export default {
    MatrixAndMoveToBN:(board,prevMove) =>{
        let BNStr = "0x"
        BNStr += prevMoveToHex(board,prevMove)

        //convert board matrix into pieces array
        let pieces = []
        board.forEach((boardRow)=>{
            boardRow.forEach((piece)=>{
                if (piece.id !== undefined)
                    pieces[piece.id]=piece
            })
        })
        //convert pieces array into hex string
        for(let i=8;i<32;i++){
            let pieceBinary = ""
            if (typeof pieces[i] !== 'undefined'){
                pieceBinary +=  (pieces[i].active) ? "1" : "0"
                pieceBinary +=  (pieces[i].queen) ? "1" : "0"
                pieceBinary +=  pieces[i].row.toString(2).padStart(3,"0")
                pieceBinary +=  pieces[i].col.toString(2).padStart(3,"0")  
            }
            else
                pieceBinary = "00000000"
            BNStr += parseInt(pieceBinary,2).toString(16).padStart(2,"0")   
        }
        return BNStr 
    },

    BNtoMatrix: (BN) =>{
        //setup an empty board
        let boardMatrix = []
        for (let row =0;row<8;row++){
            boardMatrix.push([])
            for (let col=0;col<8;col++){
                boardMatrix[row][col] = {row:row, col:col, active:0}
            }
        }
        //parse the bignumber into pieces data
        let str = BN.toHexString()
        for (let i=9;i<33;i++){
            let pieceHex = str.substr(i*2,2)
            let pieceBinary =  (parseInt(pieceHex, 16)).toString(2).padStart(8,"0")
            let col = parseInt(pieceBinary.substr(5,3),2)
            let row = parseInt(pieceBinary.substr(2,3),2)

            //fill pieces into the board
            if (pieceBinary.charAt(0) === "1"){
                boardMatrix[row][col] = {
                    id: i-1,
                    red: (i<21),
                    active: (pieceBinary.charAt(0) === "1"),
                    queen: (pieceBinary.charAt(1) === "1"),
                    row:row,
                    col:col
                }
            }
        }
        return boardMatrix
    }
}