import React, { Component } from "react";
import Figure from "./Figure";
import { imageVisualizerMenu } from "./ImageVisualizerMenu";
import MenuBarSecondary from "../common/MenuBarSecondary";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";

interface ImageVisualizerProps {
  dimensions?: { width: number; height: number };
  imageViewer: string;
}

class ImageVisualizer extends Component<ImageVisualizerProps, any> {
  render() {
    return (
      <div style={{ overflow: "hidden" }}>
        <MenuBarSecondary
          menu={imageVisualizerMenu}
          zIndex={1003}
          index={1002}
        />
        <Figure
          src={"data:image/jpeg;base64," + this.props.imageViewer}
          dimensions={this.props.dimensions}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    imageViewer: state.system.imageViewer
  };
};

export default connect(mapStateToProps)(ImageVisualizer);
