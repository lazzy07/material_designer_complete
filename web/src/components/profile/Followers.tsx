import React, { Component } from "react";
import UserInfo from "./UserInfo";
import { User } from "../../interfaces/User";

interface Props {
  followers: User[];
}

interface State {}

export default class Followers extends Component<Props, State> {
  renderFollowers = () => {
    return this.props.followers.map((ele, index) => {
      return (
        <div
          key={index}
          className="bgOnHover"
          style={{
            display: "flex",
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 6,
            paddingBottom: 6,
            alignItems: "center",
            cursor: "pointer"
          }}
        >
          <UserInfo user={ele} />
        </div>
      );
    });
  };

  render() {
    return (
      <div
        className="defaultBackground"
        style={{ paddingTop: 10, paddingBottom: 10, minHeight: "100vh" }}
      >
        {this.renderFollowers()}
      </div>
    );
  }
}
