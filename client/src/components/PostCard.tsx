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
import {
  faEllipsisH,
  faPenSquare,
  faShareAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CardMenu from "./CardMenu";
import { spawn } from "child_process";
import { getDate } from "../utils/date";

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
    <div className="card__background margin-y-md">
      <ConfirmModal
        open={visibility.modal}
        onClose={() => toggleVisibility(["modal"])}
        onCancel={() => toggleVisibility(["modal"])}
        onConfirm={deletePost}
      >
        Do you want to delete this post?
      </ConfirmModal>
      <div className="card">
        {signedInUserPost && (
          <CardMenu
            menuItems={[
              {
                callback: () => toggleVisibility(["editPost"]),
                value: (
                  <span>
                    <FontAwesomeIcon icon={faPenSquare} /> Edit
                  </span>
                ),
              },
              {
                callback: () => toggleVisibility(["modal"]),
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
        {visibility.editPost ? (
          <PostForm
            isEdit
            body={body}
            postId={id}
            callback={() => setVisibility({ ...visibility, editPost: false })}
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
