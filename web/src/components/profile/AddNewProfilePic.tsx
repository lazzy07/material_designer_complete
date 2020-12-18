import React, { Component } from "react";
import Button from "../common/Button";
import Dropzone from "react-dropzone";
import { getMaterialImage } from "../../services/ImageCompressor";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Axios from "axios";
import { UPLOAD_PROFILEPIC_URL } from "../../constants";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";

interface Props {
  closePopup: () => void;
  sessionId: string;
}

interface State {
  status: "addpic" | "uploading" | "success" | "error";
  error: string;
  image: Blob | null;
  preview: string;
  crop: any;
}

class AddNewProfilePic extends Component<Props, State> {
  imageRef: any = null;

  constructor(props) {
    super(props);

    this.state = {
      status: "addpic",
      error: "",
      image: null,
      preview: "",
      crop: { unit: "%", aspect: 1, width: 100 }
    };
  }

  onChangeCrop = (crop: any) => {
    this.setState({ crop });
  };

  handleDrop = (files: any) => {
    this.setState({ error: "" });
    let file = files[0];

    this.setState({ image: file });
  };

  onImageLoaded = (image: any) => {
    this.imageRef = image;
  };

  renderImageUpload = () => {
    return (
      <Dropzone
        maxSize={5 * 1024 * 1024}
        multiple={false}
        accept={["image/*"]}
        onDropAccepted={accepted => this.handleDrop(accepted)}
        onDropRejected={() =>
          this.setState({
            error: "File not supported or the file size exeeds 5mb"
          })
        }
      >
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
    );
  };

  getBlobToUpload = (): Promise<Blob | null> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");

      const ctx = canvas.getContext("2d");
      let image = new Image();
      image.onload = () => {
        const scaleX = image.naturalWidth / this.imageRef.width;
        const scaleY = image.naturalHeight / this.imageRef.height;

        canvas.width = this.state.crop.width;
        canvas.height = this.state.crop.height;
        if (ctx)
          ctx.drawImage(
            image,
            this.state.crop.x * scaleX,
            this.state.crop.y * scaleY,
            this.state.crop.width * scaleX,
            this.state.crop.height * scaleY,
            0,
            0,
            this.state.crop.width,
            this.state.crop.height
          );

        canvas.toBlob(file => {
          resolve(file);
        }, "image/jpeg");
      };

      image.src = URL.createObjectURL(this.state.image!);
    });
  };

  getToUpload = async (image: Blob) => {
    if (image) {
      try {
        let res = await getMaterialImage(image);
        return res;
      } catch (err) {
        console.log(err);
        return null;
      }
    } else {
      return null;
    }
  };

  renderImageEdit = () => {
    return (
      <div
        style={{
          minHeight: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ReactCrop
          keepSelection={true}
          crop={this.state.crop}
          ruleOfThirds
          imageStyle={{ maxHeight: 300 }}
          onChange={(crop, percent) => this.onChangeCrop(crop)}
          onImageLoaded={this.onImageLoaded}
          src={URL.createObjectURL(this.state.image)}
        />
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

  renderType = () => {
    if (this.state.status === "addpic") {
      return this.state.image
        ? this.renderImageEdit()
        : this.renderImageUpload();
    } else {
      return this.renderSuccess();
    }
  };

  onClickUpload = async () => {
    if (this.state.status === "addpic" || this.state.status === "error") {
      const toUpload = await this.getBlobToUpload();
      this.setState({ status: "uploading" });
      const formData = new FormData();
      if (toUpload) {
        const preview = await this.getToUpload(toUpload);
        if (preview) {
          formData.append("profile_pic", preview.image);
          formData.append("preview", preview.preview);
          Axios.post(UPLOAD_PROFILEPIC_URL, formData, {
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
                this.setState({
                  error: res.data.data.message,
                  status: "error"
                });
              } else {
                this.setState({ status: "success" });
              }
            })
            .catch(err => {
              this.setState({ error: err.message, status: "error" });
            });
        } else {
          this.setState({ error: "File conversion failed", status: "error" });
        }
      } else {
        this.setState({ error: "File conversion failed", status: "error" });
      }
    } else if (this.state.status === "success") {
      this.props.closePopup();
    }
  };

  render() {
    return (
      <div
        style={{ position: "relative", overflowY: "auto", overflowX: "hidden" }}
      >
        <div className="row" style={{ textAlign: "center" }}>
          <h5>Change Profile Picture</h5>
        </div>
        <i
          style={{ position: "absolute", right: 5, top: 0, cursor: "pointer" }}
          className="material-icons"
          onClick={this.props.closePopup}
        >
          close
        </i>
        {this.renderType()}
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
          <Button
            disabled={this.state.status === "uploading"}
            title={
              this.state.status === "addpic"
                ? "Next"
                : this.state.status === "error"
                ? "Retry"
                : this.state.status === "success"
                ? "Close"
                : "Please wait..."
            }
            onClick={this.onClickUpload}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: Store) => {
  return {
    sessionId: store.user.sessionId
  };
};

export default connect(mapStateToProps)(AddNewProfilePic);
