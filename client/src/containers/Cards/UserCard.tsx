import React from "react";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FollowButton, ShareButton } from "../../components/Button";
import { Card, CardImage, CardActions, CardTitle } from "../../components/Card";
import { Heading, Paragraph } from "../../components/Typography";
import { User } from "../../config/types";
import { Box } from "../../components/Layout";

import UserDefaultImage from "../../assets/img/user-default.jpg";

interface Props {
  user: User;
}

const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <Card>
      <CardTitle>
        <CardImage
          size="lg"
          src={UserDefaultImage}
          alt={`${user.firstName} ${user.lastName} image`}
        />
        <Box vertical>
          <Heading size="xl">
            {user.firstName} {user.lastName}
            <span className="link is-lowercase"> @{user.username}</span>
          </Heading>
        </Box>
      </CardTitle>

      <CardActions>
        <Paragraph>
          <ShareButton share={`http://localhost:3000/user/${user.username}`} />
        </Paragraph>
        <FollowButton followUser={user} />
        {/* <Paragraph>
          <CustomButton>
            <FontAwesomeIcon icon={faPen} /> Edit
          </CustomButton>
        </Paragraph> */}
      </CardActions>
    </Card>
  );
};

export default UserCard;
