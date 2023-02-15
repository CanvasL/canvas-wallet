import { Card, Icon } from 'semantic-ui-react';

const description = [
    'Amy is a violinist with 2 years experience in the wedding industry.',
    'She enjoys the outdoors and currently resides in upstate New York.',
].join(' ')

const Balance = () => {
    return (
        <Card>
            <Card.Content header='Total Balance' />
            <Card.Content description>
                {description}
            </Card.Content>
            <Card.Content extra>
                <Icon name='dollar' />4 USD
            </Card.Content>
        </Card>
    )
}

export default Balance