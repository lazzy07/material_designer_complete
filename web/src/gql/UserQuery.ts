import { gql } from "apollo-boost";

export const userQuery = gql`
  query($userName: String!) {
    user(userName: $userName) {
      firstName
      lastName
      userName
      profilePicture {
        width
        height
        preview
        url
      }
      type
      artworkPosts {
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
      materialPosts {
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
      projects {
        id
        user {
          userName
        }
        projectName
      }
      isFollowing
      followers {
        id
        firstName
        lastName
        userName
        profilePicture {
          width
          height
          preview
          url
        }
        type
      }
      following {
        id
        firstName
        lastName
        userName
        profilePicture {
          width
          height
          preview
          url
        }
        type
      }
    }
  }
`;
