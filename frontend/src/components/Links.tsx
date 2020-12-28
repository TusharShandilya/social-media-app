import React from "react";
import { Link } from "react-router-dom";

interface LinksProps {
  styleClass?: string;
}

const Links: React.FC<LinksProps> = (props) => {
  return (
    <ul className={props.styleClass}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/settings">Settings</Link>
      </li>
    </ul>
  );
};

export default Links;
