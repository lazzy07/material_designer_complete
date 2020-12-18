import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    profilePicture: Image
    type: Int!
  }

  type Image {
    width: Int!
    height: Int!
    preview: String!
    url: String!
  }

  type Project {
    id: ID
    project: String!
    name: String!
  }

  type Query {
    hello: String
    getAllProjects(secureUser: String!, secureKey: String!): [Project!]!
  }

  type Mutation {
    signup(
      firstName: String!
      lastName: String!
      userName: String!
      email: String!
      password: String!
      type: Int!
    ): String

    login(
      userName: String!
      email: String!
      password: String!
      secureKey: String!
      secureUser: String!
    ): String

    addNewProject(projectData: String!): String
    saveProject(
      projectData: String!
      secureKey: String!
      secureUser: String!
    ): Boolean
  }
`;
