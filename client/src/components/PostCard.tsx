import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenSquare,
  faShareAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { GET_ALL_POSTS } from "../utils/graphql";
import { Post } from "../utils/types";
import { AuthContext } from "../AuthUser.context";
import { getDate } from "../utils/date";
import { useToast } from "../hooks/useToast";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import Modal from "./Modal";
import PostForm from "./Forms/PostForm";
import CustomButton from "./CustomButton";
import CardMenu from "./CardMenu";
import Toast from "./Toast";
import useModal from "../hooks/useModal";

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = ({
  post: {
    id,
    edited,
    firstName,
    lastName,
    username,
    createdAt,
    body,
    likeCount,
    commentCount,
    likes,
  },
}) => {
  const [editForm, setEditForm] = useState(false);
  const { toastState, displayToast } = useToast();
  const { user } = useContext(AuthContext);
  const { modalOpen, toggleModal } = useModal();

  const [deletePost, { loading }] = useMutation(DELETE_POST, {
    update(proxy, { data: { deletePost: post } }) {
      let data: any = proxy.readQuery({ query: GET_ALL_POSTS });

      proxy.writeQuery({
        query: GET_ALL_POSTS,
        data: {
          getPosts: data.getPosts.filter(
            (post: { id: string }) => id !== post.id
          ),
        },
      });
    },
    onError(err) {
      console.log(err);
    },
    variables: { postId: id },
  });

  let signedInUserPost = false;
  if (user) {
    signedInUserPost = user.username === username;
  }

  const handleCopyTextToClipboard = () => {
    let aux = document.createElement("input");

    aux.setAttribute("value", `http://localhost:3000/post/${username}/${id}`);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);

    displayToast("Link to post copied", "info");
  };

  return (
    <div className="card__background margin-y-md">
      <Toast
        active={toastState.active}
        message={toastState.message}
        type={toastState.type}
      />
      <Modal
        open={modalOpen}
        onClose={toggleModal}
        onCancel={toggleModal}
        onConfirm={deletePost}
      >
        Do you want to delete this post?
      </Modal>
      <div className="card">
        {signedInUserPost && (
          <CardMenu
            menuItems={[
              {
                callback: () => setEditForm(!editForm),
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
          <h2 className="card__title text-2">
            {firstName} {lastName}
            <span className="card__username link text-2"> @{username}</span>
          </h2>
        </Link>
        <span className="card__meta text-1">{getDate(createdAt)}</span>
        {editForm ? (
          <PostForm
            isEdit
            body={body}
            postId={id}
            callback={() => setEditForm(!editForm)}
          />
        ) : (
          <Link to={`/post/${username}/${id}`}>
            <p className="card__description paragraph-3">
              {body}
              {edited && <em className="text-4">(edited)</em>}
            </p>
          </Link>
        )}
        <div className="card__extra">
          <CustomButton
            styleClass="margin-r-md"
            onClick={handleCopyTextToClipboard}
          >
            <FontAwesomeIcon icon={faShareAlt} />
          </CustomButton>
          <LikeButton id={id} likes={likes} likeCount={likeCount} user={user} />
          <Link to={`/post/${username}/${id}`}>
            <CommentButton count={commentCount} user={user} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
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

export default PostCard;
