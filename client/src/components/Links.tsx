import React from "react";
import { Link } from "react-router-dom";

interface LinksProps {
  styleClass?: string;
  user: object | null;
}

const Links: React.FC<LinksProps> = ({ styleClass, user }) => {
  return (
    <ul className={styleClass}>
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
