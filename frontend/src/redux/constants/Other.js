//imports
import { ethers } from "ethers";

//network constants
export const provider = ethers.getDefaultProvider('ropsten');
// let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

//state channel gaming constants
export const StateChGamingAddr = "0x90b8d184c1d4179e59b9d21fce1201704cac255c";
const StateChGamingJson = require('../../SolidityJSON/StateChGaming.json')
export const StateChGamingAbi = StateChGamingJson.abi;
export const StateChGamingContract = new ethers.Contract(StateChGamingAddr,StateChGamingAbi, provider)



//ERC20 constants
const ERC20Json = require('../../SolidityJSON/ERC20.json');
export const ERC20Abi = ERC20Json.abi;


//database constants
export const serverIpAndPort = "http://127.0.0.1:3001";


