import React, { Component } from "react";
import { Post } from "../../interfaces/Post";
import { Material } from "../../interfaces/Material";
import MaterialItem from "../feed/MaterialItem";

interface Props {
  materials: Post<Material>[];
}

export default class Materials extends Component<Props, any> {
  render() {
    return (
      <div style={{ paddingTop: 10, paddingBottom: 10, minHeight: "100vh" }}>
        {this.props.materials.map((ele, index) => (
          <MaterialItem material={ele} />
        ))}
      </div>
    );
  }
}
