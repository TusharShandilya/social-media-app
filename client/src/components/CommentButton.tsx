import React from "react";
import { Link } from "react-router-dom";
import { User } from "../utils/types";
import CustomButton from "./CustomButton";

interface Props {
  count: number;
  callback:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  user: User | null;
}

const CommentButton: React.FC<Props> = ({ user, count, callback }) => {
  return user ? (
    <CustomButton onClick={callback}>CommentsIcon {count}</CustomButton>
  ) : (
    <Link to="/login">
      <CustomButton noBackground>CommentsIcon {count}</CustomButton>
    </Link>
  );
};

export default CommentButton;
