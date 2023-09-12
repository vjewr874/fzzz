import { lazy } from "react";
const HistoryRoutes = [
  // Dashboards
  {
    path: "/history/list",
    component: lazy(() => import("../../pages/management-history/list/index")),
  },
  {
    path: "/history/detail/:type/:id/",
    component: lazy(() => import("../../pages/management-history/detail")),
  },
];

export default HistoryRoutes;
