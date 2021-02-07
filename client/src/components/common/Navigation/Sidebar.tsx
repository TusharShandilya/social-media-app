import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Links from "./Links";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useOutsideAlerter } from "../../../hooks";

interface Props {}

const Sidebar: React.FC<Props> = ({}) => {
  const [sidebar, setSidebar] = useState(false);
  const sidebarRef = useRef(null);

  useOutsideAlerter(sidebarRef, () => setSidebar(false));

  return (
    <div
      ref={sidebarRef}
      className="sidebar"
      onClick={() => setSidebar(!sidebar)}
    >
      <span className="sidebar-icon">
        <FontAwesomeIcon icon={sidebar ? faTimes : faBars} />
      </span>

      {sidebar ? <Links styleClass={`sidebar-links`} /> : ""}
    </div>
  );
};

export default Sidebar;
