import { gql } from "apollo-boost";

export const secureKeysQuery = gql`
  {
    getSecureKeys
  }
`;

export const apiKeysQuery = gql`
  {
    getApiKeys
  }
`;

export const secureKeyDelete = gql`
  mutation($key: String!) {
    removeSecureKey(key: $key)
  }
`;

export const apiKeyDelete = gql`
  mutation($key: String!) {
    removeApiKey(key: $key)
  }
`;
