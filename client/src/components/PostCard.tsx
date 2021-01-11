import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { GET_ALL_POSTS } from "../utils/graphql";
import { Post } from "../utils/types";
import { AuthContext } from "../AuthUser.context";
import LikeButton from "./LikeButton";

import CommentButton from "./CommentButton";
import ConfirmModal from "./ConfirmModal";
import PostForm from "./Forms/PostForm";
import CustomButton from "./CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";

interface Props {
  post: Post;
}

interface Visibility {
  [props: string]: boolean;
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
    ...props
  },
}) => {
  const [visibility, setVisibility] = useState<Visibility>({
    commentForm: false,
    editPost: false,
    modal: false,
    comments: false,
    postMenu: false,
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

  const toggleVisibility = (items: string[]) => {
    items.forEach((item) => {
      setVisibility((visibility) => ({
        ...visibility,
        [item]: !visibility[item],
      }));
    });
  };

  return (
    <div className="post-card__background margin-y-md">
      <ConfirmModal
        open={visibility.modal}
        onClose={() => toggleVisibility(["modal"])}
        onCancel={() => toggleVisibility(["modal"])}
        onConfirm={deletePost}
      >
        Do you want to delete this post?
      </ConfirmModal>
      <div className="post-card">
        {signedInUserPost && (
          <div className="post-card__menu">
            <div
              className="post-card__menu-icon"
              onClick={() => toggleVisibility(["postMenu"])}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            {visibility.postMenu && (
              <ul className="post-card__menu-items">
                <li
                  className="post-card__menu-item"
                  onClick={() => toggleVisibility(["editPost", "postMenu"])}
                >
                  Edit
                </li>
                <li
                  className="post-card__menu-item"
                  onClick={() => toggleVisibility(["modal", "postMenu"])}
                >
                  Delete
                </li>
              </ul>
            )}
          </div>
        )}

        <Link to={`/user/${username}`}>
          <h2 className="post-card__title">
            {firstName} {lastName}
            <span className="post-card__username link"> @{username}</span>
          </h2>
        </Link>
        <span className="post-card__meta">
          {new Date(createdAt).toLocaleDateString("en-gb", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        {visibility.editPost ? (
          <PostForm
            isEdit
            body={body}
            postId={id}
            callback={() => setVisibility({ ...visibility, editPost: false })}
          />
        ) : (
          <Link to={`/post/${username}/${id}`}>
            <p className="post-card__description ">
              {body}
              {edited && <em>(edited)</em>}
            </p>
          </Link>
        )}
        <div className="post-card__extra">
          <CustomButton styleClass="margin-r-md">
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
