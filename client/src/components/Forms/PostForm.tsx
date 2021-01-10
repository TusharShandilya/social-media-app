import { gql, useMutation } from "@apollo/client";
import React from "react";

import useForm from "../../hooks/useForm";
import { GET_ALL_POSTS } from "../../utils/graphql";
import CustomButton from "../CustomButton";
import CustomInputText from "../CustomInputText";

interface NewPostFormValues {
  body: string;
}

const PostForm: React.FC = () => {
  let { values, onChange, onSubmit } = useForm<NewPostFormValues>(
    { body: "" },
    handleNewPostCreation
  );

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update(proxy, { data: { createPost: post } }) {
      let data: any = proxy.readQuery({ query: GET_ALL_POSTS });

      proxy.writeQuery({
        query: GET_ALL_POSTS,
        data: { getPosts: [post, ...data.getPosts] },
      });
      values.body = "";
    },
    onError(err) {
      console.log(err);
    },
    variables: values,
  });

  function handleNewPostCreation() {
    createPost();
  }

  return (
    <form className="form post-form" onSubmit={onSubmit}>
      <CustomInputText
        id="new-post"
        label="Create a new post"
        name="body"
        type="text"
        value={values.body}
        handleChange={onChange}
        required
      />
      <CustomButton type="submit">Post!</CustomButton>
    </form>
  );
};

const CREATE_POST = gql`
  mutation($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      firstName
      lastName
      edited
      createdAt
      likeCount
      likes {
        id
        username
      }
      commentCount
      comments {
        id
        commentId
        body
        username
        firstName
        lastName
        createdAt
        edited
      }
    }
  }
`;

export default PostForm;
