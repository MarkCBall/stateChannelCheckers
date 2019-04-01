pragma solidity 0.5.0;

contract ValidatingContract{

    //PUBLIC FUNCTIONS
    function p1Won(uint data) public pure returns(bool){
        if (!blackHasPieces(data))
            return true;
        if (!redHasPieces(data))
            return false;
        revert("neither player has won");
    }
    function p1MovedLast(uint data) public pure returns (bool){
        return ( (getNonce(data)%2) == 1 );//red(getPieceNumMoved(data)); 
    }
    // function gameTied(uint) public pure returns(bool){
    //     //NOT IMPLIMENTED
    //     return false;
    // }
    // function validStateUpdate(uint256 oldData, uint256 newData) public pure returns(uint){
    function validStateUpdate(uint256 oldData, uint256 newData) public pure returns(bool){
        uint pieceNumMoved = getPieceNumMoved(newData);
        uint pieceNumJumped = getPieceNumJumped(newData);
        uint pieceInPlayNew = getPieceByNum(newData, pieceNumMoved);
        uint pieceInPlayOld = getPieceByNum(oldData, pieceNumMoved);
        uint newRow = rowNum(pieceInPlayNew);
        uint newCol = colNum(pieceInPlayNew);
        uint oldRow = rowNum(pieceInPlayOld);
        uint oldCol = colNum(pieceInPlayOld);
        
        //turn number must increment by one
        require((getNonce(oldData)+1) == getNonce(newData),"improper nonce");
        // to be a queen it must have moved to row 0 or 7 or previously been a queen
        if(queen(pieceInPlayNew)){
            require((newRow == 0) || (newRow == 7) || queen(pieceInPlayOld), "improper queening");
        }
        //red plays on odd turns, black plays on even turns
        require( red(pieceNumMoved) == (getNonce(newData)%2 == 1) ,"moving wrong colored piece");
        //red moves to higher row numbers, black moves lower - queens move either way
        require(queen(pieceInPlayNew) || correctDirection(red(pieceNumMoved), newRow, oldRow), "normal pieces can't go backwards");
        //the piece must be moved to an empty square
        require(isEmpty(oldData,newRow,newCol), "can't move into an occupied square");
        
        uint calcData = oldData;
        uint maxMove = 1;
        //if a piece was jumped
        if(pieceNumJumped != 0){
            //piece can be moved two squares away
            maxMove = 2;
            //kill the piece if one was jumped and update state accordingly
            calcData = jumpAndUpdate(
                oldData,
                pieceNumJumped,
                newRow,
                newCol,
                oldRow,
                oldCol
            );
        }
        //the location the piece moved to must be a diagonal move
        locChangeValid(newRow,newCol,oldRow,oldCol,maxMove);        
        //change the old piece into the new piece
        //note that XOR is associative so XORing old data twice with new data results in new data
        calcData = XORPieceByte(
            calcData, 
            pieceNumMoved,
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
    function locChangeValid(uint newRow, uint newCol, uint oldRow, uint oldCol, uint maxMove) internal pure returns(bool){
        //the piece must land on a same colored square
        require(((newRow+newCol) % 2) == 0,"not moving to a colored square");
        // the piece can't move horizontally or vertically
        require( (oldRow != newRow) && (oldCol != newCol), "can't move straight");
        //the piece can't move too far
        if (newRow>oldRow){
            require((oldRow+maxMove)>=newRow,"moving too far down");
        }else{
            require((newRow+maxMove)>=oldRow,"moving too far up");
        }
        if (newCol>oldCol){
            require((oldCol+maxMove)>=newCol,"moving too far right");
        }else{
            require((newCol+maxMove)>=oldCol,"moving too far left");
        }
        return true;
    }
    function isEmpty(uint data, uint row, uint col) internal pure returns(bool){
        uint pce;
        for (uint i = 0; i<25;i++){
            pce = getPieceByNum(data, i);
            if ((rowNum(pce)==row) && (colNum(pce)==col) && active(pce)){
                return false;
            }
        }
        return true;
    }
    function correctDirection(bool red, uint newRow, uint oldRow) internal pure returns(bool){
        return (   
            (red && newRow > oldRow) ||
            (!red && oldRow > newRow)
        );
    }
    function jumpAndUpdate(uint data,uint pieceNumJumped, uint newRow, uint newCol, uint oldRow, uint oldCol) internal pure returns(uint){
        uint jmpdPce = getPieceByNum(data, pieceNumJumped);
        require(
            ((oldRow+newRow) == rowNum(jmpdPce)*2) &&
            ((oldCol+newCol) == colNum(jmpdPce)*2)
            ,"attempting to jump an invalid piece"
        );
        return XORPieceByte(data, pieceNumJumped, jmpdPce);
    }
    function redHasPieces(uint data) internal pure returns(bool){
        for (uint i = 0; i < 13;i++){
            if (active(getPieceByNum(data,i))){
                return true;
            }
        }
    }
    function blackHasPieces(uint data) internal pure returns(bool){
        for (uint i = 13; i < 25;i++){
            if (active(getPieceByNum(data,i))){
                return true;
            }
        }
    }
    function red(uint pNum) internal pure returns(bool){
        if (pNum < 13 && pNum > 0){
            return true;
        }
        if (pNum <25 && pNum > 0){
            return false;
        }
        revert("invalid piece number");
    }
    function active(uint pInt) internal pure returns(bool){ return (pInt>127); }
    function queen(uint pInt) internal pure returns(bool){ return ((pInt%128) > 63 ); }
    function rowNum(uint pInt) internal pure returns(uint){ return ((pInt%64) >> 3); }
    function colNum(uint pInt) internal pure returns(uint){ return (pInt%8); }

    function XORPieceByte(uint data, uint pieceNum, uint bte) internal pure returns(uint){
        return ( data ^ (bte << (192 - (pieceNum*8))) );
    }
    function getPieceNumMoved(uint data) internal pure returns(uint){
        return getByteAt(data, 0);
    }
    function getPieceNumJumped(uint data) internal pure returns(uint){
        return getByteAt(data, 1);
    }
    function getPieceByNum(uint data, uint n) internal pure returns(uint bte){
        return getByteAt(data, n+7);
    }
    function getByteAt(uint data, uint n) internal pure returns(uint bte){
        assembly{bte := byte(n,data)}
        return bte;
    }
}