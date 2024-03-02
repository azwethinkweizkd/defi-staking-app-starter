// AccountStore.js
import { observable, action, makeObservable } from "mobx";

class AccountStore {
	userAccount = "";
	tetherBalance = "";
	rwdBalance = "";
	stakingBalance = "";
	loading = true;

	constructor() {
		makeObservable(this, {
			userAccount: observable,
			tetherBalance: observable,
			rwdBalance: observable,
			stakingBalance: observable,
			loading: observable,
			setUserAccount: action,
			setTetherBalance: action,
			setRwdBalance: action,
			setStakingBalance: action,
			setLoading: action,
		});
	}

	setUserAccount(account) {
		this.userAccount = account;
	}

	setTetherBalance(balance) {
		this.tetherBalance = balance;
	}

	setRwdBalance(balance) {
		this.rwdBalance = balance;
	}

	setStakingBalance(balance) {
		this.stakingBalance = balance;
	}

	setLoading(loading) {
		this.loading = loading;
	}
}

const accountStore = new AccountStore();
export default accountStore;
