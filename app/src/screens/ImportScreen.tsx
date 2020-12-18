import React, { Component } from "react";
import Controller from "../components/controller/titlebar/Controller";
import {
  SECONDARY_COLOR,
  DEFAULT_COLOR,
  TEXTURE_DIRECTORY,
  ENVMAP_DIRECTORY
} from "../constants";
import { connect } from "react-redux";
import { Store } from "../redux/reducers";
import "../css/importscreen.css";
import ImportFileList from "../components/import/ImportFileList";
import { removeAllToUpload } from "../redux/actions/SystemActions";
import Button from "../components/elements/form/Button";
import { Button as Btn } from "react-materialize";
import { withRouter } from "react-router";
import { MatTex } from "../redux/types";
import { addTextureData } from "../redux/actions/ProjectActions";

import { DragSource } from "react-dnd";
import { DRAG_ENV_MAP } from "../constants/dragtypes";

interface ImportScreenProps {
  toBeUploaded: string[];
  texturePath: string;
  removeAllToUpload: any;
  location: any;
  envMapPath: string;
  textureList: MatTex[];
  addTextureData: any;
}

class ImportScreen extends Component<ImportScreenProps, any> {
  importFileList: ImportFileList | null = null;

  onClose = () => {
    this.props.removeAllToUpload();
  };

  onClickCancel = () => {
    this.props.removeAllToUpload();
    let remote = window.require("electron").remote;
    let w = remote.BrowserWindow.getFocusedWindow();
    w.close();
  };

  onClickSaveToSystemTex = () => {
    if (this.importFileList) {
      const toBeUploaded = this.importFileList.getActiveFileList();
      for (let i = 0; i < toBeUploaded.length; i++) {
        this.importFileList
          .getTextureToSave(toBeUploaded[i])
          .then(texture => {
            if (this.importFileList) {
              this.importFileList
                .saveTextureToSystem(texture)
                .then(isSuccessful => {
                  console.log(isSuccessful);
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
          .catch(err => {
            // let { dialog } = window.require("electron").remote;
            // dialog.showErrorBox("Material project save error", err.message);
            console.log(err);
          });
      }
    }
  };

  selectAll = () => {
    if (this.importFileList) {
      this.importFileList.selectAll();
    }
  };

  deselectAll = () => {
    if (this.importFileList) {
      this.importFileList.deselectAll();
    }
  };

  onClickSaveToSystemMat = () => {
    if (this.importFileList) {
      const toBeUploaded = this.importFileList.getActiveFileList();
      for (let i = 0; i < toBeUploaded.length; i++) {
        this.importFileList
          .getTextureToSave(toBeUploaded[i])
          .then(texture => {
            if (this.importFileList) {
              this.importFileList
                .saveTextureToEnvMaps(texture)
                .then(isSuccessful => {
                  console.log(isSuccessful);
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
          .catch(err => {
            // let { dialog } = window.require("electron").remote;
            // dialog.showErrorBox("Material project save error", err.message);
            console.log(err);
          });
      }
    }
  };

  onClickSaveToProjectTex = () => {
    if (this.importFileList) {
      const toBeUploaded = this.importFileList.getActiveFileList();
      for (let i = 0; i < toBeUploaded.length; i++) {
        this.importFileList.saveTextureToProject(toBeUploaded[i]);
      }
    }
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          height: window.innerHeight,
          width: window.innerWidth,
          overflow: "hiddden",
          borderLeft: `3px solid ${SECONDARY_COLOR}`,
          borderRight: `3px solid ${SECONDARY_COLOR}`,
          borderBottom: `3px solid ${SECONDARY_COLOR}`
        }}
      >
        <div>
          <Controller
            background
            icon
            canClose
            draggable
            fileName
            onClose={this.onClose}
            fileMenuPos={"40%"}
            title={`Import Files`}
          />
        </div>
        <div
          style={{
            paddingTop: 10,
            height: 50,
            backgroundColor: DEFAULT_COLOR,
            position: "fixed",
            top: 35,
            width: window.innerWidth - 6,
            left: 3,
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div style={{ paddingLeft: 5, paddingTop: 5 }}>Files to Import</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ paddingRight: 10 }}>
              <Btn className="grey darken-3" onClick={this.selectAll}>
                Select All
              </Btn>
            </div>
            <Btn className="grey darken-3" onClick={this.deselectAll}>
              Deselect All
            </Btn>
          </div>
        </div>
        <div
          style={{ paddingTop: "85px", paddingLeft: "5px", overflow: "hidden" }}
        >
          <div style={{ overflow: "hidden" }}>
            <ImportFileList
              ref={ref => (this.importFileList = ref)}
              texturePath={this.props.texturePath}
              envMapPath={this.props.envMapPath}
              fileList={this.props.toBeUploaded}
              type={this.props.location.pathname.split("/")[2]}
              textureList={this.props.textureList}
              addTextureData={this.props.addTextureData}
            />
          </div>
          <div
            style={{
              margin: 3,
              overflow: "hidden",
              height: 80,
              width: window.innerWidth - 5,
              backgroundColor: DEFAULT_COLOR,
              position: "fixed",
              bottom: 0,
              left: 0
            }}
          >
            <div style={{ padding: 5 }}>Save to :</div>
            <div
              style={{
                overflow: "hiddden",
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: 20,
                paddingRight: 20
              }}
            >
              <Button
                title="System"
                onClick={
                  this.props.location.pathname.split("/")[2] === "texture"
                    ? this.onClickSaveToSystemTex
                    : this.onClickSaveToSystemMat
                }
              />
              {this.props.location.pathname.split("/")[2] === "envmap" ? (
                undefined
              ) : (
                <Button
                  title="Project"
                  onClick={this.onClickSaveToProjectTex}
                />
              )}
              {this.props.location.pathname.split("/")[2] === "texture" ? (
                <Button title="My Web" />
              ) : (
                undefined
              )}
              <Btn className="grey darken-3" onClick={this.onClickCancel}>
                Close
              </Btn>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  const path = window.require("path");
  return {
    toBeUploaded: state.system.toBeUploaded,
    texturePath: state.file.resourcesPath + "/" + TEXTURE_DIRECTORY,
    envMapPath: state.file.resourcesPath + "/" + ENVMAP_DIRECTORY,
    textureList: state.project.textureList
  };
};

const mapDispatchToProps = {
  removeAllToUpload,
  addTextureData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ImportScreen as any));
