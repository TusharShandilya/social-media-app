import React from "react";
import { NavLink } from "react-router-dom";
import { User } from "../utils/types";
import { AuthContext } from "../AuthUser.context";

interface Props {
  styleClass?: string;
}

const Links: React.FC<Props> = ({ styleClass }) => {
  const { user, logout } = React.useContext(AuthContext);

  return (
    <ul className={styleClass}>
      {!user ? (
        <React.Fragment>
          <li>
            <NavLink activeClassName={`${styleClass}--active`} to="/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={`${styleClass}--active`} to="/register">
              Register
            </NavLink>
          </li>
        </React.Fragment>
      ) : (
        <li>
          <NavLink
            activeClassName={`${styleClass}--active`}
            to={`/user/${user.username}`}
          >
            {user.firstName} {user.lastName}
          </NavLink>
        </li>
      )}
      {user && (
        <li>
          <button className="btn btn--danger" onClick={logout}>
            Logout
          </button>
        </li>
      )}
    </ul>
  );
};

export default Links;
