import { POST_SIGNED_MOVE } from "../constants/InteractDatabase";
import { GET_LATEST_MOVE } from "../constants/InteractDatabase";




const initialState = {



};

export default function (state = initialState, action) {
    switch (action.type) {

        // case GET_PENDING_CHANNELS:
        //     return { ...state, PendingChannels: action.payload }      

        default:
            return state;
    }
}