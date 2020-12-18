import { Context } from "./../../common/interfaces/Context";
import { ApolloError, AuthenticationError } from "apollo-server-express";
import Axios from "axios";
import { getConnectionUrl } from "./../../common/functions/Connection";
import { POST_SERVER, DATA_SERVER } from "../../common/constants";
import { isAuth } from "./../../common/functions/SessionManagement";
import Log from "../../common/classes/Log";

export const searchMaterialsResolver = async (args: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    try {
      const res = await Axios.post(getConnectionUrl(POST_SERVER, "search"), {
        userId: payload.id,
        searchTerm: args.searchTerm,
        type: "material"
      });

      const data = res.data;

      if (data.error) {
        return new ApolloError("Server Error");
      } else {
        return data.payload || [];
      }
    } catch (err) {
      Log.addError(err);
      return new ApolloError("Server error");
    }
  } else {
    return new AuthenticationError("Not Authenticated");
  }
};

export const getProject = async (dataId: string) => {
  try {
    const res = await Axios.post(getConnectionUrl(DATA_SERVER, "getmaterial"), {
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
