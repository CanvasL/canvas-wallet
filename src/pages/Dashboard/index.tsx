import { Balance, CryptoList } from '../../components';
import { Tab, Grid } from 'semantic-ui-react';

const panes = [
    {
        menuItem: 'Activity',
        render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>,
    },
    {
        menuItem: 'Send',
        render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    },
    {
        menuItem: 'Receive',
        render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
    },
]

const Dashboard = () => {
    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <Balance />
                    <CryptoList />
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