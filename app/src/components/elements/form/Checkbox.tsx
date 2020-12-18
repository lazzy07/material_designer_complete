import React, { Component } from "react";
import { Checkbox as CB } from "react-materialize";

interface CheckboxProps {
  value: string;
  title: string;
  checked: boolean;
  onClick?: () => void;
}

export default class Checkbox extends Component<CheckboxProps, any> {
  render() {
    return (
      <div>
        <CB
          value={this.props.value}
          label={this.props.title}
          filledIn
          checked={this.props.checked}
          onChange={this.props.onClick}
        />
      </div>
    );
  }
}
