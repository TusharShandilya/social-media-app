import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthUser.context";
import { GET_ALL_POSTS } from "../utils/graphql";

import ConfirmModal from "./ConfirmModal";

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

const Comment: React.FC<Props> = ({
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
  const [showEditPost, setShowEditPost] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const { user } = React.useContext(AuthContext);

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

  return (
    <div className="comment">
      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        onConfirm={deleteComment}
      >
        Do you want to delete this comment?
      </ConfirmModal>
      {user && signedInUserComment && (
        <div className="comment__menu">
          <ul className="comment__menu-items">
            <li
              className="comment__menu-item"
              onClick={() => setShowEditPost((show) => !show)}
            >
              Edit
            </li>
            <li
              className="comment__menu-item"
              onClick={() => setModalOpen(true)}
            >
              Delete
            </li>
          </ul>
        </div>
      )}
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

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
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

export default Comment;
