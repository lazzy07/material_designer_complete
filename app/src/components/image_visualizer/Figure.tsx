import React from "react";
import panzoom from "panzoom";

interface FigureProps {
  dimensions?: { width: number; height: number };
  src: string;
}

export default class Figure extends React.Component<FigureProps, any> {
  ref: HTMLElement | null = null;

  componentDidMount() {
    if (this.ref) {
      panzoom(this.ref, { smoothScroll: false, maxZoom: 8, minZoom: 0.5 });
    }
  }

  render() {
    return (
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          height: "100%",
          ...this.props.dimensions
        }}
      >
        <img
          ref={ref => (this.ref = ref)}
          src={this.props.src}
          alt=""
          style={{ overflow: "auto", position: "absolute" }}
          width="100%"
        />
      </div>
    );
  }
}
