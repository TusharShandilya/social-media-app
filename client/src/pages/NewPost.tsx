import React from "react";
import PostForm from "../components/Forms/PostForm";
import Layout from "../components/Layout";

const NewPost: React.FC = () => {
  return (
    <Layout hasSidebar>
      <PostForm />;
    </Layout>
  );
};

export default NewPost;
