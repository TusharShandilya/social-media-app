import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { User } from "../utils/types";
import CustomButton from "./CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

interface Props {
  id: string;

  likes: [{ username: string; id: string }];
  likeCount: number;
  user: User | null;
}

const LikeButton: React.FC<Props> = ({ id, likes, likeCount, user }) => {
  const [isLiked, setisLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setisLiked(true);
    } else {
      setisLiked(false);
    }
  });

  const [likePost] = useMutation(LIKE_POST, {
    update(proxy, { data: { likePost: post } }) {
      likeCount = post.likeCount;
    },
    onError(err) {
      console.log(err);
    },
    variables: { postId: id },
  });

  return user ? (
    <CustomButton
      styleClass="margin-r-md"
      color={isLiked ? "primary" : "basic"}
      onClick={() => likePost()}
    >
      <FontAwesomeIcon icon={faThumbsUp} /> {likeCount}
    </CustomButton>
  ) : (
    <Link to="/login">
      <CustomButton styleClass="margin-r-md" noBackground>
        <FontAwesomeIcon icon={faThumbsUp} /> {likeCount}
      </CustomButton>
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
