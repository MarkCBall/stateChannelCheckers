import { POST_SIGNED_MOVE } from "../constants/InteractDatabase";
// import { GET_LATEST_MOVE } from "../constants/InteractDatabase";




const initialState = {
    signedBoards: {},
    highestTurn:0
    //boardsHistory: {}
};

export default function (state = initialState, action) {
    switch (action.type) {

        case POST_SIGNED_MOVE:
        let signedBoard = action.payload
        let turnNum = signedBoard.turnNum
        console.log(signedBoard)
            return { 
            ...state, 
            signedBoards: {
                ...state.signedBoards,
                [turnNum]:signedBoard
            },
            highestTurn:state.highestTurn+1 
        }      

        default:
            return state;
    }
}