import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";

import { PostType } from "../config/types";
import { GET_ALL_POSTS } from "../graphql";

import { Container, Layout } from "../components/Layout";
import { Heading } from "../components/Typography";
import { Spacer } from "../components/Helpers";
import { PostCard } from "../containers/Cards";

const Home: React.FC = () => {
  const { loading, data } = useQuery(GET_ALL_POSTS);

  let homeComponent: JSX.Element;
  if (loading) {
    homeComponent = <Heading>Loading...</Heading>;
  } else if (data) {
    homeComponent = (
      <Container scrollable>
        {data?.getPosts.map((post: PostType) => (
          <Fragment key={post.id}>
            <PostCard post={post} />
            <Spacer size="xs" />
          </Fragment>
        ))}
      </Container>
    );
  } else {
    homeComponent = <Heading>An Error has occured</Heading>;
  }

  return (
    <Layout>
      <Heading size="lg">All posts</Heading>
      {homeComponent}
    </Layout>
  );
};

export default Home;
