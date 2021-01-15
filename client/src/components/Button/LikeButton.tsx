import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { LikeType, User } from "../../config/types";
import { CustomButton } from ".";

interface Props {
  postId: string;
  likes: LikeType[];
  likeCount: number;
  loggedInUser: User | null;
}

const LikeButton: React.FC<Props> = ({
  postId,
  likes,
  likeCount,
  loggedInUser,
}) => {
  const [isLiked, setisLiked] = useState(false);

  useEffect(() => {
    if (
      loggedInUser &&
      likes.find((like) => like.username === loggedInUser.username)
    ) {
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
    variables: { postId },
  });

  return loggedInUser ? (
    <CustomButton
      styleClass="margin-r-md"
      color={isLiked ? "primary" : "basic"}
      onClick={() => likePost()}
    >
      <FontAwesomeIcon icon={faThumbsUp} /> {likeCount}
    </CustomButton>
  ) : (
    <Link to="/login">
      <CustomButton styleClass="margin-r-md">
        <FontAwesomeIcon icon={faThumbsUp} /> {likeCount}
      </CustomButton>
    </Link>
  );
};

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      username
      likeCount
      likes {
        id
        username
      }
    }
  }
`;

export default LikeButton;
