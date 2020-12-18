import React, { Component } from "react";
import { Tabs, Tab } from "react-materialize";
import Dropzone from "react-dropzone";

import ExrElement from "./elements/ExrElement";
import "../../css/libraryelements.css";
import { connect } from "react-redux";
import { Store } from "./../../redux/reducers/index";
import { TEXTURE_DIRECTORY, ENVMAP_DIRECTORY } from "../../constants";
import { textureDisp } from "../../redux/reducers/SettingsReducer";
import { setTextureDisplay } from "../../redux/actions/SettingsActions";
import {
  setToUpload,
  setEnvMapsSystem
} from "../../redux/actions/SystemActions";

import { CREATE_IMPORT_SCREEN } from "../../constants/screens";
import { readFolder } from "../../services/read_file/ReadFile";
import LibraryElement from "./elements/LibraryElement";
import { MatTex } from "../../redux/types";
import RecycleBin from "./Recyclebin";
import { Animated } from "react-animated-css";
import { removeTextureProject } from "../../redux/actions/ProjectActions";
import { Collapsible, CollapsibleItem } from "react-materialize";
import { NodeElementToInit, nodeList } from "../node_engine/NodeList";
import NodeElement from "./elements/NodeElement";

const { ipcRenderer } = window.require("electron");

const fs = window.require("fs");
const path = window.require("path");
interface LibraryProps {
  resourcesPath?: string;
  projectPath?: string;
  addTextureData?: any;
  textures?: any[];
  active: textureDisp;
  setTextureDisplay?: any;
  dimensions?: { width: number; height: number };
  setToUpload?: any;
  toBeUploaded?: any[];
  projectTexture: MatTex[];
  setEnvMapsSystem: any;
  envMapsSystem: string[];
}

interface LibraryState {
  texturesSystem: any[];
  elementDragging: string;
  isDropped: boolean;
}

class Library extends Component<LibraryProps, LibraryState> {
  controlRef: HTMLDivElement | null = null;

  constructor(props) {
    super(props);

    this.state = {
      texturesSystem: [],
      elementDragging: "",
      isDropped: false
    };
  }

  changeDisplayType = (active: textureDisp): void => {
    this.props.setTextureDisplay(active);
  };

  setElementDragging = (type: string) => {
    this.setState({
      elementDragging: type
    });
  };

  renderTextureControls = () => {
    return (
      <div
        ref={ref => (this.controlRef = ref)}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 5,
          marginBottom: 5
        }}
      >
        <div
          onClick={() => this.changeDisplayType("thumbLarge")}
          className={`${
            this.props.active === "thumbLarge" ? "" : "libControllerItem"
          } ${this.props.active === "thumbLarge" ? "libActiveControl" : ""}`}
          style={{
            padding: 3,
            marginLeft: 5,
            marginRight: 5,
            cursor: "pointer"
          }}
        >
          <i className="material-icons">view_agenda</i>
        </div>
        <div
          onClick={() => this.changeDisplayType("thumbSmall")}
          className={`${
            this.props.active === "thumbSmall" ? "" : "libControllerItem"
          } ${this.props.active === "thumbSmall" ? "libActiveControl" : ""}`}
          style={{
            padding: 3,
            marginLeft: 5,
            marginRight: 5,
            cursor: "pointer"
          }}
        >
          <i className="material-icons">view_module</i>
        </div>
        <div
          onClick={() => this.changeDisplayType("listView")}
          className={`${
            this.props.active === "listView" ? "" : "libControllerItem"
          } ${this.props.active === "listView" ? "libActiveControl" : ""}`}
          style={{
            padding: 3,
            marginLeft: 5,
            marginRight: 5,
            cursor: "pointer"
          }}
        >
          <i className="material-icons">list</i>
        </div>
      </div>
    );
  };

  renderTextureSystem = (fPath: string) => {
    if (fs.existsSync(fPath)) {
      let a: Promise<any>[] = [];
      readFolder(fPath)
        .then(files => {
          for (let i = 0; i < files.length; i++) {
            let prom = new Promise((resolve, reject): any => {
              fs.readFile(path.join(fPath, files[i]), (err, data) => {
                if (err) {
                  resolve(undefined);
                } else {
                  if (data) {
                    let elem: MatTex = JSON.parse(data);
                    if (elem) {
                      if (elem.uuid) {
                        resolve(elem);
                      } else {
                        resolve(undefined);
                      }
                    }
                  } else {
                    resolve(undefined);
                  }
                }
              });
            });
            a.push(prom);

            Promise.all(a).then(data => {
              let elems: any[] = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i]) {
                  elems.push(data[i]);
                }
              }

              this.setState({
                texturesSystem: [...elems]
              });
            });
          }
        })
        .catch(err => {
          console.log(err);
        });

      fs.watch(fPath, (eventType, fileName) => {
        let a: Promise<any>[] = [];
        readFolder(fPath)
          .then(files => {
            if (files) {
              for (let i = 0; i < files.length; i++) {
                let prom = new Promise((resolve, reject): any => {
                  fs.readFile(path.join(fPath, files[i]), (err, data) => {
                    if (err) {
                      resolve(undefined);
                    } else {
                      if (data) {
                        let elem: MatTex = JSON.parse(data);
                        if (elem) {
                          if (elem.uuid) {
                            resolve(elem);
                          } else {
                            resolve(undefined);
                          }
                        }
                      } else {
                        resolve(undefined);
                      }
                    }
                  });
                });
                a.push(prom);

                Promise.all(a).then(data => {
                  let elems: any[] = [];
                  for (let i = 0; i < data.length; i++) {
                    if (data[i]) {
                      elems.push(data[i]);
                    }
                  }

                  this.setState({
                    texturesSystem: [...elems]
                  });
                });
              }
            } else {
              this.setState({
                texturesSystem: []
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  };

  loadEnvMaps = () => {
    const envMapPath = this.props.resourcesPath + "/" + ENVMAP_DIRECTORY;
    if (fs.existsSync(envMapPath)) {
      readFolder(envMapPath)
        .then(files => {
          this.props.setEnvMapsSystem(files);
        })
        .catch(err => {
          //TODO: Add proper error handling
        });

      fs.watch(envMapPath, () => {
        readFolder(envMapPath)
          .then(files => {
            this.props.setEnvMapsSystem(files);
          })
          .catch(err => {
            //TODO: Add proper error handling
          });
      });
    }
  };

  renderEnvMapElements = () => {
    return this.props.envMapsSystem.map((ele, index) => {
      return (
        <div key={index}>
          <ExrElement
            dropped={this.state.isDropped}
            setElementDragging={value => this.setElementDragging(value)}
            element={{ element: ele }}
            path={ele}
            title={ele.split(".")[0]}
          />
        </div>
      );
    });
  };

  renderTextureProject = (projTex: MatTex[]) => {
    return projTex.map(tex => {
      return (
        <LibraryElement
          element={{ ...tex, typ: "project" }}
          dropped={this.state.isDropped}
          setElementDragging={value => this.setElementDragging(value)}
          file={tex}
          key={tex.uuid}
          type={this.props.active}
        />
      );
    });
  };

  handleEnvMapUpload = (fileArr: any[]): void => {
    if ((this.props.toBeUploaded as any).length === 0) {
      console.log("env_map_upload");
      if (fileArr) {
        let filePaths: any = [];
        fileArr.map((file: any) => {
          filePaths.push(file.path);
        });
        this.props.setToUpload(filePaths);
        let res = {
          url: "envmap"
        };
        ipcRenderer.send(CREATE_IMPORT_SCREEN, JSON.stringify(res));
      }
    }
  };

  handleTextureUpload = (fileArr: any[]): void => {
    if ((this.props.toBeUploaded as any).length === 0) {
      console.log("texture_upload");
      if (fileArr) {
        let filePaths: any = [];

        fileArr.map((file: any) => {
          filePaths.push(file.path);
        });

        this.props.setToUpload(filePaths);
        let res = {
          url: "texture"
        };
        ipcRenderer.send(CREATE_IMPORT_SCREEN, JSON.stringify(res));
      }
    }
  };

  handleNodeUpload = (fileArr: any[]): void => {
    if ((this.props.toBeUploaded as any).length === 0) {
      console.log("node_upload");
    }
  };

  whenDropped = (isDropped: boolean) => {
    this.setState({
      isDropped
    });
  };

  renderRecycleBin = () => {
    //is dragging?
    return (
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Animated
          animationIn="slideInUp"
          animationOut="zoomOut"
          isVisible={this.state.elementDragging === "" ? false : true}
        >
          <RecycleBin
            projectTextures={this.props.projectTexture}
            removeTextureProject={(this.props as any).removeTextureProject}
            state={""}
            envmapPath={this.props.resourcesPath + "/" + ENVMAP_DIRECTORY}
            textureSystemPath={
              this.props.resourcesPath + "/" + TEXTURE_DIRECTORY
            }
            setElementDragging={value => this.setElementDragging(value)}
            whenDropped={(isDropped: boolean) => this.whenDropped(isDropped)}
          />
        </Animated>
      </div>
    );
  };

  mapNodesToLib = (nodeList: NodeElementToInit[]) => {
    return nodeList.map((node, index) => {
      return <NodeElement key={index} nodeList={node} />;
    });
  };

  componentDidMount() {
    this.renderTextureSystem(
      this.props.resourcesPath + "/" + TEXTURE_DIRECTORY
    );

    this.loadEnvMaps();
  }

  render() {
    return (
      <div>
        <Tabs className="libraryShelf">
          <Tab title="Nodes">
            <Dropzone
              onDrop={acceptedFiles => this.handleNodeUpload(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  className="dropper"
                  style={{
                    height:
                      this.props.dimensions && this.props.dimensions.height,
                    overflowX: "hidden"
                  }}
                  {...getRootProps({
                    onClick: event => event.stopPropagation()
                  })}
                >
                  <input {...getInputProps()} />
                  <div className="row" style={{ overflowX: "hidden" }}>
                    <div
                      style={{
                        overflowY: "auto",
                        paddingBottom: 150,
                        overflowX: "hidden"
                      }}
                    >
                      {this.mapNodesToLib(nodeList)}
                    </div>
                  </div>
                </div>
              )}
            </Dropzone>
          </Tab>
          <Tab title="Textures">
            <Dropzone
              onDrop={acceptedFiles => this.handleTextureUpload(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  className="dropper"
                  style={{
                    height:
                      this.props.dimensions && this.props.dimensions.height,
                    paddingLeft: 5
                  }}
                  {...getRootProps({
                    onClick: event => event.stopPropagation()
                  })}
                >
                  <input {...getInputProps()} />
                  <div>
                    <div className="row" style={{ overflowX: "hidden" }}>
                      {this.renderTextureControls()}
                      <div
                        style={{
                          overflowY: "auto",
                          paddingBottom: 150,
                          overflowX: "hidden",
                          height:
                            this.controlRef && this.props.dimensions
                              ? this.props.dimensions.height -
                                this.controlRef.getBoundingClientRect().bottom +
                                10
                              : undefined
                        }}
                      >
                        {/* Add texture library */}
                        {this.state.texturesSystem.length > 0 && (
                          <div>System Textures</div>
                        )}

                        <div className="row">
                          {this.state.texturesSystem.map(ele => (
                            <LibraryElement
                              element={{ ...ele, typ: "system" }}
                              dropped={this.state.isDropped}
                              setElementDragging={value =>
                                this.setElementDragging(value)
                              }
                              key={ele.uuid}
                              file={ele}
                              type={this.props.active}
                            />
                          ))}
                        </div>
                        {/* {this.props.projectTexture.length > 0 && <hr></hr>} */}
                        {this.props.projectTexture.length > 0 && (
                          <div>
                            <div>Project Textures</div>
                          </div>
                        )}
                        {this.props.projectTexture &&
                          this.renderTextureProject(this.props.projectTexture)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Dropzone>
          </Tab>
          <Tab title="Environment">
            <Dropzone
              onDrop={acceptedFiles => this.handleEnvMapUpload(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  className="dropper"
                  style={{
                    height:
                      this.props.dimensions && this.props.dimensions.height
                  }}
                  {...getRootProps({
                    onClick: event => event.stopPropagation()
                  })}
                >
                  <input {...getInputProps()} />
                  {this.renderEnvMapElements()}
                </div>
              )}
            </Dropzone>
          </Tab>
        </Tabs>
        {this.renderRecycleBin()}
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    resourcesPath: state.file.resourcesPath,
    projectPath: state.file.filePath,
    textures: state.project.textureList,
    active: state.settings.textureDisplay,
    toBeUploaded: state.system.toBeUploaded,
    projectTexture: state.project.textureList,
    envMapsSystem: state.system.envMapsSystem
  };
};

const mapDispatchToProps = {
  setTextureDisplay,
  setToUpload,
  setEnvMapsSystem,
  removeTextureProject
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
