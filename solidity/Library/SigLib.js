const ethers = require('ethers');


// ganache-cli -m "smart fun man hind sea joke split cherry force season once pair"
let getPrivKey = (accountNum) => {

    //do this smarter
//     Mnemonic:      smart fun man behind sea joke split cherry force season once pair
// Base HD Path:  m/44'/60'/0'/0/{account_index}

    if (accountNum === 0)
        return "0x5ee6962f33f137e7847c8a2852ed18e5a67159f23b0931baf16a95a009ad3901"
    if (accountNum === 1)
        return "0x5ea9296aaa2bd9fa6089aa96f3b98b29b631180000f829f5979b9c472e286020"
}

module.exports = {
    signPars: async (pars_unsigned,signingAcctNum) =>{

        let hashedEncodedPars = ethers.utils.solidityKeccak256(
            pars_unsigned.parTypes,
            pars_unsigned.pars           
        );
        let arrayifiedHashedEncodedPars = ethers.utils.arrayify(hashedEncodedPars)
        let wallet = new ethers.Wallet(getPrivKey(signingAcctNum))
        let flatSig = await wallet.signMessage(arrayifiedHashedEncodedPars)
        let sig = ethers.utils.splitSignature(flatSig)
        // console.log(sig.v)
        return {
            pars:
                [
                    ...pars_unsigned.pars,
                    sig.v,
                    sig.r,
                    sig.s
                ],
            parTypes:
                [
                    ...pars_unsigned.parTypes,
                    "v",
                    "r",
                    "s"
                ]
        }
    }
}