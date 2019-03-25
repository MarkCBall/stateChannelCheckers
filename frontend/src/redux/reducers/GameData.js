
import { CHANGE_GAMEID_TEXT } from "../constants/GameData";
import { BLOCKCHAIN_GAME_UPDATE } from "../constants/GameData";
import { DATABASE_GAME_UPDATE } from "../constants/GameData";



const initialState = {
    gameID:1
};

export default function (state = initialState, action) {
    switch (action.type) {


        case CHANGE_GAMEID_TEXT:
        return {
            ...state,
            gameID:action.payload
        }
                 //addresses p1, p2
                    //game payout
                    //state --> + Nonce?
                    //blockNum
                    //VCaddress
                    //ERC20 addr
                    //blocksPerTurn
                    // latestBCTimestamp
                    //latestDBTimestamp
    //dispatch (interact blockchain GET_BC_GAME)
            //set all but state
            //if nonce >= nonce
                //set state and blockNum
            //dispatch back to gameData

        //dispatch (interact database GET_DB_GAME)
            //if addresses are empty according to reducer
                //store data + gamesigs
            //else if nonce> nonce && movesigs valid
                //set state+ movesigs
            //dispatch back to gameData
        case BLOCKCHAIN_GAME_UPDATE:
        console.log("blockchain update w",action.payload)
        //do stuff
        return {
            ...state,
            //eh?
        }

        case DATABASE_GAME_UPDATE:
        console.log("database update w",action.payload)
        //do stuff
        return {
            ...state,
            //eh?
        }

    

        default:
            return state;
    }
}