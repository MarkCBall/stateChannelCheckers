const SigLib = artifacts.require("SigLib");

contract('SigLib', (accounts) => {

    it('should return the correct address from data and signature', async () => {
        let sendingAddress = "0x7156526fbd7a3c72969b54f64e42c10fbb768c8a"
        const SigLibInstance = await SigLib.deployed();
        
        let signedMessage = "0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8" //signedMessage = web3.sha3("hello")
        let v = 28
        let r = "0x9242685bf161793cc25603c231bc2f568eb630ea16aa137d2664ac8038825608"
        let s = "0x4f8ae3bd7535248d0bd448298cc2e2071e56992d0774dc340c368ae950852ada"

        let address = await SigLibInstance.getOriginAddress.call(signedMessage, v, r, s)
        
        address = address.toLowerCase();
        sendingAddress = sendingAddress.toLowerCase();

        assert.equal(address, sendingAddress, "getOriginAddress did not return correct address")

    });
    //it('should return the correct address from different data and signature')

});