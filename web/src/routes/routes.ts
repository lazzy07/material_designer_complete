import {
  HOME_PAGE,
  TOP_SCREEN,
  DOWNLOAD_SCREEN,
  NEWS_FEED,
  EDITOR_SCREEN,
  SEARCH_SCREEN
} from ".";
import { headerText } from "../text/Header";
import { getText } from "./../text/LanguageSelector";

export interface RouteElement {
  route: string;
  title: string;
  icon: string;
  login: boolean;
}

export const routes: RouteElement[] = [
  {
    route: HOME_PAGE,
    title: getText(headerText.homeButton),
    icon: "home",
    login: false
  },
  {
    route: DOWNLOAD_SCREEN,
    title: getText(headerText.downloadButton),
    icon: "cloud_download",
    login: false
  },
  // {
  //   route: TOP_SCREEN,
  //   title: getText(headerText.topButton),
  //   icon: "star",
  //   login: false
  // },
  {
    route: NEWS_FEED,
    title: getText(headerText.newsButton),
    icon: "library_books",
    login: true
  },
  {
    route: SEARCH_SCREEN,
    title: getText(headerText.searchButton),
    icon: "search",
    login: true
  },
  {
    route: EDITOR_SCREEN,
    title: getText(headerText.editorButton),
    icon: "dashboard",
    login: true
  }
];
