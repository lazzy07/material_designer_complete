import { gql } from "apollo-boost";

export const saveProjectQuery = gql`
  mutation($projectData: String!, $secureKey: String!, $secureUser: String!) {
    saveProject(
      projectData: $projectData
      secureKey: $secureKey
      secureUser: $secureUser
    )
  }
`;
