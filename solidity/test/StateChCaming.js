const StateChGaming = artifacts.require("StateChGaming");
const ValidatingContract = artifacts.require("ValidatingContract");
const ERC20 = artifacts.require("ERC20");
// BigNumber  
// const BN = require("bn.js")
const ethers = require("ethers/utils");
// ganache-cli -m "smart fun man hind sea joke split cherry force season once pair"

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
    })
    




    // describe("Function - initGame", async ()=>{
        
    //     it('should set gameData correctly', async () => {
    //         let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
    //         let pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
    //         await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
    //         let response = await StateChGamingInstance.allGames.call(_gameID)
    //         assert.equal(response.gamePayout, _stakedAmount*2, "gamePayout not set correctly" )
    //         assert.equal(response.tokenAddr,_erc20Addr , "tokenAddr not set correctly")
    //         //equality not working on BN, comparing the hash of the BNs instead
    //         assert.equal(web3.utils.keccak256(response.state), web3.utils.keccak256(web3.utils.toBN('0x000000000000000080828486898b8d8f90929496a9abadafb0b2b4b6b9bbbdbf'))  , "state not set to uninitiated board")
    //         assert.equal(response.p1,accounts[_p1REF] , "p1Addr not set correctly")
    //         assert.equal(response.p2,accounts[_p2REF] , "p2Addr not set correctly")
    //         assert.equal(response.vcAddr,_vcAddr , "validating contract address not set correctly")
    //         assert.equal(response.blocksPerTurn,_blocksPerTurn , "blocksPerTurn not set correctly")
    //     })
    //     it('shouldnt work with incorrect signature', async () => {
    //         let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
    //         let pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
    //         //SHOULD FAIL BECAUSE r = s to force signature to be incorrect
    //         pars_signed_initGame.pars[8] = pars_signed_initGame.pars[9]
    //         await truffleAssert.reverts(
    //             StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
    //             ,"a player didnt sign or send"
    //         )
    //     })
    //     it('shouldnt work without a p1 and p2 addresses signed or sent from', async () => {
    //         let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
    //         let pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
    //         //SHOULD FAIL BECAUSE sending from account[3]
    //         await truffleAssert.reverts(
    //             StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[3]})
    //             ,"a player didnt sign or send"
    //         )
    //     })
    //     it('should fail when if the requested gameID exists', async () => {
    //         //approve copious amounts of ERC20 token transferFrom
    //         let ERC20Instance = await ERC20.at(_erc20Addr)
    //         await ERC20Instance.transfer(accounts[_p2REF],_stakedAmount*10, {from:accounts[_p1REF]})
    //         await ERC20Instance.approve(STATE_CH_GAME_ADDRESS,_stakedAmount*10, {from:accounts[_p1REF]})
    //         await ERC20Instance.approve(STATE_CH_GAME_ADDRESS,_stakedAmount*10, {from:accounts[_p2REF]})
    //         let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
    //         let pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
    //         await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
    //         //proof everything else works to make a second gameID
    //         _gameID = 2
    //         pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
    //         await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
    //         //but it fails without changing gameID before the next initGame
    //         await truffleAssert.reverts(
    //             StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
    //             ,"can not have duplicate gameIDs"
    //         )
    //     })
    //     it('shouldnt init a channel unless the funds were transferFrom', async () => {
    //         //approve enough ERC20 tokens for initGame only twice
    //         let ERC20Instance = await ERC20.at(_erc20Addr)
    //         await ERC20Instance.transfer(accounts[_p2REF],_stakedAmount*2, {from:accounts[_p1REF]})
    //         await ERC20Instance.approve(STATE_CH_GAME_ADDRESS,_stakedAmount*2, {from:accounts[_p1REF]})
    //         await ERC20Instance.approve(STATE_CH_GAME_ADDRESS,_stakedAmount*2, {from:accounts[_p2REF]})
    //         let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
    //         let pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
    //         await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
    //         //proof everything else works to make a second gameID
    //         _gameID = 2
    //         pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
    //         await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
    //         //but it fails now because it only had funds for transferFrom twice
    //         _gameID = 3
    //         await truffleAssert.reverts(
    //             StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
    //         )
    //     })
    // })











    // describe("Function - initBCMove", ()=>{
    //     //mock data
    //     let _state

    //     let getinitBCMoveParams = () => {
    //         return {
    //             pars:[_gameID,_state],//INCLUDE GAMEID?
    //             parTypes:['uint','uint'],
    //         }
    //     }

    //     beforeEach(async ()=>{
    //         //BN crashes with inputs this high?
    //         _state = new ethers.BigNumber('0x0a0000000000000380828486898b8d8f909b9d96a9aba4afb0b2b4b6b9bbbdbf')
    //         let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
    //         let pars_signed_initGame = await SigLib.signPars(getinitGameParams(), _p1REF)
    //         await StateChGamingInstance.initGame(...pars_signed_initGame.pars, {from:accounts[_p2REF]})
    //     })
        


    //     // it('should update the game blockNum and state',async () =>{
    //     //     let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
    //     //     let pars_signed_initBCMove = await SigLib.signPars(getinitBCMoveParams(), _p2REF)
    //     //     await StateChGamingInstance.initBCMove(...pars_signed_initBCMove.pars, {from:accounts[_p1REF]})
    //     //     let response = await StateChGamingInstance.allGames.call(_gameID)


    //     //     console.log("res.st", web3.utils.toHex(response.state))
    //     //     console.log("_state", _state.toHexString())
    //     //     // console.log("res.st", web3.utils.keccak256(response.state))
    //     //     // console.log("_state", web3.utils.keccak256(_state))
    //     //     //assume its correct - BN is broken!
    //     //     // assert.equal(_state.toHexString(),web3.utils.toHex(response.state) , "state not set correctly")
    //     //     assert.equal(response.blockNum, await web3.eth.getBlockNumber(),"blockNum not set correctly")
    //     // })
    //     it('shouldnt work with incorrect signature',async () =>{
    //         let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
    //         let pars_signed_initBCMove = await SigLib.signPars(getinitBCMoveParams(), _p2REF)
    //         //SHOULD FAIL BECAUSE r = s to force signature to be incorrect
    //         pars_signed_initBCMove.pars[3] = pars_signed_initBCMove.pars[4]
    //         await truffleAssert.reverts(
    //             StateChGamingInstance.initBCMove(...pars_signed_initBCMove.pars, {from:accounts[_p1REF]})
    //             ,"a player didnt sign or send"
    //         )
    //     })
    //     it('shouldnt work if sent by a third party',async () =>{
    //         let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
    //         let pars_signed_initBCMove = await SigLib.signPars(getinitBCMoveParams(), _p2REF)
    //         //SHOULD FAIL BECAUSE sending from account[3]
    //         await truffleAssert.reverts(
    //             StateChGamingInstance.initBCMove(...pars_signed_initBCMove.pars, {from:accounts[3]})
    //             ,"a player didnt sign or send"
    //         )
    //     })
    //     it('shouldnt work if the nonce is not higher than saved nonce',async () =>{
    //         let StateChGamingInstance = await StateChGaming.at(STATE_CH_GAME_ADDRESS)
    //         let pars_signed_initBCMove = await SigLib.signPars(getinitBCMoveParams(), _p2REF)
    //         await StateChGamingInstance.initBCMove(...pars_signed_initBCMove.pars, {from:accounts[_p1REF]})

    //         await truffleAssert.reverts(
    //             StateChGamingInstance.initBCMove(...pars_signed_initBCMove.pars, {from:accounts[_p1REF]})
    //             ,"a new board must be at a higher turnNum"
    //         )
    //     })
    // })


    it("should be another testing file",async ()=>{
        var ValidatingContractInstance = await ValidatingContract.new()

        let STATE = new ethers.BigNumber('0x0a0000000000000380828486898b8d8f909b9d96a9aba4afb0b2b4b6b9bbbdbf')
        let n
        // for (n =0; n<32;n++){
        //     console.log(`byte# ${n} is:`,await ValidatingContractInstance.getByteAt.call(n, STATE))
        // }
        // console.log("---------------------")

        // for (n = 1; n<25;n++){
        //     console.log(`piece# ${n} is:`,await ValidatingContractInstance.getPieceIntByNum.call(n, STATE))
        // }

        // console.log("nonce is:",await ValidatingContractInstance.getNonce.call(STATE))
        // console.log("getPieceNumMoved is:",await ValidatingContractInstance.getPieceNumMoved.call(STATE))
        // console.log("getPieceNumJumped is:",await ValidatingContractInstance.getPieceNumJumped.call(STATE))

        
                        // for (n = 1; n<25;n++){
                        //     console.log(`piece# ${n} is:`,await ValidatingContractInstance.getPieceStructByNum.call(n, STATE))
                        // }
        // console.log("red has pieces:",await ValidatingContractInstance.redHasPieces.call(STATE))


        // let num = 3  
        // console.log(`zero piece num ${num}`,await ValidatingContractInstance.XORPieceByte(STATE, num, await ValidatingContractInstance.getPieceByNum(STATE, num)))
        // // function setPieceByte(uint data, uint pieceNum, uint bte) public pure returns(uint){

//move to library
let validMovesStrs= {
    0:"0x000000000000000080828486898b8d8f90929496a9abadafb0b2b4b6b9bbbdbf",
    1:"0x090000000000000180828486898b8d8f99929496a9abadafb0b2b4b6b9bbbdbf",
    2:"0x0d0000000000000280828486898b8d8f99929496a2abadafb0b2b4b6b9bbbdbf",
    3:"0x0a0000000000000380828486898b8d8f999b9496a2abadafb0b2b4b6b9bbbdbf",
    4:"0x0d0900000000000480828486898b8d8f009b949690abadafb0b2b4b6b9bbbdbf",
    5:"0x0b0000000000000580828486898b8d8f009b9d9690abadafb0b2b4b6b9bbbdbf",
    6:"0x0e0000000000000680828486898b8d8f009b9d9690a2adafb0b2b4b6b9bbbdbf",
    7:"0x0a0e00000000000780828486898b8d8f00a99d969000adafb0b2b4b6b9bbbdbf",
    8:"0x120a00000000000880828486898b8d8f00009d969000adafb0a0b4b6b9bbbdbf",
    9:"0x06000000000000098082848689928d8f00009d969000adafb0a0b4b6b9bbbdbf",
    10:"0x120000000000000a8082848689928d8f00009d969000adafb099b4b6b9bbbdbf",
    11:"0x061200000000000b8082848689a08d8f00009d969000adafb000b4b6b9bbbdbf",
    12:"0x0f0000000000000c8082848689a08d8f00009d969000a4afb000b4b6b9bbbdbf",
    13:"0x0b0f00000000000d8082848689a08d8f0000ab96900000afb000b4b6b9bbbdbf",
    14:"0x130b00000000000e8082848689a08d8f00000096900000afb000a2b6b9bbbdbf",
    15:"0x060000000000000f8082848689a98d8f00000096900000afb000a2b6b9bbbdbf",
    16:"0x13000000000000108082848689a98d8f00000096900000afb0009bb6b9bbbdbf",
    17:"0x06000000000000118082848689b28d8f00000096900000afb0009bb6b9bbbdbf",
    18:"0x16000000000000128082848689b28d8f00000096900000afb0009bb6b9b4bdbf",
    19:"0x06000000000000138082848689fb8d8f00000096900000afb0009bb6b9b4bdbf",
    20:"0x14000000000000148082848689fb8d8f00000096900000afb0009badb9b4bdbf",
    21:"0x0c000000000000158082848689fb8d8f0000009d900000afb0009badb9b4bdbf",
    22:"0x14000000000000168082848689fb8d8f0000009d900000afb0009ba4b9b4bdbf",
    23:"0x06160000000000178082848689ed8d8f0000009d900000afb0009ba4b900bdbf",
    24:"0x140c0000000000188082848689ed8d8f00000000900000afb0009b96b900bdbf",
    25:"0x06000000000000198082848689e48d8f00000000900000afb0009b96b900bdbf",
    26:"0x110000000000001a8082848689e48d8f00000000900000afa9009b96b900bdbf",
    27:"0x061300000000001b8082848689d28d8f00000000900000afa9000096b900bdbf",
    28:"0x110000000000001c8082848689d28d8f00000000900000afa2000096b900bdbf",
    29:"0x020000000000001d808b848689d28d8f00000000900000afa2000096b900bdbf",
    30:"0x100000000000001e808b848689d28d8f00000000900000a6a2000096b900bdbf",
    31:"0x020000000000001f8094848689d28d8f00000000900000a6a2000096b900bdbf",
    32:"0x11000000000000208094848689d28d8f00000000900000a69b000096b900bdbf",
    33:"0x06110000000000218094848689e48d8f00000000900000a600000096b900bdbf",
    34:"0x15000000000000228094848689e48d8f00000000900000a600000096b200bdbf",
    35:"0x06000000000000238094848689ed8d8f00000000900000a600000096b200bdbf",
    36:"0x15000000000000248094848689ed8d8f00000000900000a600000096a900bdbf",
    37:"0x06100000000000258094848689df8d8f000000009000000000000096a900bdbf",
    38:"0x15000000000000268094848689df8d8f000000009000000000000096a200bdbf",
    39:"0x030000000000002780948b8689df8d8f000000009000000000000096a200bdbf",
    40:"0x140700000000002880948b8689df008f0000000090000000000000c4a200bdbf",
    41:"0x0200000000000029809b8b8689df008f0000000090000000000000c4a200bdbf",
    42:"0x150200000000002a80008b8689df008f0000000090000000000000c49400bdbf",
    43:"0x060000000000002b80008b8689d6008f0000000090000000000000c49400bdbf",
    44:"0x140300000000002c8000008689d6008f0000000090000000000000d29400bdbf",
    45:"0x040000000000002d8000008d89d6008f0000000090000000000000d29400bdbf",
    46:"0x140000000000002e8000008d89d6008f0000000090000000000000cb9400bdbf",
    47:"0x050000000000002f8000008d92d6008f0000000090000000000000cb9400bdbf",
    48:"0x14050000000000308000008d00d6008f0000000090000000000000d99400bdbf",
    49:"0x06000000000000318000008d00dd008f0000000090000000000000d99400bdbf",
    50:"0x14000000000000328000008d00dd008f0000000090000000000000e29400bdbf",
    51:"0x06000000000000338000008d00e4008f0000000090000000000000e29400bdbf",
    52:"0x14000000000000348000008d00e4008f0000000090000000000000eb9400bdbf",
    53:"0x04000000000000358000009600e4008f0000000090000000000000eb9400bdbf",
    54:"0x1406000000000036800000960000008f0000000090000000000000dd9400bdbf",
    55:"0x0414000000000037800000a40000008f0000000090000000000000009400bdbf",
    56:"0x1500000000000038800000a40000008f0000000090000000000000008b00bdbf",
    57:"0x0100000000000039890000a40000008f0000000090000000000000008b00bdbf",
    58:"0x150000000000003a890000a40000008f000000009000000000000000c200bdbf",
    59:"0x040000000000003b890000ab0000008f000000009000000000000000c200bdbf",
    60:"0x170000000000003c890000ab0000008f000000009000000000000000c200b4bf",
    61:"0x010000000000003d920000ab0000008f000000009000000000000000c200b4bf",
    62:"0x150000000000003e920000ab0000008f000000009000000000000000cb00b4bf",
    63:"0x040000000000003f920000b20000008f000000009000000000000000cb00b4bf",
    64:"0x1501000000000040000000b20000008f000000009000000000000000d900b4bf",
    65:"0x0800000000000041000000b200000096000000009000000000000000d900b4bf",
    66:"0x1700000000000042000000b200000096000000009000000000000000d900adbf",
    67:"0x0400000000000043000000fb00000096000000009000000000000000d900adbf",
    68:"0x1700000000000044000000fb00000096000000009000000000000000d900a4bf",
    69:"0x0800000000000045000000fb0000009d000000009000000000000000d900a4bf",
    70:"0x1708000000000046000000fb00000000000000009000000000000000d90096bf",
    71:"0x0400000000000047000000f400000000000000009000000000000000d90096bf",
    72:"0x1500000000000048000000f400000000000000009000000000000000e20096bf",
    73:"0x0400000000000049000000eb00000000000000009000000000000000e20096bf",
    74:"0x150400000000004a0000000000000000000000009000000000000000f40096bf",
    }
    let states = []
    for (let y = 0 ; y<75;y++){
        states[y]= new ethers.BigNumber(validMovesStrs[y])
    }

    

        for (let x = 0; x<74;x++){
            console.log(`move#${x+1} worked:`,await ValidatingContractInstance.validStateUpdate(states[x],states[x+1]))
        }
        
        // console.log(await ValidatingContractInstance.validStateUpdate(states[2],states[3]))
        
    })









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
