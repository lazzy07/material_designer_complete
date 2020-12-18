import { Action } from "redux";

export interface LanguageState {
  language: "en";
}

const initialState: LanguageState = {
  language: "en"
};

export const languageReducer = (
  state = initialState,
  action: Action<any>
): LanguageState => {
  switch (action.type) {
    default:
      return state;
  }
};
