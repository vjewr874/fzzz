import {lazy} from "react";

const CustomerRoutes = [
    // Dashboards
    {
        path: '/customer/list',
        component: lazy(() => import('../../pages/management-customer/list'))
    },
    {
        path: '/customer/detail/:id',
        component: lazy(() => import('../../pages/management-customer/detail'))
    }
]

export default CustomerRoutes