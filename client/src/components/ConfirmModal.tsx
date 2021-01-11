import { faBan, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CustomButton from "./CustomButton";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  header?: string;
  onCancel?: () => void;
}

const ConfirmModal: React.FC<Props> = ({
  open,
  header,
  onClose,
  onConfirm,
  onCancel,
  children,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return open ? (
    <div className={`modal`}>
      <div className="modal__background" onClick={onClose}></div>
      <div className="modal__container">
        <div className="modal__header">
          <span>{header}</span>
          <div className="modal__btn-close" onClick={onClose}>
            X
          </div>
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__controls">
          {onCancel && (
            <CustomButton
              styleClass="modal__control"
              noBackground
              onClick={onCancel}
            >
              <FontAwesomeIcon icon={faBan} /> Cancel
            </CustomButton>
          )}
          <CustomButton
            color="primary"
            styleClass="modal__control"
            noBackground
            onClick={handleConfirm}
          >
            <FontAwesomeIcon icon={faCheckCircle} /> Confirm
          </CustomButton>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ConfirmModal;
