import { CHANGE_ADDRESS_TEXT } from "../constants/LoginRedux";
import { HANDLE_PRIVKEY_CHANGE } from "../constants/LoginRedux";
import { isValidAddress } from "ethereumjs-util";

import { ethers } from "ethers";

export default {

    handleAddressChange: (dispatch, addressSignedIn) => {
        return (dispatch, getState) => {
            //set pubPrivKeypairValid according to logic
            if (/^0[xX][0-9a-fA-F]*$/.test(addressSignedIn)) {

                let privKey = getState().LoginRedux.privKey
                let pubPrivKeypairValid = (addressSignedIn === ethers.utils.computeAddress(privKey).toLowerCase())
                dispatch({
                    type: CHANGE_ADDRESS_TEXT,
                    payload: {
                        addressSignedIn: addressSignedIn,
                        addressIsValid: isValidAddress(addressSignedIn),
                        pubPrivKeypairValid: pubPrivKeypairValid
                    }
                })
            }
        }
    },


    handlePrivKeyChange: (dispatch, privKeyText) => {
        return (dispatch) => {
            if (/^0[xX][0-9a-fA-F]*$/.test(privKeyText)) {
                //change the private key text
                dispatch({
                    type: HANDLE_PRIVKEY_CHANGE,
                    payload: {
                        privKey: privKeyText,
                        pubPrivKeypairValid: false
                    }
                })
                if (privKeyText.length === 66) {
                    let correspondingPubAddress = ethers.utils.computeAddress(privKeyText).toLowerCase()
                    dispatch({
                        type: CHANGE_ADDRESS_TEXT,
                        payload: {
                            addressSignedIn: correspondingPubAddress,
                            addressIsValid: true,
                            pubPrivKeypairValid: true
                        }
                    })
                    //reset the text indicating the key matches
                    dispatch({
                        type: HANDLE_PRIVKEY_CHANGE,
                        payload: {
                            privKey: privKeyText,
                            pubPrivKeypairValid: true
                        }
                    })
                } 

            }
        }
    },


}