// import { POST_SIGNED_MOVE } from "../constants/InteractDatabase";
// import { GET_LATEST_MOVE } from "../constants/InteractDatabase";
import { DATABASE_GAME_UPDATE } from "../constants/GameData";
import { ethers } from "ethers";

//can this be done with ethers ????????
// import { BigNumber } from "ethers/utils";

export default {


    signAndSubmitGame: (dispatch, ERC20Amount, ERC20Addr, gameID, p1Addr, p2Addr, VCAddr, turnLength) => {
        return async (dispatch, getState) => {
            //calculate the signature
            let sigTypes = ['uint', 'address', 'uint', 'address', 'address', 'address', 'uint']
            let sigValues = [ERC20Amount, ERC20Addr, gameID, p1Addr, p2Addr, VCAddr, turnLength]
            let gameHash = ethers.utils.solidityKeccak256(sigTypes, sigValues);
            let arrayifiedGameHash = ethers.utils.arrayify(gameHash)
            let wallet = new ethers.Wallet(getState().LoginRedux.privKey)
            let flatSig = await wallet.signMessage(arrayifiedGameHash)
            let sig = ethers.utils.splitSignature(flatSig);
            //post the data and sig to the database
            let body = {
                ERC20Amount: ERC20Amount,
                ERC20Addr: ERC20Addr,
                p1Addr: p1Addr,
                p2Addr: p2Addr,
                VCAddr: VCAddr,
                turnLength: turnLength,
                gameSig:{
                    ...sig
                }
            }
            console.log("posting ", body)
            await fetch("http://127.0.0.1:3001/Game/New", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "gameID":gameID,
                },
                body: JSON.stringify(body)
            })

            // dispatch something to indicate waiting for signature
            //set a timestamp to 1 maybe as long as there is a query every five seconds to get new game data


            // console.log(body)

            // console.log("parameters are", [ERC20Amount, ERC20Addr,gameID, p1Addr, p2Addr, VCAddr, turnLength])
            // console.log("DB sign game called",sig)
        }
    },

    getGame: (dispatch, gameID, timestamp) => {
        return async (dispatch, getState) => {

            let response = await fetch("http://127.0.0.1:3001/Game", {
                method: "GET",
                mode: "cors",
                headers: {
                    "gameID": gameID
                }
            })
            let resJSON = await response.json()
            //if there is a valid response, add a timestamp and dispatch it
            if (Object.keys(resJSON).length !== 0){
                resJSON = {
                    ...resJSON,
                    latestDBTimestamp: timestamp,
                    iAmP1Red:(getState().LoginRedux.addressSignedIn === resJSON.p1Addr),
                    iAmP2Black:(getState().LoginRedux.addressSignedIn === resJSON.p2Addr)   
                }
                console.log("DB reponse:",resJSON)
                dispatch({
                    type: DATABASE_GAME_UPDATE,
                    payload: resJSON
                })
            }
            
        }
    },



    // signAndPostMove: (dispatch, boardBNStr) => {
    //     return async (dispatch, getState) => {

    //         let boardHash = ethers.utils.solidityKeccak256(['uint'], [boardBNStr]);// get gameID too!
    //         let arrayifiedBoardHash = ethers.utils.arrayify(boardHash)
    //         let wallet = new ethers.Wallet(getState().LoginRedux.privKey)
    //         let flatSig = await wallet.signMessage(arrayifiedBoardHash)
    //         let sig = ethers.utils.splitSignature(flatSig);


    //         let turnNum = boardBNStr.substr(10, 8)
    //         dispatch({
    //             type: POST_SIGNED_MOVE,
    //             payload: {
    //                 board: boardBNStr,
    //                 turnNum: turnNum,
    //                 sig: sig
    //             }
    //         })
    //     }
    // },

}

