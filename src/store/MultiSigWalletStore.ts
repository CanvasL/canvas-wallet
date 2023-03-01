import { makeObservable, observable } from "mobx";
import { ethers } from "ethers";
import { http } from '../utils';
import walletDeclareFile from '../deployments/MultiSigWallet.json';

class MultiSigWalletStore {
    rootStore?: any;
    canvasWallet?: ethers.Contract;
    multiSigWalletAddress?: string[];
    balance?: bigint;

    constructor(_rootStore: any) {
        makeObservable(this, {
            multiSigWalletAddress: observable,
            balance: observable
        });
        this.rootStore = _rootStore;
    }

    getMultiSigWallet = (address: string) => {
        return new ethers.Contract(address, walletDeclareFile.abi, this.rootStore.walletStore.provider);
    }

    initCanvasWallet = async () => {
        console.log('init in store, this.network=', this.rootStore.walletStore.network);
        const walletFactoryDeclareFile = require(`../deployments/${this.rootStore.walletStore.network}/MultiSigWalletFactory.json`);
        this.canvasWallet = new ethers.Contract(
            walletFactoryDeclareFile.address,
            walletFactoryDeclareFile.abi,
            this.rootStore.walletStore.wallet
        ) as ethers.Contract;
        console.log('init in store, this.canvasWallet=', this.canvasWallet)
        await this._initMultiSigWalletsAddress();
    }

    private _initTransactionHistory = async () => {
        // this.transactionHistory = await this.provider!.getHistory(this.wallet.address);
    }

    private _initMultiSigWalletsAddress = async () => {
        this.multiSigWalletAddress = await this.canvasWallet!.getWalletsByCreater(this.rootStore.walletStore.wallet!.address);
        console.log('multiSigWalletAddress=', this.multiSigWalletAddress)
    }
}

export default MultiSigWalletStore;