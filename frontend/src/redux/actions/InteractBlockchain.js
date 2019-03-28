import {ethers} from "ethers";
import { MERGE_BLOCKCHAIN_GETGAME } from "../constants/ActionTypes";

import { provider } from "../constants/Other";
import { StateChGamingAddr } from "../constants/Other";
import { StateChGamingAbi } from "../constants/Other";
import { StateChGamingContract } from "../constants/Other";

export default {
                 
    getGame: (dispatch, gameID, timestamp) => {
        return async (dispatch,getState) => {
            let game = await StateChGamingContract.allGames(gameID)
            let gameData

            // if the game is initialized
            if(game.state.toString().length!==1){
                gameData = {
                    p1Addr:game.p1.toLowerCase(),
                    p2Addr:game.p2.toLowerCase(),
                    ERC20Amount:game.gamePayout.toString(),
                    state:game.state.toString(),
                    turnNum: game.state.toHexString().substring(2).padStart(64,"0").slice(8,16), 
                    blockNum:game.blockNum.toString(),
                    VCAddr:game.vcAddr,
                    ERC20Addr:game.tokenAddr,
                    turnLength:game.blocksPerTurn.toString(),
                    latestBCTimestamp:timestamp,
                    iAmP1Red:(getState().LoginRedux.addressSignedIn === game.p1.toLowerCase()),
                    iAmP2Black:(getState().LoginRedux.addressSignedIn === game.p2.toLowerCase())
                }
                dispatch({
                    type: MERGE_BLOCKCHAIN_GETGAME,
                    payload: gameData
                })
            } 
        }
    },
    initGame: () =>{
        return async (dispatch,getState) => {
            let activeWallet = new ethers.Wallet(getState().LoginRedux.privKey).connect(provider)
            let callableContract = new ethers.Contract(StateChGamingAddr,StateChGamingAbi, activeWallet)
            let GD = getState().GameData
            console.log( GD.ERC20Amount,
                GD.ERC20Addr,
                GD.gameID,
                GD.p1Addr,
                GD.p2Addr,
                GD.VCAddr,
                GD.turnLength,
                GD.gameSig.v,
                GD.gameSig.r,
                GD.gameSig.s)
                //is the amount too high - thats why failing?





            await callableContract.initGame(
                GD.ERC20Amount,
                GD.ERC20Addr,
                GD.gameID,
                GD.p1Addr,
                GD.p2Addr,
                GD.VCAddr,
                GD.turnLength,
                GD.gameSig.v,
                GD.gameSig.r,
                GD.gameSig.s
            )
            

            //unconnect wallet?

            //dispatch a state update to re-render
        }
        
    },








    //         //get wallets --> do this through metamask later?
            

    //         //can StateChGamingContract be done out of function and connect be done inside?

    //         //get a contract --> change this to existing contract later
    //         // let ContractFactory = await new ethers.ContractFactory(StateChannelAbi, StateChannelBytecode).connect(activeWallet);
    //         // let StateChGamingContract = await ContractFactory.deploy()
    //         let StateChGamingAddr = CONTRACT_ADDRESS
            
    //         //console.log("deployed contract is ", StateChGamingContract)





    //         //create the channel

    //             var ACD = getState().InteractDatabase.ActiveChannelDetails;
    //             //ACD : Active Channel Detail
    //             //console.log(getState())

    //             let CID = getState().LoginRedux.activeChannel.channel//83;
    //             //CID FROM ACD


    //             let u1Address = ACD.u1Address//activeWallet.signingKey.address //address
    //             //let u2Address = ACD.u2Address//secondwallet.signingKey.address
    //             let u1TokenName = ACD.u1TokenName//"Marks" //string memory
    //             let u2TokenName = ACD.u2TokenName //"Matts" //string memory
    //             let u1InitialTokenBal = ACD.u1InitialTokenBal //50 //uint
    //             let u2InitialTokenBal = ACD.u2InitialTokenBal //30 //uint
    //             let v1 = ACD.u1Sig.v
    //             let r1 = ACD.u1Sig.r
    //             let s1 = ACD.u1Sig.s
                
                
                

    //             //console.log(u1Address)
    //             //console.log(activeWallet.signingKey.address)
    //             //console.log(ACD)
    //             //console.log("StateChGamingContract ")



    //             


    //             //remove requested and proposed from database

    //     }

    // },


    // initChannelTermination: (dispatch) => {
    //     return async (dispatch, getState) => {
            
    //         let activeWallet = new ethers.Wallet(getState().LoginRedux.privKey).connect(provider)
    //         let StateChGamingAddr = CONTRACT_ADDRESS
    //         let StateChGamingContract = new ethers.Contract(StateChGamingAddr,StateChannelAbi,provider).connect(activeWallet);
                
    //         var DBData = getState().InteractDatabase;
    //         console.log(getState())
    //         let CID = getState().LoginRedux.activeChannel.channel
    //         let propTermBlockNum = 6147964 + (4*60*24)// query blockchain for this data later
    //         let u1Bal = DBData.LatestSignedTxDetails.u1Bal 
    //         let u2Bal = DBData.LatestSignedTxDetails.u2Bal
    //         let nonce = DBData.HighestSignedNonce

    //             // let u1Address = ACD.u1Address//activeWallet.signingKey.address //address
    //             // //let u2Address = ACD.u2Address//secondwallet.signingKey.address
    //             // let u1TokenName = ACD.u1TokenName//"Marks" //string memory
    //             // let u2TokenName = ACD.u2TokenName //"Matts" //string memory
    //             // let u1InitialTokenBal = ACD.u1InitialTokenBal //50 //uint
    //             // let u2InitialTokenBal = ACD.u2InitialTokenBal //30 //uint
            
    //             let v
    //             let r
    //             let s


    //             if (DBData.ActiveChannelDetails.userOneIsMe){
    //                 v = DBData.LatestSignedTxDetails.sig2.v
    //                 r = DBData.LatestSignedTxDetails.sig2.r
    //                 s = DBData.LatestSignedTxDetails.sig2.s
    //             }else{
    //                 v = DBData.LatestSignedTxDetails.sig1.v
    //                 r = DBData.LatestSignedTxDetails.sig1.r
    //                 s = DBData.LatestSignedTxDetails.sig1.s
    //             }
                
                
    //             console.log("inputs are", v, r, s, CID, propTermBlockNum, u1Bal, u2Bal, nonce)
                
    //             //function InitChannelTermination(uint8 v, bytes32 r, bytes32 s, uint CID, uint proposedTerminatingBlockNumber, uint u1BalRetained, uint u2BalRetained, uint nonce) public{

    //             StateChGamingContract.InitChannelTermination(
    //                 v, r, s, CID, propTermBlockNum, u1Bal, u2Bal, nonce
    //             ).then((x) => console.log("\n\nthen", x))
    //             .catch((err) => console.log("\n\ncatch", err))

    //     }
    // },



    // getOngoingChannels: (dispatch, address) => {
    //     return async (dispatch) => {

    //         //move this outside function?
    //         let StateChGamingAddr = CONTRACT_ADDRESS
    //         let StateChGamingContract = new ethers.Contract(StateChGamingAddr,StateChannelAbi,provider);
    //         //console.log("deployed contract is ", StateChGamingContract)


    //         let OngoingChannels = {}
    //         StateChGamingContract.GetChannelsAtAddress(address)
    //         .then((BN) => {
    //             //console.log("\n\nthen", x)
    //             BN.forEach(  val => {
    //                 OngoingChannels = {
    //                     ...OngoingChannels,
    //                     [val.toString(10)]:val.toString(10)
    //                 }  
    //             })
    //             dispatch({
    //                     type: ONGOING_CHANNELS,
    //                     payload: OngoingChannels
    //                 })
                
    //         })
    //         .catch((err) => console.log("\n\ncatch", err))
        
            

            

    //         // fetch("http://localhost:3001/Channel/pending", {
    //         //     method: "GET",
    //         //     mode: "cors", 
    //         //     headers: {
    //         //         "address":address
    //         //     }
    //         // }).then((response) =>{
    //         //     return response.json()
    //         // }).then((response) => {
    //         //     
    //         // })
    //     }
    // },

}