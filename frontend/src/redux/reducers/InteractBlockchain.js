// import { COUNTERSIGN_CHANNEL } from "../constants/InteractBlockchain";
// import { TERMINATE_CHANNEL } from "../constants/InteractBlockchain";
// import { WITHDRAW_FROM_CHANNEL } from "../constants/InteractBlockchain";
import { UPDATE_APPROVALS } from "../constants/InteractBlockchain";


const initialState = {
    p1ApprovedAmnt:0,
    p2ApprovedAmnt:0,
    enoughAllowances:false,
    p1Bal:0,
    p2Bal:0,
};

export default function (state = initialState, action) {
    switch (action.type) {



        case UPDATE_APPROVALS:
        console.log("approvals updated from", state)
            return {
                ...state,
                p1ApprovedAmnt:action.payload.p1ApprovedAmnt,
                p2ApprovedAmnt:action.payload.p2ApprovedAmnt,
                enoughAllowances:action.payload.enoughAllowances,
                p1Bal:action.payload.p1Bal,
                p2Bal:action.payload.p2Bal,
            }

        default:
            return state;
    }
}