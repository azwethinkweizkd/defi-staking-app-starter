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

	describe("Yield Farming", async () => {
		it("rewards tokens for staking", async () => {
			let result;

			//Check investor balance
			result = await tether.balanceOf(customer);
			// eslint-disable-next-line no-undef
			assert.equal(
				result.toString(),
				tokens("100"),
				"customer mock wallet balance before staking"
			);

			//Check staking for customer of 100 tokens
			await tether.approve(decentralBank.address, tokens("100"), {
				from: customer,
			});
			await decentralBank.depositTokens(tokens("100"), { from: customer });

			//Check updated balance of customer
			result = await tether.balanceOf(customer);
			// eslint-disable-next-line no-undef
			assert.equal(
				result.toString(),
				tokens("0"),
				"customer mock wallet balance after staking"
			);

			// Check update balance of decentral bank
			result = await tether.balanceOf(decentralBank.address);
			// eslint-disable-next-line no-undef
			assert.equal(
				result.toString(),
				tokens("100"),
				"decentral bank mock balance after staking"
			);

			// Is staking balance
			result = await decentralBank.isStaking(customer);
			// eslint-disable-next-line no-undef
			assert.equal(
				result.toString(),
				"true",
				"customer is staking status after stake"
			);
			//Issue tokens
			await decentralBank.issueTokens({ from: owner });

			// Ensure only the owner can issue tokens
			await decentralBank.issueTokens({ from: customer }).should.be.rejected;

			//Unstake Tokens
			await decentralBank.unstakeTokens({ from: customer });

			result = await tether.balanceOf(customer);
			// eslint-disable-next-line no-undef
			assert.equal(
				result.toString(),
				tokens("100"),
				"customer mock wallet balance after unstaking"
			);

			// Check update balance of decentral bank
			result = await tether.balanceOf(decentralBank.address);
			// eslint-disable-next-line no-undef
			assert.equal(
				result.toString(),
				tokens("0"),
				"decentral bank mock balance after unstaking"
			);

			// Is staking balance
			result = await decentralBank.isStaking(customer);
			// eslint-disable-next-line no-undef
			assert.equal(
				result.toString(),
				"false",
				"customer is staking status after unstake"
			);
		});
	});
});
