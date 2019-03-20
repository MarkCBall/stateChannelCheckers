// ganache-cli -m "a"

const SigLib = artifacts.require("SigLib");
const StateChannel = artifacts.require("StateChannel");
const CheckersArbitration = artifacts.require("CheckersArbitration");

module.exports = function(deployer) {
  deployer.deploy(SigLib)//.then(console.log)
  deployer.link(SigLib, StateChannel);
  deployer.deploy(StateChannel);
  deployer.link(SigLib, CheckersArbitration);
  deployer.deploy(CheckersArbitration);
};
