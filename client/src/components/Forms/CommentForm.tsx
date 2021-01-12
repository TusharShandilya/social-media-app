import React from "react";
import { gql, useMutation } from "@apollo/client";

import useForm from "../../hooks/useForm";
import CustomInputText from "../CustomInputText";
import CustomButton from "../CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faComment,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

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
  const { values, onSubmit, onChange } = useForm<{ comment: string }>(
    {
      comment: body ?? "",
    },
    handleFormSubmit
  );

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

  function handleFormSubmit() {
    if (isEdit) {
      editComment();
      if (callback) {
        callback();
      }
    } else {
      createComment();
    }
  }

  return (
    <form
      className="form comment-form full-width margin-y-md no-margin-x no-padding-t"
      onSubmit={onSubmit}
    >
      <h3 className="heading-primary text-5">
        {isEdit ? "Edit your comment" : "Comment on this post"}
      </h3>
      {/* <h3>{values.comment.length}</h3> TODO: keep limit 250 */}
      <div className="form-control">
        <CustomInputText
          id="comment"
          label="Comment"
          name="comment"
          type="textarea"
          value={values.comment}
          handleChange={onChange}
          required
        />
      </div>
      <div className="form-control margin-t-md">
        {isEdit && (
          <CustomButton styleClass="full-width" onClick={callback}>
            <FontAwesomeIcon icon={faBan} /> Cancel
          </CustomButton>
        )}
        <CustomButton color="filled" styleClass="full-width" type="submit">
          <FontAwesomeIcon icon={isEdit ? faCommentDots : faComment} />{" "}
          {isEdit ? "Edit Comment" : "Comment"}
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
