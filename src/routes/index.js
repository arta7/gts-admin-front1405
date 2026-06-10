import { getFromArray } from "utils/helpers";
import AuthRoutes from "./auth";

import DashboardRoutes from "./dashboard";
import NOT_FOUND from "./notFound";

const routes = [DashboardRoutes, AuthRoutes, NOT_FOUND];

const getRoute = (route) => {
  let path = [""];
  if (!!route) {
    const keyChain = route.split(".");
    path = [""];
    let c = { children: routes };
    for (const key of keyChain) {
      c = c.children;
      c = getFromArray(c, key, "name");
      if (!c) {
        path = ["#"];
        break;
      }
      path.push(c.path);
    }
  } else {
    path = ["#"];
  }
  return path.join("/");
};

export { routes as default, getRoute };
