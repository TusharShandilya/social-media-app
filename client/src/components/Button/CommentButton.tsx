import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

import { CustomButton } from ".";

interface Props {
  count: number;

  redirect: string;
}

const CommentButton: React.FC<Props> = ({ count, redirect }) => {
  return (
    <Link to={redirect}>
      <CustomButton>
        <FontAwesomeIcon icon={faComments} /> {count}
      </CustomButton>
    </Link>
  );
};

export default CommentButton;
