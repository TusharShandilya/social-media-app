import React from "react";

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

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  return open ? (
    <div className={`modal ${open && "modal--active"}`}>
      <div className="modal__background" onClick={onClose}></div>
      <div className="modal__btn--close" onClick={onClose}>
        X
      </div>
      <div className="modal__header">{header}</div>
      <div className="modal__body">{children}</div>
      <div className="modal__btns">
        {onCancel && (
          <button className="btn modal__btn--cancel" onClick={handleCancel}>
            Cancel
          </button>
        )}
        <button className="btn modal__btn--confirm" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ConfirmModal;
