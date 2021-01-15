import React from "react";
import { StyleSize } from "../../config/types";

interface Props {
  className?: string;
  size?: StyleSize;
}

const Text: React.FC<Props> = ({ children, size, className }) => {
  return (
    <span className={`text text-${size ?? "md"} ${className ?? ""}`}>
      {children}
    </span>
  );
};

export default Text;
