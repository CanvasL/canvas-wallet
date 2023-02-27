import { Navigate, useRoutes } from "react-router-dom";
import { Dashboard, Settings, Transactions } from "../pages";
import { WalletCreate, WalletRecovery, MultiSigWallet } from '../components';

const GetRoutes = () => {
    return useRoutes([
        {
            path: '/',
            element: <Navigate to='/dashboard' />
        },
        {
            path: '/dashboard',
            element: <Dashboard />
        },
        {
            path: '/transactions',
            element: <Transactions />
        },
        {
            path: '/settings',
            element: <Settings />,
            children: [
                {
                    path: 'create_wallet',
                    element: <WalletCreate />,
                    index: true
                },
                {
                    path: 'recover_wallet',
                    element: <WalletRecovery />
                },
                {
                    path: 'multi_sig_wallet',
                    element: <MultiSigWallet />
                },
            ]
        },
    ])
}

export default GetRoutes;