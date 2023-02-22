import { makeAutoObservable } from "mobx";
import { ethers, Contract } from "ethers";
import { RecoveryType } from "../types";
import { http } from '../utils';
import walletDeclareFile from '../deployments/MultiSigWallet.json';

class WalletStore {
    network?: string;   // 'homestead' | 'goerli'
    wallet?: ethers.Wallet | ethers.HDNodeWallet;
    canvasWallet?: Contract;
    multiSigWalletAddress?: string[];
    provider?: ethers.Provider;
    balance?: bigint;
    prices?: any;
    // transactionHistory?: Array<any>;

    constructor() {
        makeAutoObservable(this);
        this._initNetwork();
        this._initWallet();
    }

    getMultiSigWallet = (address: string) => {
        return new ethers.Contract(address, walletDeclareFile.abi, this.provider);
    }

    importWallet = async (type: RecoveryType, key: string) => {
        if (type === RecoveryType.PrivateKey) {
            key = key.indexOf('0x') < 0 ? '0x' + key : key;
            this.wallet = new ethers.Wallet(key);
        } else {
            this.wallet = ethers.Wallet.fromPhrase(key);
        }
        this._initProvider();
        await this._initBalance();
        await this._initPrices();
    }

    initCanvasWallet = async () => {
        console.log('init in store, this.network=', this.network);
        const walletFactoryDeclareFile = require(`../deployments/${this.network}/MultiSigWalletFactory.json`);
        this.canvasWallet = new ethers.Contract(
            walletFactoryDeclareFile.address,
            walletFactoryDeclareFile.abi,
            this.provider
        );
        console.log('this.canvasWallet=', this.canvasWallet)
        await this._initMultiSigWalletsAddress();
    }

    setNetwork = async (network: string) => {
        this.network = network;
        localStorage.setItem('canvas-wallet--network', network);
    }

    private _initWallet = async () => {
        this.importWallet(
            RecoveryType.MnemonicPhrase,
            'fringe phrase river ostrich sail climb kingdom weasel palace gas party flight'
        );
    }

    private _initNetwork = () => {
        this.network = localStorage.getItem('canvas-wallet--network') as any || 'homestead';
    }

    private _initProvider = () => {
        this.provider = new ethers.AlchemyProvider(this.network, 'e2Q3GChQV5hFnhhbSX9tnYKr3e3WWgFt');
    }

    private _initBalance = async () => {
        this.balance = await this.provider!.getBalance(this.wallet!.address!);
    }

    private _initPrices = async () => {
        this.prices = await http.get('simple/price?ids=ethereum&vs_currencies=usd');
    }

    private _initTransactionHistory = async () => {
        // this.transactionHistory = await this.provider!.getHistory(this.wallet.address);
    }

    private _initMultiSigWalletsAddress = async () => {
        this.multiSigWalletAddress = await this.canvasWallet!.getWalletsByCreater(this.wallet!.address);
        console.log('multiSigWalletAddress=', this.multiSigWalletAddress)
    }
}

export default WalletStore