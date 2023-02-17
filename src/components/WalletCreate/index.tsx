import './index.scss';
import { Button, Card, Grid } from "semantic-ui-react";
import { ethers } from 'ethers';
import i18n from "../../i18n";
import { useState } from "react";
import { useStore } from '../../store';
import { RecoveryType } from '../../types';
import { InputLabel } from '../index';

const WalletCreate = () => {
    const [mnemonic, setMnemonic] = useState<any>('');
    const [importable, setImportable] = useState(false);
    const { walletStore } = useStore();

    const generatePhrase = () => {
        setMnemonic(ethers.Wallet.createRandom().mnemonic?.phrase);
        setImportable(true);
    }

    const importWallet = () => {
        walletStore.importWallet(RecoveryType.MnemonicPhrase, mnemonic);
    };
    return (
        <Grid id="wallet-create">
            <Grid.Column width={4} />

            <Grid.Column width={8}>
                <Button
                    size="big"
                    color='green'
                    onClick={generatePhrase}
                >
                    {i18n.t("settings.new.generate")}
                </Button>
                <Card className="width-infinite">
                    <Card.Content id="description_area" description>
                        {mnemonic.split(' ').map((word: string, index: any) =>
                        (
                            <span key={index}>
                                {word}
                            </span>
                        )
                        )}
                    </Card.Content>
                </Card>
                <InputLabel text={i18n.t('settings.new.notice')}/>
                <Button
                    color='teal'
                    disabled={!importable}
                    onClick={importWallet}
                >
                    {i18n.t("settings.new.import_directly")}
                </Button>
            </Grid.Column>

            <Grid.Column width={4} />
        </Grid>
    );
}

export default WalletCreate