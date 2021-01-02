import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  {
    getPosts {
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

// export const EDIT_POST = gql`
//       mutation($postId: String!, $body: String!){
//             editPost(postId: $postId, body: $body) {
//                   id
//                   body
//                   username
//                   firstName
//                   lastName
//                   edited
//                   createdAt
//                   likeCount
//                   likes {
//                         id
//                         username
//                   }
//                   commentCount
//                   comments {
//                         id
//                         commentId
//                         body
//                         username
//                         firstName
//                         lastName
//                         createdAt
//                         edited
//                   }
//             }
//       }
// }
// `;
