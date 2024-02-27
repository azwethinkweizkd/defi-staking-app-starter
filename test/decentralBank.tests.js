// eslint-disable-next-line no-undef
const Tether = artifacts.require("Tether");
// eslint-disable-next-line no-undef
const RWD = artifacts.require("RWD");
// eslint-disable-next-line no-undef
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
	.use(require("chai-as-promised"))
	.should();

// eslint-disable-next-line no-undef
contract("DecentralBank", ([owner, customer]) => {
	let tether, rwd, decentralBank;

	function tokens(number) {
		// eslint-disable-next-line no-undef
		return web3.utils.toWei(number, "ether");
	}

	// eslint-disable-next-line no-undef
	before(async () => {
		tether = await Tether.new();
		rwd = await RWD.new();
		decentralBank = await DecentralBank.new(rwd.address, tether.address);

		// eslint-disable-next-line no-undef
		await rwd.transfer(decentralBank.address, tokens("1000000"));

		await tether.transfer(customer, tokens("100"), { from: owner });
	});

	describe("Mock Tether Deployment", async () => {
		it("matches name successfully", async () => {
			const name = await tether.name();
			// eslint-disable-next-line no-undef
			assert.equal(name, "Mock Tether Token");
		});
	});

	describe("Mock Reward Deployment", async () => {
		it("matches name successfully", async () => {
			const name = await rwd.name();
			// eslint-disable-next-line no-undef
			assert.equal(name, "Reward Token");
		});
	});

	describe("Decentral Bank Deployment", async () => {
		it("matches name successfully", async () => {
			const name = await decentralBank.name();
			// eslint-disable-next-line no-undef
			assert.equal(name, "Decentral Bank");
		});

		it("Contract has tokens", async () => {
			let balance = await rwd.balanceOf(decentralBank.address);
			// eslint-disable-next-line no-undef
			assert.equal(balance, tokens("1000000"));
		});
	});
});
