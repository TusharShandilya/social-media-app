import React from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthUser.context";

interface LinksProps {
  styleClass?: string;
}

const Links: React.FC<LinksProps> = (props) => {
  const { user } = React.useContext(AuthContext);
  return (
    <ul className={props.styleClass}>
      <li>
        <Link to="/">Home</Link>
      </li>
      {user ? (
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      ) : (
        <React.Fragment>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </React.Fragment>
      )}
    </ul>
  );
};

export default Links;
