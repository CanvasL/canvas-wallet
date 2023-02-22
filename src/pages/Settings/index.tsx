import { Tab, Grid } from 'semantic-ui-react';
import { WalletCreate, WalletRecovery, MultiSigWallet } from '../../components';
import i18n from '../../i18n';
import { useEffect } from 'react';
import { useStore } from '../../store';

const Settings = () => {
    const {walletStore} = useStore();

    useEffect(() => {
        walletStore.initCanvasWallet();
        console.log("useEffect: init canvas wallet")
    }, []);

    const panes = [
        {
            menuItem: i18n.t('settings.new.title'),
            render: () => <Tab.Pane attached={false}><WalletCreate /></Tab.Pane>,
        },
        {
            menuItem: i18n.t('settings.import.title'),
            render: () => <Tab.Pane attached={false}><WalletRecovery /></Tab.Pane>,
        },
        {
            menuItem: i18n.t('settings.multi_sig.title'),
            render: () => <Tab.Pane attached={false}><MultiSigWallet /></Tab.Pane>,
        },
    ];

    return (
        <Grid>
            <Grid.Column width={2} />
            <Grid.Column width={12}>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes}>
                </Tab>
            </Grid.Column>
            <Grid.Column width={2} />
        </Grid>
    )
}

export default Settings