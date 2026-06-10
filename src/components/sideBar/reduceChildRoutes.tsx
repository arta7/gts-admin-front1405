import React from "react";
import SidebarNavListItem from "./SidebarNavListItem";
import SidebarNavList from "./SidebarNavList";

const reduceChildRoutes = (props:any) => {
  const { items, page, depth, currentRoute } = props;

  if (page.children) {
    items.push(
      <SidebarNavListItem
        depth={depth}
        icon={page.icon}
        key={page.title}
        badge={page.badge}
        title={page.title}
        href={page.href}
        currentRoute={currentRoute}
      >
        <SidebarNavList depth={depth + 1} pages={page.children} />
      </SidebarNavListItem>
    );
  } else {
    items.push(
      <SidebarNavListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        key={page.title}
        badge={page.badge}
        title={page.title}
      />
    );
  }

  return items;
};

export default reduceChildRoutes;
