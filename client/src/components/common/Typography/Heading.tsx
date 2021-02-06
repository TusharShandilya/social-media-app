import React from "react";
import { StyleSize } from "../../../types";

interface Props {
  className?: string;
  size?: StyleSize;
}

const Heading: React.FC<Props> = ({ children, className, size }) => {
  return (
    <h2 className={`heading heading-${size ?? "md"} ${className ?? ""}`}>
      {children}
    </h2>
  );
};

export default Heading;
