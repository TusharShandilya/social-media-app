import React from "react";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CustomButton, ShareButton } from "../../components/Button";
import { Card, CardImage, CardActions, CardTitle } from "../../components/Card";

import { Heading, Text } from "../../components/Typography";
import { User } from "../../config/types";

import UserDefaultImage from "../../assets/img/user-default.jpg";
import { Box } from "../../components/Layout";

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
        <Text>
          <ShareButton share={`http://localhost:3000/user/${user.username}`} />
        </Text>
        <Text>
          <CustomButton>
            <FontAwesomeIcon icon={faPlus} /> Follow
          </CustomButton>
        </Text>
        {/* <Text>
          <CustomButton>
            <FontAwesomeIcon icon={faPen} /> Edit
          </CustomButton>
        </Text> */}
      </CardActions>
    </Card>
  );
};

export default UserCard;
