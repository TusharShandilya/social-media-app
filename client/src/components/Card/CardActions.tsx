import React from "react";

interface Props {
  className?: string;
}

const CardActions: React.FC<Props> = ({ className, children }) => {
  return <div className={`card-actions ${className}`}>{children}</div>;
};

export default CardActions;
