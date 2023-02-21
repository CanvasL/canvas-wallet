import { Card, Icon } from 'semantic-ui-react';
import { ethers } from "ethers";
import { useStore } from '../../store';

const Balance = () => {
    const { walletStore } = useStore();
    const balance = parseFloat(ethers.formatEther(walletStore.balance || '0'));
    const balanceInDollar = parseFloat(walletStore.prices?.ethereum.usd) * (walletStore.balance ? balance : 0);

    return (
        <Card>
            <Card.Content header='Total Balance' />
            <Card.Content description>
                <Icon name='ethereum' />
                {balance}
            </Card.Content>
            <Card.Content extra>
                <Icon name='dollar' />
                {balanceInDollar}
            </Card.Content>
        </Card>
    )
}

export default Balance