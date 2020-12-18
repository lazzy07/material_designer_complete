import React, { Component, ReactElement } from "react";
import "../css/welcome.css";
import { connect } from "react-redux";
import { Animated } from "react-animated-css";
import { ACTIVE_COLOR } from "../constants";
import Button from "../components/elements/form/Button";
import { Tabs, Tab } from "react-materialize";
import { Icon } from "react-materialize";
import "../css/libraryelements.css";
import {
  newLocalProject,
  openProjectFile,
  openCloudFile
} from "../redux/actions/FileActions";
import { openProjetFile } from "../services/material_project_file/FileOpener";
import { addProjectData } from "../redux/actions/ProjectActions";
import { createNewProject } from "../services/material_project_file/FileCreator";
import { withRouter } from "react-router";
import { EDITOR_PAGE } from "../routes";
import { LocalFile } from "../redux/types";
import { Store } from "../redux/reducers";
import { Query } from "react-apollo";
import { getAllProjects } from "../gql/GetAllProjectsQuery";

let { dialog } = window.require("electron").remote;
const { ipcRenderer } = window.require("electron");

let loadAuto = true;

class WelcomeScreen extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      active: "local"
    };
  }

  createNewProject = () => {
    dialog.showSaveDialog(
      {
        title: "Create a new Material project",
        buttonLabel: "Create",
        filters: [{ name: "Material Project", extensions: ["mproj"] }]
      },
      (fileName: string) => {
        createNewProject(fileName)
          .then(projectData => {
            if (projectData) {
              this.props.newLocalProject(fileName);
              this.props.addProjectData(projectData);
              this.props.history.push(EDITOR_PAGE);
            }
          })
          .catch(err => {
            dialog.showErrorBox("Material project save error", err.message);
          });
      }
    );
  };

  openProject = (path: string) => {
    openProjetFile(path)
      .then(data => {
        if (data) {
          this.props.addProjectData(data);
          this.props.history.push(EDITOR_PAGE);
        }
      })
      .catch(err => {
        dialog.showErrorBox("Opening of Material project Error", err.message);
      });
  };

  openFileDialog = () => {
    dialog.showOpenDialog(
      {
        title: "Open Material Project",
        filters: [
          { name: "Material project", extensions: ["mproj"] },
          { name: "material Graph", extensions: ["mgraph"] },
          { name: "All Files", extensions: ["*"] }
        ]
      },
      filePath => {
        if (filePath) {
          this.props.openProjectFile(filePath[0]);
          this.openProject(filePath[0]);
        }
      }
    );
  };

  localFileRender = (
    localFiles: LocalFile[]
  ): ReactElement[] | ReactElement => {
    if (localFiles.length === 0) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            paddingTop: 30
          }}
        >
          <div>
            <Icon large>folder_open</Icon>
          </div>
          <p>No recent files found</p>
        </div>
      );
    } else {
      return localFiles.map((elem, index) => {
        return (
          <Animated
            key={index}
            animationIn="fadeInLeft"
            animationOut="fadeOutLeft"
            isVisible
            animationInDelay={100 + 80 * index}
          >
            <div
              style={{
                width: "100%",
                marginTop: 5,
                paddingLeft: 10,
                paddingRight: 10
              }}
              className="fileElement"
              onClick={() => this.openProject(elem.path)}
            >
              <div style={{ fontSize: 18, fontWeight: "bolder" }}>
                {elem.name}
              </div>
              <div style={{ textAlign: "end", width: "100%", fontSize: 12 }}>
                {elem.path}
              </div>
            </div>
          </Animated>
        );
      });
    }
  };

  openCloudProject = (project: any) => {
    this.props.addProjectData({
      ...JSON.parse(project.project),
      id: project.id
    } as any);
    this.props.openCloudFile("");
    this.props.history.push(EDITOR_PAGE);
  };

  cloudFileRender = (cloudFiles: any[]): ReactElement[] | ReactElement => {
    if (cloudFiles.length === 0) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            paddingTop: 30
          }}
        >
          <div>
            <Icon large>cloud_off</Icon>
          </div>
          <p>No recent files found</p>
        </div>
      );
    } else {
      return cloudFiles.map((elem, index) => {
        return (
          <Animated
            key={index}
            animationIn="fadeInLeft"
            animationOut="fadeOutLeft"
            isVisible
            animationInDelay={100 + 80 * index}
          >
            <div
              style={{
                width: "100%",
                marginTop: 5,
                paddingLeft: 10,
                paddingRight: 10
              }}
              className="fileElement"
              onClick={() => this.openCloudProject(elem)}
            >
              <div style={{ fontSize: 18, fontWeight: "bolder" }}>
                {elem.name}
              </div>
              <div style={{ textAlign: "end", width: "100%", fontSize: 12 }}>
                {elem.id}
              </div>
            </div>
          </Animated>
        );
      });
    }
  };

  openNewCloudFile = () => {
    ipcRenderer.send("CREATE_WEB_PROJECT");
  };

  componentDidMount = () => {};

  render() {
    if (this.props.filePath === "webfile") {
      this.props.history.push(EDITOR_PAGE);
    }

    return (
      <div>
        <div className="welcomeBackground">
          <div
            style={{
              backgroundColor: "rgba(50, 50, 50, 1)",
              height: "100vh",
              position: "absolute",
              top: 0,
              left: "25%",
              transform: "translate(-50%, 0)",
              width: "50vw",
              zIndex: -10,
              borderRadius: 10,
              overflow: "hidden"
            }}
          >
            <img
              src="./dependencies/img/mud.png"
              height="100%"
              style={{ position: "absolute", right: 0, left: 0 }}
              alt=""
            />
          </div>
          <div className="welcomeGradient" style={{ height: "100vh" }} />
          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible
            animationInDelay={300}
          >
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                display: "flex",
                alignItems: "flex-start"
              }}
            >
              <p style={{ paddingRight: 10 }}>Created by @lazzy07, 2019</p>
              <img
                src="./dependencies/img/icon_200x200.png"
                height={50}
                alt=""
              />
            </div>
          </Animated>
          <div className="welcomeContent">
            <div style={{ position: "absolute", top: 10, left: 30 }}>
              <Animated
                animationIn="fadeInLeft"
                animationOut="fadeOutRight"
                isVisible
                animationInDelay={500}
              >
                <p>
                  <span style={{ fontSize: 16 }}>Artwork by {"  "}</span>
                  <b style={{ fontWeight: "bolder", fontSize: 22 }}>
                    Lasantha M{" "}
                    <span style={{ fontSize: 15 }}> ( @lazzy07 )</span>
                  </b>
                </p>
              </Animated>
            </div>
            <div style={{ position: "absolute", bottom: 30, left: 20 }}>
              <Animated
                animationIn="fadeInUp"
                animationOut="fadeOutUp"
                isVisible
                animationInDelay={100}
              >
                <h2 style={{ marginBottom: 0, fontWeight: "bolder" }}>
                  Material{" "}
                  <span
                    style={{
                      backgroundColor: ACTIVE_COLOR,
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingBottom: 5,
                      borderRadius: 5
                    }}
                  >
                    Designer
                  </span>
                </h2>
              </Animated>
              <Animated
                animationIn="fadeInDown"
                animationOut="fadeOutDown"
                isVisible
                animationInDelay={200}
              >
                <h5>v {this.props.version}</h5>
              </Animated>
            </div>
            <Animated
              animationIn="fadeIn"
              animationOut="fadeOut"
              isVisible
              animationInDelay={700}
            >
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  width: "50vw",
                  overflowX: "hidden",
                  padding: 20,
                  paddingTop: 100,
                  borderRadius: 10,
                  height: "100%"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <div style={{ paddingLeft: 20 }}>
                    <Button
                      title="Open File"
                      onClick={this.openFileDialog}
                      icon="folder"
                      left
                    />
                  </div>
                  <div style={{ paddingRight: 20 }}>
                    <Button
                      onClick={this.openNewCloudFile}
                      title="Open Cloud"
                      icon="cloud"
                      left
                    />
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    paddingBottom: 50,
                    paddingRight: 30,
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "50vw"
                  }}
                >
                  <Button
                    onClick={this.createNewProject}
                    title="Create Project"
                    icon="create_new_folder"
                    left
                  />
                </div>
                <div style={{ paddingTop: 10 }}>
                  <Tabs
                    onChange={() =>
                      this.setState({
                        active: this.state.active === "local" ? "web" : "local"
                      })
                    }
                    className="libraryShelf"
                  >
                    <Tab title="Local">
                      <div style={{ paddingBottom: 100, marginTop: 5 }}>
                        {this.localFileRender(this.props.recentLocal)}
                      </div>
                    </Tab>
                    <Tab title="Cloud Projects">
                      <div style={{ paddingBottom: 100, marginTop: 5 }}>
                        {this.state.active === "web" && (
                          <Query
                            fetchPolicy="network-only"
                            query={getAllProjects}
                            variables={{
                              secureKey:
                                localStorage.getItem("secureKey") || "",
                              secureUser:
                                localStorage.getItem("secureUser") || ""
                            }}
                          >
                            {({ loading, error, data }) => {
                              if (loading) return <div>Loading....</div>;
                              if (error) return <div>{error.message}</div>;
                              return (
                                <div>
                                  {this.cloudFileRender(data.getAllProjects)}
                                </div>
                              );
                            }}
                          </Query>
                        )}
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Animated>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    version: state.settings.version,
    recentLocal: state.file.recentLocal,
    recentCloud: state.file.recentCloud,
    filePath: state.file.filePath
  };
};
const mapDispatchToProps = {
  newLocalProject,
  openProjectFile,
  openCloudFile,
  addProjectData
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeScreen) as any);
