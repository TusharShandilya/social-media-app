import React from "react";
import {
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  active: boolean;
  message: string;
  type?: "info" | "warning" | "danger" | undefined;
}

const Toast: React.FC<Props> = ({ type, active, message }) => {
  const toastIcon = () => {
    switch (type) {
      case "info":
        return <FontAwesomeIcon icon={faInfoCircle} />;
      case "warning":
        return <FontAwesomeIcon icon={faExclamationCircle} />;
      case "danger":
        return <FontAwesomeIcon icon={faExclamationTriangle} />;
      default:
        return <FontAwesomeIcon icon={faQuestion} />;
    }
  };

  return (
    <div className={`toast__background ${active ? "toast--active" : ""}`}>
      <div className={`toast toast--${type}`}>
        <div className="toast__icon">{toastIcon()}</div>
        <div className="toast__message">{message}</div>
      </div>
    </div>
  );
};

export default Toast;
