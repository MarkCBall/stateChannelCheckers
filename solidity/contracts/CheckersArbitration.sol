pragma solidity ^0.5.0;

contract validatingContract{
    function stateValid(uint256, uint256) public pure returns(bool){}
    function p1Won(uint) public pure returns(bool){}
    function p1MovedLast(uint) public pure returns (bool){}
    function gameTied(uint) public pure returns(bool){}
    function getNonce(uint) public pure returns(uint){}
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

    contract ERC20 {
    function totalSupply() public view returns (uint);
    function balanceOf(address) public view returns (uint);
    function allowance(address, address) public view returns (uint);
    function transfer(address, uint) public returns (bool);
    function approve(address, uint) public returns (bool);
    function transferFrom(address from, address, uint) public returns (bool);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

//rename to StateChGaming
contract CheckersArbitration {//is validatingContract, ERC20{

    struct game{
        uint256 gamePayout;
        ERC20 ERC20Address;
        uint256 state;
        address player1;
        address player2;
        uint256 blockNum;
        validatingContract vcAddr;
        uint256 blocksPerTurn;
    }
    
    mapping (uint256 => game) public allGames;
 

    function initGame(uint256 _stakedAmount, ERC20 _erc20Addr, uint256 _gameID, address _player1, address _player2, validatingContract _vdAddr, uint256 _blocksPerTurn, uint8 _v, bytes32 _r, bytes32 _s) public {
        game memory gm = allGames[_gameID];
        // require(_erc20Addr.transferFrom(_player1, address(this),_stakedAmount));
        // require(_erc20Addr.transferFrom(_player2, address(this),_stakedAmount));
        
        bytes32 DataHash = keccak256(abi.encodePacked(_stakedAmount, _erc20Addr,_gameID, _player1, _player2, _vdAddr, _blocksPerTurn));
        address calcAddr = addrFromHashAndSig(DataHash, _v,_r,_s);
        require(_player1 == calcAddr || _player1 == msg.sender);
        require(_player2 == calcAddr || _player2 == msg.sender);

        //require the gameID doesn't already exist
        require (gm.player1 == address(0));
        //starting board state is 0x000000000000000080828486898b8d8f90929496a9abadafb0b2b4b6b9bbbdbf or 3151051977652667687974785799204386029420487659316301249983
        allGames[_gameID] = game(_stakedAmount*2, _erc20Addr, 3151051977652667687974785799204386029420487659316301249983, _player1, _player2, 100000000000000000000000000000, _vdAddr, _blocksPerTurn);
    }
    function addrFromHashAndSig(bytes32 DataHash, uint8 v, bytes32 r, bytes32 s) public pure returns(address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, DataHash));
        return ecrecover(prefixedHash, v, r, s);
    }
    
   
//    https://ethereum.stackexchange.com/questions/5946/can-solidity-function-modifiers-access-function-arguments
    modifier opponentLastPlayed(uint _gameID, uint _state) {
        game memory gm = allGames[_gameID];
        if (gm.vcAddr.p1MovedLast(gm.state)){
            require (msg.sender == gm.player2);
        }else{
            require(msg.sender == gm.player1);
        }
        _;
    }

     modifier senderLastPlayed(uint _gameID, uint _state) {
        game memory gm = allGames[_gameID];
        if (gm.vcAddr.p1MovedLast(gm.state)){
            require (msg.sender == gm.player1);
        }else{
            require(msg.sender == gm.player2);
        }
        _;
    }

    modifier validMove(uint _gameID, uint _state){
        game memory gm = allGames[_gameID]; 
        require (gm.vcAddr.stateValid(gm.state, _state));
        _;
    }



    function initBCMove(uint _gameID, uint _state , uint8 _v, bytes32 _r, bytes32 _s) public{//validMove {
        game memory gm = allGames[_gameID];

        //if gameID not included, danger if you are playing two games with the same address
        
        bytes32 DataHash = keccak256(abi.encodePacked(_state));
        //bytes32 DataHash = keccak256(_state); //try this later on
        address calcAddr = addrFromHashAndSig(DataHash, _v,_r,_s);
        require(gm.player1 == calcAddr || gm.player1 == msg.sender);
        require(gm.player2 == calcAddr || gm.player2 == msg.sender);

        
        //require that the new nonce is > the old nonce
        require (gm.vcAddr.getNonce(_state) > gm.vcAddr.getNonce(gm.state));
        gm.blockNum = block.number;//is allGames[_gameID] needed here to change state?
        gm.state = _state;
    }
    //this function is needed in case you give the BC and unenforced move and the opponent doesn't continue to play
    function makeMoveTimed(uint _gameID) public{// senderLastPlayed {
        allGames[_gameID].blockNum = block.number;
    }
    function makeMoveUntimed(uint _gameID) public{// senderLastPlayed {
        allGames[_gameID].blockNum = 100000000000000000000000000000;
    }
        
    function enforcedBCMove(uint _gameID, uint _state) public{// opponentLastPlayed validMove{
        game memory gm = allGames[_gameID];
        gm.blockNum = block.number;
        gm.state = _state;
    }
        
    function unenforcedBCMove(uint _gameID, uint _state) public{// opponentLastPlayed validMove{
        game memory gm = allGames[_gameID];
        gm.blockNum = 100000000000000000000000000000;
        gm.state = _state;
    }
        
    function payoutVictory(uint _gameID) public{
        game memory gm = allGames[_gameID];
        //if p1Won doesn't revert then
        if (gm.vcAddr.p1Won(gm.state)){
            gm.ERC20Address.transfer(gm.player2, gm.gamePayout);
        }
        else{
            gm.ERC20Address.transfer(gm.player1, gm.gamePayout);
        }
    }
       
    function payoutTimeout(uint _gameID) public {
        game memory gm = allGames[_gameID];
        require (block.number > (gm.blockNum + gm.blocksPerTurn));
        if (gm.vcAddr.p1MovedLast(gm.state)){
            gm.ERC20Address.transfer(gm.player1, gm.gamePayout);
        }else{
            gm.ERC20Address.transfer(gm.player2, gm.gamePayout);
        }
    }
}