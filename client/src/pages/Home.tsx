import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";

import { PostType } from "../types";
import { GET_ALL_POSTS } from "../graphql";

import { Container, Layout } from "../components/common/Layout";
import { Heading } from "../components/common/Typography";
import { Spacer } from "../components/common/Helpers";
import { PostCard } from "../components/Cards";

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
      <Heading className="title" size="lg">
        All posts
      </Heading>
      {homeComponent}
    </Layout>
  );
};

export default Home;
