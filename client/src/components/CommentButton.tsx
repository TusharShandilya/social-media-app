import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { User } from "../utils/types";
import CustomButton from "./CustomButton";

interface Props {
  count: number;

  user: User | null;
}

const CommentButton: React.FC<Props> = ({ user, count }) => {
  return user ? (
    <CustomButton>
      <FontAwesomeIcon icon={faComments} /> {count}
    </CustomButton>
  ) : (
    <Link to="/login">
      <CustomButton noBackground>
        <FontAwesomeIcon icon={faComments} /> {count}
      </CustomButton>
    </Link>
  );
};

export default CommentButton;
