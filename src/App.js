import { useEffect, useState, useCallback } from "react";
import Web3 from "web3";
import Spinner from "react-bootstrap/Spinner";

import Navbar from "./components/Navbar";
import Main from "./components/Main";

import Tether from "./truffle_abis/Tether.json";
import RWD from "./truffle_abis/RWD.json";
import DecentralBank from "./truffle_abis/DecentralBank.json";

function App() {
	const [userAccount, setUserAccount] = useState("");
	const [tetherContract, setTetherContract] = useState();
	const [rwdContract, setRwdContract] = useState();
	const [decentralBank, setDecentralBank] = useState();
	const [tetherBalance, setTetherBalance] = useState();
	const [rwdBalance, setRwdBalance] = useState();
	const [stakingBalance, setStakingBalance] = useState();
	const [loading, setLoading] = useState(true);

	const loadBlockchainData = useCallback(async () => {
		try {
			if (window.ethereum) {
				const web3 = new Web3(window.ethereum);
				await window.ethereum.request({ method: "eth_requestAccounts" });
				const accounts = await web3.eth.getAccounts();
				setUserAccount(accounts[0]);
				const networkId = await web3.eth.net.getId();

				const tetherData = Tether.networks[networkId];

				if (tetherData && userAccount) {
					const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
					setTetherContract(tether);
					const tetherBalance = await tether.methods
						.balanceOf(userAccount)
						.call();
					setTetherBalance(tetherBalance.toString());
				}

				const rwdData = RWD.networks[networkId];

				if (rwdData && userAccount) {
					const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
					setRwdContract(rwd);
					const rwdBalance = await rwd.methods.balanceOf(userAccount).call();
					setRwdBalance(rwdBalance.toString());
				}

				const decentralBankData = DecentralBank.networks[networkId];

				if (decentralBankData && userAccount) {
					const decentralBank = new web3.eth.Contract(
						DecentralBank.abi,
						decentralBankData.address
					);
					setDecentralBank(decentralBank);
					const stakingBalance = await decentralBank.methods
						.stakingBalance(userAccount)
						.call();
					setStakingBalance(stakingBalance.toString());
				}
			} else {
				alert("Please install MetaMask to use this application.");
			}

			setLoading(false);
		} catch (error) {
			console.error("Error loading blockchain data:", error);
		}
	}, [userAccount]);

	const stakeTokens = async (amount) => {
		try {
			setLoading(true);
			await tetherContract.methods
				.approve(decentralBank._address, amount)
				.send({ from: userAccount });
			await decentralBank.methods
				.depositTokens(amount)
				.send({ from: userAccount });
			setLoading(false);
		} catch (error) {
			console.error("Error staking tokens:", error);
			setLoading(false);
		}
	};

	const withdrawTokens = async () => {
		try {
			setLoading(true);
			await decentralBank.methods.unstakeTokens().send({ from: userAccount });
			setLoading(false);
		} catch (error) {
			console.error("Error withdrawing tokens:", error);
			setLoading(false);
		}
	};

	useEffect(() => {
		const init = async () => {
			try {
				if (window.ethereum) {
					window.web3 = new Web3(window.ethereum);
					await window.ethereum.request({ method: "eth_requestAccounts" });
				} else if (window.web3) {
					window.web3 = new Web3(window.web3.currentProvider);
				} else {
					alert("No ethereum browser detected! You can check out Metamask");
				}

				await loadBlockchainData();
			} catch (error) {
				console.error("Error loading Web3 provider:", error);
			}
		};

		init();
	}, [loadBlockchainData]);

	return (
		<div className="App">
			<Navbar account={userAccount} />
			{loading ? (
				<div className="text-center">
					<Spinner
						animation="border"
						variant="primary"
						style={{ marginTop: "75px" }}
					/>
				</div>
			) : (
				<Main
					tetherBalance={tetherBalance}
					rwdBalance={rwdBalance}
					stakingBalance={stakingBalance}
					stakeTokens={stakeTokens}
					withdrawTokens={withdrawTokens}
				/>
			)}
		</div>
	);
}

export default App;
