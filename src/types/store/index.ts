// enum INetwork {
//     mainnet,
//     goerli,
//     sepolia
// }
interface Transaction {
    to: string,
    value: bigint,
    data: string,
    executed: boolean,
    numConfirmations: number
}

interface IMultiSigWalletDetails {
    address: string,
    owners: string[],
    numConfirmationsRequired: bigint,
    transactions: Transaction[],
}

export type {
    IMultiSigWalletDetails
}