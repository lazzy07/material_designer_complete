import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  SIGNUP_PAGE,
  LOGIN_PAGE,
  HOME_PAGE,
  DOWNLOAD_SCREEN,
  USER_SCREEN,
  TOP_SCREEN,
  NEWS_FEED,
  SEARCH_SCREEN,
  USER_SIGNUP_PAGE,
  COMPANY_SIGNUP_PAGE,
  COMPANY_SCREEN,
  MATERIAL_SCREEN,
  SETTINGS_SCREEN,
  APIKEYS_SCREEN,
  SECUREKEYS_SCREEN
} from "./routes";
import LoginScreen from "./screens/LoginScreen";
import "./css/app.css";
import SignupScreen from "./screens/SignupScreen";
import Header from "./components/header/Header";
import MainScreen from "./screens/MainScreen";
import DownloadScreen from "./screens/DownloadScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TopScreen from "./screens/TopScreen";
import NewsFeedScreen from "./screens/NewsFeedScreen";
import SearchScreen from "./screens/SearchScreen";
import UserCompanySelection from "./screens/UserCompanySelection";
import CompanySignup from "./screens/CompanySignup";
import Axios from "axios";
import { REFRESH_TOKEN_URL } from "./constants";
import { connect } from "react-redux";
import { Store } from "./redux/reducers/index";
import { loginUser } from "./redux/actions/UserActions";
import { parseSessionToken } from "./services/ParseJWT";
import { withRouter, RouteComponentProps } from "react-router-dom";
import NotFound from "./screens/NotFound";
import CompanyScreen from "./screens/CompanyScreen";
import MaterialScreen from "./screens/MaterialScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ApiKeysScreen from "./screens/ApiKeysScreen";
import SecureKeysScreen from "./screens/SecureKeysScreen";

interface State {
  windowHeight: number;
  loading: boolean;
}

interface Props {
  sessionId: string;
  loginUser: (userData: any) => void;
  currentUrl: string;
}

class App extends React.Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      windowHeight: window.innerHeight,
      loading: true
    };
  }

  updateWindowResize = () => {
    window.addEventListener("resize", () => {
      this.setState({
        windowHeight: window.innerHeight
      });
    });
  };

  removeListner = () => {
    window.removeEventListener("resize", () => {});
  };

  componentDidMount() {
    Axios.post(REFRESH_TOKEN_URL, {}, { withCredentials: true })
      .then(res => {
        const saveData = parseSessionToken(res.data.accessToken);
        this.props.loginUser(saveData);
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  componentWillUnmount() {}

  render() {
    if (this.state.loading) {
      return (
        <div
          className="defaultBackground"
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div>
            <div className="preloader-wrapper active">
              <div className="spinner-layer">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // routes.map(ele => {
    //   if (ele.login) {
    //     if (this.props.sessionId === "") {
    //       if (this.props.currentUrl === ele.route) {
    //         if (ele.login) {
    //           if (this.props.currentUrl !== LOGIN_PAGE)
    //             this.props.history.push(LOGIN_PAGE);
    //         }
    //       }
    //     }
    //   }
    // });

    return (
      <div
        style={{
          marginTop: 50,
          overflowX: "hidden"
        }}
      >
        <Switch>
          <Route
            exact
            path={SIGNUP_PAGE}
            component={() => <UserCompanySelection />}
          />
          <Route
            exact
            path={USER_SIGNUP_PAGE}
            component={() => <SignupScreen />}
          />
          <Route
            exact
            path={COMPANY_SIGNUP_PAGE}
            component={() => <CompanySignup />}
          />
          <Route exact path={LOGIN_PAGE} component={() => <LoginScreen />} />
          <Route exact path={HOME_PAGE} component={() => <MainScreen />} />
          <Route
            exact
            path={DOWNLOAD_SCREEN}
            component={() => <DownloadScreen />}
          />
          <Route path={USER_SCREEN} component={() => <ProfileScreen />} />
          <Route path={COMPANY_SCREEN} component={() => <CompanyScreen />} />
          <Route path={TOP_SCREEN} component={() => <TopScreen />} />
          <Route path={NEWS_FEED} component={() => <NewsFeedScreen />} />
          <Route path={SEARCH_SCREEN} component={() => <SearchScreen />} />
          <Route path={MATERIAL_SCREEN} component={() => <MaterialScreen />} />
          <Route path={SETTINGS_SCREEN} component={() => <SettingsScreen />} />
          <Route path={APIKEYS_SCREEN} component={() => <ApiKeysScreen />} />
          <Route
            path={SECUREKEYS_SCREEN}
            component={() => <SecureKeysScreen />}
          />
          <Route component={() => <NotFound />} />
        </Switch>
        <Header />
      </div>
    );
  }
}

const mapStateToProps = (store: Store) => {
  return {
    sessionId: store.user.sessionId,
    currentUrl: store.route.currentRoute
  };
};

const mapDispatchToProps = {
  loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
