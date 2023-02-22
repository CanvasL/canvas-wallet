import './index.scss';
import { useState } from 'react';
import { Button, Form, Grid, Input, Label, Menu, MenuItemProps, Segment } from 'semantic-ui-react';
import { useStore } from '../../store';
import { shortenAddress } from '../../utils';

const MultiSigWallet = () => {
    const { walletStore } = useStore();
    const [state, setState] = useState({ activeItem: 'create'});

    const handleItemClick = (_: any, { name }: MenuItemProps) => {
        setState({ activeItem: name as string })
    }

    const { activeItem } = state;
    return (
        <Grid>
            <Grid.Column width={6}>
                <Menu size='large' vertical>
                    {
                        (walletStore.multiSigWalletAddress || []).map((address, index) => {
                            return (
                                <Menu.Item
                                    key={index}
                                    name={address}
                                    active={activeItem === address}
                                    onClick={handleItemClick}
                                >
                                    <Label color='teal'>{index + 1}</Label>
                                    {shortenAddress(address)}
                                </Menu.Item>
                            )
                        })
                    }
                    {/* <Menu.Item
                        name='inbox'
                        active={activeItem === 'inbox'}
                        onClick={handleItemClick}
                    >
                        <Label color='teal'>1</Label>
                        Inbox
                    </Menu.Item>

                    <Menu.Item
                        name='spam'
                        active={activeItem === 'spam'}
                        onClick={handleItemClick}
                    >
                        <Label>51</Label>
                        Spam
                    </Menu.Item>

                    <Menu.Item
                        name='updates'
                        active={activeItem === 'updates'}
                        onClick={handleItemClick}
                    >
                        <Label>1</Label>
                        Updates
                    </Menu.Item> */}
                    <Menu.Item
                        name='create'
                        active={activeItem === 'create'}
                    >
                        <Button basic color='teal'>Create</Button>
                    </Menu.Item>
                </Menu>
            </Grid.Column>
            <Grid.Column width={9}>
                <Segment stacked>
                    <Form>
                        <Form.Field>
                            <label>Num Confirmations Required</label>
                            <Input placeholder='0' />
                        </Form.Field>
                        <Form.Field>
                            <label>Owners</label>
                            <Input icon='settings' iconPosition='left' disabled placeholder='0x' />
                        </Form.Field>
                        <Form.Field>
                            <Input icon='settings' iconPosition='left' placeholder='0x' />
                        </Form.Field>
                        <Form.Field>
                            <Button
                                content='Add New Owner'
                                icon='add'
                                labelPosition='left'
                            />
                        </Form.Field>
                        {/* <Button color='teal' type='submit'>Create</Button> */}
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default MultiSigWallet;