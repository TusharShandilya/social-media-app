import React from "react";

import Links from "./Links";
import { AuthContext } from "../AuthUser.context";

const Navbar = () => {
  const { user, logout } = React.useContext(AuthContext);

  return (
    <nav className="navbar">
      <Links user={user} />
      {user && (
        <button className="btn btn--danger" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
