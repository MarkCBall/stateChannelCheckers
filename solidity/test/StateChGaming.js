const StateChGaming = artifacts.require("StateChGaming");
const ValidatingContract = artifacts.require("ValidatingContract");
const ERC20 = artifacts.require("ERC20");
const ethers = require("ethers/utils");
// ganache-cli -m "smart fun man hind sea joke split cherry force season once pair"
const validGames = require("./Data/ValidGameData")
const truffleAssert = require('truffle-assertions');
const SigLib = require("../Library/SigLib")

contract('StateChGaming', async (accounts) => {
    //mock data
    let _stakedAmount
    let _erc20Addr
    let _gameID
    let _p1REF
    let _p2REF
    let _vcAddr
    let _blocksPerTurn
    let STATE_CH_GAME_ADDRESS
    let getinitGameParams = () => {
        return {
            pars: [_stakedAmount, _erc20Addr, _gameID, accounts[_p1REF], accounts[_p2REF], _vcAddr, _blocksPerTurn],
            parTypes: ['uint', 'address', 'uint', 'address', 'address', 'address', 'uint'],
        }
    }

    //mock data
    let _boardState
    let getinitBCMoveParams = () => {
        return {
            pars: [_gameID, _boardState],
            parTypes: ['uint', 'uint'],
        }
    }
    beforeEach(async () => {
        //reset parameter data
        _stakedAmount = 1000000
        _gameID = 1
        _p1REF = 0
        _p2REF = 1
        _blocksPerTurn = 100

        //get StateChGaming address
        let StateChGamingInstance = await StateChGaming.new()
        STATE_CH_GAME_ADDRESS = StateChGamingInstance.address
        //get validating contract
        var ValidatingContractInstance = await ValidatingContract.new()
        _vcAddr = ValidatingContractInstance.address;
        //pre approve ERC20 approve
        var ERC20Instance = await ERC20.new((_stakedAmount * 100), { from: accounts[_p1REF] })
        _erc20Addr = ERC20Instance.address;
        await ERC20Instance.transfer(accounts[_p2REF], _stakedAmount, { from: accounts[_p1REF] })
        await ERC20Instance.approve(STATE_CH_GAME_ADDRESS, _stakedAmount, { from: accounts[_p1REF] })
        await ERC20Instance.approve(STATE_CH_GAME_ADDRESS, _stakedAmount, { from: accounts[_p2REF] })
    })
    describe("Function - initGame", async ()=>{

        it('should set gameData correctly', async () => {
            let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
            let pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
            await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
            let response = await StateChGamingInstance.allGames.call(_gameID)
            assert.equal(response.gamePayout, _stakedAmount*2, "gamePayout not set correctly" )
            assert.equal(response.tokenAddr,_erc20Addr , "tokenAddr not set correctly")
            //equality not working on BN, comparing the hash of the BNs instead
            assert.equal(web3.utils.keccak256(response.state), web3.utils.keccak256(web3.utils.toBN('0x000000000000000080828486898b8d8f90929496a9abadafb0b2b4b6b9bbbdbf'))  , "state not set to uninitiated board")
            assert.equal(response.p1,accounts[_p1REF] , "p1Addr not set correctly")
            assert.equal(response.p2,accounts[_p2REF] , "p2Addr not set correctly")
            assert.equal(response.vcAddr,_vcAddr , "validating contract address not set correctly")
            assert.equal(response.blocksPerTurn,_blocksPerTurn , "blocksPerTurn not set correctly")
        })
        it('shouldnt work with incorrect signature', async () => {
            let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
            let pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
            //SHOULD FAIL BECAUSE r = s to force signature to be incorrect
            pars_signed_initGame.pars[8] = pars_signed_initGame.pars[9]
            await truffleAssert.reverts(
                StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
                ,"a player didnt sign or send"
            )
        })
        it('shouldnt work without a p1 and p2 addresses signed or sent from', async () => {
            let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
            let pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
            //SHOULD FAIL BECAUSE sending from account[3]
            await truffleAssert.reverts(
                StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[3]})
                ,"a player didnt sign or send"
            )
        })
        it('should fail when if the requested gameID exists', async () => {
            //approve copious amounts of ERC20 token transferFrom
            let ERC20Instance = await ERC20.at(_erc20Addr)
            await ERC20Instance.transfer(accounts[_p2REF],_stakedAmount*10, {from:accounts[_p1REF]})
            await ERC20Instance.approve(STATE_CH_GAME_ADDRESS,_stakedAmount*10, {from:accounts[_p1REF]})
            await ERC20Instance.approve(STATE_CH_GAME_ADDRESS,_stakedAmount*10, {from:accounts[_p2REF]})
            let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
            let pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
            await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
            //proof everything else works to make a second gameID
            _gameID = 2
            pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
            await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
            //but it fails without changing gameID before the next initGame
            await truffleAssert.reverts(
                StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
                ,"can not have duplicate gameIDs"
            )
        })
        it('shouldnt init a channel unless the funds were transferFrom', async () => {
            //approve enough ERC20 tokens for initGame only twice
            let ERC20Instance = await ERC20.at(_erc20Addr)
            await ERC20Instance.transfer(accounts[_p2REF],_stakedAmount*2, {from:accounts[_p1REF]})
            await ERC20Instance.approve(STATE_CH_GAME_ADDRESS,_stakedAmount*2, {from:accounts[_p1REF]})
            await ERC20Instance.approve(STATE_CH_GAME_ADDRESS,_stakedAmount*2, {from:accounts[_p2REF]})
            let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
            let pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
            await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
            //proof everything else works to make a second gameID
            _gameID = 2
            pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
            await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
            //but it fails now because it only had funds for transferFrom twice
            _gameID = 3
            await truffleAssert.reverts(
                StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
            )
        })
    })
    describe("Function - initBCMove", ()=>{
        beforeEach(async ()=>{
            //BN crashes with inputs this high?
            _boardState = new ethers.BigNumber('0x0a0000000000000380828486898b8d8f909b9d96a9aba4afb0b2b4b6b9bbbdbf')
            let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
            let pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
            await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
        })
        it('should update the game blockNum and state',async () =>{
            let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
            let pars_signed_initBCMove = await SigLib.signPars(getinitBCMoveParams(), _p2REF)
            await StateChGamingInstance.initBCMove(...pars_signed_initBCMove.pars, {from:accounts[_p1REF]})
            let response = await StateChGamingInstance.allGames.call(_gameID)
            assert.equal(response.blockNum, await web3.eth.getBlockNumber(),"blockNum not set correctly")
        })
        it('shouldnt work with incorrect signature',async () =>{
            let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
            let pars_signed_initBCMove = await SigLib.signPars(getinitBCMoveParams(), _p2REF)
            //SHOULD FAIL BECAUSE r = s to force signature to be incorrect
            pars_signed_initBCMove.pars[3] = pars_signed_initBCMove.pars[4]
            await truffleAssert.reverts(
                StateChGamingInstance.initBCMove(...pars_signed_initBCMove.pars, {from:accounts[_p1REF]})
                ,"a player didnt sign or send"
            )
        })
        it('shouldnt work if sent by a third party',async () =>{
            let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
            let pars_signed_initBCMove = await SigLib.signPars(getinitBCMoveParams(), _p2REF)
            //SHOULD FAIL BECAUSE sending from account[3]
            await truffleAssert.reverts(
                StateChGamingInstance.initBCMove(...pars_signed_initBCMove.pars, {from:accounts[3]})
                ,"a player didnt sign or send"
            )
        })
        it('shouldnt work if the nonce is not higher than saved nonce',async () =>{
            let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
            let pars_signed_initBCMove = await SigLib.signPars(getinitBCMoveParams(), _p2REF)
            await StateChGamingInstance.initBCMove(...pars_signed_initBCMove.pars, {from:accounts[_p1REF]})
            await truffleAssert.reverts(
                StateChGamingInstance.initBCMove(...pars_signed_initBCMove.pars, {from:accounts[_p1REF]})
                ,"a new board must be at a higher turnNum"
            )
        })
    })

    describe("Tests after a game has started", async () => {
        beforeEach(async () => {
            _boardState = validGames.g1[3]
            let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
            let pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
            await StateChGamingInstance.initGame(...pars_signed_initGame.pars, { from: accounts[_p2REF] })
            let pars_signed_initBCMove = await SigLib.signPars(getinitBCMoveParams(), _p2REF)
            await StateChGamingInstance.initBCMove(...pars_signed_initBCMove.pars, { from: accounts[_p1REF] })
        })
        describe("Modifier - validMove via enforcedBCMove", () => {
            it('allows valid moves', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                let validMove = validGames.g1[4]
                await StateChGamingInstance.enforcedBCMove(_gameID, validMove, { from: accounts[_p2REF] })
            })
            it('doesnt allow invalid moves', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                let validMove = validGames.g1[5]
                await truffleAssert.reverts(
                    StateChGamingInstance.enforcedBCMove(_gameID, validMove, { from: accounts[_p2REF] })
                    , "improper nonce"
                )
            })
        })
        describe("Modifier - opponentLastPlayed via enforcedBCMove", () => {
            it('allows p2 if p1 played last', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                let validMove = validGames.g1[4]
                await StateChGamingInstance.enforcedBCMove(_gameID, validMove, { from: accounts[_p2REF] })
            })
            it('allows p1 is p2 played last', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                let validMove = validGames.g1[4]
                await StateChGamingInstance.enforcedBCMove(_gameID, validMove, { from: accounts[_p2REF] })
                validMove = validGames.g1[5]
                await StateChGamingInstance.enforcedBCMove(_gameID, validMove, { from: accounts[_p1REF] })
            })

            it('doesnt allow p1 if p1 played last', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                let validMove = validGames.g1[4]
                await truffleAssert.reverts(
                    StateChGamingInstance.enforcedBCMove(_gameID, validMove, { from: accounts[_p1REF] })
                    , "msg sender is invalid"
                )
            })
            it('doesnt allow p2 if p2 played last', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                let validMove = validGames.g1[4]
                await StateChGamingInstance.enforcedBCMove(_gameID, validMove, { from: accounts[_p2REF] })
                validMove = validGames.g1[5]
                await truffleAssert.reverts(
                    StateChGamingInstance.enforcedBCMove(_gameID, validMove, { from: accounts[_p2REF] })
                    , "msg sender is invalid"
                )
            })
            it('doesnt allow anonymous address', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                let validMove = validGames.g1[4]
                await truffleAssert.reverts(
                    StateChGamingInstance.enforcedBCMove(_gameID, validMove, { from: accounts[3] })
                    , "msg sender is invalid"
                )
            })
        })

        describe("Modifier - senderLastPlayed via makeMoveTimed", () => {
            it('allows p1 is p1 played last', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                await StateChGamingInstance.makeMoveTimed(_gameID, { from: accounts[_p1REF] })
            })
            it('allows p2 if p2 played last', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                let validMove = validGames.g1[4]
                await StateChGamingInstance.enforcedBCMove(_gameID, validMove, { from: accounts[_p2REF] })
                validMove = validGames.g1[5]
                await StateChGamingInstance.makeMoveTimed(_gameID, { from: accounts[_p2REF] })
            })

            it('doesnt allow p2 if p1 played last', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                await truffleAssert.reverts(
                    StateChGamingInstance.makeMoveTimed(_gameID, { from: accounts[_p2REF] })
                    , "msg sender is invalid"
                )
            })
            it('doesnt allow p1 if p2 played last', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                let validMove = validGames.g1[4]
                await StateChGamingInstance.enforcedBCMove(_gameID, validMove, { from: accounts[_p2REF] })
                await truffleAssert.reverts(
                    StateChGamingInstance.makeMoveTimed(_gameID, { from: accounts[_p1REF] })
                    , "msg sender is invalid"
                )
            })
            it('doesnt allow anonymous address', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                await truffleAssert.reverts(
                    StateChGamingInstance.makeMoveTimed(_gameID, { from: accounts[3] })
                    , "msg sender is invalid"
                )
            })
        })
        describe("Function - enforcedBCMove", () => {
            it('should set state and blockNumber', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                let validMove = validGames.g1[4]
                await StateChGamingInstance.enforcedBCMove(_gameID, validMove, { from: accounts[_p2REF] })
                let storedGameInfo = (await StateChGamingInstance.allGames.call(_gameID))
                let currentBlockNum = await web3.eth.getBlockNumber()
                assert.equal(storedGameInfo.blockNum.toString(10), currentBlockNum, "enforced BC Move did not update blockNumber")
                let storedGameInfoState = new ethers.BigNumber("0x" + storedGameInfo.state.toString(16))
                let stateEqual = validMove.eq(storedGameInfoState)
                assert.equal(stateEqual, true, "did not set game state correctly")
            })
        })
        describe("Function - unenforcedBCMove", () => {
            it('should set state and unset blockNumber', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                let validMove = validGames.g1[4]
                await StateChGamingInstance.unenforcedBCMove(_gameID, validMove, { from: accounts[_p2REF] })
                let storedGameInfo = (await StateChGamingInstance.allGames.call(_gameID))
                assert.equal(storedGameInfo.blockNum.toString(10), 100000000000000000000000000000, "unenforced BC Move did not update blockNumber")
                let storedGameInfoState = new ethers.BigNumber("0x" + (storedGameInfo.state.toString(16).padStart(64, "0")))
                let stateEqual = validMove.eq(storedGameInfoState)
                assert.equal(stateEqual, true, "did not set game state correctly")
            })
        })
        describe("Function - makeMoveTimed", ()=>{
            it('should set the blockNumber', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                await StateChGamingInstance.makeMoveTimed(_gameID, { from: accounts[_p1REF] })
                let storedGameInfo = (await StateChGamingInstance.allGames.call(_gameID))
                let currentBlockNum = await web3.eth.getBlockNumber()
                assert.equal(storedGameInfo.blockNum.toString(10), currentBlockNum, "makeMoveTimed did not update blockNumber")
            })
        })
        describe("Function - makeMoveUntimed", ()=>{
            it('should unset the blockNumber', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                await StateChGamingInstance.makeMoveUntimed(_gameID, { from: accounts[_p1REF] })
                let storedGameInfo = (await StateChGamingInstance.allGames.call(_gameID))
                assert.equal(storedGameInfo.blockNum.toString(10), 100000000000000000000000000000, "makeMoveUntimed did not update blockNumber")
            })
        })
        describe("Function - payoutVictory", ()=>{
            it('if p1 won, payout p1', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                _boardState = validGames.g2[validGames.g2.length-1]
                let pars_signed_initBCMove = await SigLib.signPars(getinitBCMoveParams(), _p2REF)
                let ERC20Instance = await ERC20.at(_erc20Addr)
                await StateChGamingInstance.initBCMove(...pars_signed_initBCMove.pars, { from: accounts[_p1REF] })
                let balInit = await ERC20Instance.balanceOf(accounts[_p1REF])
                //assert.equal(balInit, 0, "player one did not start with anticipated balance")
                await StateChGamingInstance.payoutVictory(_gameID)
                let balPaid = await ERC20Instance.balanceOf(accounts[_p1REF])
                assert.equal(balPaid-balInit, _stakedAmount*2, "player one did not end with anticipated balance")
            })
            it('if p2 won, payout p2', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                _boardState = validGames.g1[validGames.g1.length-1]
                let pars_signed_initBCMove = await SigLib.signPars(getinitBCMoveParams(), _p2REF)
                let ERC20Instance = await ERC20.at(_erc20Addr)
                await StateChGamingInstance.initBCMove(...pars_signed_initBCMove.pars, { from: accounts[_p1REF] })
                let balInit = await ERC20Instance.balanceOf(accounts[_p2REF])
                assert.equal(balInit, 0, "player two did not start with anticipated balance")
                await StateChGamingInstance.payoutVictory(_gameID)
                let balPaid = await ERC20Instance.balanceOf(accounts[_p2REF])
                assert.equal(balPaid-balInit, _stakedAmount*2, "player two did not end with anticipated balance")
            })
            it('will revert if neither party won', async () => {
                let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
                _boardState = validGames.g1[50]//unfinished game
                let pars_signed_initBCMove = await SigLib.signPars(getinitBCMoveParams(), _p2REF)
                await StateChGamingInstance.initBCMove(...pars_signed_initBCMove.pars, { from: accounts[_p1REF] })
                await truffleAssert.reverts(
                    StateChGamingInstance.payoutVictory(_gameID)
                    , "neither player has won"
                )    
            })
        })

        //NOT IMPLIMENTED
        // describe("Function - payoutTimeout", ()=>{
        //     it('will revert if requested before min number of blocks hasnt passed')
        //     it('will pay p1 if p1 played last')
        //     it('will pay p2 if p2 played last')
        // })

    })
});
