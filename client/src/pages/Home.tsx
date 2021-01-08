import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

import PostCard from "../components/PostCard";
import { Post } from "../utils/types";
import PostForm from "../components/Forms/PostForm";
import { AuthContext } from "../AuthUser.context";
import { GET_ALL_POSTS } from "../utils/graphql";

const Home: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(GET_ALL_POSTS);

  return (
    <div className="page">
      <h1>All posts</h1>
      {user && <PostForm />}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        data?.getPosts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        )) ?? <h1>An error has occurred</h1>
      )}
    </div>
  );
};

export default Home;
