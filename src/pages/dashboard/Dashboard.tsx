import React from "react";
import SideBar from "../../components/sideBar/SideBar";
import { useAuth } from "../../contexts/AuthContext";

import { dynamicRoutes } from "../../routes/DynamicRoutes";


export function DashboardLayout() {
  const {menus}=useAuth()
  return <SideBar menus={menus} title="" open={true} />;
}

