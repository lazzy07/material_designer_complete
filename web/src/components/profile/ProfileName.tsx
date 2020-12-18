import React, { Component } from "react";
import { User } from "../../interfaces/User";

interface Props {
  user: User;
}

export default class ProfileName extends Component<Props, any> {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h3 style={{ paddingBottom: 0, marginBottom: 0 }}>
          {this.props.user.firstName + " " + this.props.user.lastName}
        </h3>
        <h6 style={{ paddingTop: 0, marginTop: 0 }}>
          {this.props.user.userName}
        </h6>
      </div>
    );
  }
}
