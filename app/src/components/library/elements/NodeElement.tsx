import React, { Component } from "react";
import { NodeElementToInit } from "../../node_engine/NodeList";
import { DEFAULT_COLOR } from "../../../constants";

interface NodeElementProps {
  nodeList: NodeElementToInit;
}

export default class NodeElement extends Component<NodeElementProps, any> {
  render() {
    return (
      <div
        className="libraryItem col l6 s12"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          textAlign: "center"
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            fontSize: "30px",
            width: "60px",
            height: "60px",
            color: DEFAULT_COLOR,
            borderRadius: "50%",
            fontWeight: "bolder",
            textAlign: "center",
            paddingTop: "5px"
          }}
        >
          {this.props.nodeList.title[0]}
        </div>
        <div style={{ padding: "5px" }}>{this.props.nodeList.title}</div>
      </div>
    );
  }
}
