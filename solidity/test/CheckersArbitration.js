const StateChGaming = artifacts.require("StateChGaming");

const SigLib = require("../Library/SigLib")

contract('StateChGaming', async (accounts) => {

    describe("Function - initGame", async ()=>{
        it('should set gameData correctly', async () => {
            //mock data
            let _stakedAmount = 1000000//MAKE BIG NUMBER 1000000000000000000
            let _erc20Addr = accounts[9]//FIX THIS
            let _gameID = 1;
            let _p1 = accounts[0]
            let _p2 = accounts[1]
            let _vcAddr = accounts[9]//FIX THIS
            let _blocksPerTurn = 100

            let pars_unsigned_initGame ={
                pars:[_stakedAmount,_erc20Addr,_gameID,_p1,_p2,_vcAddr,_blocksPerTurn],
                parTypes:['uint','address','uint','address','address','address','uint'],
            }
            //sign mock data
            let pars_signed_initGame = await SigLib.signPars(pars_unsigned_initGame, 0)
            // console.log("library return is ",pars_signed_initGame)

            //call the function
            let StateChGamingInstance = await StateChGaming.deployed();

            await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:_p2})
            

           
    

            //check the contract was changed
            let response = await StateChGamingInstance.allGames.call(1)
            //assert and stuff 
            console.log(response)

        })
        it('bbb')
    })
    describe("describe block2", ()=>{
        it('ccc')
        it('ddd')
    })
    // it('should return the correct address from data and signature')//, async () => {
        // let sendingAddress = "0x7156526fbd7a3c72969b54f64e42c10fbb768c8a"
        // const SigLibInstance = await SigLib.deployed();
        // // let SigLibInstance = await SigLib.new({from:accounts[0]})
        // let signedMessage = "0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8" //signedMessage = web3.sha3("hello")
        // let v = 28
        // let r = "0x9242685bf161793cc25603c231bc2f568eb630ea16aa137d2664ac8038825608"
        // let s = "0x4f8ae3bd7535248d0bd448298cc2e2071e56992d0774dc340c368ae950852ada"
        // let address = await SigLibInstance.getOriginAddress.call(signedMessage, v, r, s)
        // address = address.toLowerCase();
        // sendingAddress = sendingAddress.toLowerCase();
        // assert.equal(address, sendingAddress, "getOriginAddress did not return correct address")
    // });
});

// var ethers = require('ethers');

// contract('CheckersArbitration', (accounts) => {

//     let privKey1 = "64d3560a2d76391da1c1a44a9595102f0d7281f4ac5dbcefd3c1fe8f58f53be1"
//     let addr1 = "0x20b2e1f1dc798951435234cb8a892f7483bd790e";
//     let addr2 = accounts[1];
//     let disputeContractAddr = accounts[7] ;//fix this later!

//     it('use this to output state change tracking  ', async () => {
       
//         const CheckersArbitrationInstance = await CheckersArbitration.deployed();
//         console.log((await CheckersArbitrationInstance.isForward(6,4)).toNumber())
//     })


//     // it('should create a channel if passed valid data and signature', async () => { 
//     // })

//     // group(MAIN CONTRACT)
//     // group(function validateChannelSig) --> must be made public
//     //     it('should return true when the signature corresponds to the data')
//     //     it('should return true when the signature corresponds to the different data')
//     //     it('should return false when the signature does not correspond to the data')

//     // group(init channel)
//     //     it('should create a channel if passed valid data and signature')
//     //     it('should create a channel if passed different valid data and signature')
//     //     it('should withdraw funds from both addresses)

//     //     it('shouldn't create a channel if the gameID already exists)
//     //     it('shouldn't create a channel if funds could not be withdrawn
//     //     it('shouldn't take funds if the channel was not created)

//     // group(')


// });





            // // ganache-cli -m "smart fun man behind sea joke split cherry force season once pair"
            // let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
            // let phrase = "smart fun man behind sea joke split cherry force season once pair"
            // // let path = "m/44'/60'/0'/0/"
            // // let secondwallet = ethers.Wallet.fromMnemonic(phrase, path + "1").connect(provider);
            // let wallet = ethers.Wallet.fromMnemonic(phrase).connect(provider);

            // let contractaddress = "0x59b8c37a34bc5f9ce80c71d5c6f307e698e6e20a"
            // let contractabi = [{"constant":true,"inputs":[{"name":"salt","type":"uint256"}],"name":"deploy","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"salt","type":"uint256"}],"name":"Deployed","type":"event"}]
            // let contract = new ethers.Contract(contractaddress,contractabi,wallet)