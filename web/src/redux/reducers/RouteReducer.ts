import { HOME_PAGE } from "../../routes";
import { SET_ROUTE } from "./../actions/RouteActions";

export interface RouteState {
  currentRoute: string;
}

const initialState: RouteState = {
  currentRoute: HOME_PAGE
};

export const routeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ROUTE:
      return {
        ...state,
        currentRoute: action.payload
      };

    default:
      return state;
  }
};
