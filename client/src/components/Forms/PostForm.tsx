import { gql, useMutation } from "@apollo/client";
import { faEdit, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import useForm from "../../hooks/useForm";
import { GET_ALL_POSTS } from "../../utils/graphql";
import CustomButton from "../CustomButton";
import CustomInputText from "../CustomInputText";

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
  let { values, onChange, onSubmit } = useForm<NewPostFormValues>(
    { body: body ?? "" },
    handleFormSubmit
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

  const [editPost, { error }] = useMutation(EDIT_POST, {
    update(_, { data: { editPost: post } }) {},
    variables: {
      postId,
      body: values.body,
    },
  });

  function handleFormSubmit() {
    if (isEdit) {
      editPost();

      if (callback) {
        callback();
      }
    } else {
      createPost();
    }
  }

  return (
    <form className="form post-form" onSubmit={onSubmit}>
      <CustomInputText
        id="new-post"
        label="Create a new post"
        name="body"
        type="textarea"
        value={values.body}
        handleChange={onChange}
        required
      />
      {isEdit && <CustomButton onClick={callback}>Cancel</CustomButton>}
      <CustomButton type="submit">
        <FontAwesomeIcon icon={isEdit ? faEdit : faPencilAlt} />{" "}
        {isEdit ? "Edit" : "Post!"}
      </CustomButton>
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
