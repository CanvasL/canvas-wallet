import { createContext, useContext } from 'react';
import WalletStore from './WalletStore';
import MultiSigWalletStore from './MultiSigWalletStore';

class RootState {
    walletStore: WalletStore;
    multiSigWalletStore: MultiSigWalletStore;

    constructor() {
        this.walletStore = new WalletStore();
        this.multiSigWalletStore = new MultiSigWalletStore(this);
    }
}

const rootStore = new RootState();
const context = createContext(rootStore);

const useStore = () => useContext(context);

export { useStore };
