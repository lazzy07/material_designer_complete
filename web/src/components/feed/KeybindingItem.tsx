import React, { Component } from "react";
import FeedItem from "./FeedItem";
import { Post } from "../../interfaces/Post";
import { KeyBinding } from "../../interfaces/KeyBinding";
import Button from "../common/Button";

interface Props {
  keyBinding: Post<KeyBinding>;
}

interface State {}

export default class KeybindingItem extends Component<Props, State> {
  render() {
    return (
      <div>
        <FeedItem post={this.props.keyBinding}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <img
              style={{ padding: 20 }}
              height="350px"
              src="/dependencies/img/keyboard.svg"
              alt=""
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h4>{this.props.keyBinding.data.name}</h4>
          </div>
          <div
            style={{
              paddingRight: 10,
              paddingLeft: 10,
              paddingBottom: 10,
              textAlign: "center"
            }}
          >
            {this.props.keyBinding.data.description}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button title="Add to my account" />
            <Button title="View" />
          </div>
        </FeedItem>
      </div>
    );
  }
}
