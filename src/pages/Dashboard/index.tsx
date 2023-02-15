import { Balance, CryptoList } from '../../components';
import { Tab, Grid } from 'semantic-ui-react';
import i18n from '../../i18n';

const panes = [
    {
        menuItem: i18n.t('dashboard.activity'),
        render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>,
    },
    {
        menuItem: i18n.t('dashboard.send'),
        render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    },
    {
        menuItem: i18n.t('dashboard.receive'),
        render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
    },
]

const Dashboard = () => {
    const savedCryptos = ['btc', 'eth', 'zen', 'uni', 'crv'];
    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <Balance />
                    <CryptoList
                        header={i18n.t('dashboard.wallets')}
                        button={i18n.t('dashboard.delete')}
                        cryptos={savedCryptos}
                    />
                </Grid.Column>
                <Grid.Column width={9}>
                    <Tab
                        menu={{ borderless: true, attached: false, tabular: false }}
                        panes={panes}
                    />
                </Grid.Column>
                <Grid.Column width={3}>

                </Grid.Column>
            </Grid>
        </>
    )
}

export default Dashboard