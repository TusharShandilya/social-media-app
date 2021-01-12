import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

import PostCard from "../components/PostCard";
import { Post } from "../utils/types";

import { GET_ALL_POSTS } from "../utils/graphql";
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
            <div className="grid">
              <PostCard key={post.id} post={post} />
            </div>
          )) ?? <h1>An error has occurred</h1>
        )}
      </div>
    </Layout>
  );
};

export default Home;
