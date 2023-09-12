import { lazy } from 'react'
// import { Redirect } from 'react-router-dom'

const PagesRoutes = [
  {
    path: '/login',
    component: lazy(() => import('../../views/pages/authentication/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/pages/manager-user',
    component: lazy(() => import('../../views/pages/manager-user/index'))
  },
  {
    path: '/pages/edit-user',
    component: lazy(() => import('../../views/pages/manager-user/editUser'))
  },
  {
    path: '/pages/system-configuration',
    component: lazy(() => import('../../views/pages/system-configuration/index'))
  },
  {
    path: '/pages/manager-transaction',
    component: lazy(() => import('../../views/pages/manager-transaction/index'))
  },
  {
    path: "/pages/ticket-k3",
    component: lazy(() => import('../../views/pages/manage-ticket-k3'))
  },
  {
    path: "/pages/ticket-wingo",
    component: lazy(() => import('../../views/pages/manage-ticket-wingo'))
  },
  {
    path: "/pages/ticket-5d",
    component: lazy(() => import('../../views/pages/manage-ticket-5d'))
  },
  {
    path: '/pages/detail-transaction',
    component: lazy(() => import('../../views/pages/manager-transaction/depositTransaction/detailTransaction.js'))
  },
  {
    path: '/pages/detail-withdraw',
    component: lazy(() => import('../../views/pages/manager-transaction/withdrawTransaction/detailWithdraw.js'))
  },
  {
    path: '/pages/detail-withdraw-BTC',
    component: lazy(() => import('../../views/pages/manager-transaction/withdrawBTC/detailWithdrawBTC.js'))
  },
  {
    path: '/pages/manager-product',
    component: lazy(() => import('../../views/pages/manager-product/index'))
  },
  {
    path: '/pages/edit-product',
    component: lazy(() => import('../../views/pages/manager-product/editProduct'))
  },
  // {
  //   path: '/pages/manager-organization',
  //   component: lazy(() => import('../../views/pages/manager-organization/index'))
  // },
  {
    path: '/pages/manager-activity',
    component: lazy(() => import('../../views/pages/manager-activity/index'))
  },
  {
    path: '/pages/manager-factory',
    component: lazy(() => import('../../views/pages/manager-factory/index'))
  },
  {
    path: '/pages/manager-prize',
    component: lazy(() => import('../../views/pages/manager-prize/index'))
  },
  {
    path: '/pages/report-factory',
    component: lazy(() => import('../../views/pages/report-factory/index'))
  },
  {
    path: '/pages/report-user',
    component: lazy(() => import('../../views/pages/report-user/index'))
  },
  {
    path: '/pages/manager-staking',
    component: lazy(() => import('../../views/pages/manager-staking/index'))
  },
  {
    path: '/pages/manager-branch',
    component: lazy(() => import('../../views/pages/manager-branch/index'))
  },
  {
    path: '/pages/manager-notification',
    component: lazy(() => import('../../views/pages/manager-notification/index'))
  },
  {
    path: '/pages/insert-message',
    component: lazy(() => import('../../views/pages/manager-notification/insertMessage'))
  },
  {
    path: '/pages/account-admin',
    component: lazy(() => import('../../views/pages/account-admin/index'))
  },
  {
    path: '/pages/deposit',
    component: lazy(() => import('../../views/pages/deposit/index'))
  },
  {
    path: '/pages/withdraw',
    component: lazy(() => import('../../views/pages/withdraw/index'))
  },
  {
    path: '/pages/buy-packet',
    component: lazy(() => import('../../views/pages/buy-packet/index'))
  },
  {
    path: '/pages/payment-method',
    component: lazy(() => import('../../views/pages/payment-method/index'))
  },
  {
    path: '/pages/buy-coin',
    component: lazy(() => import('../../views/pages/buy-coin/index'))
  },
  {
    path: '/pages/form-user',
    component: lazy(() => import('../../views/pages/user/formUser'))
  },
  {
    path: '/pages/role/add',
    exact: true,
    component: lazy(() => import('../../views/pages/account-admin/edit-role')),
    meta: {
      navLink: '/pages/account-admin'
    }
  },
  {
    path: '/pages/role/list',
    exact: true,
    component: lazy(() => import('../../views/pages/account-admin/role')),
    meta: {
      navLink: '/pages/account-admin'
    }
  },
  {
    path: '/pages/role/:id',
    exact: true,
    component: lazy(() => import('../../views/pages/account-admin/edit-role')),
    meta: {
      navLink: '/pages/account-admin'
    }
  },
  {
    path: '/pages/maintain',
    component: lazy(() => import('../../views/pages/maintain/index'))
  },
  {
    path: '/pages/coin',
    component: lazy(() => import('../../views/pages/coin/index'))
  },
  {
    path: '/pages/exchange-requests',
    component: lazy(() => import('../../views/pages/exchange-requests/index'))
  },
  {
    path: '/pages/packet-management',
    component: lazy(() => import('../../views/pages/packet-management/index'))
  },
  {
    path: '/pages/packet-bonus',
    component: lazy(() => import('../../views/pages/packet-bonus/index'))
  },

  {
    path: '/pages/setting',
    component: lazy(() => import('../../views/pages/setting/index'))
  },
  {
    path: '/misc/not-authorized',
    component: lazy(() => import('../../views/pages/misc/NotAuthorized')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/maintenance',
    component: lazy(() => import('../../views/pages/misc/Maintenance')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/error',
    component: lazy(() => import('../../views/pages/misc/Error')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/pages/game-record',
    component: lazy(() => import('../../views/pages/game-record')),
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/pages/game-record_5D',
    component: lazy(() => import('../../views/pages/game-record_5D')),
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/pages/game-record_WinGo',
    component: lazy(() => import('../../views/pages/game-record__WinGo')),
    meta: {
      publicRoute: true
    }
  }
]

export default PagesRoutes
