import { useRoutes } from "react-router-dom";
import { Dashboard, Settings, Transactions } from "../pages";

const GetRoutes = () => {
    return useRoutes([
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
            element: <Settings />
        },
    ])
}

export default GetRoutes;