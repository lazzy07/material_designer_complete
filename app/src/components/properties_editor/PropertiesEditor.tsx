import React, { Component } from "react";
import { Tabs, Tab } from "react-materialize";

import CommentOptions from "../node_engine/comments/CommentOptions";
import { VIEWER_NODE_TYPE } from "../node_engine/nodes/ViewerNode/ViewerNode";
import ViewerController from "../node_engine/nodes/ViewerNode/ViewerController";
import { Engine } from "../../rete/src";
import Editor from "../node_engine/Editor";
import { PERLIN_NOISE_TYPE } from "../node_engine/nodes/PerlinNoise/PerlinNoiseNode";
import PerlinNoiseController from "../node_engine/nodes/PerlinNoise/PerlinNoiseController";
import { BLEND_GRAYSCALE_TYPE } from "../node_engine/nodes/BlendNodeGrayscale/BlendNodeGrayscale";
import BlendNodeGrayscaleController from "../node_engine/nodes/BlendNodeGrayscale/BlendNodeGrayscaleController";
import { THRESHOLD_NODE_TYPE } from "../node_engine/nodes/Threshold/ThresholdNode";
import ThresholdNodeController from "../node_engine/nodes/Threshold/ThresholdNodeController";
import { BLUR_NODE_TYPE } from "../node_engine/nodes/Blur/BlurNode";
import BlurNodeController from "../node_engine/nodes/Blur/BlurNodeController";
import { DISTTRANS_NODE_TYPE } from "../node_engine/nodes/DistanceTransform/DistanceTransformNode";
import DistanceTransformController from "../node_engine/nodes/DistanceTransform/DistanceTransformNodeController";
import { HIGHPASSGRAY_NODE_TYPE } from "../node_engine/nodes/HighpassNode/HighpassNode";
import HighpassNodeController from "../node_engine/nodes/HighpassNode/HighpassNodeController";
import { GAMMACORRECTION_NODE_TYPE } from "../node_engine/nodes/GammaCorrection/GammaCorrection";
import GammaCorrectionController from "../node_engine/nodes/GammaCorrection/GammaCorrectionController";
import MorphologyNodeController from "../node_engine/nodes/MorphologyNode/MorphologyNodeController";
import { MORPHOLOGY_NODE_TYPE } from "../node_engine/nodes/MorphologyNode/MorphologyNode";
import { COLORIZE_NODE_TYPE } from "../node_engine/nodes/Colorize/Colorize";
import ColorizeController from "../node_engine/nodes/Colorize/ColorizeController";
import { number } from "prop-types";

interface PropertiesEditorProps {
  selected: any;
  engine: Engine;
  dimensions?: { width: number; height: number };
}

export default class PropertiesEditor extends Component<
  PropertiesEditorProps,
  any
> {
  renderControls = selected => {
    if (selected) {
      if ((selected as any).editor) {
        return <CommentOptions comment={selected} />;
      } else {
        //selected is a node
        switch (selected.data.type) {
          case VIEWER_NODE_TYPE:
            //Render viewernode controller
            return (
              <ViewerController
                updateEngine={this.updateEngine}
                node={selected}
              />
            );
          case PERLIN_NOISE_TYPE:
            return (
              <PerlinNoiseController
                updateEngine={this.updateEngine}
                node={selected}
              />
            );
          case BLEND_GRAYSCALE_TYPE:
            return (
              <BlendNodeGrayscaleController
                updateEngine={this.updateEngine}
                node={selected}
              />
            );
          case THRESHOLD_NODE_TYPE:
            return (
              <ThresholdNodeController
                updateEngine={this.updateEngine}
                node={selected}
              />
            );
          case BLUR_NODE_TYPE:
            return (
              <BlurNodeController
                updateEngine={this.updateEngine}
                node={selected}
              />
            );
          case DISTTRANS_NODE_TYPE:
            return (
              <DistanceTransformController
                updateEngine={this.updateEngine}
                node={selected}
              />
            );
          case HIGHPASSGRAY_NODE_TYPE:
            return (
              <HighpassNodeController
                updateEngine={this.updateEngine}
                node={selected}
              />
            );

          case GAMMACORRECTION_NODE_TYPE:
            return (
              <GammaCorrectionController
                updateEngine={this.updateEngine}
                node={selected}
              />
            );

          case MORPHOLOGY_NODE_TYPE:
            return (
              <MorphologyNodeController
                updateEngine={this.updateEngine}
                node={selected}
              />
            );

          case COLORIZE_NODE_TYPE:
            return (
              <ColorizeController
                updateEngine={this.updateEngine}
                node={selected}
                dimensions={this.props.dimensions}
              />
            );
        }
      }
    }
  };

  updateEngine = async () => {
    if (this.props.selected) {
      if (!(this.props.selected as any).editor) {
        const json = Editor.getEditor().toJSON();
        await this.props.engine.abort();
        this.props.engine.process(json);
      }
    }
  };

  render() {
    return (
      <div>
        <Tabs className="libraryShelf" style={{ overflow: "hidden" }}>
          <Tab className="propertiesTab" title="Node">
            <div
              style={{
                paddingBottom: "50px",
                overflowY: "auto",
                height: this.props.dimensions
                  ? this.props.dimensions.height
                  : undefined,
                width: this.props.dimensions
                  ? typeof this.props.dimensions.width === "number"
                    ? this.props.dimensions.width - 10
                    : undefined
                  : undefined,
                paddingRight: "10px"
              }}
            >
              {this.renderControls(this.props.selected)}
            </div>
          </Tab>
          <Tab title="Global"></Tab>
        </Tabs>
      </div>
    );
  }
}
