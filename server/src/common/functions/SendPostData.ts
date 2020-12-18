import Axios from "axios";
import { getConnectionUrl } from "./Connection";
import { DATA_SERVER } from "../constants";
import Log from "../classes/Log";

export const sendPostData = (
  userId: string,
  type: "artwork" | "material" | "keybinding" | "project",
  data: any
) => {
  let url = "";
  switch (type) {
    case "artwork":
      url = "uploadartwork";
      break;
    case "material":
      url = "uploadmaterial";
      break;
  }

  Axios.post(getConnectionUrl(DATA_SERVER, url), { userId, data })
    .then(res => {
      console.log("ok");
    })
    .catch(err => {
      Log.addError(err);
    });
};
