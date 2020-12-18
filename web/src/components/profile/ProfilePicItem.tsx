import React, { Component } from "react";
import { Image } from "../../interfaces/Image";

interface Props {
  profilePicture?: Image;
}

export default class ProfilePicItem extends Component<Props, any> {
  render() {
    return (
      <div>
        <img
          width="40px"
          style={{ borderWidth: "50%", marginRight: "5px" }}
          src={
            this.props.profilePicture
              ? this.props.profilePicture.preview
              : "/dependencies/img/user.svg"
          }
          alt=""
        />
      </div>
    );
  }
}
