import React, { Component } from "react";
import { Artwork } from "../../../interfaces/Artwork";
import M from "materialize-css";

import "../../../css/topartwork.css";
import ScreenButton from "../../screen_button/ScreenButton";
import { Post } from "../../../interfaces/Post";
import { IMAGE_URL } from "../../../constants";

interface Props {
  artworkItems: Post<Artwork>[];
}

export default class TopArtCarousel extends Component<Props, any> {
  renderCarouselItems() {
    return this.props.artworkItems.map((ele, index) => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center"
          }}
          key={index}
          className="carousel-item"
        >
          <img alt="Not working" src={IMAGE_URL + ele.data.image.url} />
          <p style={{ padding: 0, margin: 0 }}>Artwork by</p>
          <h5 style={{ padding: 0, margin: 0 }}>
            {ele.user.firstName + " " + ele.user.lastName}
          </h5>
        </div>
      );
    });
  }

  componentDidMount = () => {
    let elems = document.querySelectorAll(".carousel");
    (M as any).Carousel.init(elems, {
      fullWidth: false,
      width: "100vw",
      numVisible: 10,
      padding: 30
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div
            style={{ textAlign: "center", width: "100%" }}
            className="col s12"
          >
            <h2>Top 10 artworks using Material Designer</h2>
          </div>
          <div style={{ textAlign: "center" }} className="col s12 offset-m3 m6">
            <p>
              There are some of the best artworks done by different artists
              using material designer, join with them create something exciting
              and make your artworks on this top 10 !!
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="carousel">{this.renderCarouselItems()}</div>
          </div>
        </div>
        <div
          style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <p>Click here to view more form atrists</p>
        </div>
        <div
          style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            paddingBottom: "60px"
          }}
        >
          <ScreenButton title="View top 10's" onClick={() => {}} />
        </div>
      </div>
    );
  }
}
