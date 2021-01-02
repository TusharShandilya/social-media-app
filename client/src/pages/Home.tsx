import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

import PostCard from "../components/PostCard";
import { Post } from "../utils/types";
import PostForm from "../components/Forms/PostForm";
import { AuthContext } from "../AuthUser.context";
import { GET_ALL_POSTS } from "../graphql/posts";

const Home: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(GET_ALL_POSTS);

  return (
    <div>
      <h1>All posts</h1>
      {user && <PostForm />}
      {loading ? (
        <h1>Loading...</h1>
      ) : data ? (
        data.getPosts.map((post: Post) => (
          <PostCard user={user} key={post.id} post={post} />
        ))
      ) : (
        <h1>An error has occurred</h1>
      )}
    </div>
  );
};

export default Home;
