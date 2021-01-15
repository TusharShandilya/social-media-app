import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { CustomButton } from ".";
import { useToast } from "../../hooks";
import { handleCopyTextToClipboard } from "../../utils";
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
    <CustomButton
      styleClass="margin-r-md"
      onClick={() => {
        handleCopyTextToClipboard(share);
        displayToast("Link to post copied", "info");
      }}
    >
      <Toast active={active} message={message} type={type} />
      <FontAwesomeIcon icon={faShareAlt} />
    </CustomButton>
  );
};

export default ShareButton;
