import { gql } from "apollo-boost";

export const addWebProjectMutation = gql`
  mutation($projectData: String!) {
    addNewProject(projectData: $projectData)
  }
`;
