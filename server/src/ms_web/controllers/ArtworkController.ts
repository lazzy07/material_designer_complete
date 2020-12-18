import { Context } from "../../common/interfaces/Context";
import { isAuth } from "./../../common/functions/SessionManagement";
import { AuthenticationError, ApolloError } from "apollo-server-express";
import Axios from "axios";
import { getConnectionUrl } from "./../../common/functions/Connection";
import { DATA_SERVER, POST_SERVER } from "../../common/constants";
import Log from "../../common/classes/Log";

export const searchArtworkResolver = async (args: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    try {
      const res = await Axios.post(getConnectionUrl(POST_SERVER, "search"), {
        userId: payload.id,
        searchTerm: args.searchTerm,
        type: "artwork"
      });
      const data = res.data.payload;
      return data || [];
    } catch (err) {
      Log.addError(err);
      return new ApolloError("Server error");
    }
  } else {
    return new AuthenticationError("Not authenticated");
  }
};

export const getArtwork = async (dataId: string) => {
  try {
    const res = await Axios.post(getConnectionUrl(DATA_SERVER, "getartwork"), {
      dataId
    });
    if (res.data.error) {
      return new ApolloError("server error");
    } else {
      return res.data.payload;
    }
  } catch (err) {
    return new ApolloError("Server Error");
  }
};

export const addLike = async (args: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    try {
      const res = await Axios.post(getConnectionUrl(POST_SERVER, "addlike"), {
        userId: payload.id,
        postId: args.postId
      });

      if (res.data.error) {
        return new ApolloError("Server Error");
      } else {
        return res.data.payload;
      }
    } catch (err) {
      Log.addError(err);
      return new ApolloError("Server Error");
    }
  } else {
    return new AuthenticationError("Not authenticated");
  }
};

export const addComment = async (args: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    try {
      const res = await Axios.post(
        getConnectionUrl(POST_SERVER, "addcomment"),
        {
          userId: payload.id,
          postId: args.postId,
          comment: args.comment
        }
      );

      if (res.data.error) {
        return new ApolloError("Server Error");
      } else {
        return res.data.payload;
      }
    } catch (err) {
      Log.addError(err);
      return new ApolloError("Server Error");
    }
  } else {
    return new AuthenticationError("Not authenticated");
  }
};

export const getAllArtworks = async (args: any, context: Context) => {
  try {
    const res = await Axios.post(
      getConnectionUrl(POST_SERVER, "getallartworks")
    );
    if (res.data.error) {
      return new ApolloError("Server Error");
    } else {
      return res.data.payload;
    }
  } catch (err) {
    Log.addError(err);
    return new ApolloError("Server Error");
  }
};
