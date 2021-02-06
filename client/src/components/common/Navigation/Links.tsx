import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../../../AuthUser.context";
import { CustomButton } from "../Button";

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
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={`${styleClass}--active`} to="/register">
              <FontAwesomeIcon icon={faUserPlus} /> Register
            </NavLink>
          </li>
        </Fragment>
      ) : (
        <Fragment>
          <li>
            <NavLink activeClassName={`${styleClass}--active`} to="/post/new">
              <FontAwesomeIcon icon={faEdit} />
              &nbsp;New Post
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={`${styleClass}--active`}
              to={`/user/${user.username}`}
            >
              <FontAwesomeIcon icon={faUser} />
              &nbsp;
              {user.firstName} {user.lastName}
            </NavLink>
          </li>
          <li>
            <CustomButton variant="danger" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </CustomButton>
          </li>
        </Fragment>
      )}
    </ul>
  );
};

export default Links;
