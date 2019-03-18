import { POST_SIGNED_MOVE } from "../constants/InteractDatabase";
// import { GET_LATEST_MOVE } from "../constants/InteractDatabase";




const initialState = {
    signedBoards: {}
    //boardsHistory: {}
};

export default function (state = initialState, action) {
    switch (action.type) {

        case POST_SIGNED_MOVE:
        let signedBoard = action.payload
        console.log(signedBoard)
        // newBoardsArray.push(action.payload)
            return { 
            ...state, 
            signedBoards: {
                ...state.signedBoards,
                [signedBoard.turnNum]:signedBoard
            } 
        }      

        default:
            return state;
    }
}