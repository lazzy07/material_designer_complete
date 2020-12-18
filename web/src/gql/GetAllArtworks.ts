import { gql } from "apollo-boost";

export const getAllArtworksQuery = gql`
  {
    getAllArtworks {
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

export const top10query = gql`
  {
    getAllArtworks {
      id
      user {
        userName
        firstName
        lastName
      }
      data {
        image {
          width
          height
          preview
          url
        }
      }
    }
  }
`;
