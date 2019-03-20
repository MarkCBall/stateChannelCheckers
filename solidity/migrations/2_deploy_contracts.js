// ganache-cli -m "a"

const StateChGaming = artifacts.require("StateChGaming");
// const StateChannel = artifacts.require("StateChannel");
// const CheckersArbitration = artifacts.require("CheckersArbitration");

module.exports = function(deployer) {
//   deployer.deploy(SigLib)//.then(console.log)
//   deployer.link(SigLib, StateChannel);
  deployer.deploy(StateChGaming);
//   deployer.link(SigLib, CheckersArbitration);
//   deployer.deploy(CheckersArbitration);
};
