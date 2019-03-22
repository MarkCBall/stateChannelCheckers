pragma solidity ^0.5.0;

contract ValidatingContract{

    //PUBLIC FUNCTIONS
    function p1Won(uint data) public pure returns(bool){
        if (!blackHasPieces(data))
            return true;
        if (!redHasPieces(data))
            return false;
        revert();
    }
    function p1MovedLast(uint data) public pure returns (bool){
        return red(getPieceNumMoved(data));
    }
    function gameTied(uint) public pure returns(bool){
        //NOT IMPLIMENTED
        return false;
    }
    // function validStateUpdate(uint256 oldData, uint256 newData) public pure returns(uint){
    function validStateUpdate(uint256 oldData, uint256 newData) public pure returns(bool){
        uint pieceInPlayNew = getPieceByNum(newData, getPieceNumMoved(newData));
        uint pieceInPlayOld = getPieceByNum(oldData, getPieceNumMoved(newData));
        //turn number must increment by one
        require((getNonce(oldData)+1) == getNonce(newData),"improper nonce");
        // to be a queen it must have moved to row 0 or 7 or previously been a queen
        if(queen(pieceInPlayNew)){
            require((rowNum(pieceInPlayNew) == 0) || (rowNum(pieceInPlayNew) == 7) || queen(pieceInPlayNew), "improper queening");
        }
        //red plays on odd turns, black plays on even turns
        require( red(getPieceNumMoved(newData)) == (getNonce(newData)%2 == 1) ,"moving wrong colored piece");
        //red moves to higher row numbers, black moves lower - queens move either way
        require(queen(pieceInPlayNew) || correctDirection(red(getPieceNumMoved(newData)), rowNum(pieceInPlayNew), rowNum(pieceInPlayOld)), "normal pieces can't go backwards");
        //the piece must be moved to an empty square
        require(isEmpty(oldData,rowNum(pieceInPlayNew),colNum(pieceInPlayNew)), "can't move into an occupied square");
        //the location the piece moved to must be a diagonal move
        locChangeValid( 
            rowNum(pieceInPlayNew),colNum(pieceInPlayNew),
            rowNum(pieceInPlayOld),colNum(pieceInPlayOld) 
        );
        //kill the piece if one was jumped and update state accordingly
        uint calcData = jumpIfNeeded(
            oldData,
            getPieceNumJumped(newData),
            rowNum(pieceInPlayNew),colNum(pieceInPlayNew),
            rowNum(pieceInPlayOld),colNum(pieceInPlayOld) 
        );
        //change the old piece into the new piece
        //note that XOR is associative so XORing old data twice with new data results in new data
        calcData = XORPieceByte(
            calcData, 
            getPieceNumMoved(newData),
            (pieceInPlayNew ^ pieceInPlayOld)
        );
        //check state is as calculated aside from movement instructions
        require((calcData << 64) == (newData << 64),"could not re-compute state"); 
        return true;
    }
    function getNonce(uint data) public pure returns(uint){
        //shift it over by 24 bytes and take five bytes
        return (data >> 192) % 1099511627776 ;
    }
    ////////////////END PUBLIC FUNCTIONS///////////////////////////////


    //Helper functions
    function locChangeValid(uint newRow, uint newCol, uint oldRow, uint oldCol) public pure returns(bool){
        //the piece must land on a same colored square
        require(((newRow+newCol) % 2) == 0,"not moving to a colored square");
        // the piece can't move horizontally or vertically
        require( (oldRow != newRow) && (oldCol != newCol), "can't move straight");
        //the piece can't move too far
        if (newRow>oldRow){
            require((oldRow+3)>newRow,"moving too far down");
        }else{
            require((newRow+3)>oldRow,"moving too far up");
        }
        if (newCol>oldCol){
            require((oldCol+3)>newCol,"moving too far right");
        }else{
            require((newCol+3)>oldCol,"moving too far left");
        }
        return true;
    }
    function isEmpty(uint data, uint row, uint col) public pure returns(bool){
        uint pce;
        for (uint i = 0; i<25;i++){
            pce = getPieceByNum(data, i);
            if ((rowNum(pce)==row) && (colNum(pce)==col)){
                return false;
            }
        }
        return true;
    }
    function correctDirection(bool red, uint newRow, uint oldRow) public pure returns(bool){
        return (   
            (red && newRow > oldRow) ||
            (!red && oldRow > newRow)
        );
    }
    function jumpIfNeeded(uint data,uint pieceNumJumped, uint newRow, uint newCol, uint oldRow, uint oldCol) public pure returns(uint){
        if (pieceNumJumped != 0){
            require(
                ((oldRow+newRow) == rowNum(getPieceByNum(data,pieceNumJumped))*2) &&
                ((oldCol+newCol) == colNum(getPieceByNum(data,pieceNumJumped))*2)
                ,"attempting to jump an invalid piece"
            );
            return XORPieceByte(data, pieceNumJumped, getPieceByNum(data,pieceNumJumped));
        }
        return data;
    }
    function redHasPieces(uint data) public pure returns(bool){
        for (uint i = 0; i < 13;i++){
            if (active(getPieceByNum(data,i))){
                return true;
            }
        }
    }
    function blackHasPieces(uint data) public pure returns(bool){
        for (uint i = 13; i < 25;i++){
            if (active(getPieceByNum(data,i))){
                return true;
            }
        }
    }
    function red(uint pNum) public pure returns(bool){
        if (pNum < 13 && pNum > 0){
            return true;
        }
        if (pNum <25){
            return false;
        }
        revert();
    }
    function active(uint pInt) public pure returns(bool){ return (pInt>127); }
    function queen(uint pInt) public pure returns(bool){ return ((pInt >> 1)>63); }
    //function queen(uint pInt) public pure returns(bool){ return ((pInt%64)>31); }
    function rowNum(uint pInt) public pure returns(uint){ return ((pInt%64) >> 3); }
    function colNum(uint pInt) public pure returns(uint){ return (pInt%8); }

    function XORPieceByte(uint data, uint pieceNum, uint bte) public pure returns(uint){
        //what is pieceNum moved is zero? when turn# puts the piece at a specific spot?
        return ( data ^ (bte << (192 - (pieceNum*8))) );
    }
    function getPieceNumMoved(uint data) public pure returns(uint){
        return getByteAt(data, 0);
    }
    function getPieceNumJumped(uint data) public pure returns(uint){
        return getByteAt(data, 1);
    }
    function getPieceByNum(uint data, uint n) public pure returns(uint bte){
        return getByteAt(data, n+7);
    }
    function getByteAt(uint data, uint n) public pure returns(uint bte){
        assembly{bte := byte(n,data)}
        return bte;
    }
}

                            


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
            //shouldn't allow a pieceMoved to be zero


           
         

