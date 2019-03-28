
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import TempUserInputs from "./reducers/TempUserInputs";
import LoginDetails from "./reducers/LoginDetails";
import BoardRedux from "./reducers/BoardRedux";
import GameData from "./reducers/GameData";


const rootReducer = combineReducers({
    TempUserInputs,
    LoginDetails,
    BoardRedux,
    GameData
});

export default createStore(rootReducer, applyMiddleware(thunk));