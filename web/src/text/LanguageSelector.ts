import { store } from "../redux/store";

export const getText = (text: object): string => {
  let language = store.getState().language.language;
  return text[language];
};
