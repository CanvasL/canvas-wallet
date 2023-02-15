import { Card, Button, Image, List, Icon } from 'semantic-ui-react';

interface IProps {
    header: string, 
    button: string, 
    cryptos: string[]
}

const CryptoList = (props: IProps) => {
    const {header, button, cryptos} = props;
    
    return (
        <Card>
            <Card.Content header={header} />
            <Card.Content>
                <List divided verticalAlign='middle'>
                    {
                        cryptos.map((crypto, index) => {
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
                                            <Button>{button}</Button>
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