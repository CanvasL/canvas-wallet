import './index.scss';
import { Grid, Card, Button, Input } from 'semantic-ui-react';
import i18n from '../../i18n';
import { IContent, RecoveryType } from '../../types';

import { useState } from 'react';
import { InputLabel } from '../';
import { useStore } from '../../store';

const contents: IContent[] = [
    {
        header: i18n.t('settings.recover.private_key.header'),
        description: i18n.t('settings.recover.private_key.description'),
        label: i18n.t('settings.recover.private_key.label'),
        placeHolder: i18n.t('settings.recover.private_key.place_holder'),
        color: 'blue'
    },
    {
        header: i18n.t('settings.recover.mnemonic_phrase.header'),
        description: i18n.t('settings.recover.mnemonic_phrase.description'),
        label: i18n.t('settings.recover.mnemonic_phrase.label'),
        placeHolder: i18n.t('settings.recover.mnemonic_phrase.place_holder'),
        color: 'green'
    },
]

const WalletRecovery = () => {
    const [type, setType] = useState(RecoveryType.PrivateKey);
    const [content, setContent] = useState(contents[0]);
    const [inputValue, setInputValue] = useState("");
    const { walletStore } = useStore();

    const { header, description, label, placeHolder, color } = content;

    const selectType = (type: RecoveryType) => {
        if (type === RecoveryType.PrivateKey) {
            setType(RecoveryType.PrivateKey);
            setContent(contents[0]);
        } else {
            setType(RecoveryType.MnemonicPhrase);
            setContent(contents[1]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const importWallet = () => {
        walletStore.importWallet(type, inputValue);
    };

    return (
        <Grid id="wallet-recovery">
            <Grid.Column width={4} />

            <Grid.Column width={8}>
                <Button.Group width="2">
                    <Button
                        size="big"
                        color={type === RecoveryType.PrivateKey ? color : undefined}
                        onClick={() => selectType(RecoveryType.PrivateKey)}
                    >
                        {i18n.t("settings.recover.private_key.name")}
                    </Button>
                    <Button.Or />
                    <Button
                        size="big"
                        color={type === RecoveryType.MnemonicPhrase ? color : undefined}
                        onClick={() => selectType(RecoveryType.MnemonicPhrase)}
                    >
                        {i18n.t("settings.recover.mnemonic_phrase.name")}
                    </Button>
                </Button.Group>
                <Card className="width-infinite">
                    <Card.Content header>{header}</Card.Content>
                    <Card.Content id="description_area" description>
                        {description}
                    </Card.Content>
                </Card>
                <InputLabel text={label} />
                <div id="input-area">
                    <Input
                        size="large"
                        className="width-infinite"
                        placeholder={placeHolder}
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </div>
                <Button
                    content={i18n.t("settings.recover.button")}
                    color={color}
                    onClick={importWallet}
                />
            </Grid.Column>

            <Grid.Column width={4} />
        </Grid>
    );
};

export default WalletRecovery