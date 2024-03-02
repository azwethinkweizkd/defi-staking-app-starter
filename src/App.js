import { useEffect } from "react";
import { observer } from "mobx-react";
import accountStore from "./stores/AccountStore";
import contractStore from "./stores/ContractStore";
import Web3 from "web3";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import BackgroundParticles from "./components/ParticleSettings";

import Tether from "./truffle_abis/Tether.json";
import RWD from "./truffle_abis/RWD.json";
import DecentralBank from "./truffle_abis/DecentralBank.json";

const App = observer(() => {
	useEffect(() => {
		const loadBlockchainData = async () => {
			try {
				if (window.ethereum) {
					const web3 = new Web3(window.ethereum);
					await window.ethereum.request({ method: "eth_requestAccounts" });
					const accounts = await web3.eth.getAccounts();
					accountStore.setUserAccount(accounts[0]);
					const networkId = await web3.eth.net.getId();
					const tetherData = Tether.networks[networkId];

					if (tetherData && accountStore.userAccount) {
						const tether = new web3.eth.Contract(
							Tether.abi,
							tetherData.address
						);
						contractStore.setTetherContract(tether);
						const tetherBalance = await tether.methods
							.balanceOf(accountStore.userAccount)
							.call();
						accountStore.setTetherBalance(tetherBalance.toString());
					}

					const rwdData = RWD.networks[networkId];
					if (rwdData && accountStore.userAccount) {
						const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
						contractStore.setRwdContract(rwd);
						const rwdBalance = await rwd.methods
							.balanceOf(accountStore.userAccount)
							.call();
						accountStore.setRwdBalance(rwdBalance.toString());
					}

					const decentralBankData = DecentralBank.networks[networkId];
					if (decentralBankData && accountStore.userAccount) {
						const decentralBank = new web3.eth.Contract(
							DecentralBank.abi,
							decentralBankData.address
						);
						contractStore.setDecentralBank(decentralBank);
						const stakingBalance = await decentralBank.methods
							.stakingBalance(accountStore.userAccount)
							.call();
						accountStore.setStakingBalance(stakingBalance.toString());
					}
				} else {
					alert("Please install MetaMask to use this application.");
				}

				accountStore.setLoading(false);
			} catch (error) {
				console.error("Error loading blockchain data:", error);
			}
		};

		loadBlockchainData();
	}, []);

	return (
		<div className="App" style={{ position: "relative" }}>
			<div style={{ position: "absolute" }}>
				<BackgroundParticles />
			</div>

			<Navbar account={accountStore.userAccount} />
			<div className="container-fluid mt-5">
				<div className="row">
					<main
						role="main"
						className="col-lg-12"
						style={{
							maxWidth: "65%",
							minHeight: "100vm",
							marginLeft: "auto",
							marginRight: "auto",
						}}>
						<div>
							{accountStore.loading ? (
								<div className="text-center">
									<Spinner
										animation="border"
										variant="light"
										style={{ marginTop: "75px" }}
									/>
								</div>
							) : (
								<Main />
							)}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
});

export default App;
