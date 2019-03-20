pragma solidity ^0.5.0;

library SigLib{
	// function convert(uint amount,uint conversionRate) public pure returns (uint convertedAmount)
	// {
	// 	return amount * conversionRate;
	// }

 function getOriginAddress(bytes32 signedMessage, uint8 v, bytes32 r, bytes32 s) public pure returns(address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, signedMessage));
        return ecrecover(prefixedHash, v, r, s);
    }



}
