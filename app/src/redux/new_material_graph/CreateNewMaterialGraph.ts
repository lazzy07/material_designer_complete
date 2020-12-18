import uuid from "uuid/v4";

export const createNewMaterialGraph = (user: string = "") => {
  return {
    user,
    uuid: uuid(),
    title: "new graph",
    type: "default",
    share: false,
    web: false,
    data: {}
  };
};
