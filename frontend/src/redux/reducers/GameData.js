
import { CHANGE_GAMEID_TEXT } from "../constants/GameData";
import { BLOCKCHAIN_GAME_UPDATE } from "../constants/GameData";
import { DATABASE_GAME_UPDATE } from "../constants/GameData";



const initialState = {
    initiated:false,
    gameID:1,
    addr1:"default 0xa1",
    addr2:"default 0xa2",
    payout:200,
    state:"default0x0000000000080828486",
    turnNum: 2,//get from state
    blockNum:6376,
    VCAddr:"default 0x123456",
    ERC20Addr:"default 0x654321",
    blocksPerTurn:100,
    latestBCTimestamp:0,
    latestDBTimestamp:0,
    gameSig:{},
    moveSig:{},        
    userColor:"NA"
};


let BCActionIsValid = (data) => {
    //nonce = fn(state)
    //if timestamp
    //if nonce >=
    return true//debugging temp forced output
}

// let invalidStatechange = (defaultState, oldState, newState) => {
//     return ((newState !== oldState) && (defaultState !== oldState))
// }

let DBActionIsValid = (data, currentState) => {
    //check that the data given doesn't override any BC given data - (put this at bottom of checks)
    //if invalidStatechange(initialState.addr1, currentState.addr1, data.addr1) ||
     //  invalidStatechange(addr2, ect ect)
        // return false

    //if !isDefaultOrUnchanged(action.payload.addr1,  !=default & payload.addr1!=state.addr1

    //nonce = fn(state)
        //if nonce>1, then the sig is for a move

    //check sig for newmove or sig for newgame
        // opponentAddr = 
    //if timestamp

    //if moveSig is valid
    //if nonce >
}

export default function (state = initialState, action) {
    switch (action.type) {
        case BLOCKCHAIN_GAME_UPDATE:
        console.log("blockchain update w",action.payload)
        if (BCActionIsValid(action.payload, state)){
            return {
                ...state,
                ...action.payload,
                initiated:true,
            }
        }
        return {
            ...state,
            //overwrite data as bc is always correct
            addr1:"0xa1",
            addr2:"0xa2",
            payout:200,
            VCAddr:"0x123456",
            ERC20Addr:"0x654321",
            blocksPerTurn:100,
            initiated:true
        }
            

        case DATABASE_GAME_UPDATE:
        console.log("database update w",action.payload)
        //do stuff
        if (DBActionIsValid(action.payload)){
            return {
                ...state,
                ...action.payload,
                initiated:true
            }
        }
        return state



        case CHANGE_GAMEID_TEXT:
        return {
            ...state,
            gameID:action.payload,
            initiated:false
            //what if this is triggered on gameid = 12 after gameID=1's async comes back with a hit later?
        }
        default:
            return state;
    }
}