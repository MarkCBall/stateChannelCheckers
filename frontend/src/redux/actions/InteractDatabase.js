import { POST_SIGNED_MOVE } from "../constants/InteractDatabase";
// import { GET_LATEST_MOVE } from "../constants/InteractDatabase";

import {ethers} from "ethers";

//can this be done with ethers ????????
// import { BigNumber } from "ethers/utils";

export default {

    signAndPostMove: (dispatch, boardBNStr) => {
        return async (dispatch, getState) => {
            //calculate the sig of the board state with the logged in private key
            let boardHash = ethers.utils.solidityKeccak256(['uint'],[boardBNStr]);
            let arrayifiedBoardHash = ethers.utils.arrayify(boardHash)
            let wallet = new ethers.Wallet(getState().LoginRedux.privKey)
            let flatSig = await wallet.signMessage(arrayifiedBoardHash)
            let sig = ethers.utils.splitSignature(flatSig);
            
            //post to the server
            // fetch("http://35.183.188.67:3001/Channel", {
            //     method: "POST",
            //     mode: "cors",
            //     headers: {
            //         "Content-Type": "application/json; charset=utf-8",
            //         //"cid":this.props.activeChannel,
            //     },
            //     body: JSON.stringify(body)
            // })
            // .then("success",console.log)
            // .catch("failure",console.log)


            let turnNum = boardBNStr.substr(10,8)
            dispatch({
                type: POST_SIGNED_MOVE,
                payload: {
                    board: boardBNStr,
                    turnNum:turnNum,
                    sig: sig
                }
            })
        }
    },



    getLatestMove: (dispatch) => {
        return async (dispatch,getState) => {


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


            //query the server-- temp testing data given here
            let opponentMove = {
                board:"0x0e0a00000000000480828486898b8d8f99009496a992adafb0b2b4b6b9bbbdbf",
                turnNum:"00000004",
                sig:{
                    r:"0x216d8680becd8d87c6bab9c3e2e7a07bac0ac9ffe079a531f3271b8fce1c858b",
                    recoveryParam:0,
                    s:"0x4395fdaa489b3023bfc4855385276c903b4147bffba92efdfcc4c5f579974c02",
                    v:27
                }
            }
            // ganache-cli -m "smart fun man behind sea joke split cherry force season once pair"
            let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
            let phrase = "smart fun man behind sea joke split cherry force season once pair"
            // let path = "m/44'/60'/0'/0/"
            // let secondwallet = ethers.Wallet.fromMnemonic(phrase, path + "1").connect(provider);
            let wallet = ethers.Wallet.fromMnemonic(phrase).connect(provider);

            let contractaddress = "0x59b8c37a34bc5f9ce80c71d5c6f307e698e6e20a"
            let contractabi = [{"constant":true,"inputs":[{"name":"salt","type":"uint256"}],"name":"deploy","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"salt","type":"uint256"}],"name":"Deployed","type":"event"}]
            let contract = new ethers.Contract(contractaddress,contractabi,wallet)

            contract.deploy(55).then((x) => console.log("should be false",x))

            contract.deploy(5).then((x) => console.log("should be true",x))

           



            // let contract = new ethers.Contract( addressOrName , abi , providerOrSigner )


            // let StateChannelJson = require('./build/contracts/StateChannels.json')
            // let StateChannelAbi = StateChannelJson.abi;
            // let StateChannelBytecode = StateChannelJson.bytecode
            // let ContractFactory = await new ethers.ContractFactory(StateChannelAbi, StateChannelBytecode).connect(secondwallet);
            // let deployedContract = await ContractFactory.deploy()

            // await deployedContract.CreateChannel(
            //     v1, r1, s1, CID, u1Address, u1TokenName, u2TokenName, u1InitialTokenBal, u2InitialTokenBal
            // )//.then((x) => console.log("\n\nthen", x))
            // .catch((err) => console.log("\n\ncatch", err))




            //if (ecrecover
            //console.log("signature verifies sender was ", calculatedAddress)

        
            if (opponentMove.turnNum === getState().BoardRedux.turnNum+1)
                console.log("passed turnNum +1 test")
           
            
            //helper functions
                //parsePieceNumMoved
                //parsePieceNumKilled
                //swapPiece(board, pieceID, byte, byte)
                //getPieceByID(board, pieceID) returns struct
                //isEmpty(board, row, col)
                //pieceIDIsAtLoc(board, pieceID, row, col)
                    //uses getPieceByID
                //isValidDiagonal(oldRow,newRow,oldCol,newCol)
                            //if newRow>oldRow require newRow-oldRow < 3
                            //else require oldRow - newRow < 3
                            //if newCol>oldCol require newCol-oldCol < 3
                            //else require oldCol - newCol < 3
                            //require oldRow!=newRow && oldCol!-newCol



            //let prevBoardBN = getState().InteractDatabase.signedBoards[latestMove.turnNum-1]
            
            // let pNumMoved = parsePieceNumMoved(opponentMove)
            // let pNumKilled = parsePieceNumKilled(opponentMove)

            
            // let pOld red queen oldRow,oldCol = piece = getPieceByID(prevBoardBN,pieceNumMoved)

            //require turnNum%2 != pOld.red

            //newRow,newCol = getPieceByID(latestMoveBN,pieceNumMoved)

            //require (red === (new - old < 0)) || queen

            //require isValidDiagonal(oldRow,newRow,oldCol,newCol)
                
            //require isEmpty(prevBoardBN, newRow, newCol)
    
            //if (newCol>oldCol && newCol-oldCol > 1) || (oldCol>newCol && oldCol-newCol > 1) // if double move
                //require pieceIDIsAtLoc(prevBoardBN, pieceNumKilled, (oldRow+newRow)/2, (oldCol+newCol)/2)         
                //prevBoardBN = swapPiece(prevBoardBN, pieceNumKilled, oldByte, "00") -- delete the status


            //if newRow === 0 || newRow === 7
                //prevBoardBN = swapPiece(prevBoardBN, pieceNumMoved, oldByte, newByte)   - new loc and queen
            // else 
                //prevBoardBN = swapPiece(prevBoardBN, pieceNumMoved, oldByte, newByte)   - new loc

            // require prevBoardBN % 7.9228163e+28 === opponentMove % 7.9228163e+28 //the last 24 bytes match


            //BN array[turnNum] = latestBN
            //or
            //prevBoardBN = latestBN
            
    
        }
    }
}