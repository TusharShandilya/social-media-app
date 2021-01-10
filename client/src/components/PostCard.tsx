import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { GET_ALL_POSTS } from "../utils/graphql";
import { Post } from "../utils/types";
import { AuthContext } from "../AuthUser.context";
import LikeButton from "./LikeButton";
import CommentForm from "./Forms/CommentForm";
import Comment from "./Comment";
import CommentButton from "./CommentButton";
import EditPostForm from "./Forms/EditPostForm";
import ConfirmModal from "./ConfirmModal";

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
    comments,
    likes,
  },
}) => {
  const [visibility, setVisibility] = useState({
    commentForm: false,
    editPost: false,
    modal: false,
    comments: false,
  });

  const { user } = useContext(AuthContext);

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

  return (
    <div className="post-card">
      <ConfirmModal
        open={visibility.modal}
        onClose={() => setVisibility({ ...visibility, modal: false })}
        onCancel={() => setVisibility({ ...visibility, modal: false })}
        onConfirm={deletePost}
      >
        Do you want to delete this post?
      </ConfirmModal>

      {signedInUserPost && (
        <div className="post-card__menu">
          <ul className="post-card__menu-items">
            <li
              className="post-card__menu-item"
              onClick={() => setVisibility({ ...visibility, editPost: true })}
            >
              Edit
            </li>
            <li
              className="post-card__menu-item"
              onClick={() => setVisibility({ ...visibility, modal: true })}
            >
              Delete
            </li>
          </ul>
        </div>
      )}
      <h2 className="title">
        {firstName} {lastName}
      </h2>
      <h4 className="subtitle link">
        <Link to={`/user/${username}`}>@{username}</Link>
      </h4>
      <span className="post-card__meta">
        {new Date(createdAt).toLocaleDateString("en-gb", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      {visibility.editPost ? (
        <EditPostForm
          body={body}
          postId={id}
          callback={() => setVisibility({ ...visibility, editPost: false })}
        />
      ) : (
        <Link to={`/post/${username}/${id}`}>
          <p className="post-card__description">
            {edited && <em>(edited)</em>}
            {body}
          </p>
        </Link>
      )}
      <div className="post-card__extra">
        <LikeButton
          id={id}
          username={username}
          likes={likes}
          likeCount={likeCount}
          user={user}
        />
        <CommentButton
          count={commentCount}
          user={user}
          callback={() => {
            setVisibility({
              ...visibility,
              commentForm: !visibility.commentForm,
            });
          }}
        />
      </div>
      {user && visibility.commentForm && <CommentForm postId={id} />}
      {comments.map((comment) => (
        <Comment key={comment.commentId} postId={id} comment={comment} />
      ))}
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
