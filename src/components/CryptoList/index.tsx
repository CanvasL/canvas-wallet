import { Card, Button, Image, List, Icon } from 'semantic-ui-react';

const CryptoList = () => {
    const savedCryptos = ['btc', 'eth', 'zen', 'uni', 'crv'];
    return (
        <Card>
            <Card.Content header='Wallets' />
            <Card.Content>
                <List divided verticalAlign='middle'>
                    {
                        savedCryptos.map((crypto, index) => {
                            return (
                                <List.Item key={index}>
                                    <List.Content floated='left'>
                                        <Image avatar src={require(`../../assets/crypto/${crypto}.svg`)} />
                                    </List.Content>
                                    <List.Content floated='left'>
                                        <List.Header>{crypto.toUpperCase()}</List.Header>
                                        <List.Description>{`$ 0.00`}</List.Description>
                                    </List.Content>
                                    {
                                        (crypto === 'btc' || crypto === 'eth') ? (
                                            <></>
                                        ) : <List.Content floated='right'>
                                            <Button>Delete</Button>
                                        </List.Content>
                                    }
                                </List.Item>
                            )
                        })
                    }
                </List>
            </Card.Content>
            <Card.Content extra>
                <Icon name='add' />
            </Card.Content>
        </Card>
    )
}

export default CryptoList