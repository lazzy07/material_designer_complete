import React, { Component } from "react";
import { TextInput } from "react-materialize";
import "../../css/elements.css";

interface InputBoxProps {
  width?: number | string;
  type?: string;
  label?: string;
  placeholder?: string;
  value: string | number;
  name: string;
  onChange: (key: string, val: string) => void;
  onKeyDown?: (e: any, key: string, val: string) => void;
  autofocus?: boolean;
}

interface InputBoxState {}

export default class Textbox extends Component<InputBoxProps, InputBoxState> {
  render() {
    return (
      <TextInput
        className="inputter"
        autoFocus={this.props.autofocus}
        type={this.props.type}
        label={this.props.label}
        placeholder={this.props.placeholder}
        name={this.props.name}
        onChange={e => {
          this.props.onChange(e.target.name, e.target.value);
        }}
        onKeyPress={e =>
          this.props.onKeyDown
            ? this.props.onKeyDown(e, e.target.name, e.target.value)
            : undefined
        }
        value={this.props.value}
        style={{
          height: "2rem",
          width: this.props.width || undefined,
          paddingBottom: 0,
          marginBottom: 0
        }}
      />
    );
  }
}
