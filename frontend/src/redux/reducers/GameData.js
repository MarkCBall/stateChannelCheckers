
// import { CHANGE_GAMEID_TEXT } from "../constants/ActionTypes";
import { MERGE_BLOCKCHAIN_GETGAME } from "../constants/ActionTypes";
import { MERGE_DATABASE_GETGAME } from "../constants/ActionTypes";
import { RESET_GAME_DATA } from "../constants/ActionTypes";

import BoardTranslations from "../../Library/BoardTranslations"


const initialState = {
    gameID: "",
    p1Addr: "default",
    p2Addr: "default",
    ERC20Amount: 0,
    state: "",//boardEncoded, boardDecoded, moveDecoded
    
    blockNum: 0,
    VCAddr: "default",
    ERC20Addr: "default",
    turnLength: 0,

    latestBCTimestamp: 0,
    latestDBTimestamp: 0,

    prevMove:{rowTo:0, colTo:0},
    boardMatrix:{},
    turnNum: 0,

    gameSig: {},
    moveSig: {},
    iAmP1Red: false,
    iAmP2Black: false
};

let BCTimestampIsHigher = (newData, oldData) => {
    return (newData.latestBCTimestamp > oldData.latestBCTimestamp)
}
let DBTimestampIsHigher = (newData, oldData) => {
    return (newData.latestDBTimestamp > oldData.latestDBTimestamp)
}
let nonceIsHigher = (newData, oldData) => {
    return ((newData.turnNum > oldData.turnNum) || (oldData.turnNum === 0))
}
let nonceIsSameOrHigher = (turnNum, oldData) => {
    return (turnNum >= oldData.turnNum)
}
let sigIsValid = (newData) => {
    //MIGHT NEED iAmP1Red
    // if (newData.turnNum > 0){
    //     return validateMoveSig(newData)//make new functions
    // }else{
    //     return validateGameSig(newData)
    // }
    return true
}





let getPieceBin = (BNStr, pieceNum) =>{
    let pos = pieceNum*2 + 16
    let pieceHex = BNStr.slice(pos,pos+2)
        return (parseInt(pieceHex, 16)).toString(2).padStart(8,"0")
}
let getLoc = (BNStr, pieceNum) => {
    let pieceBinary = getPieceBin(BNStr, pieceNum)
    return {
        row: parseInt(pieceBinary.substr(2,3),2),
        col: parseInt(pieceBinary.substr(5,3),2),
    }
}
//move this into BoardTranslations
let calcPrevMove = (BNStr, oldRow, oldCol) => {
    let pieceNumMoved = parseInt(BNStr.slice(2,4),16)
    let pieceNumJumped = parseInt(BNStr.slice(4,6),16)
    return {
        pieceNumMoved:pieceNumMoved,
        pieceNumJumped:pieceNumJumped,
        rowTo:getLoc(BNStr, pieceNumMoved).row,
        colTo:getLoc(BNStr, pieceNumMoved).col,
        rowFrom:oldRow,
        colFrom:oldCol,
    }
}


let decodeBN = (BN, oldRow, oldCol) => {
    let BNStr = "0x" + BN.toHexString().slice(2).padStart(64, "0")
    //bytes 5-8 converted from hex to decimal
    let turnNum = parseInt(BNStr.slice(10, 18), 16)
    let boardMatrix = BoardTranslations.BNtoMatrix(BN)
    let prevMove = calcPrevMove(BNStr, oldRow, oldCol)
    return {
        turnNum: turnNum,
        boardMatrix: boardMatrix,
        prevMove:prevMove
    }
}



export default function (state = initialState, action) {
    switch (action.type) {

        case RESET_GAME_DATA:
            return {
                ...initialState,
                gameID: action.payload
            }

        case MERGE_BLOCKCHAIN_GETGAME:
            if (BCTimestampIsHigher(action.payload, state)) {
                let nonceMoveAndMatrix = decodeBN(
                    action.payload.state, 
                    state.prevMove.rowTo,
                    state.prevMove.colTo
                )
                if (nonceIsSameOrHigher(nonceMoveAndMatrix.turnNum, state)) {
            
                    return {
                        ...state,
                        ...action.payload,
                        ...nonceMoveAndMatrix,
                        latestBCTimestamp: action.payload.latestBCTimestamp
                    }
                }
            }
            return state






        case MERGE_DATABASE_GETGAME:
            let turnNum = (action.payload.state ? action.payload.state._hex.slice(10, 18) : 0)
            // console.log(getLoc())
            //set turnNum to zero if no game data is given
            let newData = {
                ...action.payload,
                turnNum: turnNum,
                //confirm turnNum slice!
            }
            if (DBTimestampIsHigher(newData, state)) {
                if (nonceIsHigher(newData, state)) {
                    if (sigIsValid(newData)) {
                        // console.log("setting DB state")
                        return {
                            ...state,
                            ...newData,
                            blockNum: 100000000000000000000000000000,
                            //spell these items out
                        }
                    }
                }
                //return state with timestamp
            }
            return state




        // case CHANGE_GAMEID_TEXT:
        // return {
        //     ...state,
        //     gameID:action.payload,
        //     initiated:false
        //     //what if this is triggered on gameid = 12 after gameID=1's async comes back with a hit later?
        // }
        default:
            return state;
    }
}