pragma solidity ^0.5.0;

contract ArbitrateCheckers {

    mapping (uint => gameState) public latestState;

    address mainContractAddress = "0xsssss"

    struct gameState {
        uint blockNum;
        uint boardState;
        uint latestMove;
        bool addr1MovedLast;
    }

    //refactor this and test it
    function getOriginAddress(bytes32 signedMessage, uint8 v, bytes32 r, bytes32 s) public pure returns(address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, signedMessage));
        return ecrecover(prefixedHash, v, r, s);
    }

    function PostMove(uint gameID, uint blockNum, uint latestState,uint currentMove,uint8 v, bytes32 r, bytes32 s) public {
        address addr1 =;
        address addr2 =;
        
        require (blockNum > latestState[gameID].blockNum)
        
        require(validateMove(xxxxxx))
                

        //check if the signature is valid and the msg.sender is the other address
        bytes32 DataHash = keccak256(abi.encodePacked(gameID, blockNum, latestState, currentMove));
        address calcAddr = getOriginAddress(DataHash, v1,r1,s1);
        require(addr1 == calcAddr || addr1 == msg.sender);
        require(addr2 == calcAddr || addr2 == msg.sender);

        latestState[gameID].blockNum = block.number;
        latestState[gameID].boardState = latestState;
        latestState[gameID].latestMove = currentMove;
        latestState[gameID].addr1MovedLast = (addr1 == calcAddr)

        set gameState
    }
    
    
function CounterMove(uint _move)
    //calculateState
    // setGameState


function CounterMoveAndPost(uint _move, ...)
    //calls CounterMove
    //call PostMove

//getters after PostMove and CounterMoveAndPost

function noCounterInTime()
    if last move was >100 blocks ago
        winnerTriggers(xxx)

function winnerTriggered
    //main contract payout

function calculateState
    //validateMove
    //set state
        //make queen as appropriate

function validateMove
    return (isForward || isAttack || isDouble ||
    (isQueen && (isBack || isBackAttack)))
    //if simple move
    //if firstDoublemove
    //if attack
    //if queenBack
    //if queenAttackBackwards
        //return true
    //return false

//msg.sender + sig means we have two party signatures
function validateSig //modifier???
    address signingAddr = addressFromSig(xxx)
    bool msgSenderAddr1
    if msg.sender == address1{
        msgSenderAddr1 = true;
        require signingAddr = address2
    }
    else{
        require (msg.sender == address2 && signingAddr = address2)
    }

function addressFromSig
    //returns address
