
// import { CHANGE_GAMEID_TEXT } from "../constants/ActionTypes";
import { MERGE_BLOCKCHAIN_GETGAME } from "../constants/ActionTypes";
import { MERGE_DATABASE_GETGAME } from "../constants/ActionTypes";
import { RESET_GAME_DATA } from "../constants/ActionTypes";

import BoardTranslations from "../../Library/BoardTranslations"
// import { BigNumber } from "ethers/utils";

const initialState = {
    gameID: "",
    p1Addr: "default",
    p2Addr: "default",
    ERC20Amount: 0,
    blockNum: 0,
    VCAddr: "default",
    ERC20Addr: "default",
    turnLength: 0,

    boardBN: "",

    gameSig: {},
    moveSig: {},
    iAmP1Red: false,
    iAmP2Black: false,

    latestBCTimestamp: 0,
    latestDBTimestamp: 0,

    prevMove:{rowTo:8, colTo:8},
    boardMatrix:{},
    turnNum: 0,

    
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

export default function (state = initialState, action) {
    switch (action.type) {

        case RESET_GAME_DATA:
            return {
                ...initialState,
                gameID: action.payload
            }

        case MERGE_BLOCKCHAIN_GETGAME:
        // console.log(state.state)
            if (BCTimestampIsHigher(action.payload, state)) {
                let nonceMoveAndMatrix = BoardTranslations.decodeBN(
                    action.payload.boardBN, 
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
            return {
                ...state,
                p1Addr: action.payload.p1Addr,
                p2Addr: action.payload.p2Addr,
                ERC20Amount: action.payload.ERC20Amount,
                blockNum: action.payload.blockNum,
                VCAddr: action.payload.VCAddr,
                ERC20Addr: action.payload.ERC20Addr,
                turnLength: action.payload.turnLength,
                iAmP1Red:action.payload.iAmP1Red,
                iAmP2Black:action.payload.iAmP2Black
            }

        case MERGE_DATABASE_GETGAME:
            // console.log(getLoc())
            //set turnNum to zero if no game data is given
            let newData = {
                ...action.payload,
                //turnNum: action.payload.state ? action.payload.state._hex.slice(10, 18) : 0
                //confirm turnNum slice!
            }
            if (DBTimestampIsHigher(newData, state)) {
                if (nonceIsHigher(newData, state)) {
                    if (sigIsValid(newData)) {
                        // console.log("before",action.payload.state, state.prevMove.rowTo )
                        let nonceMoveAndMatrix = {}
                        if (action.payload.boardBN !== undefined){
                            nonceMoveAndMatrix = BoardTranslations.decodeBN(
                                action.payload.boardBN, 
                                state.prevMove.rowTo,
                                state.prevMove.colTo
                            )
                        }
                        return {
                            ...state,
                            ...nonceMoveAndMatrix,
                            ...action.payload,
                            blockNum: 100000000000000000000000000000,
                            //spell these items out
                        }
                    }
                }
            }
            return state

        default:
            return state;
    }
}