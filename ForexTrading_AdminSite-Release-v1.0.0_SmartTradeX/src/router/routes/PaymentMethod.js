import {lazy} from "react";
const PaymentMethod = [
    // Dashboards
    {
        path: '/payment-method/list',
        component: lazy(() => import('../../pages/managemnet-paymentMethod/list/index'))
    },
    {
        path: '/payment-method/detail/:id/',
        component: lazy(() => import('../../pages/managemnet-paymentMethod/detail/index'))
    },
    {
        path: '/payment-method/create',
        component: lazy(() => import('../../pages/managemnet-paymentMethod/create/index'))
    },
    {
        path: '/payment-method/update/:id',
        component: lazy(() => import('../../pages/managemnet-paymentMethod/update/index'))
    }
]

export default PaymentMethod