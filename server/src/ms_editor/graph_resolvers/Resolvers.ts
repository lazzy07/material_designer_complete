import { Context } from "./../../common/interfaces/Context";
import {
  addNewProject,
  getAllProjects,
  saveProject
} from "./../controllers/ProjectController";
import { createUserResolver, loginResolver } from "../functions/UserHandler";

export const resolvers = {
  Query: {
    hello: () => "Hello world",
    getAllProjects: (_: any, args: any, context: Context) =>
      getAllProjects(args, context)
  },

  Mutation: {
    signup: async (_: any, args: any, { res }: Context) =>
      createUserResolver(args, res),
    login: async (_: any, args: any, context: Context) =>
      loginResolver(args, context),
    addNewProject: async (_: any, args: any, context: Context) =>
      addNewProject(args, context),
    saveProject: async (_: any, args: any, context: Context) =>
      saveProject(args, context)
  }
};
