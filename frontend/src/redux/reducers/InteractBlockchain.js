// import { COUNTERSIGN_CHANNEL } from "../constants/InteractBlockchain";
// import { TERMINATE_CHANNEL } from "../constants/InteractBlockchain";
// import { WITHDRAW_FROM_CHANNEL } from "../constants/InteractBlockchain";
import { UPDATE_APPROVALS } from "../constants/InteractBlockchain";


const initialState = {
    p1ApprovedAmnt:0,
    p2ApprovedAmnt:0,
    p1ApprovedEnough:false,
    p2ApprovedEnough:false,
};

export default function (state = initialState, action) {
    switch (action.type) {



        case UPDATE_APPROVALS:
        console.log("approvals updated from", state)
            return {
                ...state,
                p1ApprovedAmnt:action.payload.p1ApprovedAmnt,
                p2ApprovedAmnt:action.payload.p2ApprovedAmnt,
                p1ApprovedEnough:action.payload.p1ApprovedEnough,
                p2ApprovedEnough:action.payload.p2ApprovedEnough,
            }

        default:
            return state;
    }
}