// ContractStore.js
import { observable, action, makeObservable } from "mobx";

class ContractStore {
	tetherContract = null;
	rwdContract = null;
	decentralBank = null;

	constructor() {
		makeObservable(this, {
			tetherContract: observable.ref,
			rwdContract: observable.ref,
			decentralBank: observable.ref,
			setTetherContract: action,
			setRwdContract: action,
			setDecentralBank: action,
		});
	}

	setTetherContract(contract) {
		this.tetherContract = contract;
	}

	setRwdContract(contract) {
		this.rwdContract = contract;
	}

	setDecentralBank(contract) {
		this.decentralBank = contract;
	}
}

const contractStore = new ContractStore();
export default contractStore;
