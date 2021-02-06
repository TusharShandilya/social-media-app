import React from "react";

import { Layout } from "../components/common/Layout";
import { PostForm } from "../components/Forms";

const NewPost: React.FC = () => {
  return (
    <Layout title="New Post">
      <PostForm />;
    </Layout>
  );
};

export default NewPost;
