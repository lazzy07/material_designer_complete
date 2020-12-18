import { gql } from "apollo-boost";

export const getAllProjects = gql`
  query($secureKey: String!, $secureUser: String!) {
    getAllProjects(secureKey: $secureKey, secureUser: $secureUser) {
      id
      name
      project
    }
  }
`;
