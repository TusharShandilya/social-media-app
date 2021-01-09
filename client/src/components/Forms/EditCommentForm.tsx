import { gql, useMutation } from "@apollo/client";
import React from "react";

import useForm from "../../hooks/useForm";
import { GET_ALL_POSTS } from "../../utils/graphql";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";

interface Props {
  body: string;
  postId: string;
  commentId: string;
  callback?: () => void;
}

interface EditFormValues {
  body: string;
}

const EditCommentForm: React.FC<Props> = ({
  body,
  postId,
  commentId,
  callback,
}) => {
  let { values, onChange, onSubmit } = useForm<EditFormValues>(
    { body },
    handleEdit
  );

  const [editComment, { loading }] = useMutation(EDIT_COMMENT, {
    update(_, { data: { editComment: post } }) {},
    variables: {
      postId,
      commentId,
      body: values.body,
    },
  });

  function handleEdit() {
    editComment();
    if (callback) {
      callback();
    }
  }

  return (
    <form className="form post-form" onSubmit={onSubmit}>
      <CustomInput
        id="edit-comment"
        label="Edit comment"
        name="body"
        type="text"
        value={values.body}
        handleChange={onChange}
        required
      />
      <CustomButton type="submit">Edit</CustomButton>
    </form>
  );
};

const EDIT_COMMENT = gql`
  mutation($postId: ID!, $commentId: ID!, $body: String!) {
    editComment(postId: $postId, commentId: $commentId, body: $body) {
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

export default EditCommentForm;
