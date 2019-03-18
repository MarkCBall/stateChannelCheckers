import { HANDLE_PIECE_CLICK } from "../constants/BoardRedux";
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
        ...action.payload
    }

    default:
      return state;
  }
}