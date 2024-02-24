import "babel-register";
import "babel-polyfill";

export const networks = {
	development: {
		host: "127.0.0.1",
		port: "7545",
		network_id: "*", // Connect to any network
	},
};
export const contracts_directory = "./src/contracts";
export const contracts_build_directory = "./src/truffle_abis";
export const compilers = {
	solc: {
		version: "^0.5.0",
		optimizer: {
			enabled: true,
			runs: 200,
		},
	},
};
