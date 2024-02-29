import { useState } from "react";
import tether from "../tether.png";

const Main = ({
	tetherBalance,
	rwdBalance,
	stakingBalance,
	stakeTokens,
	withdrawTokens,
}) => {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		let amount = inputValue.toString();
		amount = window.web3.utils.toWei(amount, "ether");
		stakeTokens(amount);
		setInputValue("");
	};

	const handleWithdraw = (event) => {
		event.preventDefault();
		withdrawTokens();
	};

	return (
		<div id="content" className="mt-3">
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
								{stakingBalance &&
									window.web3.utils.fromWei(stakingBalance.toString(), "ether")}
								USDT
							</td>
							<td style={{ background: "none", color: "white" }}>
								{rwdBalance &&
									window.web3.utils.fromWei(rwdBalance.toString(), "ether")}
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
							{tetherBalance &&
								window.web3.utils.fromWei(tetherBalance.toString(), "ether")}
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
					onClick={handleWithdraw}
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
};

export default Main;
