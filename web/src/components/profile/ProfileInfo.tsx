import React, { Component } from "react";

interface Props {
  icon: string;
  title: string;
  count?: number;
  onClick: () => void;
  className?: string;
}

interface State {}

export default class ProfileInfo extends Component<Props, State> {
  render() {
    return (
      <div
        className={this.props.className ? this.props.className : "hoverColor"}
        style={{ cursor: "pointer", paddingTop: 20 }}
        onClick={this.props.onClick}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          <i
            style={{ padding: 0, margin: 0, fontSize: 60 }}
            className="material-icons"
          >
            {this.props.icon}
          </i>
          {typeof this.props.count === "number" && (
            <h4 style={{ padding: 0, margin: 0, fontWeight: "bolder" }}>
              {this.props.count.toString()}
            </h4>
          )}
          <h6 style={{ padding: 0, margin: 0 }}>{this.props.title}</h6>
        </div>
      </div>
    );
  }
}
