import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import { User } from "../utils/types";
import { AuthContext } from "../AuthUser.context";
import CustomButton from "./CustomButton";

interface Props {
  styleClass?: string;
}

const Links: React.FC<Props> = ({ styleClass }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <ul className={styleClass}>
      {!user ? (
        <Fragment>
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
        </Fragment>
      ) : (
        <Fragment>
          <li>
            <NavLink activeClassName={`${styleClass}--active`} to="/post/new">
              New Post
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={`${styleClass}--active`}
              to={`/user/${user.username}`}
            >
              {user.firstName} {user.lastName}
            </NavLink>
          </li>
        </Fragment>
      )}
      {user && (
        <li>
          <CustomButton color="danger" onClick={logout}>
            Logout
          </CustomButton>
        </li>
      )}
    </ul>
  );
};

export default Links;
