
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import InteractBlockchain from "./reducers/InteractBlockchain";
import InteractDatabase from "./reducers/InteractDatabase";
import LoginRedux from "./reducers/LoginRedux";


const rootReducer = combineReducers({
    InteractBlockchain,
    InteractDatabase,
    LoginRedux
});

export default createStore(rootReducer, applyMiddleware(thunk));