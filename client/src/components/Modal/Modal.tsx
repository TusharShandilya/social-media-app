import { faBan, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { CustomButton } from "../Button";
import { Paragraph } from "../Typography";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  header?: string;
  onCancel?: () => void;
}

export const Modal: React.FC<Props> = ({
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
      <div className="modal-background"></div>
      <div className="modal-close" onClick={onClose}>
        X
      </div>

      <div className="modal-container">
        <div className="modal-body">{children}</div>
        <div className="modal-controls">
          {onCancel && (
            <CustomButton
              variant="secondary"
              styleClass="modal-control"
              noBackground
              onClick={onCancel}
            >
              <Paragraph size="lg">
                <FontAwesomeIcon icon={faBan} /> Cancel
              </Paragraph>
            </CustomButton>
          )}
          <CustomButton
            styleClass="modal-control"
            noBackground
            onClick={handleConfirm}
          >
            <Paragraph size="lg">
              <FontAwesomeIcon icon={faCheckCircle} /> Confirm
            </Paragraph>
          </CustomButton>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
