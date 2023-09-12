import PagesRoutes from "./Pages";
import DashboardRoutes from "./Dashboards";
import LotteryRoutes from "./Lottery";
import PurchaseList from "./PurchaseList";
import CustomerRoutes from "./Customer";
import HistoryRoutes from "./History";
import NotificationRoutes from "./Notification";
import SystemConfiguration from "./SystemConfiguration";
import PermissionRoutes from "./Permission";
import AdminAccountRoutes from "./AdminAccount";
import PaymentMethod from "./PaymentMethod";
import MessageSMS from "./MessageSMS";
import GamePlay from "./GamePlay";
// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/dashboard";

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...LotteryRoutes,
  ...CustomerRoutes,
  ...PagesRoutes,
  ...PurchaseList,
  ...HistoryRoutes,
  ...NotificationRoutes,
  ...SystemConfiguration,
  ...PermissionRoutes,
  ...AdminAccountRoutes,
  ...PaymentMethod,
  ...MessageSMS,
  ...GamePlay,
];

export { DefaultRoute, TemplateTitle, Routes };
