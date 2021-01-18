import React, { useContext, useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CustomButton } from ".";
import { Text } from "../Typography";
import { AuthContext } from "../../AuthUser.context";
import { User } from "../../config/types";

interface Props {
  followUser: User;
}

const FollowButton: React.FC<Props> = ({ followUser }) => {
  const { user } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (user?.following?.find((userId) => userId === followUser.id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  });

  return (
    <Text>
      <CustomButton color={isFollowing ? "primary" : undefined}>
        <FontAwesomeIcon icon={faPlus} /> {isFollowing ? "Unfollow" : "Follow"}
      </CustomButton>
    </Text>
  );
};

const FOLLOW_USER = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      id
      username
      firstName
      lastName
      email
      followers
      followerCount
      following
      followingCount
      token
    }
  }
`;

export default FollowButton;