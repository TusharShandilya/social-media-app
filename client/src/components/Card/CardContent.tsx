import React from "react";

interface Props {
  className?: string;
}

const CardContent: React.FC<Props> = ({ children, className }) => {
  return <div className={`card-content ${className ?? ""}`}>{children}</div>;
};

export default CardContent;
