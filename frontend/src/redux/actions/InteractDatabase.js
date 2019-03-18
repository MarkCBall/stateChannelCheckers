import { POST_SIGNED_MOVE } from "../constants/InteractDatabase";
// import { GET_LATEST_MOVE } from "../constants/InteractDatabase";

import {ethers} from "ethers";


export default {

    signAndPostMove: (dispatch, boardBN) => {
        




        //post to the server


        return (dispatch, getState) => {
            //sign the board from the logged in account

            //boardBN should be a BN not a string!
            console.log(getState())
            let boardHash = ethers.utils.solidityKeccak256(['uint'],[boardBN]);
            let arrayifiedBoardHash = ethers.utils.arrayify(boardHash)

            // let firstwallet = new ethers.Wallet(this.props.privateKey)
            // let flatSig = await firstwallet.signMessage(ArrayifiedHashedEncodedChannelData)//.then(console.log)
            // let sig = ethers.utils.splitSignature(flatSig);

            let turnNum = boardBN.substr(10,8)
            dispatch({
                type: POST_SIGNED_MOVE,
                payload: {
                    board: boardBN,
                    turnNum:turnNum,
                    sig: "put sig here"
                }
            })
        }
    }

    //         fetch("http://35.183.188.67:3001/Channel/pending", {
    //             method: "GET",
    //             mode: "cors", 
    //             headers: {
    //                 "address":address
    //             }
    //         }).then((response) =>{
    //             return response.json()
    //         }).then((response) => {
    //             dispatch({
    //                 type: GET_PENDING_CHANNELS,
    //                 payload: response
    //             })
    //         })
    //     }
    // },


    //getLatestMove
    //get the boardBN
    //check if the move was valid against the previous BoardBN
    //if turnNum = turnNum+1
    //CHECK VALIDITY OF THE PROPOSED MOVE
    //if double move, one must be killed
    //if +1 +1 validMoveDir ect - must be valid
    //
    //CHECK IF THE PROPOSED MOVE RESULTS IN PROPOSED BOARD STATE
    //kill pieceID as needed
    //move piece as needed







    // getPendingChannels: (dispatch, address) => {
    //     return (dispatch) => {
    //         fetch("http://35.183.188.67:3001/Channel/pending", {
    //             method: "GET",
    //             mode: "cors", 
    //             headers: {
    //                 "address":address
    //             }
    //         }).then((response) =>{
    //             return response.json()
    //         }).then((response) => {
    //             dispatch({
    //                 type: GET_PENDING_CHANNELS,
    //                 payload: response
    //             })
    //         })
    //     }
    // },
    // getRequestedChannels: (dispatch, address) => {
    //     return (dispatch) => {
    //         fetch("http://35.183.188.67:3001/Channel/requested", {
    //             method: "GET",
    //             mode: "cors", 
    //             headers: {
    //                 "address":address
    //             }
    //         }).then((response) =>{
    //             return response.json()
    //         }).then((response) => {
    //             dispatch({
    //                 type: GET_REQUESTED_CHANNELS,
    //                 payload: response
    //             })
    //         })
    //     }
    // },

    // getChannelDetails:(dispatch, CID) => {
    //     return (dispatch, getState) => {
    //         var addressSignedIn = getState().LoginRedux.addressSignedIn;
    //         fetch("http://35.183.188.67:3001/Channel/", {
    //             method: "GET",
    //             mode: "cors", 
    //             headers: {
    //                 "cid":CID
    //             }
    //         }).then((response) =>{
    //             return response.json()
    //         }).then((response) => {

    //             //if (getState.InteractDatabase.ActiveChannelDetails.ChType != "ongoing"){
    //                 //     var ChType = "";
    //                 // if (addressSignedIn === response.u1Address){
    //                 //     ChType = "proposed";
    //                 // }
    //                 // else if (addressSignedIn === response.u2Address){
    //                 //     ChType = "requested";
    //                 // }
    //             //}


    //             dispatch({
    //                 type: GET_CHANNEL_DETAILS,
    //                 payload: {
    //                     ...response,
    //                     userOneIsMe: 
    //                         (addressSignedIn === response.u1Address) ? true : false
    //                 }
    //             })
    //         })
    //     }
    // },

    // getHighestNonce: (dispatch, CID) =>{
    //     return (dispatch, getState) => {
    //         fetch("http://35.183.188.67:3001/Transaction/HighestNonce", {
    //             method: "GET",
    //             mode: "cors", 
    //             headers: {
    //                 "cid":CID
    //             }
    //         }).then((response) =>{
    //             //console.log(response)
    //             return response.json()
    //         }).then((HighestNonce) => {
    //             //console.log(HighestNonce)
    //             dispatch({
    //                 type: GET_HIGHEST_NONCE,
    //                 payload: HighestNonce
    //             })

    //             fetch("http://35.183.188.67:3001/Transaction/getTx", {
    //                 method: "GET",
    //                 mode: "cors", 
    //                 headers: {
    //                     "cid":CID,
    //                     "nonce":HighestNonce
    //                 }
    //             }).then((response) =>{
    //                 return response.json()
    //             }).then((LatestTxDetails) => {

    //                 dispatch({
    //                     type: GET_LATEST_TX,
    //                     payload: LatestTxDetails
    //                 })
    //             })
    //         })
    //     }
    // },


    // getHighestSignedNonce: (dispatch, CID) =>{
    //     return (dispatch, getState) => {
    //         fetch("http://35.183.188.67:3001/Transaction/HighestSignedNonce", {
    //             method: "GET",
    //             mode: "cors", 
    //             headers: {
    //                 "cid":CID
    //             }
    //         }).then((response) =>{
    //             return response.json()
    //         }).then((HighestSignedNonce) => {
    //             dispatch({
    //                 type: GET_HIGHEST_SIGNED_NONCE,
    //                 payload: HighestSignedNonce
    //             })

    //             fetch("http://35.183.188.67:3001/Transaction/getTx", {
    //                 method: "GET",
    //                 mode: "cors", 
    //                 headers: {
    //                     "cid":CID,
    //                     "nonce":HighestSignedNonce
    //                 }
    //             }).then((response) =>{
    //                 return response.json()
    //             }).then((LatestSignedTxDetails) => {

    //                 dispatch({
    //                     type: GET_LATEST_SIGNED_TX,
    //                     payload: LatestSignedTxDetails
    //                 })
    //             })
    //         })
    //     }
    // }


}