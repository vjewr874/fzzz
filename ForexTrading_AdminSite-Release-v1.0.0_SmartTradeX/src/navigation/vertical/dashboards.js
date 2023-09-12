// @ts-nocheck
import { Home } from 'react-feather'

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home size={20} />,
    badge: 'light-warning',
    navLink: '/dashboard',
    permissions: ['VIEW_DASHBOARD'],
  }
]
