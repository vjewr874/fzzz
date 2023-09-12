import {lazy} from "react";

const MessageSMS = [
    // Dashboards
    {
        path: '/messageSMS/list',
        component: lazy(() => import('../../pages/management-sms/list/index'))
    },
    {
        path: '/messageSMS/detail/:id',
        component: lazy(() => import('../../pages/management-sms/detail/index'))
    }
]

export default MessageSMS