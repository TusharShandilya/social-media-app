import React from "react";

import { Post } from "../utils/types";

const PostCard: React.FC<{ post: Post }> = ({
  post: {
    firstName,
    lastName,
    username,
    createdAt,
    body,
    likeCount,
    commentCount,
    comments,
    likes,
  },
}) => {
  return (
    <div className="post-card">
      <h2 className="title">
        {firstName} {lastName}
      </h2>
      <h4 className="subtitle">
        <a href="" className="link">
          @{username}
        </a>
      </h4>
      <span className="post-card__meta">
        {new Date(createdAt).toLocaleDateString("en-gb", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <p className="post-card__description">{body}</p>
      <div className="post-card__extra">
        <button className="btn">{likeCount}</button>
        <button className="btn">{commentCount}</button>
      </div>
    </div>
  );
};

export default PostCard;
