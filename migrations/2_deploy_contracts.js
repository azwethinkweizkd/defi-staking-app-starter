// eslint-disable-next-line no-undef
const Tether = artifacts.require("Tether");
// eslint-disable-next-line no-undef
const RWD = artifacts.require("RWD");
// eslint-disable-next-line no-undef
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function(deployer, network, accounts) {
	//Deploy Mock Tether Contract
	await deployer.deploy(Tether);
	const tether = await Tether.deployed();

	//Deploy Mock RWD Contract
	await deployer.deploy(RWD);
	const rwd = await RWD.deployed();

	//Deploy Mock DecentralBank Contract
	await deployer.deploy(DecentralBank, rwd.address, tether.address);
	const decentralBank = await DecentralBank.deployed();

	//Transfer all RWD tokens to Decentralized Bank
	await rwd.transfer(decentralBank.address, "1000000000000000000000000");
	//Distribute 100 Tether tokens to investor
	await tether.transfer(accounts[1], "100000000000000000000");
};
