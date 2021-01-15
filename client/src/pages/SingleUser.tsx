import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";

import { PostType } from "../config/types";

import { Container, Layout } from "../components/Layout";
import { Heading } from "../components/Typography";
import { Spacer } from "../components/Helpers";
import { PostCard } from "../containers/Cards";

interface Props {
  match: { params: { username: string } };
}

const SingleUser: React.FC<Props> = (props) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { username: props.match.params.username },
  });

  let singleUserComponent: JSX.Element;

  if (loading) {
    singleUserComponent = <Heading>Loading...</Heading>;
  } else if (data) {
    singleUserComponent = (
      <Fragment>
        <Heading size="xl">
          {data.getUser.firstName} {data.getUser.lastName}
          <span className="link"> @{data.getUser.username}</span>
        </Heading>
        <Container scrollable>
          {data.getUser.posts.map((post: PostType) => (
            <Fragment key={post.id}>
              <PostCard post={post} />
              <Spacer size="sm" />
            </Fragment>
          ))}
        </Container>
      </Fragment>
    );
  } else {
    singleUserComponent = <Heading>An error has occured</Heading>;
  }

  return <Layout hasSidebar>{singleUserComponent}</Layout>;
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
