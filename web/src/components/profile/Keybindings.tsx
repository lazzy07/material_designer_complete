import React, { Component } from "react";
import { Post } from "../../interfaces/Post";
import { KeyBinding } from "../../interfaces/KeyBinding";
import KeybindingItem from "../feed/KeybindingItem";

interface Props {
  keybindings: Post<KeyBinding>[];
}

interface State {}

export default class Keybindings extends Component<Props, State> {
  render() {
    return (
      <div style={{ paddingTop: 10, paddingBottom: 10, minHeight: "100vh" }}>
        {this.props.keybindings.map((ele, index) => (
          <KeybindingItem key={index} keyBinding={ele} />
        ))}
      </div>
    );
  }
}
