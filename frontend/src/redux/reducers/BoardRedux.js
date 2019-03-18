import { HANDLE_PIECE_CLICK } from "../constants/BoardRedux";
import { SET_BOARD_MATRIX } from "../constants/BoardRedux";
import { HANDLE_MOVE } from "../constants/BoardRedux";
import { NEXT_TURN } from "../constants/BoardRedux";
import { CLEAR_SELECTION } from "../constants/BoardRedux";
import { REMEMBER_PREV_MOVE } from "../constants/BoardRedux";






// import { SET_ACTIVE_CHANNEL } from "../constants/LoginRedux";
// import { HANDLE_PRIVKEY_CHANGE } from "../constants/LoginRedux";
// import {HANDLE_SHOW_NEW_CHANNEL_FORM_TOGGLE} from "../constants/LoginRedux";



const initialState = {
    boardMatrix: [],
    validMovesMatrix: [],
    activeSquare: {},
    p1Turn: true,
    prevMove:{}
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
    case HANDLE_MOVE:
    return {
        ...state,
        boardMatrix:action.payload
    }
    case CLEAR_SELECTION:
    return {
        ...state,
        validMovesMatrix:action.payload.validMovesMatrix,
        activeSquare:action.payload.activeSquare
    }
    case REMEMBER_PREV_MOVE:
    return {
        ...state,
        prevMove:action.payload
    }


    case NEXT_TURN:
    return {
        ...state,
        p1Turn:!state.p1Turn
    }

    

    

    default:
      return state;
  }
}