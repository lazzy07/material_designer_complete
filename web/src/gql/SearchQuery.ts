import { gql } from "apollo-boost";

export const searchMaterialsQuery = gql`
  query($searchTerm: String!) {
    searchMaterials(searchTerm: $searchTerm) {
      id
      user {
        userName
        firstName
        lastName
        type
        profilePicture {
          width
          height
          preview
          url
        }
      }
      data {
        image {
          width
          height
          preview
          url
        }
        description
      }
      tags
      comments {
        id
      }
      likes
      liked
    }
  }
`;

export const searchUsersQuery = gql`
  query($searchTerm: String!) {
    searchUsers(searchTerm: $searchTerm) {
      id
      userName
      firstName
      lastName
      isFollowing
      type
    }
  }
`;

export const searchArtworkQuery = gql`
  query($searchTerm: String!) {
    searchArtwork(searchTerm: $searchTerm) {
      id
      user {
        userName
        firstName
        lastName
        type
        profilePicture {
          width
          height
          preview
          url
        }
      }
      data {
        image {
          width
          height
          preview
          url
        }
        description
      }
      tags
      comments {
        id
        user {
          userName
          firstName
          lastName
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
      likes
      liked
    }
  }
`;

export const searchProjectQuery = gql`
  query($searchTerm: String!) {
    searchProjects(searchTerm: $searchTerm) {
      id
      user {
        userName
      }
      projectName
    }
  }
`;
