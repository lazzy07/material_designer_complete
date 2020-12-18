import React, { Component } from "react";
import {
  readFile,
  getFileType,
  isFileSupported
} from "../../services/read_file/ReadFile";
import { MatTex } from "../../redux/types";
import uuid4 from "uuid/v4";
import ImportFileElement from "./ImportFileElement";

interface ImportFileListState {
  activeFileList: string[];
  renderFileList: any[];
  toSaveTexList: { selected: boolean; toSave: MatTex[] }[];
}

interface ImportFileListProps {
  fileList: string[];
  type: string;
  texturePath: string;
  envMapPath: string;
  textureList: MatTex[];
  addTextureData: any;
}

class ImportFileList extends Component<
  ImportFileListProps,
  ImportFileListState
> {
  constructor(props: ImportFileListProps) {
    super(props);

    this.state = {
      activeFileList: [],
      renderFileList: [],
      toSaveTexList: []
    };
  }

  getActiveFileList = (): string[] => {
    return [...this.state.activeFileList];
  };

  selectItem = (uuid: string) => {
    let arr: string[] = [];
    let update = true;
    for (let i = 0; i < this.state.activeFileList.length; i++) {
      if (uuid === this.state.activeFileList[i]) {
        update = false;
      } else {
        arr.push(this.state.activeFileList[i]);
      }
    }

    if (update) {
      this.setState({
        activeFileList: [...this.state.activeFileList, uuid]
      });
    } else {
      this.setState({
        activeFileList: [...arr]
      });
    }
  };

  selectAll = () => {
    let fileList: string[] = [];
    for (let i = 0; i < this.state.renderFileList.length; i++) {
      fileList.push(this.state.renderFileList[i].uuid);
    }
    this.setState({
      activeFileList: [...fileList]
    });
  };

  deselectAll = () => {
    this.setState({
      activeFileList: []
    });
  };

  isActive = (uuid: string) => {
    for (let i = 0; i < this.state.activeFileList.length; i++) {
      if (uuid === this.state.activeFileList[i]) {
        return true;
      }
    }
    return false;
  };

  getFileFromRenderList = (uuid: string) => {
    let { renderFileList } = this.state;
    for (let i = 0; i < renderFileList.length; i++) {
      if (renderFileList[i].uuid === uuid) {
        return renderFileList[i];
      }
    }

    return null;
  };

  getTextureToSave = (uuid: string): Promise<MatTex> => {
    return new Promise((resolve, reject) => {
      let file = this.getFileFromRenderList(uuid);
      if (file) {
        // let blob = dataURItoBlob(file.buff.toString("base64"), file.fType.mime);
        // const readFile = blobToFile(blob, file.fName);
        if (readFile) {
          // renderPreviewImage(readFile).then(blob => {
          //   blobToBase64(blob)
          //     .then(preview => {
          //       if (preview) {
          resolve({
            uuid: file.uuid,
            mime: file.fType.mime,
            name: file.fName,
            data: file.buff.toString("base64")
          });
          //         } else {
          //           reject(new Error("Render preview file failed"));
          //         }
          //       })
          //       .catch(err => {
          //         reject(err);
          //       });
          //   });
          // } else {
          //   reject(new Error("Cannot convert data url to file"));
        }
      } else {
        reject(new Error("File not found in render array"));
      }
    });
  };

  saveTextureToProject = (uuid: string) => {
    let texList = this.props.textureList;
    let canSave = true;

    this.getTextureToSave(uuid)
      .then(tex => {
        if (tex) {
          if (texList) {
            for (let i = 0; i < texList.length; i++) {
              if (texList[i].uuid === tex.uuid) {
                canSave = false;
              }
            }
          }
          if (canSave) {
            this.props.addTextureData(tex);
          } else {
            //TODO: Handle duplicates in project
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  saveTextureToWeb = () => {};

  saveTextureToSystem = (texture: MatTex): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const fs = window.require("fs");
      const path = window.require("path");
      const { dialog } = window.require("electron").remote;
      const texturePath = this.props.texturePath;
      let promisePool: Promise<boolean>[] = [];

      if (!fs.existsSync(texturePath)) {
        console.log("Folder not found, creating");
        fs.mkdirSync(texturePath);
      }
      fs.readdir(texturePath, (err, files) => {
        if (err) {
          dialog.showErrorBox("Material Texture Save", err);
          reject(false);
        } else {
          files.forEach(file => {
            let isFileAlreadySavedProm: Promise<boolean> = new Promise(
              (res, rej) => {
                fs.readFile(path.join(texturePath, file), (err, data) => {
                  if (err) {
                    dialog.showErrorBox("Material Texture Save", err);
                    rej(false);
                  } else {
                    let file: MatTex = JSON.parse(data);
                    if (file.uuid !== texture.uuid) {
                      res(true);
                    } else {
                      //TODO: Handle this later
                      rej(false);
                      console.log("Texture already exists");
                    }
                  }
                });
              }
            );
            promisePool.push(isFileAlreadySavedProm);
          });
        }

        Promise.all(promisePool)
          .then(res => {
            const filePath = path.join(texturePath, texture.name + ".mattex");
            let fileContent = JSON.stringify(texture);
            fs.writeFile(filePath, fileContent, err => {
              if (err) {
                dialog.showErrorBox("Material Texture Save", err);
                reject(false);
              } else {
                resolve(true);
                console.log("Texture save succesful");
              }
            });
          })
          .catch(err => {
            //TODO:: Do file stuff here
          });
      });
    });
  };

  renderFileListTexture = (fileList: string[]) => {
    for (let i = 0; i < fileList.length; i++) {
      readFile(fileList[i])
        .then(buff => {
          let fType = getFileType(buff);
          if (fType) {
            if (isFileSupported("image", fType.mime)) {
              const path = window.require("path");
              let bName = path.basename(fileList[i]);
              let fName = bName.split(".")[0];
              let uuid = uuid4();

              let ele = {
                fName,
                uuid,
                fType,
                buff
              };

              this.setState({
                renderFileList: [...this.state.renderFileList, ele]
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  saveTextureToEnvMaps = (envMap: MatTex) => {
    return new Promise((resolve, reject) => {
      const fs = window.require("fs");
      const path = window.require("path");
      const { dialog } = window.require("electron").remote;
      const texturePath = this.props.envMapPath;
      let promisePool: Promise<boolean>[] = [];

      if (!fs.existsSync(texturePath)) {
        console.log("Folder not found, creating");
        fs.mkdirSync(texturePath);
      }
      fs.readdir(texturePath, (err, files) => {
        if (err) {
          dialog.showErrorBox("Env Map Texture Save", err);
          reject(false);
        } else {
          files.forEach(file => {
            let isFileAlreadySavedProm: Promise<boolean> = new Promise(
              (res, rej) => {
                fs.readFile(path.join(texturePath, file), (err, data) => {
                  if (err) {
                    dialog.showErrorBox("Env Map Texture Save", err);
                    rej(false);
                  } else {
                    let file: MatTex = JSON.parse(data);
                    if (file.uuid !== envMap.uuid) {
                      res(true);
                    } else {
                      //TODO: Handle this later
                      rej(false);
                      console.log("Env Map already exists");
                    }
                  }
                });
              }
            );
            promisePool.push(isFileAlreadySavedProm);
          });
        }

        Promise.all(promisePool)
          .then(res => {
            const filePath = path.join(texturePath, envMap.name + ".matenv");
            let fileContent = JSON.stringify(envMap);
            fs.writeFile(filePath, fileContent, err => {
              if (err) {
                dialog.showErrorBox("Env Map Texture Save", err);
                reject(false);
              } else {
                resolve(true);
                console.log("Env Map save succesful");
              }
            });
          })
          .catch(err => {
            //TODO:: Do file stuff here
          });
      });
    });
  };

  renderFileListEnvMaps = (fileList: string[]) => {
    for (let i = 0; i < fileList.length; i++) {
      readFile(fileList[i])
        .then(buff => {
          const path = window.require("path");
          let bName = path.basename(fileList[i]);
          let fName = bName.split(".")[0];

          let fType = { mime: "envmap/" + bName.split(".")[1] };
          if (isFileSupported("envmap", fType.mime)) {
            let uuid = uuid4();

            let ele = {
              fName,
              uuid,
              fType,
              mime: fType.mime,
              buff
            };

            this.setState({
              renderFileList: [...this.state.renderFileList, ele]
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  setName = (uuid: string, value: string) => {
    let arr: any[] = [];
    for (let i = 0; i < this.state.renderFileList.length; i++) {
      if (uuid === this.state.renderFileList[i].uuid) {
        let newVal = { ...this.state.renderFileList[i] };
        newVal.fName = value;
        arr.push(newVal);
      } else {
        arr.push(this.state.renderFileList[i]);
      }
    }

    this.setState({
      renderFileList: arr
    });
  };

  renderTexElems = () => {
    return this.state.renderFileList.map(ele => {
      return (
        <ImportFileElement
          setName={(uuid, value) => this.setName(uuid, value)}
          key={ele.uuid}
          selectItem={uuid => this.selectItem(uuid)}
          isActive={uuid => this.isActive(uuid)}
          fName={ele.fName}
          uuid={ele.uuid}
          mime={this.props.type === "texture" ? ele.fType.mime : ele.fType}
          buff={this.props.type === "texture" ? ele.buff : undefined}
        />
      );
    });
  };

  componentDidMount() {
    if (this.props.type === "texture") {
      this.renderFileListTexture(this.props.fileList);
    } else if (this.props.type === "envmap") {
      this.renderFileListEnvMaps(this.props.fileList);
    }
  }

  render() {
    return (
      <div
        style={{
          overflowY: "auto",
          height: window.innerHeight - 151,
          paddingBottom: 80
        }}
      >
        {this.renderTexElems()}
      </div>
    );
  }
}

export default ImportFileList;
