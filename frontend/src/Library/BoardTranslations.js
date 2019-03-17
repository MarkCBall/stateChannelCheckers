
export default {


    BNtoMatrix:(board) =>{
        //convert board matrix into pieces array
        let pieces = []
        board.forEach((boardRow)=>{
            boardRow.forEach((piece)=>{
                if (piece.id !== undefined)
                    pieces[piece.id]=piece
            })
        })
        //convert pieces array into hex string
        let piecesHex = "0x"
        for(let i=0;i<32;i++){
            let pieceBinary = ""
            if (typeof pieces[i] !== 'undefined'){
                pieceBinary +=  (pieces[i].active) ? "1" : "0"
                pieceBinary +=  (pieces[i].queen) ? "1" : "0"
                pieceBinary +=  pieces[i].row.toString(2).padStart(3,"0")
                pieceBinary +=  pieces[i].col.toString(2).padStart(3,"0")  
            }
            else
                pieceBinary = "00000000"
            piecesHex += parseInt(pieceBinary,2).toString(16).padStart(2,"0")   
        }
        return piecesHex 
    },

    MatrixtoBN:() => {
        console.log("yyyyyyyyyyyy")
    },
}



// BNtoMatrix,MatrixtoBN


