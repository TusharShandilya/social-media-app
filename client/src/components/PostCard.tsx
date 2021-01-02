import { gql, useMutation } from "@apollo/client";
import React from "react";
import { GET_ALL_POSTS } from "../graphql/posts";

import { Post, User } from "../utils/types";

interface Props {
  post: Post;
  user: User | null;
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
  user,
}) => {
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
      {signedInUserPost && (
        <div className="post-card__menu">
          <ul className="post-card__menu-items">
            <li className="post-card__menu-item">Edit</li>
            <li className="post-card__menu-item" onClick={() => deletePost()}>
              Delete
            </li>
          </ul>
        </div>
      )}
      <h2 className="title">
        {firstName} {lastName}
      </h2>
      <h4 className="subtitle">
        <a href="" className="link">
          @{username}
        </a>
      </h4>
      <span className="post-card__meta">
        {new Date(createdAt).toLocaleDateString("en-gb", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <p className="post-card__description">
        {edited && <em>(edited)</em>}
        {body}
      </p>
      <div className="post-card__extra">
        <button className="btn">{likeCount}</button>
        <button className="btn">{commentCount}</button>
      </div>
    </div>
  );
};

const DELETE_POST = gql`
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