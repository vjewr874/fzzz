/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { notification } from 'antd';
import { Introduce } from 'Page/Introduce';
import DetailBranch from 'Page/Organization/detailBranch';
import HistoryPromotion from 'Page/Promotions/HistoryPromotion';
import MyTeam from 'Page/Promotions/MyTeam';
import Promotion from 'Page/Promotions/Promotions';
import Tuturial from 'Page/Promotions/Tuturial';
import Saving from 'Page/Saving';
import Settings from 'Page/Settings';
import TransactionHistory from 'Page/TransactionHistory';

import React, { lazy, Suspense } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './../src/pages/Layout';
import {
  IconBranch,
  IconLeaderBoard,
  IconNotification,
  IconOrganizationSmall,
  IconPacket,
  IconProfileIcon,
  IconRechargeHistory,
  IconSaving,
  IconSettings,
  IconSignout,
  IconSupport,
  IconWallet,
  ThunderButton2,
} from './assets/icons/index';
import ReferFriends from './pages/ReferFriends';
import Loader from './components/Loader';

const NotificationDetail = lazy(() => import('./../src/Page/Notifications/Detail'));
const Home = lazy(() => import('./../src/pages/Home'));
const Game5DLotre = lazy(() => import('./Page/Game5DLotre'));
const AllBet5DLotre = lazy(() => import('./Page/Game5DLotre/allBet5DLotre'));
const BoughtMachine = lazy(() => import('./../src/Page/TransactionHistory/BoughtMachine'));
const DepositUSDT = lazy(() => import('./../src/Page/TransactionHistory/DepositUSDT'));
const ExchangeFAC = lazy(() => import('./../src/Page/TransactionHistory/ExchangeFAC'));
const ExchangePoint = lazy(() => import('./../src/Page/TransactionHistory/ExchangePoint'));
const ReceivePoint = lazy(() => import('./../src/Page/TransactionHistory/ReceivePoint'));
const ReceiveBTC = lazy(() => import('./../src/Page/TransactionHistory/ReceiveBTC'));
const ReceiveFAC = lazy(() => import('./../src/Page/TransactionHistory/ReceiveFAC'));
const WithdrawBTC = lazy(() => import('./../src/Page/TransactionHistory/WithdrawBTC'));
const WithdrawUSDT = lazy(() => import('./../src/Page/TransactionHistory/WithdrawUSDT'));
const Branch = lazy(() => import('./../src/Page/Branch'));
const Organization = lazy(() => import('./../src/Page/Organization'));
const LeaderBoard = lazy(() => import('./../src/Page/LeaderBoard'));
const Packet = lazy(() => import('./../src/Page/Packet'));
const Support = lazy(() => import('./../src/Page/Support'));
const ProfilePolicy = lazy(() => import('./../src/Page/Profile/policy'));
const ProfileIntroOverview = lazy(() => import('./../src/Page/Profile/introOverview'));
const ProfileCustomer = lazy(() => import('./../src/Page/Profile/customer'));
const ProfileAboutUs = lazy(() => import('./../src/Page/Profile/aboutUs'));
const InfoProfile = lazy(() => import('./../src/Page/Profile/infoProfile'));
const ProfileGuideUser = lazy(() => import('./../src/Page/Profile/guideUser'));
const BetRecordsHistory = lazy(() => import('./../src/Page/Profile/betRecordsHistory'));
const Management = lazy(() => import('./Page/Management'));
const Police = lazy(() => import('./../src/Page/Police'));
// const ListPackageBonus = lazy(() => import("./../src/Page/ListPackageBonus"))
const Staking = lazy(() => import('./Page/Staking'));
const GameWindGo = lazy(() => import('./Page/GameWinGo'));
const BuyLottery = lazy(() => import('./pages/BuyLottery'));
const ShopCart = lazy(() => import('./pages/ShopCart'));
const Payment = lazy(() => import('./pages/Payment'));
const Guide = lazy(() => import('./pages/GameplayGuide'));
const LotteryCalendar = lazy(() => import('./pages/LotteryCalendar'));
const TransitionDetail = lazy(() => import('./pages/TransitionHistory/TransitionDetail'));
const CommissionPayment = lazy(() => import('./pages/CommissionPayment'));
const FAQs = lazy(() => import('./pages/FAQs'));
const FAQsDetail = lazy(() => import('./pages/FAQs/components/FAQsDetail'));
const BookingHistory = lazy(() => import('./pages/BookingHistory'));
const NewPassword = lazy(() => import('./../src/pages/Auth/ForgotPassword/components/NewPassword'));
const ChangeSuccess = lazy(() => import('./../src/pages/Auth/ForgotPassword/components/ChangeSuccess'));
const Contact = lazy(() => import('./../src/pages/Contact'));

const ResultLottery = lazy(() => import('./../src/pages/ResultLottery'));
const LoginGimolott = lazy(() => import('./../src/pages/Auth/Login/components/loginGimolott'));
const MoneyTransferGimolott = lazy(() => import('./../src/pages/MoneyTransferGimolott'));
//Stock
const TransitionHistory = lazy(() => import('./pages/TransitionHistory'));
const MyProfile = lazy(() => import('./../src/pages/MyProfile'));
const CustomerService = lazy(() => import('./../src/pages/CustomerService'));
const MyWallet = lazy(() => import('./../src/pages/MyWallet'));
const ConstraintBank = lazy(() => import('./../src/pages/ConstraintBank'));
const Notification = lazy(() => import('./../src/pages/Notification'));
const ChangePassword = lazy(() => import('./../src/pages/Auth/ChangePassword/'));
const Register = lazy(() => import('./../src/pages/Auth/Register'));
const Login = lazy(() => import('./../src/pages/Auth/Login'));
const ForgotPass = lazy(() => import('./../src/pages/Auth/ForgotPassword'));
const Recharge = lazy(() => import('./../src/pages/Recharge'));
const Withdraw = lazy(() => import('./../src/pages/Withdraw'));
const Profile = lazy(() => import('./pages/Profile'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const Group = lazy(() => import('./pages/Group'));
const Details = lazy(() => import('./../src/pages/Details'));
const HallTransaction = lazy(() => import('./../src/pages/HallTransaction'));
const DetailChart = lazy(() => import('./../src/pages/DetailChart'));
const PaymentExchange = lazy(() => import('./../src/pages/PaymentExchange'));
const PaymentExchangeDetail = lazy(() => import('./../src/pages/PaymentExchange/Detail'));
const marketHistory = lazy(() => import('./../src/pages/MarketHistory'));

export const routes = {
  login: {
    path: '/login',
    component: Login,
    isAuth: false,
    label: 'Đăng nhập',
    isHiddenFooter: true,
  },
  loginGimolott: {
    path: '/loginGimolott/:token',
    component: LoginGimolott,
    isAuth: false,
    label: 'Đăng nhập bằng Tài khoản Gimolott',
    isHiddenFooter: true,
  },
  register: {
    path: '/register',
    component: Register,
    isAuth: false,
    label: 'Đăng ký',
    isHiddenFooter: true,
  },
  forgotPass: {
    path: '/forgot',
    component: ForgotPass,
    isAuth: false,
    label: 'Quên mật khẩu',
    isHiddenFooter: true,
  },
  police: {
    path: '/police',
    component: Police,
    isAuth: false,
    label: 'Chính sách bảo mật',
  },
  allBet5DLotre: {
    path: '/game-all-5d-lotre',
    component: AllBet5DLotre,
    isAuth: false,
    label: ' 5D Lotre',
    isHiddenFooter: true,
  },
  game5DLotre: {
    path: '/game-5d-lotre',
    component: Game5DLotre,
    isAuth: false,
    label: 'Game 5D Lotre',
    isHiddenFooter: true,
  },
  introduce: {
    path: '/introduce',
    component: Introduce,
    isAuth: false,
    label: 'Giới thiệu',
    isTop: true,
    showFooterMobile: true,
  },
  promotion: {
    path: '/promotion',
    component: Promotion,
    isAuth: false,
    label: 'Quảng bá đại lý',
    isTop: true,
    showFooterMobile: true,
  },
  historyPromotion: {
    path: '/promotionDes',
    component: HistoryPromotion,
    isAuth: false,
    label: 'Lịch sử nhận',
    isTop: true,
    showFooterMobile: true,
  },
  myTeam: {
    path: '/myTeam',
    component: MyTeam,
    isAuth: false,
    label: 'Đội của tôi',
    isTop: true,
    showFooterMobile: true,
  },
  tuturial: {
    path: '/tuturial',
    component: Tuturial,
    isAuth: false,
    label: 'Hướng dẫn',
  },
  introdure: {
    path: '/leader-board',
    component: LeaderBoard,
    isAuth: false,
    label: 'Giải thưởng',
    isTop: true,
  },
  managementWallet: {
    path: '/management/wallet',
    component: Management,
    isAuth: false,
    label: 'Danh sách ví',
    isMenuItem: true,
    icon: <IconWallet />,
    className: 'cosutmSelect',
  },
  managementPacket: {
    path: '/management/packet',
    component: Packet,
    isAuth: false,
    label: 'Quảng bá đại lý',
    isMenuItem: true,
    icon: <IconPacket />,
    showFooterMobile: true,
  },
  managementPackageBonus: {
    path: '/management/package-notification',
    // component: ListPackageBonus,
    isAuth: false,
    label: 'Nhà máy',
    isMenuItem: true,
    icon: <ThunderButton2 />,
    showFooterMobile: true,
  },
  managementRechargeHistory: {
    path: '/management/transaction-history',
    component: TransactionHistory,
    isAuth: false,
    label: 'Lịch sử ',
    mobileTitle: 'Lịch sử giao dịch',
    isMenuItem: true,
    icon: <IconRechargeHistory />,
  },
  managementDepositHistory: {
    path: '/management/deposit-history',
    component: DepositUSDT,
    isAuth: true,
    label: 'Nạp USDT',
    isSubItem: true,
  },
  recharge: {
    path: '/recharge',
    component: Recharge,
    isAuth: false,
    label: 'Nạp Tiền',
    isSubItem: true,
    isHiddenFooter: true,
  },
  withdraw: {
    path: '/withdraw',
    component: Withdraw,
    isAuth: false,
    label: 'Rút Tiền',
    isHiddenFooter: true,
  },

  managementWithdrawHistoryUSDT: {
    path: '/management/withdraw-history-usdt',
    component: WithdrawUSDT,
    isAuth: false,
    label: 'Rút USDT',
    isSubItem: true,
  },
  managementViewHistoryFAC: {
    path: '/management/view-history-fac',
    component: ReceiveFAC,
    isAuth: false,
    label: 'Nhận FAC',
    isSubItem: true,
  },
  managementUserExchangeFACHistory: {
    path: '/management/user-exchange-fac-history',
    component: ExchangeFAC,
    isAuth: false,
    label: 'Quy đổi FAC',
    isSubItem: true,
  },
  managementUserReceivePOINTHistory: {
    path: '/management/user-receive-point-history',
    component: ReceivePoint,
    isAuth: false,
    label: 'Nhận hoa hồng',
    isSubItem: true,
  },
  managementUserExchangePOINTHistory: {
    path: '/management/user-exchange-point-history',
    component: ExchangePoint,
    isAuth: false,
    label: 'Đổi hoa hồng',
    isSubItem: true,
  },
  managementViewHistoryBTC: {
    path: '/management/view-history-btc',
    component: ReceiveBTC,
    isAuth: false,
    label: 'Nhận BTC',
    isSubItem: true,
  },
  managementWithdrawHistory: {
    path: '/management/withdraw-history',
    component: WithdrawBTC,
    isAuth: false,
    label: 'Rút BTC',
    isSubItem: true,
  },
  managementHistoryServicePackage: {
    path: '/management/history-service-package',
    component: BoughtMachine,
    isAuth: false,
    label: 'Mua máy đào',
    isSubItem: true,
  },
  branch: {
    path: '/management/branch',
    component: Branch,
    isAuth: false,
    label: <FormattedMessage id="branch" />,
    isMenuItem: true,
    icon: <IconBranch />,
    showFooterMobile: true,
  },
  organization: {
    path: '/management/organization',
    component: Organization,
    isAuth: false,
    label: <FormattedMessage id="organization" />,
    isMenuItem: true,
    icon: <IconOrganizationSmall />,
  },
  notificationDetail: {
    path: '/management/notification/:id',
    component: NotificationDetail,
    isAuth: false,
    isMenuItem: true,
    isHidden: true,
    label: <FormattedMessage id="notification" />,
  },
  leaderBoard: {
    path: '/management/leader-board',
    component: LeaderBoard,
    isAuth: false,
    label: <FormattedMessage id="leader_board" />,
    isMenuItem: true,
    icon: <IconLeaderBoard />,
  },
  saving: {
    path: '/management/saving',
    component: Saving,
    isAuth: false,
    label: <FormattedMessage id="saving" />,
    isMenuItem: true,
    icon: <IconSaving />,
  },
  managementBetRecordsHistory: {
    path: '/management/bet-record-profile',
    component: BetRecordsHistory,
    isAuth: false,
    label: 'Lịch sử mua',
    isMenuItem: false,
    icon: <IconProfileIcon />,
  },
  managementInfoProfile: {
    path: '/management/info-profile',
    component: InfoProfile,
    isAuth: false,
    label: 'Tài khoản',
    isMenuItem: false,
    icon: <IconProfileIcon />,
  },
  managementProfileAboutUs: {
    path: '/management/profile-about-us',
    component: ProfileAboutUs,
    isAuth: false,
    label: 'Về chúng tôi',
    isMenuItem: false,
    icon: <IconProfileIcon />,
  },
  managementProfileIntroOverview: {
    path: '/management/profile-intro-overview',
    component: ProfileIntroOverview,
    isAuth: false,
    label: 'Thảo luận tiết lộ rủi ro',
    isMenuItem: false,
    icon: <IconProfileIcon />,
  },
  managementProfilePolicy: {
    path: '/management/profile-policy',
    component: ProfilePolicy,
    isAuth: false,
    label: 'Chính sách bảo mật',
    isMenuItem: false,
    icon: <IconProfileIcon />,
  },
  managementProfileCustomer: {
    path: '/management/profile-customer',
    component: ProfileCustomer,
    isAuth: false,
    label: 'Khách hàng',
    isMenuItem: false,
    icon: <IconProfileIcon />,
  },
  managementProfileGuideUser: {
    path: '/management/profile-guide-user',
    component: ProfileGuideUser,
    isAuth: false,
    label: 'Khách hàng',
    isMenuItem: false,
    icon: <IconProfileIcon />,
  },
  managementProfile: {
    path: '/management/profile',
    component: Profile,
    isAuth: false,
    label: 'Tài khoản',
    isMenuItem: true,
    icon: <IconProfileIcon />,
  },
  gameWinGo: {
    path: '/gameWinGo',
    component: GameWindGo,
    isAuth: false,
    label: 'Game Win Go',
    isHiddenFooter: true,
  },
  settings: {
    path: '/settings',
    component: Settings,
    isAuth: false,
    label: 'Cài đặt',
    isMenuItem: true,
    icon: <IconSettings />,
  },
  support: {
    path: '/management/support',
    component: Support,
    isAuth: false,
    label: 'Hỗ trợ',
    isMenuItem: true,
    icon: <IconSupport />,
  },
  management: {
    path: '/management',
    component: Management,
    isAuth: false,
    isTop: true,
    label: 'Quản lý',
    isMenuItem: true,
  },
  signout: {
    path: '/signout',
    label: 'Đăng xuất',
    icon: <IconSignout />,
    isAuth: false,
  },
  contacts: {
    path: '/contact',
    isAuth: true,
    component: Contact,
    isHiddenFooter: true,
  },
  detailBranch: {
    path: '/detail-branch',
    component: DetailBranch,
    isAuth: false,
  },
  staking: {
    path: '/management/staking',
    isAuth: false,
    component: Staking,
  },
  //new
  profile: {
    path: '/profile',
    isAuth: true,
    component: Profile,
    isHiddenFooter: true,
  },
  buyLottery: {
    path: '/buy-lottery',
    isAuth: true,
    component: BuyLottery,
    isHiddenFooter: true,
  },
  shopCart: {
    path: '/shop-cart',
    isAuth: true,
    component: ShopCart,
    isHiddenFooter: true,
  },
  payment: {
    path: '/payment',
    isAuth: true,
    component: Payment,
    isHiddenFooter: true,
  },
  guide: {
    path: '/guide',
    isAuth: true,
    component: Guide,
    isHiddenFooter: true,
  },
  termsOfUse: {
    path: '/terms-of-use',
    isAuth: true,
    component: TermsOfUse,
    isHiddenFooter: true,
  },
  group: {
    path: '/group',
    isAuth: true,
    component: Group,
    isHiddenFooter: true,
  },
  lotteryCalendar: {
    path: '/lottery-calendar',
    isAuth: true,
    component: LotteryCalendar,
    isHiddenFooter: true,
  },
  referFriends: {
    path: '/refer-friends',
    isAuth: true,
    component: ReferFriends,
    isHiddenFooter: true,
  },
  customerService: {
    path: '/customer-service',
    isAuth: false,
    component: CustomerService,
    isHiddenFooter: true,
  },
  myWallet: {
    path: '/my-wallet',
    isAuth: true,
    component: MyWallet,
    isHiddenFooter: true,
  },
  constraintBank: {
    path: '/constraint-bank',
    isAuth: true,
    component: ConstraintBank,
    isHiddenFooter: true,
  },
  transitionHistory: {
    path: '/transition-history',
    isAuth: true,
    component: TransitionHistory,
    isHiddenFooter: true,
  },
  transitionDetail: {
    path: '/transition-history/detail',
    isAuth: true,
    component: TransitionDetail,
    isHiddenFooter: true,
  },
  commissionPayment: {
    path: '/commission-payment',
    isAuth: true,
    component: CommissionPayment,
    isHiddenFooter: true,
  },
  faqs: {
    path: '/FAQs/',
    isAuth: true,
    component: FAQs,
  },
  faqsDetail: {
    path: '/FAQs/:id',
    isAuth: true,
    component: FAQsDetail,
    isHiddenFooter: true,
  },
  newPassword: {
    path: '/new-password',
    isAuth: false,
    component: NewPassword,
    isHiddenFooter: true,
  },
  changeSuccess: {
    path: '/change-success',
    isAuth: false,
    component: ChangeSuccess,
    isHiddenFooter: true,
  },
  changePassword: {
    path: '/change-password',
    isAuth: false,
    component: ChangePassword,
    isHiddenFooter: true,
  },
  bookingHistory: {
    path: '/booking-history',
    isAuth: true,
    component: BookingHistory,
    isHiddenFooter: true,
  },
  detail: {
    path: '/detail/:id',
    isAuth: true,
    component: Details,
    isHiddenFooter: true,
  },
  resultLottery: {
    path: '/result-lottery',
    isAuth: true,
    component: ResultLottery,
  },
  moneyTransferGimolott: {
    path: '/money-transfer-gimolott',
    isAuth: true,
    component: MoneyTransferGimolott,
    isHiddenFooter: true,
  },
  // order:{
  //   path: '/order',
  //   isAuth: true,
  //   component: Order,
  //   isHiddenFooter: false
  // },
  // orderDetail:{
  //   path: '/order-detail/:id',
  //   isAuth: true,
  //   component: OrderDetail,
  //   isHiddenFooter: true
  // },
  myProfile: {
    path: '/myProfile',
    isAuth: true,
    component: MyProfile,
    isHiddenFooter: false,
  },
  notification: {
    path: '/notification',
    isAuth: true,
    component: Notification,
    isHiddenFooter: true,
  },
  hallTransaction: {
    path: '/hallTransaction',
    isAuth: true,
    component: HallTransaction,
    isHiddenFooter: false,
  },
  // saleTransaction:{
  //   path: '/saleTransaction',
  //   isAuth: true,
  //   component: SaleTransaction,
  //   isHiddenFooter: true
  // },
  // paymentExchange:{
  //   path: '/paymentExchange',
  //   isAuth: true,
  //   component: PaymentExchange,
  //   isHiddenFooter: false
  // },
  betRecord: {
    path: '/betRecord',
    isAuth: true,
    component: PaymentExchange,
    isHiddenFooter: false,
  },
  paymentExchangeDetail: {
    path: '/paymentExchange-detail/:id',
    isAuth: true,
    component: PaymentExchangeDetail,
    isHiddenFooter: true,
  },
  chart: {
    path: '/chart',
    isAuth: true,
    component: DetailChart,
    isHiddenFooter: true,
  },
  marketHistory: {
    path: '/market-history',
    isAuth: true,
    component: marketHistory,
    isHiddenFooter: true,
  },
};

function App() {
  const isUserLoggedIn = useSelector(state => (state.member ? state.member.isUserLoggedIn : false));
  routes.home = {
    path: '/',
    component: Home,
    isAuth: true,
    label: 'Trang chủ',
  };
  return (
    <Router>
      {/*<Suspense fallback={<div><FormattedMessage id="LOADING_TEXT" defaultMessage={'Đang tải dữ liệu...'} /></div>}>*/}
      <Suspense fallback={<Loader />}>
        <Switch>
          {Object.keys(routes).map((key, index) => {
            return (
              <Route
                key={index}
                exact
                path={routes[key].path}
                component={props => (
                  <Layout
                    {...props}
                    routes={routes}
                    isAuth={routes[key].isAuth}
                    isMenuItem={routes[key].isMenuItem}
                    isSubMenu={routes[key].isSubMenu}
                    isSubItem={routes[key].isSubItem}
                    Component={routes[key].component}
                    showFooterMobile={routes[key].showFooterMobile}
                    isHiddenFooter={routes[key].isHiddenFooter}
                    className={`${routes[key].className || 'HOME'}`}
                    isUserLoggedIn={isUserLoggedIn}
                  />
                )}
              />
            );
          })}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
