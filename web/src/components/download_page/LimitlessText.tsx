import React, { Component } from "react";
import { getText } from "../../text/LanguageSelector";
import { limitlessText } from "../../text/Limitless";

export default class LimitlessText extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 40,
          paddingBottom: 40,
          textAlign: "center"
        }}
      >
        <h1>{getText(limitlessText.text)}</h1>
      </div>
    );
  }
}
