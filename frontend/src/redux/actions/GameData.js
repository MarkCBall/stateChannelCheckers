// import { CHANGE_GAMEID_TEXT } from "../constants/GameData";
import { RESET_GAME_DATA } from "../constants/GameData";

import GameData from "./GameData";
import InteractBlockchain from "./InteractBlockchain";
import InteractDatabase from "./InteractDatabase";


export default {


    handleGameIDChange: (dispatch, gameID) => {
        return (dispatch) => {
            if ( gameID === "" || parseInt(gameID,10) === Number(gameID)){
                // dispatch({
                //     type: CHANGE_GAMEID_TEXT,
                //     payload: gameID
                // })
                dispatch({
                    type: RESET_GAME_DATA,
                    payload: gameID
                })
                dispatch(GameData.updateGameData(dispatch, gameID))
            }
        }
    },
    updateGameData: (dispatch, gameID) => {
        return (dispatch) =>{
            dispatch(InteractBlockchain.getGame(dispatch,gameID,Date.now()))
            dispatch(InteractDatabase.getGame(dispatch,gameID,Date.now()))
            // console.log("updateGameData used")
        }
    },

   

}