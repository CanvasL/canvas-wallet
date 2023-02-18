import { Tab, Grid } from 'semantic-ui-react';
import { WalletCreate, WalletRecovery } from '../../components';
import i18n from '../../i18n';

const panes = [
    {
        menuItem: i18n.t('settings.new.title'),
        render: () => <Tab.Pane attached={false}><WalletCreate /></Tab.Pane>,
    },
    {
        menuItem: i18n.t('settings.import.title'),
        render: () => <Tab.Pane attached={false}><WalletRecovery /></Tab.Pane>,
    },
]

const Settings = () => {
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