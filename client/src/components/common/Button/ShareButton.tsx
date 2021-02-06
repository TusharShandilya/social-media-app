import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { CustomButton } from ".";
import { useToast } from "../../../hooks";
import { handleCopyTextToClipboard } from "../../../utils";
import Toast from "../Toast/Toast";

interface Props {
  share: string;
}

const ShareButton: React.FC<Props> = ({ share }) => {
  const {
    displayToast,
    toastState: { active, message, type },
  } = useToast();
  return (
    <React.Fragment>
      <Toast active={active} message={message} variant={type} />
      <CustomButton
        variant="secondary"
        ariaLabel="share button"
        styleClass="margin-r-md"
        onClick={() => {
          handleCopyTextToClipboard(share);
          displayToast("Link copied", "info");
        }}
      >
        <FontAwesomeIcon icon={faShareAlt} />
      </CustomButton>
    </React.Fragment>
  );
};

export default ShareButton;
