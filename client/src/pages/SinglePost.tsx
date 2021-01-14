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

type CommentType = {
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
      <div className="scrollable-container">
        {loading ? (
          <h1>Loading...</h1>
        ) : data ? (
          <Fragment>
            <PostCard post={data.getPost} />
            {user && <CommentForm postId={postId} />}
            <h3 className="text-4 margin-y-lg">
              Comments ({data.getPost.commentCount})
            </h3>
            {data.getPost.comments.map((comment: CommentType) => (
              <Comment
                key={comment.commentId}
                postId={postId}
                comment={comment}
              />
            ))}
          </Fragment>
        ) : (
          <h1>An error has occured</h1>
        )}
        <div className="margin-b-xl"></div>
      </div>
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
