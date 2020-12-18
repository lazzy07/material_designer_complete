import { Context } from "./../../common/interfaces/Context";
import { isAuth } from "./../../common/functions/SessionManagement";
import { AuthenticationError, ApolloError } from "apollo-server-express";
import Axios from "axios";
import { getConnectionUrl } from "./../../common/functions/Connection";
import { DATA_SERVER } from "../../common/constants";
import Log from "../../common/classes/Log";

export const searchProjectsResolver = async (args: any, context: Context) => {
  const payload: any = isAuth(context);
  if (payload) {
    try {
      const res = await Axios.post(
        getConnectionUrl(DATA_SERVER, "searchproject"),
        { userId: payload.id, searchTerm: args.searchTerm }
      );

      if (res.data.error) {
        return new ApolloError("Server Error");
      } else {
        return res.data.payload || [];
      }
    } catch (err) {
      Log.addError(err);
    }
  } else {
    return new AuthenticationError("Not authenticated");
  }
};
