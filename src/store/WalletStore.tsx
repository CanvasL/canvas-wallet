import { makeAutoObservable } from "mobx";
import { ethers } from "ethers";
import { RecoveryType } from "../types";

class WalletStore {
    wallet?: ethers.Wallet | ethers.HDNodeWallet;
    provider?: ethers.Provider;
    balance?: bigint;
    // transactionHistory?: Array<any>;

    constructor() {
        makeAutoObservable(this);
    }

    importWallet = async (type: RecoveryType, key: string) => {
        if (type === RecoveryType.PrivateKey) {
            key = key.indexOf('0x') < 0 ? '0x' + key : key;
            this.wallet = new ethers.Wallet(key);
        } else {
            this.wallet = ethers.Wallet.fromPhrase(key);
        }
        this.provider = new ethers.InfuraProvider();
        this.balance = await this.provider.getBalance(this.wallet.address);
        // this.transactionHistory = await this.provider.getHistory(this.wallet.address);
    }
}

export default WalletStore