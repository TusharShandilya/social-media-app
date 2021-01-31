import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";

import { PostType } from "../config/types";

import { Container, Layout } from "../components/Layout";
import { Heading } from "../components/Typography";
import { Spacer } from "../components/Helpers";
import { PostCard, UserCard } from "../containers/Cards";

interface Props {
  match: { params: { username: string } };
}

const SingleUser: React.FC<Props> = (props) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { username: props.match.params.username },
  });

  if (loading) {
    return (
      <Layout>
        {" "}
        <Heading>Loading...</Heading>{" "}
      </Layout>
    );
  } else if (data) {
    return (
      <Layout
        title={`${data.getUser.firstName.toUpperCase()} ${data.getUser.lastName.toUpperCase()}`}
      >
        <Spacer />
        <UserCard user={data.getUser} />
        <Spacer size="xs" />

        <Container scrollable>
          {data.getUser.posts.map((post: PostType) => (
            <Fragment key={post.id}>
              <PostCard post={post} />
              <Spacer size="sm" />
            </Fragment>
          ))}
        </Container>
      </Layout>
    );
  } else {
    return (
      <Layout>
        {" "}
        <Heading>An error has occured</Heading>{" "}
      </Layout>
    );
  }
};

const GET_USER = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      id
      username
      firstName
      lastName
      email
      posts {
        id
        body
        username
        firstName
        lastName
        edited
        createdAt
        updatedAt
        likeCount
        likes {
          id
          username
          createdAt
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
          updatedAt
          edited
        }
      }
    }
  }
`;

export default SingleUser;
