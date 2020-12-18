import { gql } from "apollo-boost";

export const addLikeMutation = gql`
  mutation($postId: String!) {
    addLike(postId: $postId)
  }
`;

export const addCommentMutation = gql`
  mutation($postId: String!, $comment: String!) {
    addComment(postId: $postId, comment: $comment) {
      id
      user {
        id
        userName
        lastName
        firstName
        type
        profilePicture {
          width
          height
          preview
          url
        }
      }
      comment
    }
  }
`;
