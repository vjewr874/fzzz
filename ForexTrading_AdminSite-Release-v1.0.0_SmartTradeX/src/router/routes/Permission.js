import {lazy} from "react";
const PermissionRoutes = [
    // Dashboards
    {
        path: '/permission/list',
        component: lazy(() => import('../../pages/permission/list'))
    },
    {
        path: '/permission/add',
        exact: true,
        component: lazy(() => import('../../pages/permission/edit')),
        meta: {
            navLink: '/permission'
        }
    },
    {
        path: '/permission/edit/:id',
        exact: true,
        component: lazy(() => import('../../pages/permission/edit')),
        meta: {
            navLink: '/permission'
        }
    }
]

export default PermissionRoutes