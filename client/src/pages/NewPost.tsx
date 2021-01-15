import React from "react";

import { Layout } from "../components/Layout";
import { PostForm } from "../containers/Forms";

const NewPost: React.FC = () => {
  return (
    <Layout title="New Post">
      <PostForm />;
    </Layout>
  );
};

export default NewPost;
