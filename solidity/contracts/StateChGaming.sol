pragma solidity ^0.5.0;

import "./ValidatingContract.sol";
// contract ValidatingContract{
//     function stateValid(uint256, uint256) public pure returns(bool){}
//     function p1Won(uint) public pure returns(bool){}
//     function p1MovedLast(uint) public pure returns (bool){}
//     function gameTied(uint) public pure returns(bool){}
//     function getNonce(uint) public pure returns(uint){}
// }

import "./ERC20.sol";
// contract ERC20 {
//     function totalSupply() public view returns (uint);
//     function balanceOf(address) public view returns (uint);
//     function allowance(address, address) public view returns (uint);
//     function transfer(address, uint) public returns (bool);
//     function approve(address, uint) public returns (bool);
//     function transferFrom(address, address, uint) public returns (bool);

//     event Transfer(address indexed from, address indexed to, uint tokens);
//     event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
// }

contract StateChGaming {

    struct game{
        uint256 gamePayout;
        ERC20 tokenAddr;
        uint256 state;
        address p1;
        address p2;
        uint256 blockNum;
        ValidatingContract vcAddr;
        uint256 blocksPerTurn;
    }
    
    mapping (uint256 => game) public allGames;

    function initGame(uint256 _stakedAmount, ERC20 _erc20Addr, uint256 _gameID, address _p1, address _p2, ValidatingContract _vcAddr, uint256 _blocksPerTurn, uint8 _v, bytes32 _r, bytes32 _s) public {
        require(_erc20Addr.transferFrom(_p1, address(this),_stakedAmount));
        require(_erc20Addr.transferFrom(_p2, address(this),_stakedAmount));
        
        bytes32 DataHash = keccak256(abi.encodePacked(_stakedAmount, _erc20Addr,_gameID, _p1, _p2, _vcAddr, _blocksPerTurn));
        address calcAddr = addrFromHashAndSig(DataHash, _v,_r,_s);
        require(_p1 == calcAddr || _p1 == msg.sender, "a player didnt sign or send");
        require(_p2 == calcAddr || _p2 == msg.sender, "a player didnt sign or send");

        //require the gameID doesn't already exist
        require (allGames[_gameID].p1 == address(0), "can not have duplicate gameIDs");
        //starting board state is 0x000000000000000080828486898b8d8f90929496a9abadafb0b2b4b6b9bbbdbf or 3151051977652667687974785799204386029420487659316301249983
        allGames[_gameID] = game(_stakedAmount*2, _erc20Addr, 3151051977652667687974785799204386029420487659316301249983, _p1, _p2, 100000000000000000000000000000, _vcAddr, _blocksPerTurn);
    }
    function addrFromHashAndSig(bytes32 DataHash, uint8 v, bytes32 r, bytes32 s) private pure returns(address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, DataHash));
        return ecrecover(prefixedHash, v, r, s);
    }
    
    modifier opponentLastPlayed(uint _gameID, uint _state) {
        game memory gm = allGames[_gameID];
        if (gm.vcAddr.p1MovedLast(gm.state)){
            require (msg.sender == gm.p2);
        }else{
            require(msg.sender == gm.p1);
        }
        _;
    }

    modifier senderLastPlayed(uint _gameID) {
        game memory gm = allGames[_gameID];
        if (gm.vcAddr.p1MovedLast(gm.state)){
            require (msg.sender == gm.p1);
        }else{
            require(msg.sender == gm.p2);
        }
        _;
    }

    modifier validMove(uint _gameID, uint _state){
        uint tempstate = _state;
        require (allGames[_gameID].vcAddr.stateValid(allGames[_gameID].state, tempstate));
        _;
    }

    function initBCMove(uint _gameID, uint _state, uint8 _v, bytes32 _r, bytes32 _s) public validMove(_gameID, _state) {
        game memory gm = allGames[_gameID];

        //if gameID not included, vulnerable if you are playing two games with both same addresses
        
        bytes32 DataHash = keccak256(abi.encodePacked(_state));
        address calcAddr = addrFromHashAndSig(DataHash, _v,_r,_s);
        require(gm.p1 == calcAddr || gm.p1 == msg.sender);
        require(gm.p2 == calcAddr || gm.p2 == msg.sender);

        
        // //require that the new nonce is > the old nonce
        require(gm.vcAddr.getNonce(_state) > gm.vcAddr.getNonce(gm.state));
        allGames[_gameID].blockNum = block.number;//is allGames[_gameID] needed here to change state?
        allGames[_gameID].state = _state;
    }

    //this function is needed in case you give the BC and unenforced move and the opponent doesn't continue to play
    function makeMoveTimed(uint _gameID) public senderLastPlayed(_gameID) {
        allGames[_gameID].blockNum = block.number;
    }
    function makeMoveUntimed(uint _gameID) public senderLastPlayed(_gameID) {
        allGames[_gameID].blockNum = 100000000000000000000000000000;
    }
    
    function enforcedBCMove(uint _gameID, uint _state) public opponentLastPlayed(_gameID, _state) validMove(_gameID, _state){
        allGames[_gameID].blockNum = block.number;
        allGames[_gameID].state = _state;
    }

    function unenforcedBCMove(uint _gameID, uint _state) public opponentLastPlayed(_gameID, _state) validMove(_gameID, _state){
        allGames[_gameID].blockNum = 100000000000000000000000000000;
        allGames[_gameID].state = _state;
    }
        
    function payoutVictory(uint _gameID) public{
        game memory gm = allGames[_gameID];
        //if p1Won doesn't revert then
        if (gm.vcAddr.p1Won(gm.state)){
            gm.tokenAddr.transfer(gm.p2, gm.gamePayout);
        }
        else{
            gm.tokenAddr.transfer(gm.p1, gm.gamePayout);
        }
    }
       
    function payoutTimeout(uint _gameID) public {
        game memory gm = allGames[_gameID];
        require (block.number > (gm.blockNum + gm.blocksPerTurn));
        if (gm.vcAddr.p1MovedLast(gm.state)){
            gm.tokenAddr.transfer(gm.p1, gm.gamePayout);
        }else{
            gm.tokenAddr.transfer(gm.p2, gm.gamePayout);
        }
    }
}