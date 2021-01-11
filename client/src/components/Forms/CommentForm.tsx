import React from "react";
import { gql, useMutation } from "@apollo/client";

import useForm from "../../hooks/useForm";
import CustomInputText from "../CustomInputText";
import CustomButton from "../CustomButton";

interface Props {
  postId: string;
  isEdit?: boolean;
  body?: string;
  commmentId?: string;
}

const CommentForm: React.FC<Props> = ({ postId }) => {
  const { values, onSubmit, onChange } = useForm<{ comment: string }>(
    {
      comment: "",
    },
    handleComment
  );

  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    update(_, { data: { createComment: post } }) {
      values.comment = "";
    },
    variables: {
      body: values.comment,
      postId,
    },
  });

  function handleComment() {
    createComment();
  }

  return (
    <form className="form form-comment" onSubmit={onSubmit}>
      <div className="form-control">
        <CustomInputText
          id="comment"
          label="Comment"
          name="comment"
          type="text"
          value={values.comment}
          handleChange={onChange}
          required
        />
      </div>
      <div className="form-control">
        <CustomButton type="submit">Comment</CustomButton>
      </div>
    </form>
  );
};

const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
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

export default CommentForm;
