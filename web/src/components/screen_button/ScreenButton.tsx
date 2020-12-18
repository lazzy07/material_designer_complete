import React, { Component } from "react";
import "../../css/screenbutton.css";

interface Props {
  title: string;
  onClick: () => void;
}

export default class ScreenButton extends Component<Props, any> {
  render() {
    return (
      <div onClick={this.props.onClick} className="neonButton">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {this.props.title}
      </div>
    );
  }
}
