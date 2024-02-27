import bankImg from "../bank.png";

const Navbar = ({ account }) => {
	return (
		<nav
			className="navbar navbar-dark fixed-top shadow p-0"
			style={{ background: "black", height: "50px" }}>
			<a
				className="navbar-brand col-sm-3 col-md-2 mr-0"
				style={{ color: "white" }}
				href="/">
				<img
					src={bankImg}
					width="50"
					height="30"
					className="d-inline-block align-top"
					alt="Decentral Bank"
				/>{" "}
				DAPP Yield Staking (Decentralized Banking)
			</a>
			<ul className="navbar-nav px-3">
				<li className="text-nowrap nav-item d-sm-block">
					<small style={{ color: "white" }}>ACCOUNT NUMBER: {account}</small>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
