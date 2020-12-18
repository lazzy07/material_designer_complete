export const SET_ROUTE = "SET_ROUTE";

export const setRoute = (route: string) => {
  return {
    type: SET_ROUTE,
    payload: route
  };
};
