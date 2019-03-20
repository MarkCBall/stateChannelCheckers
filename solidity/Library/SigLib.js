const ethers = require('ethers');


// ganache-cli -m "smart fun man hind sea joke split cherry force season once pair"
let getPrivKey = (accountNum) => {
    let phrase = "smart fun man behind sea joke split cherry force season once pair"
    let path = "m/44'/60'/0'/0/"
    let wallet = ethers.Wallet.fromMnemonic(phrase, path+accountNum);
    return wallet.signingKey.privateKey
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