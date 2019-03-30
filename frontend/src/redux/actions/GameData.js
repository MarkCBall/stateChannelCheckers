// import { CHANGE_GAMEID_TEXT } from "../constants/ActionTypes";
import { RESET_GAME_DATA } from "../constants/ActionTypes";

import GameData from "./GameData";
import API_StateChGaming from "./API_StateChGaming";
import API_Database from "./API_Database";


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
                dispatch(GameData.updateGameData(dispatch, gameID,Date.now()))
            }
        }
    },
    updateGameData: (dispatch, gameID,timestamp) => {
        return (dispatch) =>{
            dispatch(API_StateChGaming.getGame(dispatch,gameID,timestamp))
            dispatch(API_Database.getGame(dispatch,gameID,timestamp))
        }
    },
}