import { HANDLE_PIECE_CLICK } from "../constants/ActionTypes";
// import { SET_BOARD_MATRIX } from "../constants/ActionTypes";
// import { HANDLE_MOVE } from "../constants/ActionTypes";
// import { NEXT_TURN } from "../constants/ActionTypes";
import { CLEAR_SELECTION } from "../constants/ActionTypes";
// import { PREV_MOVE_STATS } from "../constants/ActionTypes";
// import BoardTranslations from "../../Library/BoardTranslations"

const initialState = {
    // boardMatrix: [],
    validMovesMatrix: [],
    activeSquare: {},
    // p1Turn: true,
    // prevMove: {pieceNumMoved:0,pieceNumJumped:0},
    // turnNum: 0,
    // boardMatricies: {0:"0x000000000000000080828486898b8d8f90929496a9abadafb0b2b4b6b9bbbdbf"}
};

export default function(state = initialState, action) {
  switch (action.type) {

    case HANDLE_PIECE_CLICK:
    return {
        ...state,
        activeSquare:action.payload.activeSquare,
        validMovesMatrix:action.payload.validMovesMatrix
    }

    // case SET_BOARD_MATRIX:
    // return {
    //     ...state,
    //     boardMatrix:action.payload
    // }

    // case HANDLE_MOVE:
    // return {
    //     ...state,
    //     boardMatrix:action.payload,
    //     boardMatricies:{
    //         ...state.boardMatricies,
    //         [state.turnNum]:BoardTranslations.MatrixAndMoveToBNStr(action.payload,state.prevMove,state.turnNum)
    //     }
    // }
    case CLEAR_SELECTION:
    return {
        ...state,
        validMovesMatrix:action.payload.validMovesMatrix,
        activeSquare:action.payload.activeSquare
    }
    // case PREV_MOVE_STATS:
    // return {
    //     ...state,
    //     prevMove:action.payload,
    //     p1Turn:!state.p1Turn,
    //     turnNum:state.turnNum+1
    // }

    default:
      return state;
  }
}