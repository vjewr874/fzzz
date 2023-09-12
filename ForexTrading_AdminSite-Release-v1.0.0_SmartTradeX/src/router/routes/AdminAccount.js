import {lazy} from "react";
const AdminAccountRoutes = [
    {
        path: '/account-admin/list',
        component: lazy(() => import('../../pages/account-admin/index'))
    },
    {
        path: '/account-admin/detail/:id',
        component: lazy(() => import('../../pages/account-admin/detail/index'))
    },
    {
        path: '/account-admin/create',
        component: lazy(() => import('../../pages/account-admin/create/index'))
    },
    {
        path: '/account-admin/edit/:id',
        component: lazy(() => import('../../pages/account-admin/update/index'))
    }
]

export default AdminAccountRoutes