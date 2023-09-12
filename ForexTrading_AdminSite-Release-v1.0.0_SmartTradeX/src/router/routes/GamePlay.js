import { lazy } from "react";
const GamePlay = [
  // Dashboards
  {
    path: "/game-control/list",
    component: lazy(() =>
      import("../../pages/management-game-control/list/index")
    ),
  },
];

export default GamePlay;
