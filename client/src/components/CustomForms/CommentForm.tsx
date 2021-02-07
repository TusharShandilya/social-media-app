import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faComment,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

import useForm from "../../hooks/useForm";

import { Heading } from "../common/Typography";
import { CustomButton } from "../common/Button";
import { CustomInputText } from "../common/Inputs";

interface Props {
  postId: string;
  isEdit?: boolean;
  body?: string;
  commentId?: string;
  callback?: () => void;
}

const CommentForm: React.FC<Props> = ({
  postId,
  body,
  callback,
  commentId,
  isEdit,
}) => {
  const [error, setError] = useState("");
  const { values, onSubmit, onChange } = useForm<{ comment: string }>(
    {
      comment: body ?? "",
    },
    hoistedFunction
  );
  const commentLengthLimit = 200;

  useEffect(() => {
    if (values.comment.length > commentLengthLimit) {
      if (
        error !== `Post needs to be less than ${commentLengthLimit} in length`
      ) {
        setError(`Post needs to be less than ${commentLengthLimit} in length`);
      }
    } else {
      if (error !== "") {
        setError("");
      }
    }
  }, [values.comment]);

  const [createComment, { loading: createLoading }] = useMutation(
    CREATE_COMMENT,
    {
      update(_, { data: { createComment: post } }) {
        values.comment = "";
      },
      variables: {
        body: values.comment,
        postId,
      },
    }
  );

  const [editComment, { loading: editLoading }] = useMutation(EDIT_COMMENT, {
    update(_, { data: { editComment: post } }) {},
    variables: {
      postId,
      commentId,
      body: values.comment,
    },
  });

  function hoistedFunction() {
    if (isEdit) {
      editComment();
      if (callback) {
        callback();
      }
    } else {
      createComment();
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (values.comment.length <= commentLengthLimit) {
      onSubmit(e);
    } else {
      e.preventDefault();
      alert("Comment length limit exceeded");
    }
  };

  return (
    <form
      className="form comment-form no-margin-x no-padding-t"
      onSubmit={handleSubmit}
    >
      <Heading size="sm">{isEdit ? "Edit comment" : "Comment"}</Heading>

      <div className="form-control">
        <CustomInputText
          id="comment"
          label={`Comment... (${values.comment.length}/${commentLengthLimit})`}
          name="comment"
          type="textarea"
          value={values.comment}
          handleChange={onChange}
          error={error}
          required
        />
      </div>
      <div className="form-control margin-t-md">
        {isEdit && (
          <CustomButton
            variant="secondary"
            styleClass="full-width"
            onClick={callback}
            noBackground
          >
            <FontAwesomeIcon icon={faBan} /> Cancel
          </CustomButton>
        )}
        <CustomButton styleClass="full-width" type="submit">
          <FontAwesomeIcon icon={isEdit ? faCommentDots : faComment} />{" "}
          {isEdit ? "Edit" : "Comment"}
        </CustomButton>
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

export default CommentForm;
