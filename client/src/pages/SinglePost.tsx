import { gql, useQuery } from "@apollo/client";
import React from "react";
import PostCard from "../components/PostCard";

interface Props {
  match: { params: { postId: string } };
}

const SinglePost: React.FC<Props> = (props) => {
  const { postId } = props.match.params;

  const { data, loading } = useQuery(GET_POST, { variables: { postId } });

  return (
    <div className="page">
      {loading ? (
        <h1>Loading...</h1>
      ) : data ? (
        <PostCard post={data.getPost} />
      ) : (
        <h1>An error has occured</h1>
      )}
    </div>
  );
};

const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
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

export default SinglePost;
