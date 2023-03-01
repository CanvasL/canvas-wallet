import './index.scss';
import { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import { Button, Form, Grid, Input, InputProps, Label, Menu, MenuItemProps, Segment } from 'semantic-ui-react';
import { useStore } from '../../store';
import { shortenAddress } from '../../utils';

const MultiSigWallet = () => {
    const { walletStore, multiSigWalletStore } = useStore();
    const [state, setState] = useState({
        activeItem: 'create',
        numConfirmations: undefined,
        owners: [walletStore.wallet?.address],
        isEditConfirmations: true,
        isAddNewOwner: false,
        newNumConfirmations: undefined,
        newOwner: undefined
    });
    const {
        activeItem,
        numConfirmations,
        owners,
        isAddNewOwner,
        isEditConfirmations,
        newNumConfirmations,
        newOwner
    } = state;

    useEffect(() => {
        console.log("useEffect: init canvas wallet")
        multiSigWalletStore.initCanvasWallet();
        multiSigWalletStore.initExsitingWalletAddress();
    }, [multiSigWalletStore]);

    useEffect(() => {
        setState({
            ...state,
            isEditConfirmations: true,
            isAddNewOwner: false,
            newNumConfirmations: undefined,
            newOwner: undefined
        })
        console.log(state)
    }, [state.activeItem])

    const handleItemClick = (_: any, { name }: MenuItemProps) => {
        setState({
            ...state,
            activeItem: name as string
        })
    }

    const createWallet = async () => {
        try {
            const tx = await multiSigWalletStore.canvasWallet?.createMultiSigWallet(
                state.owners,
                state.numConfirmations,
            );
            console.log('tx=', tx)
            const res = await tx.wait();
            console.log('res=', res);
            try {
                await multiSigWalletStore.initExsitingWalletAddress();
            } catch (err) {
                console.error(err);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return useObserver(() => (
        <Grid>
            <Grid.Column width={6}>
                <Menu size='large' vertical>
                    {
                        (multiSigWalletStore.multiSigWalletAddress || []).map((address, index1) => {
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
                        onClick={handleItemClick}
                    >
                        <Button color='teal' disabled={activeItem != 'create'} onClick={createWallet}>Create</Button>
                    </Menu.Item>
                </Menu>
            </Grid.Column>
            <Grid.Column width={9}>
                {
                    activeItem === 'create' ? (
                        <Segment stacked>
                            <Form>
                                <Form.Field>
                                    <label>Num Confirmations Required</label>
                                    <Input
                                        icon='tags'
                                        iconPosition='left'
                                        placeholder={owners.length === 1 ? 1 : `≤${owners.length}`}
                                        onChange={(_: any, { value }: InputProps) => {
                                            setState({
                                                ...state,
                                                numConfirmations: value
                                            })
                                        }}
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
                                                        onClick: () => {
                                                            owners.splice(index2, 1);
                                                            setState({
                                                                ...state,
                                                                owners
                                                            })
                                                        },
                                                        disabled: index2 === 0 ? true : false
                                                    }}
                                                    index={index2}
                                                    icon='settings'
                                                    value={owner}
                                                    iconPosition='left'
                                                    disabled={index2 === 0}
                                                    placeholder='0x'
                                                    onChange={(_: any, { value, index }: InputProps) => {
                                                        owners[index] = value;
                                                        setState({
                                                            ...state,
                                                            owners
                                                        })
                                                    }}
                                                />
                                            </Form.Field>
                                        )
                                    })
                                }
                                <Form.Field>
                                    <Button
                                        icon='add'
                                        onClick={() => {
                                            setState({
                                                ...state,
                                                owners: [...owners, undefined]
                                            })
                                        }}
                                    />
                                </Form.Field>
                            </Form>
                        </Segment>
                    ) : (
                        <Segment>
                            <Form>
                                <Form.Field>
                                    <label>Num Confirmations Required</label>
                                    <Input
                                        disabled={isEditConfirmations}
                                        action={{
                                            icon: isEditConfirmations ? 'edit' : 'upload',
                                            onClick: isEditConfirmations ? () => setState({ ...state, isEditConfirmations: false })
                                                : () => multiSigWalletStore.resetNumConfirmationsOnChain(activeItem, newNumConfirmations!),
                                            disabled: !isEditConfirmations && newNumConfirmations === numConfirmations
                                        }}
                                        value={newNumConfirmations}
                                        icon='tags'
                                        iconPosition='left'
                                        placeholder={multiSigWalletStore.getWalletDetailsByAddress(activeItem).numConfirmationsRequired.toString()}
                                        onChange={(_: any, { value }: InputProps) => {
                                            setState({
                                                ...state,
                                                newNumConfirmations: value
                                            })
                                        }}
                                    />
                                </Form.Field>
                                {
                                    multiSigWalletStore.getWalletDetailsByAddress(activeItem).owners.map((owner, index2) => {
                                        return (
                                            <Form.Field key={index2}>
                                                <label>{`Owner ${index2 + 1}`}</label>
                                                <Input
                                                    action={{
                                                        icon: 'trash',
                                                        onClick: () => multiSigWalletStore.delOwnerOnChain(activeItem, newOwner!),
                                                        disabled: index2 === 0 ? true : false
                                                    }}
                                                    icon='settings'
                                                    value={owner}
                                                    iconPosition='left'
                                                    disabled
                                                />
                                            </Form.Field>
                                        )
                                    })
                                }
                                <Form.Field>
                                    <Button
                                        icon={isAddNewOwner ? 'minus' : 'add'}
                                        onClick={() => {
                                            setState({
                                                ...state,
                                                isAddNewOwner: !isAddNewOwner
                                            })
                                        }}
                                    />
                                </Form.Field>
                                {
                                    isAddNewOwner ?
                                        <Form.Field>
                                            <label>{`New Owner`}</label>
                                            <Input
                                                action={{
                                                    icon: 'upload',
                                                    onClick: () => multiSigWalletStore.addOwnerOnChain(activeItem, newOwner!),
                                                    disabled: newOwner ? false : true
                                                }}
                                                icon='settings'
                                                value={newOwner}
                                                iconPosition='left'
                                                placeholder='0x'
                                                onChange={(_: any, { value }: InputProps) => {
                                                    setState({
                                                        ...state,
                                                        newOwner: value
                                                    })
                                                }}
                                            />
                                        </Form.Field>
                                        :
                                        <></>
                                }
                            </Form>
                        </Segment>
                    )
                }
            </Grid.Column>
        </Grid>
    ))
}

export default MultiSigWallet;