import React, { Component } from "react";
import { Post } from "../../interfaces/Post";
import { Material } from "../../interfaces/Material";
import FeedItem from "./FeedItem";
import Button from "../common/Button";
import { renderTags } from "../../services/RenderTags";
import ProgressiveImage from "../progressive_image/ProgressiveImage";
import { IMAGE_URL } from "../../constants";

interface Props {
  material: Post<Material>;
}

interface State {}

export default class MaterialItem extends Component<Props, State> {
  render() {
    return (
      <div>
        <FeedItem post={this.props.material}>
          <div style={{ paddingLeft: 10, paddingRight: 10 }}>
            {this.props.material.data.description}
          </div>
          <div
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 10,
              paddingRight: 10,
              display: "flex",
              alignItems: "center"
            }}
          >
            {renderTags(this.props.material.tags)}
          </div>
          <div>
            {/* <img
              width={"100%"}
              src={this.props.material.data.image.url}
              alt=""
            /> */}
            <ProgressiveImage
              {...this.props.material.data.image}
              alt=""
              style={{ width: "100%" }}
              image={IMAGE_URL + this.props.material.data.image.url}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            <h4>{this.props.material.data.name}</h4>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button title={"Open Material"} />
          </div>
        </FeedItem>
      </div>
    );
  }
}
