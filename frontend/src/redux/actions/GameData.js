// import { CHANGE_ADDRESS_TEXT } from "../constants/LoginRedux";
// import { SET_ACTIVE_CHANNEL } from "../constants/LoginRedux";
// import { HANDLE_PRIVKEY_CHANGE } from "../constants/LoginRedux";
import { CHANGE_GAMEID_TEXT } from "../constants/GameData";
// import { isValidAddress } from "ethereumjs-util";

import GameData from "./GameData";
import InteractBlockchain from "./InteractBlockchain";
import InteractDatabase from "./InteractDatabase";
// import InteractBlockchain from "./InteractBlockchain";

// //what does it mean to import itself??????? whoaaaa
// import LoginRedux from "./LoginRedux";

// import { ethers } from "ethers";

export default {


    handleGameIDChange: (dispatch, gameID) => {
        return (dispatch) => {
            if ( gameID === "" || parseInt(gameID,10) === Number(gameID)){
                dispatch({
                    type: CHANGE_GAMEID_TEXT,
                    payload: gameID
                })
                dispatch(GameData.updateGameData(dispatch, gameID))
            }
        }
    },
    //track request number in case the first call comes back after later call?
    //https://medium.com/dailyjs/handling-race-conditions-with-redux-thunk-c348a7a5a839
    updateGameData: (dispatch, gameID) => {
        return (dispatch) =>{
            dispatch(InteractBlockchain.getGame(dispatch,gameID,Date.now()))
            dispatch(InteractDatabase.getGame(dispatch,gameID,Date.now()))
            console.log("updateGameData used")
        }
    },

   

}