import { Tab, Grid, Menu, Segment } from 'semantic-ui-react';
import { WalletCreate, WalletRecovery, MultiSigWallet } from '../../components';
import i18n from '../../i18n';
import { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

const Settings = () => {
    // const { walletStore } = useStore();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [state, setState] = useState({ activeItem: pathname });
    const { activeItem } = state;

    const handleItemClick = (pathname: string) => {
        setState({ activeItem: pathname });
        navigate(pathname);
    }

    return (
        <Grid>
            <Grid.Column width={2} />
            <Grid.Column width={12}>
                <Menu pointing secondary>
                    <Menu.Item
                        name='Create Wallet'
                        active={activeItem === '/settings/create_wallet'}
                        onClick={() => handleItemClick('/settings/create_wallet')}
                    />
                    <Menu.Item
                        name='Recover Wallet'
                        active={activeItem === '/settings/recover_wallet'}
                        onClick={()=>handleItemClick('/settings/recover_wallet')}
                    />
                    <Menu.Item
                        name='Multi Sig Wallet'
                        active={activeItem === '/settings/multi_sig_wallet'}
                        onClick={()=>handleItemClick('/settings/multi_sig_wallet')}
                    />
                </Menu>

                <Segment>
                    <Routes>
                        <Route path='create_wallet' element={<WalletCreate />} />
                        <Route path='recover_wallet' element={<WalletRecovery />} />
                        <Route path='multi_sig_wallet' element={<MultiSigWallet />} />
                    </Routes>
                </Segment>
            </Grid.Column>
            <Grid.Column width={2} />
        </Grid>
    )
}

export default Settings