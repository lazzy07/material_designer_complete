import React, { Component } from "react";

interface Props {
  icon: string;
}

export default class EditorTechCard extends Component<Props, any> {
  render() {
    return (
      <div
        className="col s3 m2"
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center"
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img style={{ height: "60px" }} src={this.props.icon} alt="" />
        </div>
        <p>{this.props.children}</p>
      </div>
    );
  }
}
