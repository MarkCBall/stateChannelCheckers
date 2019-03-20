const StateChGaming = artifacts.require("StateChGaming");
const ValidatingContract = artifacts.require("ValidatingContract");
const ERC20 = artifacts.require("ERC20");
// const ERC20 = artifacts.require("ERC20");


const truffleAssert = require('truffle-assertions');
const SigLib = require("../Library/SigLib")

contract('StateChGaming', async (accounts) => {
    // beforeEach(async function(){
    //         this.contract = await contractname.new({from:owner})
    //     })
    describe("Function - initGame", async ()=>{
        //mock data
        let _stakedAmount = 1000000
        let _erc20Addr
        let _gameID = 1
        let _p1REF = 0//should be addr
        let _p2REF = 1//should be addr
        let _vcAddr //= await ValidatingContract.deployed().address;
        let _blocksPerTurn = 100

        let getParametersSigned = () => {
            return {
                pars:[_stakedAmount,_erc20Addr,_gameID,accounts[_p1REF],accounts[_p2REF],_vcAddr,_blocksPerTurn],
                parTypes:['uint','address','uint','address','address','address','uint'],
            }
        }

        // let StateChGamingInstance = await StateChGaming.deployed();
        //WHY CAN'T THIS BE INSIDE IT?
        it('should set gameData correctly', async () => {
            var ValidatingContractInstance = await ValidatingContract.deployed()
            _vcAddr = ValidatingContractInstance.address;
            var ERC20Instance = await ERC20.new(_stakedAmount*100,{from:accounts[_p1REF]})
            _erc20Addr = ERC20Instance.address;



            await ERC20Instance.transfer(accounts[_p2REF],_stakedAmount, {from:accounts[_p1REF]})
            await ERC20Instance.approve(ValidatingContract.address,_stakedAmount, {from:accounts[_p1REF]})
            await ERC20Instance.approve(ValidatingContract.address,_stakedAmount, {from:accounts[_p2REF]})


            let pars_signed_initGame = await SigLib.signPars(getParametersSigned(), _p1REF)
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
            let pars_signed_initGame = await SigLib.signPars(getParametersSigned(), _p1REF)
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
            let pars_signed_initGame = await SigLib.signPars(getParametersSigned(), _p1REF)
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
            let pars_signed_initGame = await SigLib.signPars(getParametersSigned(), _p1REF)
            let StateChGamingInstance = await StateChGaming.deployed();
            //sending from account[3] - SHOULD FAIL
            await truffleAssert.reverts(
                StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
                ,"can not have duplicate gameIDs"
            )
        })
        it('shouldnt init a channel unless funds were withdrawn')
        //allowance has already been used in other it block - SHOULD FAIL due to ERC20 transferFrom
    })
    describe("Function - initBCMove", ()=>{
        it('should update the game blockNum and state')
        it('shouldnt work with incorrect signature')
        it('shouldnt work if sent by a third party')
        it('shouldnt work if the nonce is not higher than saved nonce')
    })

    describe("Function - makeMoveTimed", ()=>{
        it('should set the blockNumber')
    })
    describe("Function - makeMoveUntimed", ()=>{
        it('should unset the blockNumber')
    })
    describe("Function - enforcedBCMove", ()=>{
        it('should set state and blockNumber')
    })
    describe("Function - unenforcedBCMove", ()=>{
        it('should set state and unset blockNumber')
    })
    describe("Function - payoutVictory", ()=>{
        it('if p1 won, payout p1')
        it('if p2 won, payout p2')
        it('will revert if validating contract reverts')//HOW TO TEST THIS?
    })
    describe("Function - payoutTimeout", ()=>{
        it('will revert if requested before min number of blocks hasnt passed')
        it('will pay p1 if p1 played last')
        it('will pay p2 if p2 played last')
    })

    describe("Modifier - opponentLastPlayed via enforcedBCMove", ()=>{
        it('allows p1 is p2 played last')
        it('allows p2 if p1 played last')
        it('doesnt allow p1 if p1 played last')
        it('doesnt allow p2 if p2 played last')
        it('doesnt allow anonymous address')
    })
    describe("Modifier - senderLastPlayed via makeMoveTimed", ()=>{
        it('allows p1 is p1 played last')
        it('allows p2 if p2 played last')
        it('doesnt allow p2 if p1 played last')
        it('doesnt allow p1 if p2 played last')
        it('doesnt allow anonymous address')
    })
    describe("Modifier - validMove via enforcedBCMove", ()=>{
        it('allows valid moves')
        it('doesnt allow invalid moves')
    })
});
