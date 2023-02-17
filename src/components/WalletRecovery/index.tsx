import './index.scss';
import { Grid, Card, Button, Input } from 'semantic-ui-react';
import i18n from '../../i18n';
import { RecoveryType } from '../../types';
import { useState } from 'react';
import { InputLabel } from '../';

interface IProps {
    // type: RecoveryType
}

interface IContent {
    header: string,
    description: string,
    label: string,
    placeHolder: string,
    color: 'green' | 'blue'
}

const contents: IContent[] = [
    {
        header: i18n.t('settings.import.private_key.header'),
        description: i18n.t('settings.import.private_key.description'),
        label: i18n.t('settings.import.private_key.label'),
        placeHolder: i18n.t('settings.import.private_key.place_holder'),
        color: 'blue'
    },
    {
        header: i18n.t('settings.import.mnemonic_phrase.header'),
        description: i18n.t('settings.import.mnemonic_phrase.description'),
        label: i18n.t('settings.import.mnemonic_phrase.label'),
        placeHolder: i18n.t('settings.import.mnemonic_phrase.place_holder'),
        color: 'green'
    },
]

const WalletRecovery = (props: IProps) => {
    const [type, setType] = useState(RecoveryType.PrivateKey);
    const [content, setContent] = useState(contents[0]);

    const { header, description, label, placeHolder, color } = content;

    const selectType = (type: RecoveryType) => {
        if (type === RecoveryType.PrivateKey) {
            setType(RecoveryType.PrivateKey);
            setContent(contents[0]);
        } else {
            setType(RecoveryType.MnemonicPhrase);
            setContent(contents[1]);
        }
    }

    return (
        <Grid id='wallet-recovery'>
            <Grid.Column width={4} />

            <Grid.Column width={8}>
                <Button.Group width='2'>
                    <Button
                        size='big'
                        color={type === RecoveryType.PrivateKey?color:undefined}
                        onClick={() => selectType(RecoveryType.PrivateKey)}
                    >{i18n.t('settings.import.private_key.name')}</Button>
                    <Button.Or />
                    <Button
                        size='big'
                        color={type === RecoveryType.MnemonicPhrase?color:undefined}
                        onClick={() => selectType(RecoveryType.MnemonicPhrase)}
                    >{i18n.t('settings.import.mnemonic_phrase.name')}</Button>
                </Button.Group>
                <Card className='width-infinite'>
                    <Card.Content header>
                        {header}
                    </Card.Content>
                    <Card.Content id='description_area' description>
                        {description}
                    </Card.Content>
                </Card>
                <InputLabel text={label} />
                <div id='input-area'>
                    <Input size='large' className='width-infinite' placeholder={placeHolder} />
                </div>
                <Button content={i18n.t('settings.import.button')} color={color} />
            </Grid.Column>

            <Grid.Column width={4} />
        </Grid>
    )
}

export default WalletRecovery