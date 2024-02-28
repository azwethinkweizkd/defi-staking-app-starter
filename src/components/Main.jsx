import tether from "../tether.png";

const Main = ({ tetherBalance, rwdBalance, stakingBalance }) => (
	<div className="container-fluid mt-5">
		<div className="row">
			<main
				role="main"
				className="col-lg-12"
				style={{
					maxWidth: "600px",
					minHeight: "100vm",
					marginLeft: "auto",
					marginRight: "auto",
				}}>
				<div>
					<div id="content" className="mt-3">
						<table className="table text-muted text-center">
							<thead>
								<tr style={{ color: "white" }}>
									<th scope="col">Staking Balance</th>
									<th scope="col">Reward Balance</th>
								</tr>
							</thead>
							<tbody>
								<tr style={{ color: "white" }}>
									<td>
										{stakingBalance &&
											window.web3.utils.fromWei(
												stakingBalance.toString(),
												"ether"
											)}
										USDT
									</td>
									<td>
										{rwdBalance &&
											window.web3.utils.fromWei(rwdBalance.toString(), "ether")}
										RWD
									</td>
								</tr>
							</tbody>
						</table>
						<div className="card mb-2" style={{ opacity: ".9" }}>
							<form className="mb-3">
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
											window.web3.utils.fromWei(
												tetherBalance.toString(),
												"ether"
											)}
									</span>
									<div className="input-group mb-4">
										<input type="text" placeholder="0" required />
										<div className="input-group-open">
											<div className="input-group-text">
												<img src={tether} alt="tether" height="32px" /> &nbsp;
												USDT
											</div>
										</div>
									</div>
									<button
										type="submit"
										className="btn btn-primary btn-lg btn-block"
										style={{ width: "100%" }}>
										DEPOSIT
									</button>
								</div>
							</form>
							<button className="btn btn-primary btn-lg btn-block">
								WITHDRAW
							</button>
							<div className="card-body text-center" style={{ color: "blue" }}>
								AIRDROP
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>
);

export default Main;
