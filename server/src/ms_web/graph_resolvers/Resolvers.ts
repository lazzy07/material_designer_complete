import { Context } from "./../../common/interfaces/Context";
import {
  createUserResolver,
  loginResolver
} from "./../../common/functions/UserHandler";
import {
  getKeysResolver,
  addSecureKeyResolver,
  removeSecureKeyResolver,
  addApiKeyResolver,
  removeApiKeyResolver,
  getApiKeysResolver,
  searchUsersResolver,
  getUserById,
  isFollowing,
  getUserArtworks,
  getUserMaterials,
  followMutation,
  getUserByUsername,
  isFollower,
  getFollowers
} from "../controllers/UserController";
import {
  searchArtworkResolver,
  getArtwork,
  addLike,
  addComment,
  getAllArtworks
} from "./../controllers/ArtworkController";
import { searchMaterialsResolver } from "./../controllers/MaterialController";
import { searchProjectsResolver } from "./../controllers/ProjectController";
import { getProject } from "../controllers/MaterialController";
import { isAuth } from "./../../common/functions/SessionManagement";
import { getAllUserProjects } from "./../controllers/UserController";

export const resolvers = {
  Query: {
    getUser: (_: any, { id }) => {
      return "Hello world";
    },

    getSecureKeys: async (_: any, args: any, context: Context) =>
      getKeysResolver(args, context),
    getApiKeys: async (_: any, args: any, context: Context) =>
      getApiKeysResolver(args, context),

    searchArtwork: async (_: any, args: any, context: Context) =>
      searchArtworkResolver(args, context),
    searchMaterials: async (_: any, args: any, context: Context) =>
      searchMaterialsResolver(args, context),
    searchUsers: async (_: any, args: any, context: Context) =>
      searchUsersResolver(args, context),
    searchProjects: async (_: any, args: any, context: Context) =>
      searchProjectsResolver(args, context),
    user: async (_: any, args: any, context: Context) =>
      getUserByUsername(args, context),
    getAllArtworks: async (_: any, args: any, context: Context) =>
      getAllArtworks(args, context)
  },

  Mutation: {
    signup: async (_: any, args: any, { res }: Context) =>
      createUserResolver(args, res),
    login: async (_: any, args: any, context: Context) =>
      loginResolver(args, context),
    addSecureKey: async (_: any, args: any, context: Context) =>
      addSecureKeyResolver(args, context),
    removeSecureKey: async (_: any, args: any, context: Context) =>
      removeSecureKeyResolver(args, context),
    addApiKey: async (_: any, args: any, context: Context) =>
      addApiKeyResolver(args, context),
    removeApiKey: async (_: any, args: any, context: Context) =>
      removeApiKeyResolver(args, context),
    followMutation: async (_: any, args: any, context: Context) =>
      followMutation(args, context),
    addLike: async (_: any, args: any, context: Context) =>
      addLike(args, context),
    addComment: async (_: any, args: any, context: Context) =>
      addComment(args, context)
  },

  ArtworkPost: {
    user: async (parent: any, args: any, context: Context) =>
      getUserById(parent.userId),
    data: async (parent: any) => getArtwork(parent.dataId),
    liked: async (parent: any, args: any, context: Context) =>
      parent.likedBy.includes(
        (isAuth(context) as any) ? (isAuth(context) as any).id : false
      )
  },

  MaterialPost: {
    user: async (parent: any, args: any, context: Context) =>
      getUserById(parent.userId),
    data: async (parent: any) => getProject(parent.dataId),
    liked: async (parent: any, args: any, context: Context) =>
      parent.likedBy.includes(
        (isAuth(context) as any) ? (isAuth(context) as any).id : false
      )
  },

  User: {
    isFollowing: async (parent: any, args: any, context: Context) =>
      isFollowing(parent, context),
    artworkPosts: async (parent: any, args: any, context: Context) =>
      getUserArtworks(parent.id),
    materialPosts: async (parent: any, args: any, context: Context) =>
      getUserMaterials(parent.id),
    projects: async (parent: any, args: any, context: Context) =>
      getAllUserProjects(parent.id),
    following: async (parent: any, args: any, context: Context) =>
      getFollowers(parent.following),
    followers: async (parent: any, args: any, context: Context) =>
      getFollowers(parent.followers)
  },

  Project: {
    user: async (parent: any, args: any, context: Context) =>
      getUserById(parent.userId),
    projectName: (parent: any) => parent.name
  },

  Comment: {
    user: async (parent: any, args: any, context: Context) =>
      getUserById(parent.userId),
    id: (parent: any, args: any, context: Context) => parent._id
  }
};
