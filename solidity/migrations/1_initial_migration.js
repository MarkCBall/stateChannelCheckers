const Migrations = artifacts.require("StateChannel");

module.exports = function(deployer) {
  deployer.deploy(StateChannel);
};
