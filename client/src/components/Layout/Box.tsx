import React from "react";

interface Props {
  vertical?: boolean;
}

const Box: React.FC<Props> = ({ children, vertical }) => {
  return <div className={`box ${vertical ? "box-v" : ""}`}>{children}</div>;
};

export default Box;
