import { gql } from "apollo-boost";

export const addNewSecureKeyQuery = gql`
  mutation($key: String!) {
    addSecureKey(key: $key)
  }
`;

export const addNewApiKeyQuery = gql`
  mutation($key: String!) {
    addApiKey(key: $key)
  }
`;
