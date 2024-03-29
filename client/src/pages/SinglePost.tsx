import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import { AuthContext } from "../AuthUser.context";
import { CommentType } from "../types";

import { Container, Layout } from "../components/common/Layout";
import { Heading } from "../components/common/Typography";
import { Spacer } from "../components/common/Helpers";
import { CommentForm } from "../components/Forms";
import { CommentCard, PostCard } from "../components/Cards";

interface Props {
  match: { params: { postId: string } };
}

const SinglePost: React.FC<Props> = (props) => {
  const { user } = useContext(AuthContext);
  const { postId } = props.match.params;
  const { data, loading } = useQuery(GET_POST, { variables: { postId } });

  if (loading) {
    return (
      <Layout>
        {" "}
        <Heading>Loading...</Heading>{" "}
      </Layout>
    );
  } else if (data) {
    return (
      <Layout title={`${data.getPost.body.substring(0, 10)}...`}>
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
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Heading>An error has occured</Heading>{" "}
      </Layout>
    );
  }
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
