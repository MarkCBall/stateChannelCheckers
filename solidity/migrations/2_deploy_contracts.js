const SigLib = artifacts.require("SigLib");
const StateChannel = artifacts.require("StateChannel");

module.exports = function(deployer) {
  deployer.deploy(SigLib);
  deployer.link(SigLib, StateChannel);
  deployer.deploy(StateChannel);
};
