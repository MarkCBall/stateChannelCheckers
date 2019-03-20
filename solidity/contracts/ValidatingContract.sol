pragma solidity ^0.5.0;

contract ValidatingContract{
    function stateValid(uint256, uint256) public pure returns(bool){
        return true;
    }
    function p1Won(uint) public pure returns(bool){
        return true;
    }
    function p1MovedLast(uint) public pure returns (bool){
        return true;
    }
    function gameTied(uint) public pure returns(bool){
        return true;
    }
    function getNonce(uint) public pure returns(uint){
        return 10;
    }
}
    //grab more notes from interactDatabase action

    // MOVE THESE TO OTHER CONTRACT
    // function stateValid(uint256 oldBoard, uint256 newBoard) public view returns(uint){
    //    require gameID
            // require pieceMoved corresponds to turnNum
    // }
    
    // function p1Won(uint board)
    //     if redHasNoPieces
    //         return true
    //     if blackHasNoPieces
    //         return false
    //     revert

    // function p1MovedLast(uint board) public view returns (bool){}
    // function gameTied(uint board) public view returns(bool){}
    // function getNonce(uint board) public view returns(uint){}






            //if (ecrecover
            //console.log("signature verifies sender was ", calculatedAddress)

        
            // if (opponentMove.turnNum === getState().BoardRedux.turnNum+1)
            //     console.log("passed turnNum +1 test")
           
            
            //helper functions
                //parsePieceNumMoved
                //parsePieceNumKilled
                //swapPiece(board, pieceID, byte, byte)
                //getPieceByID(board, pieceID) returns struct
                //isEmpty(board, row, col)
                //pieceIDIsAtLoc(board, pieceID, row, col)
                    //uses getPieceByID
                //isValidDiagonal(oldRow,newRow,oldCol,newCol)
                            //if newRow>oldRow require newRow-oldRow < 3
                            //else require oldRow - newRow < 3
                            //if newCol>oldCol require newCol-oldCol < 3
                            //else require oldCol - newCol < 3
                            //require oldRow!=newRow && oldCol!-newCol


            //TESTS
            //should allow a red queen to move backwards
            //should allow a black queen to move backwards 
            //should make a piece a queen when it reaches the end of the board
            //should move a piece and kill a piece on a jump move
            //should move a piece in a simple move
            
            //should store the new move as current state

            //shouldn't allow a player to move an opponent's piece
            //should increment the turn number
            //should fail when sig is wrong
            //shouldn't allow red nonqueen to move backwards
            //shouldn't allow black nonqueen to move forwards
            //shouldn't allow an horizontal/vertical move
            //shouldn't allow a jump over an empty square


            //let prevBoardBN = getState().InteractDatabase.signedBoards[latestMove.turnNum-1]
            
            // let pNumMoved = parsePieceNumMoved(opponentMove)
            // let pNumKilled = parsePieceNumKilled(opponentMove)

            
            // let pOld red queen oldRow,oldCol = piece = getPieceByID(prevBoardBN,pieceNumMoved)

            //require turnNum%2 != pOld.red

            //newRow,newCol = getPieceByID(latestMoveBN,pieceNumMoved)

            //require (red === (new - old < 0)) || queen

            //require isValidDiagonal(oldRow,newRow,oldCol,newCol)
                
            //require isEmpty(prevBoardBN, newRow, newCol)
    
            //if (newCol>oldCol && newCol-oldCol > 1) || (oldCol>newCol && oldCol-newCol > 1) // if double move
                //require pieceIDIsAtLoc(prevBoardBN, pieceNumKilled, (oldRow+newRow)/2, (oldCol+newCol)/2)         
                //prevBoardBN = swapPiece(prevBoardBN, pieceNumKilled, oldByte, "00") -- delete the status


            //if newRow === 0 || newRow === 7
                //prevBoardBN = swapPiece(prevBoardBN, pieceNumMoved, oldByte, newByte)   - new loc and queen
            // else 
                //prevBoardBN = swapPiece(prevBoardBN, pieceNumMoved, oldByte, newByte)   - new loc

            // require prevBoardBN % 7.9228163e+28 === opponentMove % 7.9228163e+28 //the last 24 bytes match


            //BN array[turnNum] = latestBN
            //or
            //prevBoardBN = latestBN