import React, { Component } from "react";

interface FileNameProps {
  fileName?: string;
}

export default class FileName extends Component<FileNameProps, any> {
  render() {
    return (
      <div>
        {this.props.fileName
          ? `${this.props.fileName} - Material Designer`
          : "Material Designer"}
      </div>
    );
  }
}
