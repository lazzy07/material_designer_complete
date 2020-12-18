import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import {
  LOGIN_PAGE,
  SIGNUP_PAGE,
  EDITOR_PAGE,
  WELCOME_PAGE,
  IMPORT_PAGE,
  IMPORT_TEXTURES,
  IMPORT_ENVMAPS,
  NEWWEBPROJECT_PAGE,
  MATERIAL_EXPORTER,
  APPLICATION_SETTINGS,
  PROJECT_SETTINGS
} from "./routes";
import { withRouter } from "react-router-dom";

import SignupScreen from "./screens/SignupScreen";
import EditorScreen from "./screens/EditorScreen";
import NotificationViewer from "./components/toast/NotificationViewer";
import "react-reflex/styles.css";
import "./css/app.css";
import WelcomeScreen from "./screens/WelcomeScreen";
import ImportScreen from "./screens/ImportScreen";
import KeyboardListen from "./services/key_listners/KeyListners";
import NewWebProject from "./screens/NewWebProject";
import MaterialExporter from "./screens/MaterialExporter";
import ApplicationSettings from "./screens/ApplicationSettings";
import ProjectSettings from "./screens/ProjectSettings";

const { ipcRenderer } = window.require("electron");

class App extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      notificaton: true
    };
  }

  componentWillMount() {
    ipcRenderer.send("INITIALIZE");
    ipcRenderer.on("INIT_FILE", (emitter: any, data: any) => {});

    if ((window as any).type === "newwebproject") {
      this.props.history.push(NEWWEBPROJECT_PAGE);
    }

    if ((window as any).type === "materialexporter") {
      this.props.history.push(MATERIAL_EXPORTER);
    }

    if ((window as any).type === "applicationsettings") {
      this.props.history.push(APPLICATION_SETTINGS);
    }

    if ((window as any).type === "projectoptions") {
      this.props.history.push(PROJECT_SETTINGS);
    }

    if ((window as any).type.includes("import")) {
      this.setState({
        notification: false
      });
      let typ = (window as any).type.split("/")[1];
      if (typ === "texture") {
        this.props.history.push(IMPORT_TEXTURES);
      } else if (typ === "envmap") {
        this.props.history.push(IMPORT_ENVMAPS);
      }
    }
  }

  componentDidMount() {
    KeyboardListen.listen();

    (window as any)
      .require("electron")
      .remote.session.defaultSession.cookies.on("changed", function(
        event,
        cookie,
        cause,
        removed
      ) {
        console.log("Cookie change captured");
        console.log("cookie added to local storage");
        localStorage.setItem("cookie", JSON.stringify(cookie));
      });
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={LOGIN_PAGE} component={() => <LoginScreen />} />
          <Route exact path={SIGNUP_PAGE} component={() => <SignupScreen />} />
          <Route exact path={EDITOR_PAGE} component={() => <EditorScreen />} />
          <Route
            exact
            path={APPLICATION_SETTINGS}
            component={() => <ApplicationSettings />}
          />
          <Route
            exact
            path={PROJECT_SETTINGS}
            component={() => <ProjectSettings />}
          />
          <Route
            exact
            path={WELCOME_PAGE}
            component={() => <WelcomeScreen />}
          />
          <Route path={IMPORT_PAGE} component={() => <ImportScreen />} />
          <Route
            path={NEWWEBPROJECT_PAGE}
            component={() => <NewWebProject />}
          />
          <Route
            path={MATERIAL_EXPORTER}
            component={() => <MaterialExporter />}
          />
        </Switch>
        <NotificationViewer toasts={[]} />
      </div>
    );
  }
}

export default withRouter(App);
