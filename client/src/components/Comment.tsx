import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { AuthContext } from "../AuthUser.context";
import { GET_ALL_POSTS } from "../utils/graphql";
import { getDate } from "../utils/date";
import Modal from "./Modal";
import CommentForm from "./Forms/CommentForm";
import CardMenu from "./CardMenu";
import useModal from "../hooks/useModal";

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

  return (
    <div className=" card__background">
      <Modal
        open={modalOpen}
        onClose={toggleModal}
        onCancel={toggleModal}
        onConfirm={deleteComment}
      >
        Do you want to delete this comment?
      </Modal>
      <div className=" card">
        {user && signedInUserComment && (
          <CardMenu
            menuItems={[
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
            ]}
          />
        )}
        <Link to={`/user/${username}`}>
          <h2 className="card__title">
            {firstName} {lastName}
            <span className="card__username link"> @{username}</span>
          </h2>
        </Link>
        <span className="card__meta">{getDate(createdAt)}</span>
        {showEditComment ? (
          <CommentForm
            isEdit
            body={body}
            postId={postId}
            commentId={commentId}
            callback={() => setShowEditComment((show) => !show)}
          />
        ) : (
          <p className="card__description paragraph">
            {body}
            {edited && <em>(edited)</em>}
          </p>
        )}
      </div>
    </div>
  );
};

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
    }
  }
`;

export default Comment;
