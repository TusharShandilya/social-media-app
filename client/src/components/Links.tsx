import React from "react";
import { Link } from "react-router-dom";
import { User } from "../utils/types";

interface Props {
  styleClass?: string;
  user: User | null;
}

const Links: React.FC<Props> = ({ styleClass, user }) => {
  return (
    <ul className={styleClass}>
      <li>
        <Link to="/">Home</Link>
      </li>
      {!user && (
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
