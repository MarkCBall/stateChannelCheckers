const CheckersArbitration = artifacts.require("CheckersArbitration");

var ethers = require('ethers');

contract('CheckersArbitration', (accounts) => {

    let privKey1 = "64d3560a2d76391da1c1a44a9595102f0d7281f4ac5dbcefd3c1fe8f58f53be1"
    let addr1 = "0x20b2e1f1dc798951435234cb8a892f7483bd790e";
    let addr2 = accounts[1];
    let disputeContractAddr = accounts[7] ;//fix this later!

    it('use this to output state change tracking  ', async () => {
       
        const CheckersArbitrationInstance = await CheckersArbitration.deployed();
        console.log((await CheckersArbitrationInstance.isForward(6,4)).toNumber())
    })


    // it('should create a channel if passed valid data and signature', async () => { 
    // })




});