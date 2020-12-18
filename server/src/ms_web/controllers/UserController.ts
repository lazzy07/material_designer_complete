import { Request, Response } from "express";
import { Context } from "../../common/interfaces/Context";
import { isAuth } from "./../../common/functions/SessionManagement";
import { AuthenticationError, ApolloError } from "apollo-server-express";
import Axios from "axios";
import { getConnectionUrl } from "./../../common/functions/Connection";
import { USER_SERVER, POST_SERVER, DATA_SERVER } from "../../common/constants";
import Log from "../../common/classes/Log";

export const logoutUser = (req: Request, res: Response) => {
  res
    .clearCookie("jid")
    .status(200)
    .send();
};

export const getKeysResolver = async (args: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    try {
      if (payload.type === 1) {
        const res = await Axios.post(
          getConnectionUrl(USER_SERVER, "getsecurekeys"),
          { userId: payload.id }
        );
        if (res.data.error) {
          return [];
        } else {
          return res.data.secureKeys;
        }
      } else {
        return new AuthenticationError("Not a company");
      }
    } catch (err) {
      Log.addError(err);
      new ApolloError("Internal server error");
    }
  } else {
    return new AuthenticationError("Not authenticated");
  }
};

export const addSecureKeyResolver = async (args: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    if (payload.type === 1) {
      const res = await Axios.post(
        getConnectionUrl(USER_SERVER, "setsecurekey"),
        {
          userId: payload.id,
          key: args.key
        }
      );

      return res.data.secureKeys;
    } else {
      return new AuthenticationError("Not a company");
    }
  } else {
    return new AuthenticationError("Not authenticated");
  }
};

export const removeSecureKeyResolver = async (args: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    const id = payload.id;
    if (payload.type === 1) {
      const res = await Axios.post(
        getConnectionUrl(USER_SERVER, "removesecurekey"),
        {
          userId: payload.id,
          key: args.key
        }
      );

      return res.data.secureKeys;
    } else {
      return new AuthenticationError("Not a company");
    }
  } else {
    return new AuthenticationError("Not authenticated");
  }
};

export const getApiKeysResolver = async (args: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    try {
      const res = await Axios.post(
        getConnectionUrl(USER_SERVER, "getapikeys"),
        { userId: payload.id }
      );
      if (res.data.error) {
        return [];
      } else {
        return res.data.apiKeys;
      }
    } catch (err) {
      Log.addError(err);
      new ApolloError("Internal server error");
    }
  } else {
    return new AuthenticationError("Not authenticated");
  }
};

export const addApiKeyResolver = async (args: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    const res = await Axios.post(getConnectionUrl(USER_SERVER, "setapikey"), {
      userId: payload.id,
      key: args.key
    });

    return res.data.apiKeys;
  } else {
    return new AuthenticationError("Not authenticated");
  }
};

export const removeApiKeyResolver = async (args: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    const res = await Axios.post(
      getConnectionUrl(USER_SERVER, "removeapikey"),
      {
        userId: payload.id,
        key: args.key
      }
    );

    return res.data.apiKeys;
  } else {
    return new AuthenticationError("Not authenticated");
  }
};

export const searchUsersResolver = async (args: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    try {
      const res = await Axios.post(
        getConnectionUrl(USER_SERVER, "searchuser"),
        { userId: payload.id, searchTerm: args.searchTerm }
      );
      if (res.data.error) {
        return new ApolloError("Server Error");
      } else {
        return res.data.payload || [];
      }
    } catch (err) {
      Log.addError(err);
      return new ApolloError("Server Error");
    }
  } else {
    return new AuthenticationError("Not authenticated");
  }
};

export const getUserById = async (id: string) => {
  try {
    const res = await Axios.post(getConnectionUrl(USER_SERVER, "isuser"), {
      id
    });
    if (res.data.data) {
      return res.data.data;
    } else {
      return new ApolloError("Server error");
    }
  } catch (err) {
    Log.addError(err);
    return new ApolloError("Server error");
  }
};

export const isFollowing = (parent: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    if (payload.id === parent.id) {
      return null;
    } else {
      return parent.followers.includes(payload.id);
    }
  } else {
    return null;
  }
};

export const isFollower = (parent: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    if (payload.id === parent.id) {
      return null;
    } else {
      return parent.following.includes(payload._id);
    }
  } else {
    return null;
  }
};

export const getUserArtworks = async (userId: string) => {
  try {
    const res = await Axios.post(
      getConnectionUrl(POST_SERVER, "getusersdata"),
      { type: "artwork", userId }
    );

    if (res.data.error) {
      return [];
    } else {
      return res.data.payload;
    }
  } catch (err) {
    Log.addError(err);
    return [];
  }
};

export const getUserMaterials = async (userId: string) => {
  try {
    const res = await Axios.post(
      getConnectionUrl(POST_SERVER, "getusersdata"),
      { type: "material", userId }
    );

    if (res.data.error) {
      return [];
    } else {
      return res.data.payload;
    }
  } catch (err) {
    Log.addError(err);
    return [];
  }
};

export const followMutation = async (args: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    const userId = payload.id;
    const followerId = args.userId;

    try {
      const res = await Axios.post(
        getConnectionUrl(USER_SERVER, "addfollower"),
        {
          userId,
          followerId
        }
      );

      if (res.data.error) {
        return new ApolloError("Server Error");
      } else {
        return res.data.payload;
      }
    } catch (err) {
      Log.addError(err);
      return new ApolloError("Server error");
    }
  } else {
    return new AuthenticationError("Not authenticated");
  }
};

export const getUserByUsername = async (args: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    try {
      const res = await Axios.post(
        getConnectionUrl(USER_SERVER, "getuserbyusername"),
        {
          userName: args.userName
        }
      );
      if (!res.data.error) {
        return res.data.payload;
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

export const getAllUserProjects = async (userId: string) => {
  try {
    const res = await Axios.post(
      getConnectionUrl(DATA_SERVER, "getprojectsbyuser"),
      {
        userId
      }
    );
    if (!res.data.error) {
      return res.data.payload;
    } else {
      return new ApolloError("Server error");
    }
  } catch (err) {
    Log.addError(err);
    return new ApolloError("Server error");
  }
};

export const getFollowers = async (followers: string) => {
  let users = [];
  for (let i of followers) {
    let user = await getUserById(i);
    users.push(user);
  }

  return users;
};
