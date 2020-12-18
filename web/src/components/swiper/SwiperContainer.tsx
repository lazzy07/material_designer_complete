import React, { Component } from "react";

export default class SwiperContainer extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">{this.props.children}</div>
      </div>
    );
  }
}
