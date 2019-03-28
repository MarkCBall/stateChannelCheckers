
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import InteractBlockchain from "./reducers/InteractBlockchain";
// import InteractDatabase from "./reducers/InteractDatabase";
import LoginRedux from "./reducers/LoginRedux";
import BoardRedux from "./reducers/BoardRedux";
import GameData from "./reducers/GameData";


const rootReducer = combineReducers({
    InteractBlockchain,
    // InteractDatabase,
    LoginRedux,
    BoardRedux,
    GameData
});

export default createStore(rootReducer, applyMiddleware(thunk));