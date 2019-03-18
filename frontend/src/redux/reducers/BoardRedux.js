import { HANDLE_PIECE_CLICK } from "../constants/BoardRedux";
import { SET_BOARD_MATRIX } from "../constants/BoardRedux";
import { HANDLE_MOVE } from "../constants/BoardRedux";
// import { NEXT_TURN } from "../constants/BoardRedux";
import { CLEAR_SELECTION } from "../constants/BoardRedux";
import { PREV_MOVE_STATS } from "../constants/BoardRedux";

const initialState = {
    boardMatrix: [],
    validMovesMatrix: [],
    activeSquare: {},
    p1Turn: true,
    prevMove: {},
    turnNum: 0
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
    case PREV_MOVE_STATS:
    return {
        ...state,
        prevMove:action.payload,
        p1Turn:!state.p1Turn,
        turnNum:state.turnNum+1
    }

    default:
      return state;
  }
}