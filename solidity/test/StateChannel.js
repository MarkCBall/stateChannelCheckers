const StateChannel = artifacts.require("StateChannel");

var ethers = require('ethers');

contract('StateChannel', (accounts) => {

    let privKey1 = "64d3560a2d76391da1c1a44a9595102f0d7281f4ac5dbcefd3c1fe8f58f53be1"
    let addr1 = "0x20b2e1f1dc798951435234cb8a892f7483bd790e";
    let addr2 = accounts[1];
    let disputeContractAddr = "0x1111111111111111111111111111111111111111" ;//fix this later!
    // beforeEach(async function(){
    //     this.contract = await contractname.new({from:owner})
    // })
    
    // describe("get owner", function () {
    //     it("hi")
    //     it("bye")
    // })

    getSig = async (addr1,addr2,disputeContractAddr,gameID) => {
        let hashedEncodedChannelData = ethers.utils.solidityKeccak256(
            ['address', 'address', 'address', 'uint'],
            [addr1,addr2,disputeContractAddr,gameID]
        );
        let ArrayifiedHashedEncodedChannelData = ethers.utils.arrayify(hashedEncodedChannelData)

        let wallet = new ethers.Wallet(privKey1)
        let flatSig = await wallet.signMessage(ArrayifiedHashedEncodedChannelData)

        return ethers.utils.splitSignature(flatSig)
    }

    // it('should create a channel if passed valid data and signature', async () => {
       
    //     let gameID = 8; //uint

    //     let sig = await getSig(addr1,addr2,disputeContractAddr,gameID)
      
    //     // const StateChannelInstance = await StateChannel.deployed();
    //     let StateChannelInstance = await StateChannel.new({from:accounts[0]})
    //     await StateChannelInstance.InitChannel(addr1, sig.v, sig.r, sig.s, disputeContractAddr, gameID, {from:addr2})

    // })

    it("should change the value of the games mapping appropriately", async () => {
       
        let gameID = 20; //uint

        let sig = await getSig(addr1,addr2,disputeContractAddr,gameID)
      
        const StateChannelInstance = await StateChannel.deployed();

        await StateChannelInstance.InitChannel(addr1, sig.v, sig.r, sig.s, disputeContractAddr, gameID, {from:addr2})

        let game = await StateChannelInstance.games.call(20)

        assert.deepEqual(game.addr1.toLowerCase(),addr1.toLowerCase(), "addr1 was not set correctly")
        assert.equal(game.addr2.toLowerCase(),addr2.toLowerCase(), "addr2 was not set correctly")
        assert.equal(game.disputeContractAddr.toLowerCase(),disputeContractAddr.toLowerCase(), "disputeContractAddr was not set correctly")
    })


    it('should fail if the sig+data does not validate address1', async () => {

        addr1 = "0x0000000000000000000000000000000000000000"
        let gameID = 9; //uint

        let sig = await getSig(addr1,addr2,disputeContractAddr,gameID)
      
        const StateChannelInstance = await StateChannel.deployed();

        //USE OPEN-ZEPPELING-TEST-HELPERS -- check the github for how its made
        //how can I do this better?
        try {
                await StateChannelInstance.InitChannel(addr1, sig.v, sig.r, sig.s, disputeContractAddr, gameID, {from:addr2}) 
                throw "success"
        }
        catch (error) {
            if (error === "success")
                assert.equal(true, false, "did not revert as expected")
        }
    })


    it('shouldnt create a channel if the gameID already exists', async () => {
       
        let gameID = 8; //uint

        let sig = await getSig(addr1,addr2,disputeContractAddr,gameID)
      
        const StateChannelInstance = await StateChannel.deployed();

        //how can I do this better?
        try {
                await StateChannelInstance.InitChannel(addr1, sig.v, sig.r, sig.s, disputeContractAddr, gameID, {from:addr2}) 
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
