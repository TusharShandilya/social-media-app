import React from "react";

import Logo from "./Logo";
import { Link } from "react-router-dom";
import Links from "./Links";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <Logo styleClass={"navbar-logo"} />
        </Link>
        <Links styleClass={"navbar-links"} />
      </nav>
      <Sidebar />
    </>
  );
};

export default Navbar;
