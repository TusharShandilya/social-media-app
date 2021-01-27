import React, { useState, useContext, Fragment } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import { GET_ALL_POSTS } from "../../graphql";
import { PostType } from "../../config/types";
import { getDate } from "../../utils/date";
import { AuthContext } from "../../AuthUser.context";
import { useModal } from "../../hooks";

import { Modal } from "../../components/Modal/Modal";
import {
  CommentButton,
  LikeButton,
  ShareButton,
} from "../../components/Button";
import {
  Card,
  CardTitle,
  CardMeta,
  CardContent,
  CardActions,
  CardMenu,
  CardImage,
} from "../../components/Card";
import { PostForm } from "../Forms";
import { Heading, Paragraph } from "../../components/Typography";

import UserDefaultImage from "../../assets/img/user-default.jpg";
import { Box } from "../../components/Layout";

interface Props {
  post: PostType;
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
  const { user } = useContext(AuthContext);
  const [editForm, setEditForm] = useState(false);
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

  const cardMenuItems = [
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
  ];

  return (
    <Fragment>
      <Modal
        open={modalOpen}
        onClose={toggleModal}
        onCancel={toggleModal}
        onConfirm={deletePost}
      >
        <Paragraph className="text-centered" size="lg">
          Do you want to delete this post?
        </Paragraph>
      </Modal>
      <Card>
        {signedInUserPost && <CardMenu menuItems={cardMenuItems} />}
        <Link to={`/user/${username}`}>
          <CardTitle>
            <CardImage
              src={UserDefaultImage}
              alt={`${firstName} ${lastName} image`}
            />
            <Box vertical>
              <Heading size="xs">
                {firstName} {lastName}
                <Paragraph size="lg" className="link">
                  &nbsp;@{username}
                </Paragraph>
              </Heading>
              <Paragraph>{getDate(createdAt)}</Paragraph>
            </Box>
          </CardTitle>
        </Link>

        <CardContent>
          {editForm ? (
            <PostForm
              isEdit
              body={body}
              postId={id}
              callback={() => setEditForm(!editForm)}
            />
          ) : (
            <Link to={`/post/${username}/${id}`}>
              <Paragraph size="xl">
                {body}
                {edited && (
                  <Paragraph>
                    <em>(edited)</em>
                  </Paragraph>
                )}
              </Paragraph>
            </Link>
          )}
        </CardContent>

        <CardActions>
          <ShareButton share={`http://localhost:3000/post/${username}/${id}`} />
          <LikeButton
            postId={id}
            likes={likes}
            likeCount={likeCount}
            loggedInUser={user}
          />
          <CommentButton
            count={commentCount}
            redirect={user ? `/post/${username}/${id}` : "/login"}
          />
        </CardActions>
      </Card>
    </Fragment>
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
