import React, { useRef, useState } from "react";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOutsideAlerter } from "../../../hooks";

interface Props {
  menuItems: { value: JSX.Element; callback: () => void }[];
}

const CardMenu: React.FC<Props> = ({ menuItems }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useOutsideAlerter(menuRef, () => setShowMenu(false));

  return (
    <div className="card-menu" ref={menuRef}>
      <div className="card-menu__icon" onClick={() => setShowMenu(!showMenu)}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </div>
      {showMenu && (
        <ul className="card-menu__items">
          {menuItems.map(({ callback, value }, idx) => (
            <li
              key={Math.random()}
              className="card-menu__item"
              onClick={() => {
                callback();
                setShowMenu(!showMenu);
              }}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CardMenu;
