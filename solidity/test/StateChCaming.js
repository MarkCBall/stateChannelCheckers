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
        let _stakedAmount
        let _erc20Addr
        let _gameID
        let _p1REF
        let _p2REF
        let _vcAddr
        let _blocksPerTurn

        let STATE_CH_GAME_ADDRESS
        
        let getParametersSigned = () => {
            return {
                pars:[_stakedAmount,_erc20Addr,_gameID,accounts[_p1REF],accounts[_p2REF],_vcAddr,_blocksPerTurn],
                parTypes:['uint','address','uint','address','address','address','uint'],
            }
        }

        beforeEach(async ()=>{
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
            var ERC20Instance = await ERC20.new((_stakedAmount*100),{from:accounts[_p1REF]})
            _erc20Addr = ERC20Instance.address;
            await ERC20Instance.transfer(accounts[_p2REF],_stakedAmount, {from:accounts[_p1REF]})
            await ERC20Instance.approve(STATE_CH_GAME_ADDRESS,_stakedAmount, {from:accounts[_p1REF]})
            await ERC20Instance.approve(STATE_CH_GAME_ADDRESS,_stakedAmount, {from:accounts[_p2REF]})



            // console.log("statech addr1 ",STATE_CH_GAME_ADDRESS )
            // console.log(await ERC20Instance.balanceOf.call(accounts[_p1REF]))
            // console.log(await ERC20Instance.allowance.call(accounts[_p1REF],StateChGamingInstance.address))
            // function allowance(address tokenOwner, address spender)

        })
        
        it('should set gameData correctly', async () => {
            let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
            let pars_signed_initGame = await SigLib.signPars(getParametersSigned(), _p1REF)
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
            let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
            let pars_signed_initGame = await SigLib.signPars(getParametersSigned(), _p1REF)
            //SHOULD FAIL BECAUSE r = s to force signature to be incorrect
            pars_signed_initGame.pars[8] = pars_signed_initGame.pars[9]
            await truffleAssert.reverts(
                StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
                ,"a player didnt sign or send"
            )
        })
        it('shouldnt work if sent by a third party', async () => {
            let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
            let pars_signed_initGame = await SigLib.signPars(getParametersSigned(), _p1REF)
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
            let pars_signed_initGame = await SigLib.signPars(getParametersSigned(), _p1REF)
            await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})

            //proof everything else works to make a second gameID
            _gameID = 2
            pars_signed_initGame = await SigLib.signPars(getParametersSigned(), _p1REF)
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
            let pars_signed_initGame = await SigLib.signPars(getParametersSigned(), _p1REF)
            await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})

            //proof everything else works to make a second gameID
            _gameID = 2
            pars_signed_initGame = await SigLib.signPars(getParametersSigned(), _p1REF)
            await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})

            //but it fails now because it only had funds for transferFrom twice
            _gameID = 3
            await truffleAssert.reverts(
                StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
            )
        })
    })











    // describe("Function - initBCMove", ()=>{
    //     it('should update the game blockNum and state')
    //     it('shouldnt work with incorrect signature')
    //     it('shouldnt work if sent by a third party')//,()=>{console.log("y")})
    //     it('shouldnt work if the nonce is not higher than saved nonce')
    // })

    // describe("Function - makeMoveTimed", ()=>{
    //     it('should set the blockNumber')
    // })
    // describe("Function - makeMoveUntimed", ()=>{
    //     it('should unset the blockNumber')
    // })
    // describe("Function - enforcedBCMove", ()=>{
    //     it('should set state and blockNumber')
    // })
    // describe("Function - unenforcedBCMove", ()=>{
    //     it('should set state and unset blockNumber')
    // })
    // describe("Function - payoutVictory", ()=>{
    //     it('if p1 won, payout p1')
    //     it('if p2 won, payout p2')
    //     it('will revert if validating contract reverts')//HOW TO TEST THIS?
    // })
    // describe("Function - payoutTimeout", ()=>{
    //     it('will revert if requested before min number of blocks hasnt passed')
    //     it('will pay p1 if p1 played last')
    //     it('will pay p2 if p2 played last')
    // })

    // describe("Modifier - opponentLastPlayed via enforcedBCMove", ()=>{
    //     it('allows p1 is p2 played last')
    //     it('allows p2 if p1 played last')
    //     it('doesnt allow p1 if p1 played last')
    //     it('doesnt allow p2 if p2 played last')
    //     it('doesnt allow anonymous address')
    // })
    // describe("Modifier - senderLastPlayed via makeMoveTimed", ()=>{
    //     it('allows p1 is p1 played last')
    //     it('allows p2 if p2 played last')
    //     it('doesnt allow p2 if p1 played last')
    //     it('doesnt allow p1 if p2 played last')
    //     it('doesnt allow anonymous address')
    // })
    // describe("Modifier - validMove via enforcedBCMove", ()=>{
    //     it('allows valid moves')
    //     it('doesnt allow invalid moves')
    // })
});
