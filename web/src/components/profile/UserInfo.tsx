import React, { Component } from "react";
import { User } from "../../interfaces/User";

interface Props {
  user: User;
}

interface State {}

export default class UserInfo extends Component<Props, State> {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <img
          width="40px"
          style={{ borderWidth: "50%", marginRight: "20px" }}
          src={
            this.props.user.profilePicture
              ? this.props.user.profilePicture.preview
              : "/dependencies/img/user.svg"
          }
          alt=""
        />
        <div>
          <p
            style={{
              fontWeight: "bolder",
              margin: 0,
              padding: 0,
              cursor: "pointer"
            }}
          >{`${this.props.user.firstName} ${this.props.user.lastName}`}</p>
          <p
            style={{ margin: 0, padding: 0, cursor: "pointer" }}
            className="specialColor"
          >
            {this.props.user.userName}
          </p>
        </div>
      </div>
    );
  }
}
