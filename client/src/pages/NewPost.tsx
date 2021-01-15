import React from "react";

import { Layout } from "../components/Layout";
import { PostForm } from "../containers/Forms";

const NewPost: React.FC = () => {
  return (
    <Layout hasSidebar>
      <PostForm />;
    </Layout>
  );
};

export default NewPost;
