import React from "react";
import { StyleSize } from "../../config/types";

interface Props {
  size?: StyleSize;
}

const Spacer: React.FC<Props> = ({ size }) => {
  return <hr className={`spacer spacer-${size ?? "md"}`} />;
};

export default Spacer;
