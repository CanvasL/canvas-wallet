import { Card, Icon } from 'semantic-ui-react';
import { ethers } from "ethers";
import { useStore } from '../../store';
import { useObserver } from 'mobx-react-lite';

const Balance = () => {
    const { walletStore } = useStore();

    return useObserver(() => (
        <Card>
            <Card.Content header='Total Balance' />
            <Card.Content description>
                <Icon name='ethereum' />
                {ethers.formatEther(walletStore.balance || '0')}
            </Card.Content>
            <Card.Content extra>
                <Icon name='dollar' />
                {parseFloat(walletStore.prices?.ethereum.usd) * parseFloat(ethers.formatEther(walletStore.balance || '0'))}
            </Card.Content>
        </Card>
    ))
}

export default Balance