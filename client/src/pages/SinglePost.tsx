import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import { AuthContext } from "../AuthUser.context";
import { CommentType } from "../config/types";

import { Container, Layout } from "../components/Layout";
import { Heading } from "../components/Typography";
import { Spacer } from "../components/Helpers";
import { CommentForm } from "../containers/Forms";
import { CommentCard, PostCard } from "../containers/Cards";

interface Props {
  match: { params: { postId: string } };
}

const SinglePost: React.FC<Props> = (props) => {
  const { user } = useContext(AuthContext);
  const { postId } = props.match.params;
  const { data, loading } = useQuery(GET_POST, { variables: { postId } });

  let singlePostComponent: JSX.Element;
  if (loading) {
    singlePostComponent = <Heading>Loading...</Heading>;
  } else if (data) {
    singlePostComponent = (
      <Container scrollable>
        <PostCard post={data.getPost} />
        {user && <CommentForm postId={postId} />}
        <Spacer size="sm" />
        <Heading size="xs">Comments ({data.getPost.commentCount})</Heading>
        <Spacer size="xs" />
        {data.getPost.comments.map((comment: CommentType) => (
          <CommentCard
            key={comment.commentId}
            postId={postId}
            comment={comment}
          />
        ))}
      </Container>
    );
  } else {
    singlePostComponent = <Heading>An error has occured</Heading>;
  }

  return <Layout hasSidebar>{singlePostComponent}</Layout>;
};

const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
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

export default SinglePost;
