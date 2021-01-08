import React from "react";

import LogoImage from "../assets/img/Logo-min.png";

interface Props {
  styleClass?: string;
}

const Logo: React.FC<Props> = ({ styleClass }) => {
  return (
    <div className={`logo ${styleClass}`}>
      <img src={LogoImage} alt="logo" />
    </div>
  );
};

export default Logo;
