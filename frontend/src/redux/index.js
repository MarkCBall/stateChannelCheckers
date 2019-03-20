
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import InteractBlockchain from "./reducers/InteractBlockchain";
import InteractDatabase from "./reducers/InteractDatabase";
import LoginRedux from "./reducers/LoginRedux";
import BoardRedux from "./reducers/BoardRedux";


const rootReducer = combineReducers({
    InteractBlockchain,
    InteractDatabase,
    LoginRedux,
    BoardRedux
});

export default createStore(rootReducer, applyMiddleware(thunk));