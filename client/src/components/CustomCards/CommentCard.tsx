import React, { useState, useContext, Fragment } from "react";
import { gql, useMutation } from "@apollo/client";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { AuthContext } from "../../AuthUser.context";
import { GET_ALL_POSTS } from "../../graphql";
import { getDate } from "../../utils/date";
import { Modal } from "../common/Modal/Modal";

import useModal from "../../hooks/useModal";
import {
  Card,
  CardContent,
  CardImage,
  CardMenu,
  CardMeta,
  CardTitle,
} from "../common/Card";
import { Heading, Paragraph } from "../common/Typography";
import CommentForm from "../CustomForms/CommentForm";
import { Box } from "../common/Layout";

import UserDefaultImage from "../../assets/img/user-default.png";

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
        <Paragraph className="text-centered" size="lg">
          Do you want to delete this comment?
        </Paragraph>
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
            <Paragraph>
              {body}
              {edited && <em>(edited)</em>}
            </Paragraph>
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
