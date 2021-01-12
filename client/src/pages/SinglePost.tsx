import React, { useContext, Fragment } from "react";
import { gql, useQuery } from "@apollo/client";

import PostCard from "../components/PostCard";
import { AuthContext } from "../AuthUser.context";
import Comment from "../components/Comment";
import CommentForm from "../components/Forms/CommentForm";
import Layout from "../components/Layout";

interface Props {
  match: { params: { postId: string } };
}

type Comment = {
  commentId: any;
  id: string;
  body: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  edited: boolean;
};

const SinglePost: React.FC<Props> = (props) => {
  const { user } = useContext(AuthContext);

  const { postId } = props.match.params;

  const { data, loading } = useQuery(GET_POST, { variables: { postId } });

  return (
    <Layout hasSidebar>
      {loading ? (
        <h1>Loading...</h1>
      ) : data ? (
        <Fragment>
          <PostCard post={data.getPost} />
          {user && <CommentForm postId={postId} />}
          <h3 className="text-4">Comments ({data.getPost.commentCount})</h3>
          <div className="scrollable-container">
            {data.getPost.comments.map((comment: Comment) => (
              <Comment
                key={comment.commentId}
                postId={postId}
                comment={comment}
              />
            ))}
          </div>
        </Fragment>
      ) : (
        <h1>An error has occured</h1>
      )}
    </Layout>
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
