import React, { Component } from "react";
import Controller from "../components/controller/titlebar/Controller";
import { connect } from "react-redux";
import { Store } from "../redux/reducers";
import Inputbox from "../components/elements/form/Inputbox";
import TextArea from "../components/elements/form/Textarea";
import { renderTags } from "../functions/RenderTags";
import Checkbox from "../components/elements/form/Checkbox";
import Button from "../components/elements/form/Button";
import { b64toBlob, getMaterialImage } from "../functions/ImageCompressor";
import { MatGraph } from "../redux/types";
import Axios from "axios";
import { UPLOAD_MATERIAL_URL } from "../constants";
import { getJsonBlob } from "../functions/JsonToBlob";
let remote = window.require("electron").remote;

interface Props {
  capture: string;
  textures: any;
  material: MatGraph | undefined;
  sessionId: string;
}

interface State {
  description: string;
  tagsAsString: string;
  tags: string[];
  isPublic: boolean;
  error: string;
  title: string;
  disabled: boolean;
}

class MaterialExporter extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      tagsAsString: "",
      tags: [],
      isPublic: false,
      error: "",
      disabled: false,
      title: ""
    };
  }

  getTags = (val: string) => {
    let tagsPre = val.split(",");
    let realTags: string[] = [];
    for (let tag of tagsPre) {
      let t = tag.trim();
      if (t !== "") {
        realTags.push(t);
      }
    }

    this.setState({ tags: realTags });
  };

  onChangeTags = (value: string) => {
    this.setState({ tagsAsString: value });

    this.getTags(value);
  };

  onChangeDescription = (val: string) => {
    this.setState({
      description: val
    });
  };

  onSubmit = async () => {
    this.setState({ disabled: true });
    this.getTags(this.state.tagsAsString);
    if (this.props.capture) {
      if (this.state.title.length > 0) {
        if (this.state.description.length > 0) {
          if (this.state.tagsAsString.length > 0) {
            if (this.props.material) {
              const blob = b64toBlob(this.props.capture);

              if (blob) {
                try {
                  const matImage = await getMaterialImage(blob);
                  if (matImage) {
                    const formData = new FormData();
                    formData.append("material_image", matImage.image);
                    formData.append("material_preview", matImage.preview);
                    formData.append("title", this.state.title);
                    formData.append("description", this.state.description);
                    formData.append("tags", JSON.stringify(this.state.tags));

                    formData.append(
                      "isPublic",
                      JSON.stringify(this.state.isPublic)
                    );
                    formData.append(
                      "textures",
                      getJsonBlob(this.props.textures)
                    );
                    formData.append(
                      "material",
                      JSON.stringify(this.props.material)
                    );
                    try {
                      const res = await Axios.post(
                        UPLOAD_MATERIAL_URL,
                        formData,
                        {
                          withCredentials: true,
                          headers: {
                            "Content-Type": "multipart/form-data",
                            authorization:
                              this.props.sessionId !== ""
                                ? "bearer " + this.props.sessionId
                                : ""
                          }
                        }
                      );

                      if (res.data.error) {
                        this.setState({
                          disabled: false,
                          error: res.data.message
                        });
                      } else {
                        let window = remote.BrowserWindow.getFocusedWindow();
                        window.close();
                        this.setState({ disabled: false });
                      }
                    } catch (err) {
                      console.log(err);
                      this.setState({
                        disabled: false,
                        error: "Upload failed try again"
                      });
                    }
                  } else {
                    this.setState({
                      disabled: false,
                      error: "Conversion failed"
                    });
                  }
                } catch (err) {
                  console.log(err);
                  this.setState({
                    disabled: false,
                    error: "Conversion failed"
                  });
                }
              } else {
                this.setState({ disabled: false, error: "Conversion failed" });
              }
            } else {
              this.setState({
                disabled: false,
                error: "No selected material graph, close and try again"
              });
            }
          } else {
            this.setState({
              disabled: false,
              error: "Atleast one tag required"
            });
          }
        } else {
          this.setState({
            disabled: false,
            error: "Description cannot be empty"
          });
        }
      } else {
        this.setState({
          disabled: false,
          error: "Title cannot be empty"
        });
      }
    } else {
      this.setState({ disabled: false, error: "No screen capture, try again" });
    }
  };

  onClose = () => {};

  render() {
    return (
      <div>
        <Controller
          background
          icon
          canClose
          draggable
          fileName
          onClose={this.onClose}
          fileMenuPos={"40%"}
          title={`Export Material`}
        />
        <div style={{ paddingTop: 50, paddingLeft: 10 }}>
          <h4 style={{ width: "100%", textAlign: "center" }}>
            Export Material
          </h4>
          <div className="row">
            <div className="col s5">
              <img
                draggable={false}
                style={{ width: "100%", userSelect: "none" }}
                src={this.props.capture}
                alt=""
              />
            </div>
            <div className="col s7">
              <div>
                <TextArea
                  title="Description"
                  onChange={e => {
                    this.onChangeDescription(e);
                  }}
                  value={this.state.description}
                  id="description"
                />
              </div>
              <div>
                <Inputbox
                  name={"materialtitle"}
                  label="Title"
                  value={this.state.title}
                  placeholder="Enter material title"
                  onChange={(key, val) => this.setState({ title: val })}
                  width={"350px"}
                />
              </div>
              <div style={{ paddingTop: 10 }}>
                <Inputbox
                  name={"materialtags"}
                  label="Tags"
                  value={this.state.tagsAsString}
                  placeholder="Enter tags separated by commas"
                  onChange={(key, val) => this.onChangeTags(val)}
                  width={"350px"}
                />
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                textAlign: "center"
              }}
            >
              <div>{renderTags(this.state.tags)}</div>
            </div>
          </div>
          <div
            className="row"
            style={{ justifyContent: "center", display: "flex" }}
          >
            <div>
              <Checkbox
                value="isPublic"
                onClick={() =>
                  this.setState({ isPublic: !this.state.isPublic })
                }
                checked={this.state.isPublic}
                title="Make this a public Project"
              />
            </div>
          </div>
          <div style={{ color: "#e8232d", width: "100%", textAlign: "center" }}>
            {this.state.error}
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              paddingBottom: 20
            }}
          >
            {!this.state.disabled ? (
              <Button
                disabled={this.state.disabled}
                onClick={this.onSubmit}
                title="Upload"
              />
            ) : (
              <div className="preloader-wrapper small active">
                <div className="spinner-layer spinner-green-only">
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
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: Store) => {
  return {
    capture: store.material.capture,
    textures: store.material.materialTextures,
    material: store.project.graphs.find(
      x => x.uuid === store.project.activeGraph
    ),
    sessionId: store.user.sessionId
  };
};

export default connect(mapStateToProps)(MaterialExporter);
