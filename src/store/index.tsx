import { createContext, useContext } from 'react';
import WalletStore from './WalletStore';

class RootState {
    walletStore: WalletStore;

    constructor() {
        this.walletStore = new WalletStore();
    }
}

const rootStore = new RootState();
const context = createContext(rootStore);

const useStore = () => useContext(context);

export { useStore };
