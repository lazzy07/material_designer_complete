import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    profilePicture: Image
    type: Int!
    artworkPosts: [ArtworkPost!]!
    materialPosts: [MaterialPost!]!
    projects: [Project!]!
    isFollowing: Boolean
    followers: [User]
    following: [User]
  }

  type Artwork {
    id: ID!
    user: User!
    image: Image!
    description: String!
  }

  type Project {
    id: ID!
    user: User!
    projectName: String!
  }

  type Material {
    id: ID!
    name: String!
    material: String!
    description: String!
    image: Image!
    tags: [String]!
  }

  type Keybinding {
    id: ID!
    name: String!
    description: String!
    active: Boolean
    tags: [String]
  }

  type ArtworkPost {
    id: ID!
    user: User!
    data: Artwork!
    liked: Boolean!
    likes: Int!
    comments: [Comment!]!
    tags: [String!]!

    dateCreated: Int!
    dateModified: Int!
    dateDeleted: Int
  }

  type MaterialPost {
    id: ID!
    user: User!
    data: Artwork!
    liked: Boolean!
    likes: Int!
    comments: [Comment!]!
    tags: [String!]!

    dateCreated: Int!
    dateModified: Int!
    dateDeleted: Int
  }

  type Comment {
    id: ID!
    postId: ID!
    user: User!
    comment: String!

    dateCreated: Int!
    dateModified: Int!
    dateDeleted: Int
  }

  type Reply {
    id: ID!
    user: User!
    commentId: ID!
    dateTime: Int!
    reply: String!
  }

  type Image {
    width: Int!
    height: Int!
    preview: String!
    url: String!
  }

  type Query {
    getUser: String
    getSecureKeys: [String]
    getApiKeys: [String]
    searchArtwork(searchTerm: String!): [ArtworkPost!]!
    searchMaterials(searchTerm: String!): [MaterialPost!]!
    searchUsers(searchTerm: String!): [User!]!
    searchProjects(searchTerm: String!): [Project!]!
    user(userName: String!): User
    getAllArtworks: [ArtworkPost!]
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

    login(userName: String!, email: String!, password: String!): String

    addSecureKey(key: String!): [String!]
    removeSecureKey(key: String): [String!]

    addApiKey(key: String!): [String!]
    removeApiKey(key: String): [String!]
    followMutation(userId: String!): Boolean!
    addLike(postId: String!): Boolean!
    addComment(postId: String!, comment: String): Comment!
  }
`;
