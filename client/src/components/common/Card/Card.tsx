import React from "react";

interface Props {
  className?: string;
}

const Card: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`card-background ${className ?? ""}`}>
      <div className="card">{children}</div>
    </div>
  );
};

export default Card;
