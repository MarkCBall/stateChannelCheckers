const StateChGaming = artifacts.require("StateChGaming");


const truffleAssert = require('truffle-assertions');

const SigLib = require("../Library/SigLib")

contract('StateChGaming', async (accounts) => {



    describe("Function - initGame", async ()=>{

        // let StateChGamingInstance = await StateChGaming.deployed();
        //do this for validating contract and ERC20 contract + other transfers ect

        //mock data
        let _stakedAmount = 1000000
        let _erc20Addr = accounts[9]//FIX THIS
        let _gameID = 1
        let _p1REF = 0//should be addr
        let _p2REF = 1//should be addr
        let _vcAddr = accounts[9]//contractInstance.address
        let _blocksPerTurn = 100

        it('should set gameData correctly', async () => {
            let pars_unsigned_initGame ={
                pars:[_stakedAmount,_erc20Addr,_gameID,accounts[_p1REF],accounts[_p2REF],_vcAddr,_blocksPerTurn],
                parTypes:['uint','address','uint','address','address','address','uint'],
            }
            let pars_signed_initGame = await SigLib.signPars(pars_unsigned_initGame, _p1REF)
            let StateChGamingInstance = await StateChGaming.deployed();
            await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
            let response = await StateChGamingInstance.allGames.call(_gameID)
            assert.equal(response.gamePayout, _stakedAmount*2, "gamePayout not set correctly" )
            assert.equal(response.tokenAddr,_erc20Addr , "tokenAddr not set correctly")
            assert.equal(response.state,3151051977652667687974785799204386029420487659316301249983 , "state not set to uninitiated board")
            assert.equal(response.p1,accounts[_p1REF] , "p1Addr not set correctly")
            assert.equal(response.p2,accounts[_p2REF] , "p2Addr not set correctly")
            assert.equal(response.vcAddr,_vcAddr , "validating contract address not set correctly")
            assert.equal(response.blocksPerTurn,_blocksPerTurn , "blocksPerTurn not set correctly")
        })
        it('shouldnt work with incorrect signature', async () => {
            _gameID = 2
            let pars_unsigned_initGame ={
                pars:[_stakedAmount,_erc20Addr,_gameID,accounts[_p1REF],accounts[_p2REF],_vcAddr,_blocksPerTurn],
                parTypes:['uint','address','uint','address','address','address','uint'],
            }
            let pars_signed_initGame = await SigLib.signPars(pars_unsigned_initGame, _p1REF)
            //set r = s to force signature to be incorrect
            pars_signed_initGame.pars[8] = pars_signed_initGame.pars[9]
            let StateChGamingInstance = await StateChGaming.deployed();

            await truffleAssert.reverts(
                StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
                ,"a player didnt sign or send"
            )
        })
        it('shouldnt work if sent by a third party', async () => {
            _gameID = 2
            let pars_unsigned_initGame ={
                pars:[_stakedAmount,_erc20Addr,_gameID,accounts[_p1REF],accounts[_p2REF],_vcAddr,_blocksPerTurn],
                parTypes:['uint','address','uint','address','address','address','uint'],
            }
            let pars_signed_initGame = await SigLib.signPars(pars_unsigned_initGame, _p1REF)
            let StateChGamingInstance = await StateChGaming.deployed();

            //sending from account[3] - SHOULD FAIL
            await truffleAssert.reverts(
                StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[3]})
                ,"a player didnt sign or send"
            )
        })
        it('should fail when if the requested gameID exists', async () => {
            //game 1 is already used - SHOULD FAIL
            _gameID = 1
            let pars_unsigned_initGame ={
                pars:[_stakedAmount,_erc20Addr,_gameID,accounts[_p1REF],accounts[_p2REF],_vcAddr,_blocksPerTurn],
                parTypes:['uint','address','uint','address','address','address','uint'],
            }
            let pars_signed_initGame = await SigLib.signPars(pars_unsigned_initGame, _p1REF)
            let StateChGamingInstance = await StateChGaming.deployed();

            //sending from account[3] - SHOULD FAIL
            await truffleAssert.reverts(
                StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
                ,"can not have duplicate gameIDs"
            )
        })

    })
    describe("describe block2", ()=>{
        it('ccc')
        it('ddd')
    })


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