import { gql } from "apollo-boost";

export const followMutation = gql`
  mutation($userId: String!) {
    followMutation(userId: $userId)
  }
`;
