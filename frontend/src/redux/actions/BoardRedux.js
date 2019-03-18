import { HANDLE_PIECE_CLICK } from "../constants/BoardRedux";
import { SET_BOARD_MATRIX } from "../constants/BoardRedux";
import ValidMoves from "../../Library/ValidMoves"
import BoardTranslations from "../../Library/BoardTranslations"
import { HANDLE_MOVE } from "../constants/BoardRedux";

// import { CHANGE_ADDRESS_TEXT } from "../constants/LoginRedux";
// import { SET_ACTIVE_CHANNEL } from "../constants/LoginRedux";
// import { HANDLE_PRIVKEY_CHANGE } from "../constants/LoginRedux";
// import {HANDLE_SHOW_NEW_CHANNEL_FORM_TOGGLE} from "../constants/LoginRedux";
// import {isValidAddress} from "ethereumjs-util";

// import InteractDatabase from "./InteractDatabase";
// import InteractBlockchain from "./InteractBlockchain";

// //what does it mean to import itself??????? whoaaaa
// import LoginRedux from "./LoginRedux";

// import {ethers} from "ethers";





export default {
    handlePieceClick: (dispatch, boardMatrix, piece) => {
        return (dispatch) =>{
            //if (piece.red === this.state.p1Turn){
                dispatch({
                    type: HANDLE_PIECE_CLICK,
                        payload: {
                            activeSquare:{row:piece.row, col:piece.col},
                            validMovesMatrix:ValidMoves.getValidMoves(boardMatrix, piece)
                        }
                })
            //}
        }
    },
    setBoardMatrix:(dispatch, piecesBN) => {
        return (dispatch) =>{
                dispatch({
                    type: SET_BOARD_MATRIX,
                    payload: BoardTranslations.BNtoMatrix(piecesBN)
                })
        }
    },
    handleMove:(dispatch, board,validSpot,activeSquare) => {
        return (dispatch) =>{
            let boardMatrix = board;
            let dataToUpdate = {row:validSpot.row, col:validSpot.col}
            //if you get to the end of the board, make the piece a queen
            if (validSpot.row === 7 || validSpot.row === 0){
                dataToUpdate = {...dataToUpdate, queen:true}
            }
            //if you moved two squares, it was an attack - kill the jumped piece
            if (Math.abs(validSpot.row - activeSquare.row)>1){
                let killedRow = (validSpot.row + activeSquare.row)/2
                let killedCol = (validSpot.col + activeSquare.col)/2
                boardMatrix[killedRow][killedCol] = {active:0, row:killedRow, col:killedCol}
            }
            //copy the old piece into the new location
            boardMatrix[validSpot.row][validSpot.col] = {
                ...boardMatrix[activeSquare.row][activeSquare.col],
                ...dataToUpdate
            }
            //delete the old piece from the old location
            boardMatrix[activeSquare.row][activeSquare.col] = {active:0, row:activeSquare.row, col:activeSquare.col}


       



            dispatch({
                type: HANDLE_MOVE,
                payload: {
                    boardMatrix:boardMatrix,
                    validMovesMatrix: ValidMoves.createEmptyValidMovesMatrix(),
                    activeSquare: {},
                    p1Turn: true//!this.state.p1Turn
                }
            })

                //dispatch      this.calcBNState(this.props.boardMatrix)
        }
    }



    // renderChButtons: (dispatch, addressSignedIn) => {
    //     return (dispatch) => {
    //         dispatch(InteractDatabase.getPendingChannels(dispatch, addressSignedIn))
    //         dispatch(InteractDatabase.getRequestedChannels(dispatch, addressSignedIn))
    //         dispatch(InteractBlockchain.getOngoingChannels(dispatch, addressSignedIn))
    //     }
    // },

    // handleAddressChange: (dispatch,addressSignedIn) => {
    //     //clean up redundant returns?
    //     return (dispatch, getState) =>{
    //         //set pubPrivKeypairValid according to logic
    //         if (/^0[xX][0-9a-fA-F]*$/.test(addressSignedIn)){

    //             //if isValid address && addressSignedIn===ethers.utils....
    //                 //dispatch with true 

    //             let privKey = getState().LoginRedux.privKey
    //             let pubPrivKeypairValid = (addressSignedIn ===ethers.utils.computeAddress(privKey).toLowerCase())
    //             dispatch({
    //                 type: CHANGE_ADDRESS_TEXT,
    //                 payload: {
    //                     addressSignedIn:addressSignedIn,
    //                     addressIsValid: isValidAddress(addressSignedIn),
    //                     pubPrivKeypairValid: pubPrivKeypairValid
    //                 }
    //             })
    //             // if (isValidAddress(addressSignedIn)){
    //             //     dispatch(LoginRedux.renderChButtons(dispatch, addressSignedIn))
    //             // }
    //         }
    //         // dispatch({
    //         //     type: SET_ACTIVE_CHANNEL,
    //         //     payload: {channel:0}})
    //     }
    // },
    // // setActiveChannel:(dispatch,channel, isOngoing) => {
    // //     return (dispatch) =>{
    // //         dispatch({
    // //             type: SET_ACTIVE_CHANNEL,
    // //             payload: {
    // //                 channel:channel,
    // //                 isOngoing:isOngoing
    // //             }
    // //         })
    // //     }
    // // },
    
    // handlePrivKeyChange:(dispatch,privKeyText) => {
    //     return (dispatch) =>{

    //         //why doesn't it work do do the else clause always and let the change_address_text over-ride the pubPrivKeypairValid?
            
    //         //change address text should dispatch get pending channels ect

    //         if (privKeyText.length===66){ //better validation to be done?
    //             let correspondingPubAddress = ethers.utils.computeAddress(privKeyText).toLowerCase()
    //             dispatch({
    //                 type: CHANGE_ADDRESS_TEXT,
    //                 payload: {
    //                     addressSignedIn:correspondingPubAddress,
    //                     addressIsValid: true,
    //                     pubPrivKeypairValid: true
    //                 }
    //             })
    //             //dispatch(LoginRedux.renderChButtons(dispatch, correspondingPubAddress))
               
    //             dispatch({
    //                 type: HANDLE_PRIVKEY_CHANGE,
    //                 payload: {
    //                     privKey:privKeyText,
    //                     pubPrivKeypairValid: true
    //                 } 
    //             })
    //         }else{
    //             dispatch({
    //                 type: HANDLE_PRIVKEY_CHANGE,
    //                 payload: {
    //                     privKey:privKeyText,
    //                     pubPrivKeypairValid: false
    //                 } 
    //             })
    //         }
    //         // dispatch({type: SET_ACTIVE_CHANNEL,payload: {channel:0}})
    //     }
    // },

    // // handleTogglePNC:(dispatch, showNewChannelForm ) => { //meaning: handleTogglePrroposeNewChannel
    // //     return (dispatch) => {
           
    // //         dispatch({
    // //             type: HANDLE_SHOW_NEW_CHANNEL_FORM_TOGGLE,
    // //             payload: {
    // //                 showNewChannelForm: !showNewChannelForm

    //             }
    //         })
    //     }
    // }

}