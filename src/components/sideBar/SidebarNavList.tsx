import React from "react";
import { useLocation } from "react-router-dom";

import reduceChildRoutes from "./reduceChildRoutes";

const SidebarNavList = (props:any) => {
  const { pages, depth } = props;
  const router = useLocation();
  const currentRoute = router.pathname;

  const childRoutes = pages.reduce(
    (items:any, page:any) => reduceChildRoutes({ items, page, currentRoute, depth }),
    []
  );

  return <React.Fragment>{childRoutes}</React.Fragment>;
};

export default SidebarNavList;