import { Tab, Grid } from 'semantic-ui-react';
import { WalletRecovery } from '../../components';
import i18n from '../../i18n';
import { RecoveryType } from '../../types';

const panes = [
    {
        menuItem: i18n.t('settings.import.title'),
        render: () => <Tab.Pane attached={false}>
            <WalletRecovery

            />
        </Tab.Pane>,
    },
    {
        menuItem: i18n.t('settings.export.title'),
        render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    },
    {
        menuItem: 'Tab 3',
        render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
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