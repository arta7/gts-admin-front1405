import React from "react";
import { NavLink as NavLinkBase } from "react-router-dom";

const NavLink = React.forwardRef((props: any, ref: any) => {
  const { activeClassName, ...rest } = props;
  return (
    <NavLinkBase
      ref={ref}
      {...rest}
      style={({ isActive }) => ({
        textDecoration: "none",
        background: isActive && "rgba(25, 118, 210, 0.08)",
      })}
    />
  );
});

export default NavLink;
