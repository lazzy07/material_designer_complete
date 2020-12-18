import React, { Component } from "react";
import { Image } from "../../interfaces/Image";
import { IMAGE_URL } from "../../constants";

interface Props {
  img?: Image;
  isMyProfile?: boolean;
  onClick: () => void;
}

interface State {
  isHovering: boolean;
}

export default class ProfilePic extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isHovering: false
    };
  }

  renderImage = () => {
    if (this.props.img) {
      return <img width="100%" alt="" src={IMAGE_URL + this.props.img.url} />;
    } else {
      return <img width="100%" alt="" src={`/dependencies/img/user.svg`} />;
    }
  };
  render() {
    return (
      <div
        onMouseEnter={() => this.setState({ isHovering: true })}
        onMouseLeave={() => this.setState({ isHovering: false })}
        style={{
          maxWidth: "200px",
          width: "100%",
          borderRadius: "50%",
          backgroundColor: "#252525",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {this.state.isHovering && this.props.isMyProfile && (
          <div
            onClick={this.props.onClick}
            style={{
              backgroundColor: "rgba(0,0,0, 0.9)",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <i className="material-icons medium">add</i>
            <p>Change picture</p>
          </div>
        )}
        {this.renderImage()}
      </div>
    );
  }
}
