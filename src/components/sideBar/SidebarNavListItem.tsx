/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { forwardRef, useEffect } from "react";
import { matchPath } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { Badge, Collapse } from "react-bootstrap";

const CustomRouterLink = forwardRef((props:any, ref?:any) => (
  <React.Fragment>
    <NavLink end {...props} ref={ref} />
  </React.Fragment>
));

const SidebarNavListItem = (props:any) => {
  const {
    title,
    href,
    depth = 0,
    children,
    icon: Icon,
    badge,
    currentRoute,
  } = props;
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    let _open =
      href && currentRoute
        ? !!matchPath({ path: href, end: false }, currentRoute)
        : false;
    setOpen(_open);
  }, [currentRoute, href]);

  const handleToggle = (e:any) => {
    e.preventDefault();
    setOpen((state) => !state);
  };

  if (children) {
    return (
      <li className={`sidebar-item ${open ? "active" : ""}`}>
        <CustomRouterLink
          className={`sidebar-link ${open ? "" : "collapsed"}`}
          data-bs-toggle="collapse"
          aria-expanded={open ? "true" : "false"}
          depth={depth}
          to={href}
          onClick={handleToggle}
        >
          {Icon && <Icon className="feather align-middle" />}{" "}
          <span className="align-middle" >
            {title}
          </span>
          {badge && (
            <Badge className="badge-sidebar-info" bg="" >
              {badge}
            </Badge>
          )}
          {open ? <div /> : <div />}
        </CustomRouterLink>
        <Collapse in={open}>
          <ul className="sidebar-dropdown list-unstyled">{children}</ul>
        </Collapse>
      </li>
    );
  }

  return (
    <li className="sidebar-item">
      <CustomRouterLink
        depth={depth}
        to={href}
        activeclassname="active"
        className="sidebar-link"
      >
        {Icon && <Icon className="align-middle" size="20" />}{" "}
        <span className="align-middle" >
          {title}
        </span>
        {badge && (
          <Badge className="badge-sidebar-info" bg="" >
            {badge}
          </Badge>
        )}
      </CustomRouterLink>
    </li>
  );
};

export default SidebarNavListItem;
