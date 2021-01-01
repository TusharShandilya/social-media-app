import React from "react";

import Links from "./Links";
import { AuthContext } from "../AuthUser.context";

const Navbar = () => {
  const { user, logout } = React.useContext(AuthContext);

  return (
    <nav>
      <h1>Navbar</h1>
      <Links user={user} />
      <button className="btn" onClick={logout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
