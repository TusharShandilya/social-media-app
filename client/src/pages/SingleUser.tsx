import { gql, useQuery } from "@apollo/client";
import React from "react";
import PostCard from "../components/PostCard";
import { Post } from "../utils/types";

interface Props {
  match: { params: { username: string } };
}

const SingleUser: React.FC<Props> = (props) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { username: props.match.params.username },
  });

  return (
    <div className="page">
      {loading ? (
        <h1>Loading...</h1>
      ) : data ? (
        <div className="user">
          <h1 className="title">
            {data.getUser.firstName} {data.getUser.lastName}
          </h1>
          <h4 className="">{data.getUser.username}</h4>
          <p className="subtitle">{data.getUser.email}</p>
          {data.getUser.posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <h1>An error has occured</h1>
      )}
    </div>
  );
};

const GET_USER = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      id
      username
      firstName
      lastName
      email
      posts {
        id
        body
        username
        firstName
        lastName
        edited
        createdAt
        updatedAt
        likeCount
        likes {
          id
          username
          createdAt
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
          updatedAt
          edited
        }
      }
    }
  }
`;

export default SingleUser;
