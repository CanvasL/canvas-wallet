import { makeObservable, observable } from "mobx";
import { ethers } from "ethers";
import walletDeclareFile from '../deployments/MultiSigWallet.json';
import { IMultiSigWalletDetails } from '../types';

class MultiSigWalletStore {
    rootStore?: any;
    canvasWallet?: ethers.Contract;
    multiSigWallet?: ethers.Contract;
    multiSigWalletAddress?: string[];
    multiSigWalletDetails?: IMultiSigWalletDetails[];
    balance?: bigint;

    constructor(_rootStore: any) {
        makeObservable(this, {
            multiSigWalletAddress: observable,
            multiSigWalletDetails: observable,
            balance: observable,
        });
        this.rootStore = _rootStore;
    }

    getMultiSigWallet = (address: string) => {
        return new ethers.Contract(address, walletDeclareFile.abi, this.rootStore.walletStore.provider);
    }

    getWalletDetailsByAddress = (address: string) => {
        return this.multiSigWalletDetails![this.multiSigWalletAddress!.indexOf(address)];
    }

    initCanvasWallet = async () => {
        const walletFactoryDeclareFile = require(`../deployments/${this.rootStore.walletStore.network}/MultiSigWalletFactory.json`);
        this.canvasWallet = new ethers.Contract(
            walletFactoryDeclareFile.address,
            walletFactoryDeclareFile.abi,
            this.rootStore.walletStore.wallet
        );
    }

    initExsitingWalletAddress = async () => {
        this.multiSigWalletAddress = await this.canvasWallet!.getWalletsByCreater(this.rootStore.walletStore.wallet!.address);
        await this._initExsitingWalletDetails();
    }

    addOwnerOnChain = async (wallet: string, owner: string) => {

    }

    delOwnerOnChain = async (wallet: string, owner: string) => {

    }

    resetNumConfirmationsOnChain = async (wallet: string, numConfirmations: number) => {

    }

    private _initExsitingWalletDetails = async () => {
        this.multiSigWalletDetails = await Promise.all(this.multiSigWalletAddress!.map(async (address) => {
            const wallet = this.getMultiSigWallet(address);
            return {
                address,
                owners: await wallet.getOwners(),
                numConfirmationsRequired: await wallet.numConfirmationsRequired(),
                transactions: await wallet.getTransactions()
            } as IMultiSigWalletDetails;
        }))
        console.log('this.multiSigWalletDetails=', this.multiSigWalletDetails)
    }

    private _initTransactionHistory = async () => {
        // this.transactionHistory = await this.provider!.getHistory(this.wallet.address);
    }
}

export default MultiSigWalletStore;