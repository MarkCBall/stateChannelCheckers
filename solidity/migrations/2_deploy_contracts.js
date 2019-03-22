
const StateChGaming = artifacts.require("StateChGaming");
const ERC20 = artifacts.require("ERC20");
const ValidatingContract = artifacts.require("ValidatingContract");

// const StateChannel = artifacts.require("StateChannel");
// const CheckersArbitration = artifacts.require("CheckersArbitration");

module.exports = function (deployer) {
    deployer.deploy(ERC20,1)
    deployer.link(ERC20, StateChGaming);
    deployer.deploy(ValidatingContract)
    deployer.link(ValidatingContract, StateChGaming);
    deployer.deploy(StateChGaming);



    //   deployer.link(SigLib, CheckersArbitration);
    //   deployer.deploy(CheckersArbitration);
};
