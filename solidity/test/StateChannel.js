const StateChannel = artifacts.require("StateChannel");

var ethers = require('ethers');
const truffleAssert = require('truffle-assertions');

contract('StateChannel', (accounts) => {

    it('should create a channel if passed valid data and signature', async () => {
       
        //Mnemonic: helmet damp file human glad audit athlete away sail pause nut cute
        let privKey1 = "64d3560a2d76391da1c1a44a9595102f0d7281f4ac5dbcefd3c1fe8f58f53be1"
        //let privKey2 = "bfef728167067022fa400e851fc01e68dbab36a8e56104bf83bfca4df9abfcc3"

        let addr1 = "0x20b2e1f1dc798951435234cb8a892f7483bd790e"; //address
        let addr2 = accounts[1];//"0x258f6a428a2025330233312b1a8e0aa5d4a2f283";
        let disputeContractAddr = accounts[7] ;//fix this later!
        let gameID = 8; //uint

        let hashedEncodedChannelData = ethers.utils.solidityKeccak256(
            ['address', 'address', 'address', 'uint'],
            [addr1,addr2,disputeContractAddr,gameID]
        );
        let ArrayifiedHashedEncodedChannelData = ethers.utils.arrayify(hashedEncodedChannelData)

        let wallet = new ethers.Wallet(privKey1)
        let flatSig = await wallet.signMessage(ArrayifiedHashedEncodedChannelData)
        let sig = ethers.utils.splitSignature(flatSig);
        let v1 = sig.v //uint8
        let r1 = sig.r //bytes32
        let s1 = sig.s//bytes32
      
        const StateChannelInstance = await StateChannel.deployed();
        let InitChannelSuccess = await StateChannelInstance.InitChannel(addr1, v1, r1, s1, disputeContractAddr, gameID, {from:addr2})

        //console.log(InitChannelSuccess)

        //assert.equal(InitChannelSuccess, true, "error message")
        //should call games(gameID) to make sure data is in there properly

    })

    it("should change the value of the games mapping appropriately", async () => {
       
        //Mnemonic: helmet damp file human glad audit athlete away sail pause nut cute
        let privKey1 = "64d3560a2d76391da1c1a44a9595102f0d7281f4ac5dbcefd3c1fe8f58f53be1"
        //let privKey2 = "bfef728167067022fa400e851fc01e68dbab36a8e56104bf83bfca4df9abfcc3"

        let addr1 = "0x20b2e1f1dc798951435234cb8a892f7483bd790e";
        //let addr1 = "0x0000000000000000000000000000000000000000";
        let addr2 = accounts[1];//"0x258f6a428a2025330233312b1a8e0aa5d4a2f283";
        let disputeContractAddr = accounts[7] ;//fix this later!
        let gameID = 20; //uint

        let hashedEncodedChannelData = ethers.utils.solidityKeccak256(
            ['address', 'address', 'address', 'uint'],
            [addr1,addr2,disputeContractAddr,gameID]
        );
        let ArrayifiedHashedEncodedChannelData = ethers.utils.arrayify(hashedEncodedChannelData)

        let wallet = new ethers.Wallet(privKey1)
        let flatSig = await wallet.signMessage(ArrayifiedHashedEncodedChannelData)
        let sig = ethers.utils.splitSignature(flatSig);
        let v1 = sig.v //uint8
        let r1 = sig.r //bytes32
        let s1 = sig.s//bytes32
      
        const StateChannelInstance = await StateChannel.deployed();

        await StateChannelInstance.InitChannel(addr1, v1, r1, s1, disputeContractAddr, gameID, {from:addr2})

        let game = await StateChannelInstance.games.call(8)

        assert.deepEqual(game.addr1.toLowerCase(),addr1.toLowerCase(), "addr1 was not set correctly")
        assert.equal(game.addr2.toLowerCase(),addr2.toLowerCase(), "addr2 was not set correctly")
        assert.equal(game.disputeContractAddr.toLowerCase(),accounts[7].toLowerCase(), "disputeContractAddr was not set correctly")
    })


    it('should fail if the sig+data does not validate address1', async () => {
       
        //Mnemonic: helmet damp file human glad audit athlete away sail pause nut cute
        let privKey1 = "64d3560a2d76391da1c1a44a9595102f0d7281f4ac5dbcefd3c1fe8f58f53be1"
        //let privKey2 = "bfef728167067022fa400e851fc01e68dbab36a8e56104bf83bfca4df9abfcc3"

        //let addr1 = "0x20b2e1f1dc798951435234cb8a892f7483bd790e";
        let addr1 = "0x0000000000000000000000000000000000000000";
        let addr2 = accounts[1];//"0x258f6a428a2025330233312b1a8e0aa5d4a2f283";
        let disputeContractAddr = accounts[7] ;//fix this later!
        let gameID = 9; //uint

        let hashedEncodedChannelData = ethers.utils.solidityKeccak256(
            ['address', 'address', 'address', 'uint'],
            [addr1,addr2,disputeContractAddr,gameID]
        );
        let ArrayifiedHashedEncodedChannelData = ethers.utils.arrayify(hashedEncodedChannelData)

        let wallet = new ethers.Wallet(privKey1)
        let flatSig = await wallet.signMessage(ArrayifiedHashedEncodedChannelData)
        let sig = ethers.utils.splitSignature(flatSig);
        let v1 = sig.v //uint8
        let r1 = sig.r //bytes32
        let s1 = sig.s//bytes32
      
        const StateChannelInstance = await StateChannel.deployed();

        //how can I do this better?
        try {
                await StateChannelInstance.InitChannel(addr1, v1, r1, s1, disputeContractAddr, gameID, {from:addr2}) 
                throw "success"
        }
        catch (error) {
            if (error === "success")
                assert.equal(true, false, "did not revert as expected")
        }
    })


    it('shouldnt create a channel if the gameID already exists', async () => {
       
        //Mnemonic: helmet damp file human glad audit athlete away sail pause nut cute
        let privKey1 = "64d3560a2d76391da1c1a44a9595102f0d7281f4ac5dbcefd3c1fe8f58f53be1"
        //let privKey2 = "bfef728167067022fa400e851fc01e68dbab36a8e56104bf83bfca4df9abfcc3"

        let addr1 = "0x20b2e1f1dc798951435234cb8a892f7483bd790e";
        //let addr1 = "0x0000000000000000000000000000000000000000";
        let addr2 = accounts[1];//"0x258f6a428a2025330233312b1a8e0aa5d4a2f283";
        let disputeContractAddr = accounts[7] ;//fix this later!
        let gameID = 8; //uint

        let hashedEncodedChannelData = ethers.utils.solidityKeccak256(
            ['address', 'address', 'address', 'uint'],
            [addr1,addr2,disputeContractAddr,gameID]
        );
        let ArrayifiedHashedEncodedChannelData = ethers.utils.arrayify(hashedEncodedChannelData)

        let wallet = new ethers.Wallet(privKey1)
        let flatSig = await wallet.signMessage(ArrayifiedHashedEncodedChannelData)
        let sig = ethers.utils.splitSignature(flatSig);
        let v1 = sig.v //uint8
        let r1 = sig.r //bytes32
        let s1 = sig.s//bytes32
      
        const StateChannelInstance = await StateChannel.deployed();

        //how can I do this better?
        try {
                await StateChannelInstance.InitChannel(addr1, v1, r1, s1, disputeContractAddr, gameID, {from:addr2}) 
                throw "success"
        }
        catch (error) {
            if (error === "success")
                assert.equal(true, false, "did not revert as expected")
        }
    })

    

//     it('shouldn't create a channel if funds could not be withdrawn
//     it('shouldn't take funds if the channel was not created)





});
