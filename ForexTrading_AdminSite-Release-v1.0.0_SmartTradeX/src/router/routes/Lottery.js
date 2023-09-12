import {lazy} from "react";

const LotteryRoutes = [
    // Dashboards
    {
        path: '/lottery/list',
        component: lazy(() => import('../../pages/management-lottery/list'))
    },
    {
        path: '/lottery/create',
        component: lazy(() => import('../../pages/management-lottery/create'))
    },
    {
        path: '/lottery/detail/:id',
        component: lazy(() => import('../../pages/management-lottery/detail'))
    },
    {
        path: '/lottery/update/:id',
        component: lazy(() => import('../../pages/management-lottery/update'))
    }
]

export default LotteryRoutes