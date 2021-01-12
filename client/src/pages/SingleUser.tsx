import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import Layout from "../components/Layout";
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
    <Layout hasSidebar>
      {loading ? (
        <h1>Loading...</h1>
      ) : data ? (
        <Fragment>
          <h1 className="heading-primary margin-y-md">
            {data.getUser.firstName} {data.getUser.lastName}
            <span className="link"> @{data.getUser.username}</span>
          </h1>
          <div className="scrollable-container">
            {data.getUser.posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Fragment>
      ) : (
        <h1>An error has occured</h1>
      )}
    </Layout>
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
