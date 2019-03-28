import { CHANGE_ADDRESS_TEXT } from "../constants/ActionTypes";
// import { SET_ACTIVE_CHANNEL } from "../constants/ActionTypes";
import { HANDLE_PRIVKEY_CHANGE } from "../constants/ActionTypes";
// import { CHANGE_GAMEID_TEXT } from "../constants/ActionTypes";



const initialState = {
    addressSignedIn: "0x04d05a4923af4569792cffa8024061a0340a3923",//default must start with 0x
    addressIsValid: false,
    //   activeChannel:-1,
    privKey: "0x5ee6962f33f137e7847c8a2852ed18e5a67159f23b0931baf16a95a009ad3901",
    pubPrivKeypairValid: true,
    //   showNewChannelForm: false
    gameID:1
};

export default function (state = initialState, action) {
    switch (action.type) {

        case CHANGE_ADDRESS_TEXT:
            return {
                ...state,// ...action.payload
                addressSignedIn: action.payload.addressSignedIn,
                addressIsValid: action.payload.addressIsValid,
                pubPrivKeypairValid: action.payload.pubPrivKeypairValid
            }

        case HANDLE_PRIVKEY_CHANGE:
            return {
                ...state,
                privKey: action.payload.privKey,
                pubPrivKeypairValid: action.payload.pubPrivKeypairValid
            }

        // case HANDLE_SHOW_NEW_CHANNEL_FORM_TOGGLE:
        // return {
        //     ...state,
        //     showNewChannelForm:action.payload
        // }

        default:
            return state;
    }
}