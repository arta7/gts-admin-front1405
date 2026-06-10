import {
  DirectInbox,
} from "iconsax-react";
import { SideBarItemType } from "../../components/sideBar/SideBarItem";

export function getDashboardItems(translate: any): SideBarItemType[] {
  const items: Array<SideBarItemType> = [
    {
      title: "درخواست ها",
      icon: DirectInbox,
      path: "Notification",
    },
  ];

  return items;
}