pragma solidity ^0.5.0;


import "./SigLib.sol";
//import "./StateChannel.sol";

contract CheckersArbitration {

    mapping (uint => gameState) public latestState;

    //address mainContractAddress = "0xsssss";

    struct gameState {
        uint blockNum;
        uint boardState;
        bool addr1MovedLast;
    }



  
// //NONCE IS NEEDED - game could go faster than blocks... huh? both needed? how? Ahhhh!

    function PostMove(uint gameID, uint blockNum, uint previousBoard,uint proposedBoard,uint8 v, bytes32 r, bytes32 s) public {
        address addr1 =address(0x20b2e1f1dc798951435234Cb8a892F7483bd790e);
        address addr2 =address(0xf17f52151EbEF6C7334FAD080c5704D77216b732);
        //get these like StateChannel.games(gameID).addr1
        
        require (blockNum > latestState[gameID].blockNum);
        
        //require(validateMove(xxxxxx))
                

        //check if the signature is valid and the msg.sender is the other address
        bytes32 DataHash = keccak256(abi.encodePacked(gameID, blockNum, previousBoard, proposedBoard));
        address calcAddr = SigLib.getOriginAddress(DataHash, v,r,s);
        require(addr1 == calcAddr || addr1 == msg.sender);
        require(addr2 == calcAddr || addr2 == msg.sender);

        latestState[gameID].blockNum = block.number;
        latestState[gameID].boardState = proposedBoard;
        latestState[gameID].addr1MovedLast = (addr1 == calcAddr);
    }
    function isForward(uint previousBoard,uint proposedBoard) public pure returns(uint){
        return previousBoard+proposedBoard;
    }

//     function validateMove(uint previousBoard,uint proposedBoard) public {

//         // function validateMove
// //     return (isForward || isAttack || isDouble ||
// //     (isQueen && (isBack || isBackAttack)))
// //     //if simple move
// //     //if firstDoublemove
// //     //if attack
// //     //if queenBack
// //     //if queenAttackBackwards
// //         //return true
// //     //return false
//     }
    
// function CounterMove(uint _move)
//     //calculateState
//     // setGameState


// function CounterMoveAndPost(uint _move, ...)
//     //calls CounterMove
//     //call PostMove

// //getters after PostMove and CounterMoveAndPost

// function noCounterInTime()
//     if last move was >100 blocks ago
//         winnerTriggers(xxx)

// function winnerTriggered
//     //main contract payout

// function calculateState
//     //validateMove
//     //set state
//         //make queen as appropriate



// //msg.sender + sig means we have two party signatures
// function validateSig //modifier???
//     address signingAddr = addressFromSig(xxx)
//     bool msgSenderAddr1
//     if msg.sender == address1{
//         msgSenderAddr1 = true;
//         require signingAddr = address2
//     }
//     else{
//         require (msg.sender == address2 && signingAddr = address2)
//     }

// function addressFromSig
//     //returns address
}