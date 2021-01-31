import React from "react";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  active: boolean;
  message: string;
  variant?: "info" | "warning" | "danger" | "success";
}

const Toast: React.FC<Props> = ({ variant, active, message }) => {
  const toastIcon = () => {
    switch (variant) {
      case "info":
        return <FontAwesomeIcon icon={faInfoCircle} />;
      case "warning":
        return <FontAwesomeIcon icon={faExclamationCircle} />;
      case "danger":
        return <FontAwesomeIcon icon={faExclamationTriangle} />;
      case "success":
        return <FontAwesomeIcon icon={faCheckCircle} />;
      default:
        return <FontAwesomeIcon icon={faQuestion} />;
    }
  };

  return (
    <div className={`toast__background ${active ? "toast--active" : ""}`}>
      <div className={`toast toast--${variant}`}>
        <div className="toast__icon">{toastIcon()}</div>
        <div className="toast__message">{message}</div>
      </div>
    </div>
  );
};

export default Toast;
