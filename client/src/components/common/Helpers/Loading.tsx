import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {}

const Loading: React.FC<Props> = () => {
  return (
    <div className="loading">
      <FontAwesomeIcon icon={faCircleNotch} />
    </div>
  );
};

export default Loading;
