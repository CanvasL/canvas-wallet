import { useState } from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { useStore } from "../../store";

const networkOptions = [
    {
        key: 'homestead',
        text: 'Mainnet',
        value: 'homestead',
    },
    {
        key: 'goerli',
        text: 'Goerli',
        value: 'goerli',
    },
]

const NetworkSelector = () => {
    const { walletStore } = useStore();
    const [net, setNet] = useState(walletStore.network);

    const handleChange = (_: any, { value }: DropdownProps) => {
        setNet(value as string);
        walletStore.setNetwork(value as string);
    }

    return (
        <Dropdown
            placeholder='Select network'
            openOnFocus
            defaultValue={net}
            selection
            onChange={handleChange}
            options={networkOptions}
        />
    )
}

export default NetworkSelector;