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
      <div className="page-container">
        <h1 className="text-centered heading-primary">All posts</h1>
        {/* {user && <PostForm />} */}
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
    </div>
  );
};

export default Home;
