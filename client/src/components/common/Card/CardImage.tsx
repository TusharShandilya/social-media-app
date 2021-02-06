import React from "react";
import { StyleSize } from "../../../types";

interface Props {
  src: string | undefined;
  alt: string;
  size?: StyleSize;
}

const CardImage: React.FC<Props> = ({ src, size, alt }) => {
  return (
    <div className={`card-image card-image-${size ?? "md"}  margin-r-md`}>
      <img src={src} alt={`${alt}`} />
    </div>
  );
};

export default CardImage;
