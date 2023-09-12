import {lazy} from "react";

const CustomerRoutes = [
    // Dashboards
    {
        path: '/notification/list',
        component: lazy(() => import('../../pages/management-notification/list'))
    },
    {
        path: '/notification/create',
        component: lazy(() => import('../../pages/management-notification/create'))
    },
    {
        path: '/notification/detail/:id',
        component: lazy(() => import('../../pages/management-notification/detail'))
    },
]

export default CustomerRoutes