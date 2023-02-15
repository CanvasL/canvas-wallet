import './index.scss';
import { useState } from "react";
import { Input, Menu, MenuItemProps } from "semantic-ui-react";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import LanguageSelector from '../../components/LanguageSelector';

const Header = () => {
    const [state, setState] = useState({ activeItem: 'home' });

    const handleItemClick = (e: any, { name }: MenuItemProps) => {
        setState({ activeItem: name as string })
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
                    name='dashboard'
                    active={activeItem === 'dashboard'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name='transactions'
                    active={activeItem === 'transactions'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name='settings'
                    active={activeItem === 'settings'}
                    onClick={handleItemClick}
                />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <LanguageSelector />
                    </Menu.Item>
                    <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={handleItemClick}
                    />
                </Menu.Menu>
            </Menu>
        </>
    )
}

export default Header;