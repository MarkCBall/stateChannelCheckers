import {ethers} from "ethers";
import { MERGE_BLOCKCHAIN_GETGAME } from "../constants/GameData";
import { UPDATE_APPROVALS } from "../constants/InteractBlockchain";
// import { RESET_GAME_DATA } from "../constants/GameData";

// let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
let provider = ethers.getDefaultProvider('ropsten');

//get contract info
let StateChGamingJson = require('../../SolidityJSON/StateChGaming.json')
let StateChGamingAbi = StateChGamingJson.abi;
// let StateChGamingBytecode = StateChGamingJson.bytecode
// let activeWallet = new ethers.Wallet(getState().LoginRedux.privKey).connect(provider)
// let activeWallet = new ethers.Wallet("0x5ee6962f33f137e7847c8a2852ed18e5a67159f23b0931baf16a95a009ad3901").connect(provider)


let ERC20Json = require('../../SolidityJSON/ERC20.json')
let ERC20Abi = ERC20Json.abi;

let StateChGamingAddr = "0x90b8d184c1d4179e59b9d21fce1201704cac255c"
let deployedStateChGaming = new ethers.Contract(StateChGamingAddr,StateChGamingAbi, provider)

// let deployedStateChGaming
// (async ()=>{
//     let ContractFactory = await new ethers.ContractFactory(StateChGamingAbi, StateChGamingBytecode).connect(activeWallet);
//     deployedStateChGaming = await ContractFactory.deploy()
// })()

export default {
                 
    getGame: (dispatch, gameID, timestamp) => {
        return async (dispatch,getState) => {
            let game = await deployedStateChGaming.allGames(gameID)
            let gameData
            // console.log("allGames retuened",game)

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
                console.log("BC response:",gameData)
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

    updateApprovals: () =>{
        return async (dispatch,getState) => {
            let GD = getState().GameData
            // console.log(GD)
            let minStake = GD.ERC20Amount
            let ERC20Addr = GD.ERC20Addr
            let p1Addr = GD.p1Addr
            let p2Addr = GD.p2Addr
            let ERC20Contract = new ethers.Contract(ERC20Addr,ERC20Abi, provider)
            let p1Apprv = (await ERC20Contract.allowance(p1Addr,StateChGamingAddr)).toString()
            let p2Apprv = (await ERC20Contract.allowance(p2Addr,StateChGamingAddr)).toString()
            let p1Bal = (await ERC20Contract.balanceOf(p1Addr)).toString()
            let p2Bal = (await ERC20Contract.balanceOf(p2Addr)).toString()
            dispatch({
                type: UPDATE_APPROVALS,
                payload: {
                    p1ApprovedAmnt:p1Apprv,
                    p2ApprovedAmnt:p2Apprv,
                    enoughAllowances:( (p1Apprv>=minStake) && (p2Apprv>=minStake) ),
                    p1Bal:p1Bal,
                    p2Bal:p2Bal,
                }
            })
        }
    },

    ERC20Approve: (allowanceAmnt) =>{
        return async (dispatch,getState) => {
            console.log("approve called")
            let activeWallet = new ethers.Wallet(getState().LoginRedux.privKey).connect(provider)
            let ERC20Addr = getState().GameData.ERC20Addr
            let ERC20Contract = new ethers.Contract(ERC20Addr,ERC20Abi, activeWallet)
            await ERC20Contract.approve(StateChGamingAddr,allowanceAmnt)
        }
    }







    //         //get wallets --> do this through metamask later?
            

    //         //can deployedStateChGaming be done out of function and connect be done inside?

    //         //get a contract --> change this to existing contract later
    //         // let ContractFactory = await new ethers.ContractFactory(StateChannelAbi, StateChannelBytecode).connect(activeWallet);
    //         // let deployedStateChGaming = await ContractFactory.deploy()
    //         let StateChGamingAddr = CONTRACT_ADDRESS
            
    //         //console.log("deployed contract is ", deployedStateChGaming)





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
    //             //console.log("deployedStateChGaming ")



    //             


    //             //remove requested and proposed from database

    //     }

    // },


    // initChannelTermination: (dispatch) => {
    //     return async (dispatch, getState) => {
            
    //         let activeWallet = new ethers.Wallet(getState().LoginRedux.privKey).connect(provider)
    //         let StateChGamingAddr = CONTRACT_ADDRESS
    //         let deployedStateChGaming = new ethers.Contract(StateChGamingAddr,StateChannelAbi,provider).connect(activeWallet);
                
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

    //             deployedStateChGaming.InitChannelTermination(
    //                 v, r, s, CID, propTermBlockNum, u1Bal, u2Bal, nonce
    //             ).then((x) => console.log("\n\nthen", x))
    //             .catch((err) => console.log("\n\ncatch", err))

    //     }
    // },



    // getOngoingChannels: (dispatch, address) => {
    //     return async (dispatch) => {

    //         //move this outside function?
    //         let StateChGamingAddr = CONTRACT_ADDRESS
    //         let deployedStateChGaming = new ethers.Contract(StateChGamingAddr,StateChannelAbi,provider);
    //         //console.log("deployed contract is ", deployedStateChGaming)


    //         let OngoingChannels = {}
    //         deployedStateChGaming.GetChannelsAtAddress(address)
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