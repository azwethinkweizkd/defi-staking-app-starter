// eslint-disable-next-line no-undef
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function issueRewards() {
	let decentralBankPromise = await DecentralBank.deployed();
	await decentralBankPromise.issueTokens();
	console.log("Tokens have been issued successfully!");
	// eslint-disable-next-line no-undef
	callback();
};
