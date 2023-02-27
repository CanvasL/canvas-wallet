import './index.scss';
import { useState } from 'react';
import { Button, Form, Grid, Input, InputProps, Label, Menu, MenuItemProps, Segment } from 'semantic-ui-react';
import { useStore } from '../../store';
import { shortenAddress } from '../../utils';

const MultiSigWallet = () => {
    const { walletStore } = useStore();
    const [state, setState] = useState({
        activeItem: 'create',
        numConfirmations: 1,
        owners: [walletStore.wallet?.address]
    });

    const handleItemClick = (_: any, { name }: MenuItemProps) => {
        setState({
            ...state,
            activeItem: name as string
        })
    }

    const handleConfirmationsChange = (_: any, { value }: InputProps) => {
        setState({
            ...state,
            numConfirmations: value
        })
    }

    const addNewOwner = () => {
        setState({
            ...state,
            owners: [...owners, undefined]
        })
    }

    const delOwner = (index: number) => {
        owners.splice(index, 1);
        setState({
            ...state,
            owners
        })
    }

    const createWallet = async () => {
        await walletStore.canvasWallet?.createMultiSigWallet(
            state.numConfirmations,
            state.owners
        );
    }

    const { activeItem, owners } = state;
    return (
        <Grid>
            <Grid.Column width={6}>
                <Menu size='large' vertical>
                    {
                        (walletStore.multiSigWalletAddress || []).map((address, index1) => {
                            return (
                                <Menu.Item
                                    key={index1}
                                    name={address}
                                    active={activeItem === address}
                                    onClick={handleItemClick}
                                >
                                    <Label color='teal'>{index1 + 1}</Label>
                                    {shortenAddress(address)}
                                </Menu.Item>
                            )
                        })
                    }
                    <Menu.Item
                        name='create'
                        active={activeItem === 'create'}
                    >
                        <Button color='teal' onClick={createWallet}>Create</Button>
                    </Menu.Item>
                </Menu>
            </Grid.Column>
            <Grid.Column width={9}>
                <Segment stacked>
                    <Form>
                        <Form.Field>
                            <label>Num Confirmations Required</label>
                            <Input
                                placeholder={owners.length}
                                onChange={handleConfirmationsChange}
                            />
                        </Form.Field>
                        {
                            owners.map((owner, index2) => {
                                return (
                                    <Form.Field key={index2}>
                                        <label>{`Owner ${index2 + 1}`}</label>
                                        <Input
                                            action={{
                                                icon: 'trash',
                                                onClick: () => delOwner(index2),
                                                disabled: index2 === 0 ? true : false
                                            }}
                                            icon='settings'
                                            value={owner}
                                            iconPosition='left'
                                            disabled={index2 === 0}
                                            placeholder='0x'
                                        />
                                    </Form.Field>
                                )
                            })
                        }
                        <Form.Field>
                            <Button
                                name='add'
                                onClick={addNewOwner}
                                icon='add'
                            />
                        </Form.Field>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default MultiSigWallet;