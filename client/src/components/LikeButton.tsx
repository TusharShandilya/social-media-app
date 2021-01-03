import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { User } from "../utils/types";

interface Props {
  id: string;
  username: string;
  likes: [{ username: string; id: string }];
  likeCount: number;
  user: User | null;
}

const LikeButton: React.FC<Props> = ({
  id,
  username,
  likes,
  likeCount,
  user,
}) => {
  const [likePost] = useMutation(LIKE_POST, {
    update(proxy, { data: { likePost: post } }) {
      if (likes.find((like) => like.username === username)) {
        likeCount--;
      } else {
        likeCount++;
      }
    },
    onError(err) {
      console.log(err);
    },
    variables: { postId: id },
  });

  return user ? (
    <button className="btn btn--like" onClick={() => likePost()}>
      LikeIcon {likeCount}
    </button>
  ) : (
    <Link to="/login">
      {" "}
      <button className="btn btn--like">LikeIcon {likeCount}</button>
    </Link>
  );
};

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      body
      username
      firstName
      lastName
      edited
      createdAt
      likeCount
      likes {
        id
        username
      }
      commentCount
      comments {
        id
        commentId
        body
        username
        firstName
        lastName
        createdAt
        edited
      }
    }
  }
`;

export default LikeButton;
