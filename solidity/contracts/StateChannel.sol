pragma solidity ^0.5.0;

contract StateChannel {

    mapping (uint => game) public games;

    struct game {
        address addr1;
        address addr2;
        address disputeContractAddr;
    }
            //uint betAmt;
            //address tokenContractAddr

    //uint _collateralAmt, address tokenContractAddr
    function InitChannel(address addr1, uint8 v1, bytes32 r1, bytes32 s1,address disputeContractAddr,uint gameID) public returns (bool){
        address addr2 = msg.sender;
        
        //check if the gameID is already used
        require(games[gameID].addr2 != address(0) );

        //check if sig1 is from addr1
        bytes32 DataHash = keccak256(abi.encodePacked(addr1,addr2,v1,r1,s1,disputeContractAddr,gameID));
        address calcAddr1 = getOriginAddress(DataHash, v1,r1,s1);
        require(calcAddr1 == addr1);

        //check and withdraw funds from both parties

        //set game state
        games[gameID].addr1 = addr1;
        games[gameID].addr2 = addr2;
        games[gameID].disputeContractAddr = disputeContractAddr;
        //games[_gameID].tokenContractAddr
        //games[_gameID].collateral - amt x2
        return true;
    }
    
    //refactor this and test it
    function getOriginAddress(bytes32 signedMessage, uint8 v, bytes32 r, bytes32 s) public pure returns(address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, signedMessage));
        return ecrecover(prefixedHash, v, r, s);
    }

    // function payout(uint _gameID, uint _addr1Amt)
    //     require (msg.sender) = games[_gameID]._disputeContractAddr
    //     require games[_gameID].collateralAmt < _addr1Amt
    //     transfer games[_gameID].addr1 _addr1Amt and the rest to address2



}