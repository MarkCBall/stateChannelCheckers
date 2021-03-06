// import { COUNTERSIGN_CHANNEL } from "../constants/ActionTypes";
// import { TERMINATE_CHANNEL } from "../constants/ActionTypes";
// import { WITHDRAW_FROM_CHANNEL } from "../constants/ActionTypes";
import { UPDATE_APPROVALS } from "../constants/ActionTypes";
import { SET_MOVETYPE_DB } from "../constants/ActionTypes";
import { SET_MOVETYPE_BCINIT } from "../constants/ActionTypes";
import { SET_MOVETYPE_BCENFORCED } from "../constants/ActionTypes";
import { SET_MOVETYPE_BCUNENFORCED } from "../constants/ActionTypes";


const initialState = {
    p1ApprovedAmnt:0,
    p2ApprovedAmnt:0,
    enoughAllowances:false,
    p1Bal:0,
    p2Bal:0,
    moveType: SET_MOVETYPE_DB,
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SET_MOVETYPE_DB:
            return {
                ...state,
                moveType: SET_MOVETYPE_DB,
            }
        case SET_MOVETYPE_BCINIT:
            return {
                ...state,
                moveType: SET_MOVETYPE_BCINIT,
            }
        case SET_MOVETYPE_BCENFORCED:
            return {
                ...state,
                moveType: SET_MOVETYPE_BCENFORCED,
            }

        case SET_MOVETYPE_BCUNENFORCED:
            return {
                ...state,
                moveType: SET_MOVETYPE_BCUNENFORCED,
            }


        case UPDATE_APPROVALS:
        // console.log("approvals updated from", state)
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