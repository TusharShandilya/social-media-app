import React from "react";
import { Link } from "react-router-dom";

interface Props {
  comment: {
    id: string;
    commentId: string;
    body: string;
    username: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    edited: boolean;
  };
}

const Comment: React.FC<Props> = ({
  comment: { body, username, firstName, lastName, createdAt, edited },
}) => {
  return (
    <div className="comment">
      <span className="comment__title">
        {firstName} {lastName}
      </span>
      <span className="comment__subtitle">
        <Link to={`/user/${username}`}>@{username}</Link>
      </span>
      <span className="comment__meta">
        {new Date(createdAt).toLocaleDateString("en-gb", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <p className="comment__description">
        {edited && <em>(edited)</em>}
        {body}
      </p>
    </div>
  );
};

export default Comment;
