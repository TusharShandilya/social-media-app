import { gql, useMutation } from "@apollo/client";
import React from "react";

import useForm from "../../hooks/useForm";
import { GET_ALL_POSTS } from "../../utils/graphql";
import CustomInput from "../CustomInput";

interface Props {
  body: string;
  postId: string;
  callback?: () => void;
}

interface EditFormValues {
  body: string;
}

const EditPostForm: React.FC<Props> = ({ body, postId, callback }) => {
  let { values, onChange, onSubmit } = useForm<EditFormValues>(
    { body },
    handleEdit
  );

  const [editPost, { loading }] = useMutation(EDIT_POST, {
    update(_, { data: { editPost: post } }) {},
    variables: {
      postId,
      body: values.body,
    },
  });

  function handleEdit() {
    editPost();
    if (callback) {
      callback();
    }
  }

  return (
    <form className="form post-form" onSubmit={onSubmit}>
      <CustomInput
        id="edit-post"
        label="Edit post"
        name="body"
        type="text"
        value={values.body}
        handleChange={onChange}
        required
      />
      <button type="submit" className="btn">
        Edit
      </button>
    </form>
  );
};

const EDIT_POST = gql`
  mutation($postId: ID!, $body: String!) {
    editPost(postId: $postId, body: $body) {
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

export default EditPostForm;
