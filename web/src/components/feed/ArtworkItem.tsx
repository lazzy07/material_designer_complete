import React, { Component } from "react";
import { Post } from "../../interfaces/Post";
import { Artwork } from "../../interfaces/Artwork";
import FeedItem from "./FeedItem";
import { renderTags } from "../../services/RenderTags";
import { IMAGE_URL } from "../../constants";
import ProgressiveImage from "../progressive_image/ProgressiveImage";

interface Props {
  artwork: Post<Artwork>;
}

interface State {}

export default class ArtworkItem extends Component<Props, State> {
  render() {
    return (
      <div>
        <FeedItem post={this.props.artwork}>
          <div style={{ paddingLeft: 10, paddingRight: 10 }}>
            {this.props.artwork.data.description}
          </div>
          <div
            style={{
              display: "flex",
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 20
            }}
          >
            {renderTags(this.props.artwork.tags)}
          </div>
          <div style={{ paddingTop: 20 }}>
            {/* <img
              style={{ width: "100%" }}
              src={IMAGE_URL + this.props.artwork.data.image.url}
              alt=""
            /> */}
            <ProgressiveImage
              {...this.props.artwork.data.image}
              alt=""
              style={{ width: "100%" }}
              image={IMAGE_URL + this.props.artwork.data.image.url}
            />
          </div>
        </FeedItem>
      </div>
    );
  }
}
