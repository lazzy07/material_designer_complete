import React, { Component } from "react";

interface Props {
  title: string;
  onClick: () => void;
  fontSize?: number | string;
}

export default class TextButton extends Component<Props, any> {
  render() {
    return (
      <div onClick={this.props.onClick} className="hoverColor">
        <p
          style={{
            margin: 0,
            padding: 0,
            fontSize: this.props.fontSize || undefined
          }}
        >
          {this.props.title}
        </p>
      </div>
    );
  }
}
