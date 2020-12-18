import { isAuth } from "./../../common/functions/SessionManagement";
import {
  AuthenticationError,
  ApolloError,
  UserInputError
} from "apollo-server-express";
import Axios from "axios";
import { getConnectionUrl } from "./../../common/functions/Connection";
import { DATA_SERVER, USER_SERVER } from "../../common/constants";
import Log from "../../common/classes/Log";
import { Context } from "../../common/interfaces/Context";

export const addNewProject = async (args: any, context: any) => {
  const payload = isAuth(context);
  if (payload) {
    try {
      const projectData = JSON.parse(args.projectData);
      const res = await Axios.post(
        getConnectionUrl(DATA_SERVER, "addnewproject"),
        {
          userId: (payload as any).id,
          projectData
        }
      );
      if (!res.data.error) {
        return res.data.projectId;
      } else {
        return new ApolloError("Server error");
      }
    } catch (err) {
      Log.addError(err);
      return new ApolloError("Server error");
    }
  } else {
    return new AuthenticationError("Not authenticated");
  }
};

export const getAllProjects = async (args: any, context: Context) => {
  const payload = isAuth(context);
  if (payload) {
    const userId = context.payload.id;
    if (userId) {
      try {
        if (
          args.secureKey &&
          args.secureUser &&
          args.secureUser !== context.payload.userName
        ) {
          try {
            const isKeyAvailable = await isSecureKeyAvailable(
              args.secureUser,
              args.secureKey
            );
            if (isKeyAvailable) {
              const res = await Axios.post(
                getConnectionUrl(DATA_SERVER, "getallprojects"),
                { userId: args.secureUser }
              );
              if (res.data.error) {
                Log.addError(new Error(res.data.message));
                return new ApolloError("Server error");
              } else {
                return res.data.projects ? res.data.projects : [];
              }
            } else {
              return new UserInputError(
                "Secure key not valid, contact your company"
              );
            }
          } catch (err) {
            return new ApolloError("Server error");
          }
        } else {
          const res = await Axios.post(
            getConnectionUrl(DATA_SERVER, "getallprojects"),
            { userId }
          );
          if (res.data.error) {
            Log.addError(new Error(res.data.message));
            return new ApolloError("Server error");
          } else {
            return res.data.projects ? res.data.projects : [];
          }
        }
      } catch (err) {
        Log.addError(err);
        return new ApolloError("Server error");
      }
    }
  } else {
    return new AuthenticationError("Not authenticated");
  }
};

export const isSecureKeyAvailable = (userId: string, secureKey: string) => {
  return new Promise((resolve, reject) => {
    Axios.post(getConnectionUrl(USER_SERVER, "issecurekeyavailable"), {
      userId,
      secureKey
    })
      .then(res => {
        if (!res.data.error) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => {
        Log.addError(err);
        resolve(false);
      });
  });
};

export const saveProject = async (args: any, context: Context) => {
  const payload = isAuth(context);
  if (payload) {
    try {
      const res = await Axios.post(
        getConnectionUrl(DATA_SERVER, "saveproject"),
        { ...args, userId: (payload as any).id }
      );
      if (res.data.error) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      return new ApolloError("Internal server error");
    }
  } else {
    return new AuthenticationError("Not authenticted");
  }
};
