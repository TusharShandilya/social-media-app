import React from "react";
import { StyleSize } from "../../config/types";

interface Props {
  className?: string;
  size?: StyleSize;
}

const Paragraph: React.FC<Props> = ({ children, size, className }) => {
  return (
    <span className={`paragraph paragraph-${size ?? "md"} ${className ?? ""}`}>
      {children}
    </span>
  );
};

export default Paragraph;
