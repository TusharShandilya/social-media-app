import React from "react";

interface Props {
  className?: string;
}

const CardMeta: React.FC<Props> = ({ className, children }) => {
  return <div className={`card-meta ${className}`}>{children}</div>;
};

export default CardMeta;
