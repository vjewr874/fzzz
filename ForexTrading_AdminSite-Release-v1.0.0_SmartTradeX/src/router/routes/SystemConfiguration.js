import {lazy} from "react";

const SystemConfiguration = [
    // Dashboards
    {
        path: '/system-configuration',
        component: lazy(() => import('../../pages/system-configuration'))
    }
]

export default SystemConfiguration