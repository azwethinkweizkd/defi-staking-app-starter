import { useState } from "react";
import { observer } from "mobx-react";
import accountStore from "../stores/AccountStore";
import contractStore from "../stores/ContractStore";
import Web3 from "web3";
import tether from "../tether.png";

const Main = observer(() => {
	const [inputValue, setInputValue] = useState("");
	let web3;
	if (window.ethereum) {
		web3 = new Web3(window.ethereum);
	} else {
		console.error("Web3 or Web3.utils is not available.");
	}

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleStakeTokens = (amount) => {
		contractStore.tetherContract.methods
			.approve(contractStore.decentralBank._address, amount)
			.send({ from: accountStore.userAccount });
		contractStore.decentralBank.methods
			.depositTokens(amount)
			.send({ from: accountStore.userAccount });
	};

	const handleWithdrawTokens = () => {
		contractStore.decentralBank.methods
			.unstakeTokens()
			.send({ from: accountStore.userAccount });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		let amount = inputValue.toString();
		amount = web3.utils.toWei(amount, "ether");
		handleStakeTokens(amount);
		setInputValue("");
	};

	return (
		<div id="content" className="mt-3" style={{ opacity: "0.9" }}>
			<div className="card" style={{ background: "none", border: "none" }}>
				<table className="table text-muted text-center">
					<thead>
						<tr>
							<th scope="col" style={{ background: "none", color: "white" }}>
								Staking Balance
							</th>
							<th scope="col" style={{ background: "none", color: "white" }}>
								Reward Balance
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style={{ background: "none", color: "white" }}>
								{accountStore.stakingBalance &&
									web3.utils?.fromWei(
										accountStore.stakingBalance.toString(),
										"ether"
									)}{" "}
								USDT
							</td>
							<td style={{ background: "none", color: "white" }}>
								{accountStore.rwdBalance &&
									web3.utils?.fromWei(
										accountStore.rwdBalance.toString(),
										"ether"
									)}{" "}
								RWD
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="card mb-2" style={{ opacity: ".9" }}>
				<form onSubmit={handleSubmit} className="mb-3">
					<div style={{ borderSpacing: "0 1em" }}>
						<label
							className="float-left"
							style={{ marginLeft: "15px", float: "left" }}>
							<b>Stake Tokens</b>
						</label>
						<span
							className="float-right"
							style={{ marginRight: "8px", float: "right" }}>
							Balance:{" "}
							{accountStore.tetherBalance &&
								web3.utils?.fromWei(
									accountStore.tetherBalance.toString(),
									"ether"
								)}
						</span>
						<div className="input-group mb-4">
							<input
								type="text"
								placeholder="0"
								value={inputValue}
								onChange={handleInputChange}
								required
							/>
							<div className="input-group-open">
								<div className="input-group-text">
									<img src={tether} alt="tether" height="32px" /> &nbsp; USDT
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="btn btn-lg btn-block"
							style={{
								background: "#00FF66",
								color: "black",
								width: "100%",
								outline: "none",
							}}>
							DEPOSIT
						</button>
					</div>
				</form>
				<button
					onClick={handleWithdrawTokens}
					className="btn btn-lg btn-block"
					style={{ background: "#FFD700", color: "black" }}>
					WITHDRAW
				</button>
				<div className="card-body text-center" style={{ color: "blue" }}>
					AIRDROP
				</div>
			</div>
		</div>
	);
});

export default Main;
