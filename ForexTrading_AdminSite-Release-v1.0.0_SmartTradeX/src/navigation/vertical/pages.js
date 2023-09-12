// @ts-nocheck
/* eslint-disable import/no-anonymous-default-export */
import {
  Settings,
  FileText,
  Info,
  Circle,
  User,
  Image,
  Clipboard,
  Users,
  Airplay,
  CreditCard,
  Lock,
  TrendingUp,
} from "react-feather";
const userData = JSON.parse(window.localStorage.getItem("userData"));
const listPermissionUser = userData?.permissions?.split(",");
const isPermissionApprove = (typePermission) => {
  const result = listPermissionUser?.includes(typePermission);
  return result;
};
export default [
  {
    id: "customerList",
    title: "customer-list",
    icon: <User size={12} />,
    permissions: ["VIEW_USERS"],
    navLink: "/customer/list",
  },
  // {
  //   id: 'purchaseList',
  //   title: 'purchase-list',
  //   icon: <Clipboard size={12} />,
  //   permissions: ['VIEW_ORDERS'],
  //   navLink: '/purchase-list/list'
  // },
  // {
  //   id: 'manager-transaction',
  //   title: 'list-management',
  //   icon: <Clipboard size={12} />,
  //   permissions: ['VIEW_ORDERS','VIEW_USERS'],
  //   children: [
  //
  //
  //   ]
  // },
  // {
  //   id: 'lottery',
  //   title: 'lottery-list',
  //   icon: <Image size={12} />,
  //   permissions: ['VIEW_PRODUCTS'],
  //   navLink: '/lottery/list'
  // },

  {
    id: "buysell",
    title: "buy-sell",
    icon: <TrendingUp size={12} />,
    permissions: ["VIEW_SYSTEM_CONFIG", "VIEW_ROLES", "VIEW_PAYMENT_METHOD"],
    children: [
      {
        id: "historyList",
        title: "history-list",
        icon: <FileText size={12} />,
        permissions: ["VIEW_DEPOSIT", "VIEW_WITHDRAW", "VIEW_TRANSACTION"],
        navLink: "/history/list",
      },
      {
        id: "gameRecord",
        title: "game-setting",
        icon: <FileText size={12} />,
        permissions: ["VIEW_DEPOSIT", "VIEW_WITHDRAW", "VIEW_TRANSACTION"],
        navLink: "/game-control/list",
      },
    ],
  },
  // {
  //   id: 'historyList',
  //   title: 'history-list',
  //   icon: <FileText size={12} />,
  //   permissions: ['VIEW_DEPOSIT', 'VIEW_WITHDRAW', 'VIEW_TRANSACTION'],
  //   navLink: '/history/list',
  //   total: true
  // },
  {
    id: "notificationList",
    title: "notification-list",
    icon: <Info size={12} />,
    permissions: ["VIEW_NOTIFICATIONS"],
    navLink: "/notification/list",
  },
  // {
  //   id: 'MessageSMS',
  //   title: 'MessageSMS',
  //   icon: <Users size={12} />,
  //   permissions: ['VIEW_NOTIFICATIONS'],
  //   navLink: '/MessageSMS/list'
  // },
  {
    id: "Account-admin",
    title: "account-admin",
    icon: <Users size={12} />,
    permissions: ["VIEW_STAFFS"],
    navLink: "/account-admin/list",
  },
  (isPermissionApprove("VIEW_SYSTEM_CONFIG") ||
    isPermissionApprove("VIEW_ROLES") ||
    isPermissionApprove("VIEW_PAYMENT_METHOD")) && {
    id: "setup",
    title: "set-up",
    icon: <Settings size={12} />,
    permissions: ["VIEW_SYSTEM_CONFIG", "VIEW_ROLES", "VIEW_PAYMENT_METHOD"],
    children: [
      {
        id: "System",
        title: "system",
        icon: <Airplay size={12} />,
        permissions: ["VIEW_SYSTEM_CONFIG"],
        navLink: "/system-configuration",
      },
      {
        id: "paymentMethod",
        title: "payment-method",
        icon: <CreditCard size={12} />,
        permissions: ["VIEW_PAYMENT_METHOD"],
        navLink: "/payment-method/list",
      },
      userData?.roleId === 1 && {
        id: 'Permission',
        title: 'permission',
        icon: <Lock size={12} />,
        permissions: ['VIEW_ROLES'],
        navLink: '/permission/list'
      },
    ],
  },
];
