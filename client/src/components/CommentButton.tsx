import React from "react";
import { Link } from "react-router-dom";
import { User } from "../utils/types";

interface Props {
  count: number;
  callback:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  user: User | null;
}

const CommentButton: React.FC<Props> = ({ user, count, callback }) => {
  return user ? (
    <button className="btn btn__basic" onClick={callback}>
      CommentsIcon {count}
    </button>
  ) : (
    <Link to="/login">
      <button className="btn btn__basic">CommentsIcon {count}</button>
    </Link>
  );
};

export default CommentButton;
