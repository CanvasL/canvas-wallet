enum RecoveryType {
    PrivateKey,
    MnemonicPhrase
}

interface IContent {
    header: string,
    description: string,
    label: string,
    placeHolder: string,
    color: 'green' | 'blue'
}

export {
    RecoveryType,
}

export type {
    IContent
}