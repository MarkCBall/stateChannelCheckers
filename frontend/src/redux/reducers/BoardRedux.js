import { HANDLE_PIECE_CLICK } from "../constants/BoardRedux";
import { SET_BOARD_MATRIX } from "../constants/BoardRedux";
import { HANDLE_MOVE } from "../constants/BoardRedux";


// import { SET_ACTIVE_CHANNEL } from "../constants/LoginRedux";
// import { HANDLE_PRIVKEY_CHANGE } from "../constants/LoginRedux";
// import {HANDLE_SHOW_NEW_CHANNEL_FORM_TOGGLE} from "../constants/LoginRedux";



const initialState = {
    boardMatrix: [],
    validMovesMatrix: [],
    activeSquare: {},
    p1Turn: true
};

export default function(state = initialState, action) {
  switch (action.type) {

    case HANDLE_PIECE_CLICK:
    return {
        ...state,
        activeSquare:action.payload.activeSquare,
        validMovesMatrix:action.payload.validMovesMatrix
    }

    case SET_BOARD_MATRIX:
    return {
        ...state,
        boardMatrix:action.payload
    }

    case HANDLE_MOVE:
    return {
        ...state,
        ...action.payload
    }




    

    default:
      return state;
  }
}