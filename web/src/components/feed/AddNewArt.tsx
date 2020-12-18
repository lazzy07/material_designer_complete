import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Button from "../common/Button";
import TextArea from "../common/TextArea";
import { TextInput } from "react-materialize";
import { renderTags } from "../../services/RenderTags";
import { getMaterialImage } from "../../services/ImageCompressor";
import Axios from "axios";
import { UPLOAD_ARTWORK_URL } from "../../constants";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";

interface Props {
  closePopup: () => void;
  sessionId: string;
}

interface State {
  status: "addpic" | "description" | "uploading" | "success" | "error";
  image: File | null;
  description: string;
  tagsAsString: string;
  tags: string[];
  error: string;
}

class AddNewArt extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      status: "addpic",
      image: null,
      description: "",
      tagsAsString: "",
      tags: [],
      error: ""
    };
  }

  onChangeDescription = (val: string) => {
    this.setState({
      description: val
    });
  };

  onChangeTags = (val: string) => {
    this.setState({
      tagsAsString: val
    });

    this.getTags(val);
  };

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

  onSubmitImage = () => {
    if (this.state.image) {
      this.setState({ status: "description", error: "" });
    } else {
      this.setState({ error: "You must submit an image before continue" });
    }
  };

  onSubmitDescription = () => {
    if (this.state.description.length > 0) {
      if (this.state.tagsAsString.length > 0) {
        this.setState({ status: "uploading", error: "" });
        this.uploadArtwork();
      } else {
        this.setState({ error: "An artwork need atleast one tag!" });
      }
    } else {
      this.setState({ error: "Description cannot be empty" });
    }
  };

  uploadArtwork = async () => {
    this.getTags(this.state.tagsAsString);

    const formData = new FormData();
    if (this.state.image) {
      try {
        let res = await getMaterialImage(this.state.image);

        if (res) {
          if (res.image && res.preview) {
            formData.append("artwork", res.image, "blob");
            formData.append("preview", res.preview);
            formData.append("tags", JSON.stringify(this.state.tags));
            formData.append("description", this.state.description);

            Axios.post(UPLOAD_ARTWORK_URL, formData, {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
                authorization:
                  this.props.sessionId !== ""
                    ? "bearer " + this.props.sessionId
                    : ""
              }
            })
              .then(res => {
                if (res.data.error) {
                  this.setState({ error: res.data.data.message });
                } else {
                  this.setState({ status: "success" });
                }
              })
              .catch(err => {
                console.log(err);
                this.setState({ error: err.message });
              });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  handleDrop = (files: any) => {
    this.setState({ error: "" });
    let file = files[0];

    this.setState({ image: file });
  };

  renderUploadPhoto = () => {
    return (
      <div style={{ position: "relative" }}>
        <div className="row" style={{ textAlign: "center" }}>
          <h5>Add new artwork</h5>
        </div>
        <i
          style={{ position: "absolute", right: 5, top: 0, cursor: "pointer" }}
          className="material-icons"
          onClick={this.props.closePopup}
        >
          close
        </i>
        {this.state.image === null ? (
          <Dropzone onDrop={accepted => this.handleDrop(accepted)}>
            {({ getRootProps, getInputProps }) => {
              return (
                <div
                  style={{
                    minHeight: "300px",
                    border: "2px white dotted",
                    borderRadius: 20,
                    marginLeft: 40,
                    marginRight: 40,
                    marginBottom: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()}></input>
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center"
                    }}
                  >
                    <i className="material-icons large">add_circle</i>
                    <p>
                      Drag and drop files here
                      <br />
                      <span style={{ opacity: 0.4 }}>
                        (Maximum file size supported is{" "}
                        <span style={{ fontWeight: "bolder" }}>5mb</span>)
                      </span>
                    </p>
                  </div>
                </div>
              );
            }}
          </Dropzone>
        ) : (
          <div
            style={{
              maxHeight: 300,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <img
              style={{ maxHeight: 300 }}
              src={URL.createObjectURL(this.state.image)}
              alt=""
            />
          </div>
        )}

        <div
          className="row"
          style={{
            color: "#e8232d",
            textAlign: "center",
            fontWeight: "bolder"
          }}
        >
          {this.state.error}
        </div>
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 10,
            paddingBottom: 10
          }}
        >
          <Button title="Next" onClick={this.onSubmitImage} />
        </div>
      </div>
    );
  };

  renderDescription = () => {
    return (
      <div
        style={{ position: "relative", overflowY: "auto", overflowX: "hidden" }}
      >
        <div className="row" style={{ textAlign: "center" }}>
          <h5>Add new artwork</h5>
        </div>
        <i
          style={{ position: "absolute", right: 5, top: 0, cursor: "pointer" }}
          className="material-icons"
          onClick={this.props.closePopup}
        >
          close
        </i>
        <div
          style={{
            minHeight: "300px",
            marginLeft: 40,
            marginRight: 40,
            marginBottom: 20
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={URL.createObjectURL(this.state.image)}
              alt=""
              style={{ height: "100px", paddingBottom: 20 }}
            />
          </div>
          <TextArea
            title="Description"
            onChange={e => {
              this.onChangeDescription(e);
            }}
            value={this.state.description}
            id="description"
          />
          <div style={{ paddingTop: 30, width: "100%", paddingBottom: 10 }}>
            <TextInput
              name="tags"
              onChange={(e: any) => {
                this.onChangeTags(e.target.value);
              }}
              value={this.state.tagsAsString}
              className="inputter"
              placeholder="Enter tags seperated by commas eg- brick,old brick"
              s={12}
              label="Tags"
            />
          </div>
          <div
            style={{
              paddingTop: 20,
              textAlign: "center"
            }}
          >
            <div>{renderTags(this.state.tags)}</div>
          </div>
        </div>
        <div
          className="row"
          style={{
            color: "#e8232d",
            textAlign: "center",
            fontWeight: "bolder"
          }}
        >
          {this.state.error}
        </div>
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 10,
            paddingBottom: 10
          }}
        >
          <Button title="Add Artwork" onClick={this.onSubmitDescription} />
        </div>
      </div>
    );
  };

  renderSuccess = () => {
    return (
      <div>
        <div
          style={{
            position: "relative",
            overflowY: "auto",
            overflowX: "hidden"
          }}
        >
          <div className="row" style={{ textAlign: "center" }}>
            <h5>Add new artwork</h5>
          </div>
          <i
            style={{
              position: "absolute",
              right: 5,
              top: 5,
              cursor: "pointer"
            }}
            className="material-icons"
            onClick={this.props.closePopup}
          >
            close
          </i>
        </div>
        {this.state.status === "uploading" && (
          <div
            style={{
              minHeight: "300px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div className="preloader-wrapper big active">
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
            <div>
              <h3>Uploading</h3>
            </div>
          </div>
        )}
        {this.state.status === "error" && (
          <div
            style={{
              minHeight: "300px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              color: "#e8232d"
            }}
          >
            <div>
              <i style={{}} className="material-icons large">
                cancel
              </i>
            </div>
            <h3 style={{ padding: 0, margin: 0, paddingBottom: 10 }}>Error</h3>
            <p style={{ color: "white" }}>
              An error has occured, press retry to try upload again
            </p>
            <Button title="Retry" />
          </div>
        )}
        {this.state.status === "success" && (
          <div
            style={{
              minHeight: "300px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div>
              <i style={{}} className="material-icons large">
                check_circle
              </i>
            </div>
            <h3 style={{ padding: 0, margin: 0, paddingBottom: 10 }}>
              Success
            </h3>
            <p style={{ color: "white" }}>Upload successful!</p>
          </div>
        )}
      </div>
    );
  };

  render() {
    switch (this.state.status) {
      case "addpic":
        return this.renderUploadPhoto();
      case "description":
        return this.renderDescription();
      default:
        return this.renderSuccess();
    }
  }
}

const mapStateToProps = (store: Store) => {
  return {
    sessionId: store.user.sessionId
  };
};

export default connect(mapStateToProps)(AddNewArt);
