const ValidatingContract = artifacts.require("ValidatingContract");
const ethers = require("ethers/utils");
// ganache-cli -m "smart fun man hind sea joke split cherry force season once pair"
const validGames = require("./Data/ValidGameData")
const truffleAssert = require('truffle-assertions');

contract('ValidatingContract', async (accounts) => {
    describe("Function - p1Won", async ()=>{
        it('should return true if black has no pieces', async () => {
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let redOnlyBoard = new ethers.BigNumber('0x0e0000000000000280828486898b8d8f909b9496000000000000000000000000')
            let p1WonResult = await ValidatingContractInstance.p1Won(redOnlyBoard)
            assert.equal(p1WonResult, true, "not correctly indicating that red won")
        })
        it('should return false if red has no pieces', async () => {
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let blackOnlyBoard = new ethers.BigNumber('0x0e00000000000002000000000000000000000000a9a4adafb0b2b4b6b9bbbdbf')
            let p1WonResult = await ValidatingContractInstance.p1Won(blackOnlyBoard)
            assert.equal(p1WonResult, false, "not correctly indicating that black won")
        })
        it('should revert if both players have pieces', async () => {
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let unfinishedBoard = new ethers.BigNumber('0x0e0000000000000280828486898b8d8f909b9496a9a4adafb0b2b4b6b9bbbdbf')
            await truffleAssert.reverts(
                ValidatingContractInstance.p1Won(unfinishedBoard)
                ,"neither player has won"
            )
        })
    })
    describe("Function - p1MovedLast", async ()=>{
        it('should return true if red moved last', async () => {
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let redMovedLastBoard = new ethers.BigNumber('0x0a0000000000000380828486898b8d8f90a29496a9a4adafb0b2b4b6b9bbbdbf')
            let p1MovedLastResult = await ValidatingContractInstance.p1MovedLast(redMovedLastBoard)
            assert.equal(p1MovedLastResult,true, "not correctly indicating red moved last")

        })
        it('should return true if black moved last', async () => {
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let blackMovedLastBoard = new ethers.BigNumber('0x0e0000000000000280828486898b8d8f909b9496a9a4adafb0b2b4b6b9bbbdbf')
            let p1MovedLastResult = await ValidatingContractInstance.p1MovedLast(blackMovedLastBoard)
            assert.equal(p1MovedLastResult,false, "not correctly indicating black moved last")
        })
        it('should revert if the indicated piece played is out of bounds too high', async () => {
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let invalidPieceNumTooHigh = new ethers.BigNumber('0x190000000000000280828486898b8d8f909b9496a9a4adafb0b2b4b6b9bbbdbf')
            await truffleAssert.reverts(
                ValidatingContractInstance.p1MovedLast(invalidPieceNumTooHigh)
                ,"invalid piece number"
            )
        })
        it('should revert if the indicated piece played is 0', async () => {
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let invalidPieceNumTooLow = new ethers.BigNumber('0x000000000000000280828486898b8d8f909b9496a9a4adafb0b2b4b6b9bbbdbf')
            await truffleAssert.reverts(
                ValidatingContractInstance.p1MovedLast(invalidPieceNumTooLow)
                ,"invalid piece number"
            )
        })
    })
    describe("Function - gameTied", async ()=>{
        it('is not implimented')
    })


    describe("Function - validStateUpdate", async ()=>{
        describe("Game#1", async ()=>{
            let gameStates = validGames.g1
            for (let i = 1; i < gameStates.length;i++){
                it(`should allow move# ${i}`, async () => {
                    let ValidatingContractInstance = await ValidatingContract.deployed()
                    let validMove = await ValidatingContractInstance.validStateUpdate(gameStates[i-1],gameStates[i])
                    assert.equal(validMove, true,`move# ${i} was invalid`)
                })
            }  
        })
        describe("Game#2", async ()=>{
            let gameStates = validGames.g2
            for (let i = 1; i < gameStates.length;i++){
                it(`should allow move# ${i}`, async () => {
                    let ValidatingContractInstance = await ValidatingContract.deployed()
                    let validMove = await ValidatingContractInstance.validStateUpdate(gameStates[i-1],gameStates[i])
                    assert.equal(validMove, true,`move# ${i} was invalid`)
                })
            }  
        })
        it("shouldn't allow the same nonce to be submitted", async ()=>{
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let oldState = new ethers.BigNumber('0x090000000000000180828486898b8d8f99929496a9abadafb0b2b4b6b9bbbdbf')
            let newState = new ethers.BigNumber('0x0d0000000000000180828486898b8d8f99929496a2abadafb0b2b4b6b9bbbdbf')
            await truffleAssert.reverts(
                ValidatingContractInstance.validStateUpdate(oldState,newState)
                ,"improper nonce"
            )
        })
        it("shouldn't allow a nonce to decrease", async ()=>{
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let oldState = new ethers.BigNumber('0x090000000000000180828486898b8d8f99929496a9abadafb0b2b4b6b9bbbdbf')
            let newState = new ethers.BigNumber('0x0d0000000000000080828486898b8d8f99929496a2abadafb0b2b4b6b9bbbdbf')
            await truffleAssert.reverts(
                ValidatingContractInstance.validStateUpdate(oldState,newState)
                ,"improper nonce"
            )
        })
        it("shouldn't allow a nonce to go up more than 1", async ()=>{
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let oldState = new ethers.BigNumber('0x090000000000000180828486898b8d8f99929496a9abadafb0b2b4b6b9bbbdbf')
            let newState = new ethers.BigNumber('0x0d0000000000000180828486898b8d8f99929496a2abadafb0b2b4b6b9bbbdbf')
            await truffleAssert.reverts(
                ValidatingContractInstance.validStateUpdate(oldState,newState)
                ,"improper nonce"
            )
        })
        it("shouldnt allow the same color piece to be moved twice in a row", async ()=>{
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let oldState = new ethers.BigNumber('0x090000000000000180828486898b8d8f99929496a9abadafb0b2b4b6b9bbbdbf')
            let newState = new ethers.BigNumber('0x0a0000000000000280828486898b8d8f999b9496a9abadafb0b2b4b6b9bbbdbf')
            await truffleAssert.reverts(
                ValidatingContractInstance.validStateUpdate(oldState,newState)
                ,"moving wrong colored piece"
            )
        })
        it("shouldn't allow an active piece to arbitrarily change to a queen", async ()=>{
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let oldState = new ethers.BigNumber('0x090000000000000180828486898b8d8f99929496a9abadafb0b2b4b6b9bbbdbf')
            let newState = new ethers.BigNumber('0x0d0000000000000280828486898b8d8f99929496e2abadafb0b2b4b6b9bbbdbf')
            await truffleAssert.reverts(
                ValidatingContractInstance.validStateUpdate(oldState,newState)
                ,"improper queening"
            )
        })
        it("shouldn't allow the specified pieceNum moved to be zero", async ()=>{
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let oldState = new ethers.BigNumber('0x090000000000000180828486898b8d8f99929496a9abadafb0b2b4b6b9bbbdbf')
            let newState = new ethers.BigNumber('0x000000000000000280828486898b8d8f99929496a2abadafb0b2b4b6b9bbbdbf')
            await truffleAssert.reverts(
                ValidatingContractInstance.validStateUpdate(oldState,newState)
                ,"invalid piece number"
            )
        })
        it("shouldn't allow the specified pieceNum moved to be greater than 24", async ()=>{
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let oldState = new ethers.BigNumber('0x090000000000000180828486898b8d8f99929496a9abadafb0b2b4b6b9bbbdbf')
            let newState = new ethers.BigNumber('0x190000000000000280828486898b8d8f99929496a2abadafb0b2b4b6b9bbbdbf')
            await truffleAssert.reverts(
                ValidatingContractInstance.validStateUpdate(oldState,newState)
                ,"invalid piece number"
            )
        })
        it("shouldn't allow a nonqueen to move backwards", async ()=>{
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let oldState =          new ethers.BigNumber('0x0400000000000047000000f400000000000000009000000000000000d90096bf')
            let queenedNewState =   new ethers.BigNumber('0x1500000000000048000000f400000000000000009000000000000000e20096bf')
            let unqueenedNewState = new ethers.BigNumber('0x1500000000000048000000f400000000000000009000000000000000a20096bf')
            let validMove = await ValidatingContractInstance.validStateUpdate(oldState,queenedNewState)

            assert.equal(validMove, true, "bad test setup - move failed before de-queening")
            await truffleAssert.reverts(
                ValidatingContractInstance.validStateUpdate(oldState,unqueenedNewState)
                ,"normal pieces can't go backwards"
            )
        })
        it("should only have four possible moves for a queen with nobody nearby", async ()=>{
            let ValidatingContractInstance = await ValidatingContract.deployed()
            let oldState =      new ethers.BigNumber('0x0400000000000047000000c000000000000000000000000000000000d9000000')
            let validNewState = new ethers.BigNumber('0x1500000000000048000000c000000000000000000000000000000000e2000000')
            let validMove = await ValidatingContractInstance.validStateUpdate(oldState,validNewState)
            assert.equal(validMove, true, "bad test setup - supposedly good move failed")
            let pieceInt = parseInt("e2",16)
            let positionlessPieceInt = pieceInt - (pieceInt % 64)
            let numValidMoves = 0;
            for (let i = 0; i< 64; i++){
                let testPosPieceInt = positionlessPieceInt+i
                let testPosPieceStr = testPosPieceInt.toString(16)
                let testStateStr = "0x1500000000000048000000c000000000000000000000000000000000"+testPosPieceStr+"000000"
                let testStateBN = new ethers.BigNumber(testStateStr)
                try {
                    let validMove = await ValidatingContractInstance.validStateUpdate(oldState,testStateBN)
                    if(validMove){
                        // console.log("a valid move ends in state:",testStateBN )
                        numValidMoves++
                    }
                }catch{}
            }
            assert.equal(4, numValidMoves, "the correct number of valid moves were not computed")
        })
    })
})
