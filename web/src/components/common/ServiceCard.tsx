import React, { Component } from "react";
import "../../css/square.css";

interface Props {
  title: string;
  icon: string;
}

export default class ServiceCard extends Component<Props, any> {
  render() {
    return (
      <div className="square">
        <div className="content">
          <img style={{ height: "100px" }} src={this.props.icon} alt="" />
          <h4>{this.props.title}</h4>
          <p>{this.props.children}</p>
        </div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
}
