import { ethers } from "ethers";
import { UPDATE_APPROVALS } from "../constants/ActionTypes";

//move these to 
let provider = ethers.getDefaultProvider('ropsten');
let ERC20Json = require('../../SolidityJSON/ERC20.json')
let ERC20Abi = ERC20Json.abi;
let StateChGamingAddr = "0x90b8d184c1d4179e59b9d21fce1201704cac255c"

export default {

    updateApprovals: () => {
        return async (dispatch, getState) => {
            let GD = getState().GameData
            // console.log(GD)
            let minStake = GD.ERC20Amount
            let ERC20Addr = GD.ERC20Addr
            let p1Addr = GD.p1Addr
            let p2Addr = GD.p2Addr
            let ERC20Contract = new ethers.Contract(ERC20Addr, ERC20Abi, provider)
            let p1Apprv = (await ERC20Contract.allowance(p1Addr, StateChGamingAddr)).toString()
            let p2Apprv = (await ERC20Contract.allowance(p2Addr, StateChGamingAddr)).toString()
            let p1Bal = (await ERC20Contract.balanceOf(p1Addr)).toString()
            let p2Bal = (await ERC20Contract.balanceOf(p2Addr)).toString()
            dispatch({
                type: UPDATE_APPROVALS,
                payload: {
                    p1ApprovedAmnt: p1Apprv,
                    p2ApprovedAmnt: p2Apprv,
                    enoughAllowances: ((p1Apprv >= minStake) && (p2Apprv >= minStake)),
                    p1Bal: p1Bal,
                    p2Bal: p2Bal,
                }
            })
        }
    },

    ERC20Approve: (allowanceAmnt) => {
        return async (dispatch, getState) => {
            console.log("approve called")
            let activeWallet = new ethers.Wallet(getState().LoginRedux.privKey).connect(provider)
            let ERC20Addr = getState().GameData.ERC20Addr
            let ERC20Contract = new ethers.Contract(ERC20Addr, ERC20Abi, activeWallet)
            await ERC20Contract.approve(StateChGamingAddr, allowanceAmnt)
        }
    }
}