import React from "react";
import { useQuery } from "@apollo/client";

import { Post } from "../utils/types";
import { GET_ALL_POSTS } from "../utils/graphql";
import PostCard from "../components/PostCard";
import Layout from "../components/Layout";

const Home: React.FC = () => {
  const { loading, data } = useQuery(GET_ALL_POSTS);

  return (
    <Layout hasSidebar>
      <h1 className="text-centered heading-primary">All posts</h1>
      <div className="scrollable-container">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          data?.getPosts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          )) ?? <h1>An error has occurred</h1>
        )}
      </div>
    </Layout>
  );
};

export default Home;
