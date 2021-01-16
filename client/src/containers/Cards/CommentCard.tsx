import React, { useState, useContext, Fragment } from "react";
import { gql, useMutation } from "@apollo/client";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { AuthContext } from "../../AuthUser.context";
import { GET_ALL_POSTS } from "../../graphql";
import { getDate } from "../../utils/date";
import { Modal } from "../../components/Modal/Modal";

import useModal from "../../hooks/useModal";
import {
  Card,
  CardContent,
  CardImage,
  CardMenu,
  CardMeta,
  CardTitle,
} from "../../components/Card";
import { Heading, Text } from "../../components/Typography";
import CommentForm from "../Forms/CommentForm";
import { Box } from "../../components/Layout";

import UserDefaultImage from "../../assets/img/user-default.jpg";

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
  postId: string;
}

const CommentCard: React.FC<Props> = ({
  comment: {
    commentId,
    body,
    username,
    firstName,
    lastName,
    createdAt,
    edited,
  },
  postId,
}) => {
  const [showEditComment, setShowEditComment] = useState(false);
  const { modalOpen, toggleModal } = useModal();
  const { user } = useContext(AuthContext);

  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT, {
    update(proxy, { data: { deleteComment: post } }) {
      let queryData: any = proxy.readQuery({ query: GET_ALL_POSTS });

      proxy.writeQuery({
        query: GET_ALL_POSTS,
        data: queryData,
      });
    },
    onError(err) {
      console.log(err);
    },
    variables: {
      postId,
      commentId,
    },
  });

  let signedInUserComment = false;
  if (user) {
    signedInUserComment = user.username === username;
  }

  const cardMenuOptions = [
    {
      callback: () => setShowEditComment((show) => !show),
      value: (
        <span>
          <FontAwesomeIcon icon={faPenSquare} /> Edit
        </span>
      ),
    },
    {
      callback: toggleModal,
      value: (
        <span>
          <FontAwesomeIcon icon={faTrash} /> Delete
        </span>
      ),
    },
  ];

  return (
    <Fragment>
      <Modal
        open={modalOpen}
        onClose={toggleModal}
        onCancel={toggleModal}
        onConfirm={deleteComment}
      >
        <Text className="text-centered" size="lg">
          Do you want to delete this comment?
        </Text>
      </Modal>
      <Card>
        {signedInUserComment && <CardMenu menuItems={cardMenuOptions} />}
        <Link to={`/user/${username}`}>
          <CardTitle>
            <CardImage
              size="sm"
              src={UserDefaultImage}
              alt={`${firstName} ${lastName}`}
            />
            <Box vertical>
              <Heading size="xs">
                {firstName} {lastName}
                <span className="link is-lowercase"> @{username}</span>
              </Heading>
              <CardMeta>{getDate(createdAt)}</CardMeta>
            </Box>
          </CardTitle>
        </Link>
        <CardContent>
          {showEditComment ? (
            <CommentForm
              isEdit
              body={body}
              postId={postId}
              commentId={commentId}
              callback={() => setShowEditComment((show) => !show)}
            />
          ) : (
            <Text>
              {body}
              {edited && <em>(edited)</em>}
            </Text>
          )}
        </CardContent>
      </Card>
    </Fragment>
  );
};

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
    }
  }
`;

export default CommentCard;
