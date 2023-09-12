import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboard',
    component: lazy(() => import('../../pages/dashboard/index'))
  }
]

export default DashboardRoutes
