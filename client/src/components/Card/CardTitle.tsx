import React from "react";

interface Props {
  className?: string;
}

const CardTitle: React.FC<Props> = ({ children, className }) => {
  return <div className={`card-title ${className ?? ""}`}>{children}</div>;
};

export default CardTitle;
