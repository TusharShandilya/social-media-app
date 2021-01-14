import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { faBan, faEdit, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useForm from "../../hooks/useForm";
import { GET_ALL_POSTS } from "../../utils/graphql";
import CustomButton from "../CustomButton";
import CustomInputText from "../CustomInputText";
import { useHistory } from "react-router";

interface NewPostFormValues {
  body: string;
}

interface Props {
  isEdit?: boolean;
  body?: string;
  postId?: string;
  callback?: () => void;
}

const PostForm: React.FC<Props> = ({ isEdit, body, postId, callback }) => {
  let history = useHistory();
  const [error, setError] = useState("");
  let { values, onChange, onSubmit } = useForm<NewPostFormValues>(
    { body: body ?? "" },
    handleFormSubmit
  );
  const bodyLengthLimit = 250;

  useEffect(() => {
    if (values.body.length > bodyLengthLimit) {
      if (error !== `Post needs to be less than ${bodyLengthLimit} in length`) {
        setError(`Post needs to be less than ${bodyLengthLimit} in length`);
      }
    } else {
      if (error !== "") {
        setError("");
      }
    }
  }, [values.body]);

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

  const [editPost, { error: editError }] = useMutation(EDIT_POST, {
    update(_, { data: { editPost: post } }) {},
    variables: {
      postId,
      body: values.body,
    },
  });

  //  Regular function to allow hoisting to useForm hook
  function handleFormSubmit() {
    if (isEdit) {
      editPost();
      if (callback) {
        callback();
      }
    } else {
      createPost();
      history.push("/");
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (values.body.length <= bodyLengthLimit) {
      onSubmit(e);
    } else {
      alert("Post length limit exceeded");
    }
  };

  return (
    <form
      className="form post-form full-width margin-y-md"
      onSubmit={handleSubmit}
    >
      <h3 className="heading-primary text-5">
        {isEdit ? "Edit your post" : "Post something!"}
      </h3>

      <div className="form-control">
        <CustomInputText
          id="new-post"
          label={`${isEdit ? "Edit post..." : "What's on your mind?"} (${
            values.body.length
          }/${bodyLengthLimit})`}
          name="body"
          type="textarea"
          value={values.body}
          handleChange={onChange}
          required
          error={error}
        />
      </div>
      <div className="form-control">
        {isEdit && (
          <CustomButton styleClass="full-width text-4" onClick={callback}>
            <FontAwesomeIcon icon={faBan} /> Cancel
          </CustomButton>
        )}
        <CustomButton
          color="filled"
          styleClass="full-width text-4"
          type="submit"
        >
          <FontAwesomeIcon icon={isEdit ? faEdit : faPencilAlt} />{" "}
          {isEdit ? "Edit" : "Post!"}
        </CustomButton>
      </div>
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
export default PostForm;
