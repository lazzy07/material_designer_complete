import { combineReducers } from "redux";
import { UserState, userReducer } from "./UserReducer";
import { RouteState, routeReducer } from "./RouteReducer";
import { LanguageState, languageReducer } from "./LanguageReducer";

export interface Store {
  user: UserState;
  route: RouteState;
  language: LanguageState;
}

export const rootReducer = combineReducers({
  user: userReducer,
  route: routeReducer,
  language: languageReducer
});
