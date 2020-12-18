import React, { Component } from "react";

export default class Icon extends Component<any, any> {
  render() {
    return (
      <div
        style={{
          padding: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img src="./dependencies/img/icon_32x32.png" height="20px" alt="" />
      </div>
    );
  }
}
