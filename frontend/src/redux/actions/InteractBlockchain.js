import {ethers} from "ethers";
import { BLOCKCHAIN_GAME_UPDATE } from "../constants/GameData";

let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
// let provider = ethers.getDefaultProvider('ropsten');

//get contract info
let StateChGamingJson = require('../../SolidityJSON/StateChGaming.json')
let StateChGamingAbi = StateChGamingJson.abi;
// let deployedaddress = "0x15bb365BB9b6478c3234181FA6051354EaA3CB0C"
let StateChGamingBytecode = StateChGamingJson.bytecode
// let activeWallet = new ethers.Wallet(getState().LoginRedux.privKey).connect(provider)
let activeWallet = new ethers.Wallet("0x5ee6962f33f137e7847c8a2852ed18e5a67159f23b0931baf16a95a009ad3901").connect(provider)
let deployedContract
(async ()=>{
    let ContractFactory = await new ethers.ContractFactory(StateChGamingAbi, StateChGamingBytecode).connect(activeWallet);
    deployedContract = await ContractFactory.deploy()
})()



export default {
                 
    getGame: (dispatch, gameID, timestamp) => {
        return async (dispatch,getState) => {
            let game = await deployedContract.allGames(1)
            let gameData
            // console.log(game)
            // if the game is initialized
            if(game.state.toString().length!==1){
                gameData = {
                    addr1:game.p1,
                    addr2:game.p2,
                    payout:game.gamePayout.toString(),
                    state:game.state.toString(),
                    turnNum: 2,///game.state.toString().slice... 
                    blockNum:game.blockNum.toString(),
                    VCAddr:game.vcAddr,
                    ERC20Addr:game.tokenAddr,
                    blocksPerTurn:game.blocksPerTurn.toString(),
                    latestBCTimestamp:Date.now()
                }
                console.log(gameData)
                dispatch({
                    type: BLOCKCHAIN_GAME_UPDATE,
                    payload: gameData
                })

            }  
        }
    },
    initGame: () =>{
        console.log("build the functionality to call initGame here")
    }

    // countersignChannel:(dispatch) => {
    //     return async (dispatch,getState) => {






    //         //get wallets --> do this through metamask later?
            

    //         //can deployedcontract be done out of function and connect be done inside?

    //         //get a contract --> change this to existing contract later
    //         // let ContractFactory = await new ethers.ContractFactory(StateChannelAbi, StateChannelBytecode).connect(activeWallet);
    //         // let deployedContract = await ContractFactory.deploy()
    //         let deployedaddress = CONTRACT_ADDRESS
            
    //         //console.log("deployed contract is ", deployedContract)





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
    //             //console.log("deployedcontract ")



    //             


    //             //remove requested and proposed from database

    //     }

    // },


    // initChannelTermination: (dispatch) => {
    //     return async (dispatch, getState) => {
            
    //         let activeWallet = new ethers.Wallet(getState().LoginRedux.privKey).connect(provider)
    //         let deployedaddress = CONTRACT_ADDRESS
    //         let deployedContract = new ethers.Contract(deployedaddress,StateChannelAbi,provider).connect(activeWallet);
                
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

    //             deployedContract.InitChannelTermination(
    //                 v, r, s, CID, propTermBlockNum, u1Bal, u2Bal, nonce
    //             ).then((x) => console.log("\n\nthen", x))
    //             .catch((err) => console.log("\n\ncatch", err))

    //     }
    // },



    // getOngoingChannels: (dispatch, address) => {
    //     return async (dispatch) => {

    //         //move this outside function?
    //         let deployedaddress = CONTRACT_ADDRESS
    //         let deployedContract = new ethers.Contract(deployedaddress,StateChannelAbi,provider);
    //         //console.log("deployed contract is ", deployedContract)


    //         let OngoingChannels = {}
    //         deployedContract.GetChannelsAtAddress(address)
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