import React from "react";
import PostForm from "../components/Forms/PostForm";

const NewPost: React.FC = () => {
  return (
    <div className="page">
      <div className="page-container">
        <PostForm />
      </div>
    </div>
  );
};

export default NewPost;
