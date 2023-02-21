import './index.scss';
import { useState } from "react";
import { observer } from 'mobx-react-lite';
import { Label, Menu, MenuItemProps } from "semantic-ui-react";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { LanguageSelector } from '../../components/';
import { useStore } from '../../store';
import { shortenAddress } from '../../utils';
import i18n from '../../i18n';

const Header = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [state, setState] = useState({ activeItem: pathname });
    const { walletStore } = useStore();

    const handleItemClick = (_: any, { name }: MenuItemProps) => {
        setState({ activeItem: name as string });
        navigate(name as string);
    };

    const { activeItem } = state;
    return (
        <>
            <Menu secondary>
                <Menu.Menu position='left'>
                    <Menu.Item>
                        <Logo className="logo" />
                    </Menu.Item>
                </Menu.Menu>
                <Menu.Item
                    name='/dashboard'
                    active={activeItem === '/dashboard'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name='/transactions'
                    active={activeItem === '/transactions'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name='/settings'
                    icon='setting'
                    active={activeItem === '/settings'}
                    onClick={handleItemClick}
                />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <LanguageSelector />
                    </Menu.Item>
                    <Menu.Item>
                        <Label size='large' as='a' color={walletStore.wallet ? 'teal' : 'orange'}>
                            {walletStore.wallet ? shortenAddress(walletStore.wallet.address) : i18n.t('settings.import.title')}
                        </Label>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </>
    )
}

export default observer(Header);