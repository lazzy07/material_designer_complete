import Rete from "rete";
import { GRAYSCALE_SOCKET } from "../../types";
import { Node, Output } from "../../../../rete/src";
import {
  getInitSettings,
  shouldNodeUpdate,
  updateController,
  updateData
} from "../settings";
import Cache from "../../cache";
import Controllers from "../../Controllers";
import Editor from "../../Editor";
import ReteEngine from "../../Engine";
import NodeEngine from "../../../../material_engine";
import { imageViewer } from "../../controllers/ImageViewer";

export const THRESHOLD_NODE_TYPE = "node/thresh";

const THRESHOLD_INPUT = "thresh_input";
const THRESHOLD_INPUT_TITLE = "Image";

const THRESHOLD_OUTPUT = "thresh_output";
const THRESHOLD_OUTPUT_TITLE = "Image";

const THRESHOLD = "Threshold";

class ThresholdController extends Rete.Control {
  render: any;
  component: any;
  props: object;

  constructor(emitter: string, key: string, name: string, node: any) {
    super(key);
    this.key = key;
    this.render = "react";
    this.component = imageViewer; //Use functional components
    this.props = { emitter, name, node };
  }
}

export class ThresholdNode extends Rete.Component {
  constructor() {
    super(THRESHOLD);
  }

  async builder(node: Node): Promise<any> {
    let out = new Rete.Output(
      THRESHOLD_OUTPUT,
      THRESHOLD_OUTPUT_TITLE,
      GRAYSCALE_SOCKET
    );
    let input = new Rete.Input(
      THRESHOLD_INPUT,
      THRESHOLD_INPUT_TITLE,
      GRAYSCALE_SOCKET
    );
    node.meta = { type: "Operator" };
    let init = getInitSettings(THRESHOLD_NODE_TYPE);

    let controller = new ThresholdController(
      "Threshold",
      "threshold",
      "Threshold",
      node
    );

    node.addControl(controller);
    node.addInput(input);
    node.addOutput(out);

    node.data = {
      ...init,
      ...node.data,
      parameters: {
        threshVal: 128,
        maxVal: 255,
        threshType: 0,
        kernel: 3,
        substract: 2,
        ...node.data.parameters
      }
    };
    Controllers.setController((node.data as any).id, controller);
    Cache.setCache(init.id, null);
    return node;
  }

  worker(node: any, inputs: any, outputs: Output): any {
    if (node) {
      const update = shouldNodeUpdate(node, inputs, outputs);
      if (update) {
        let {
          threshVal,
          maxVal,
          threshType,
          kernel,
          substract
        } = node.data.parameters;

        let image = "";
        if (inputs[THRESHOLD_INPUT].length !== 0) {
          let cData = updateData(inputs, THRESHOLD_INPUT);
          if (cData) {
            if (cData.data) {
              image = cData.data;
            }
          }
        }

        NodeEngine.threshold(
          image,
          threshVal,
          maxVal,
          threshType,
          kernel,
          substract
        )
          .then(res => {
            let id = Cache.setCache(node.data.id, res);
            outputs[THRESHOLD_OUTPUT] = [node.data.id, id];

            node.data.cacheId = id;
            updateController(Controllers.getController(node.data.id));
            Editor.updateSelected(node.data.id);
            ReteEngine.updateEngine();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let c = Cache.getCache(node.data.id);
        if (c) {
          outputs[THRESHOLD_OUTPUT] = [node.data.id, c ? c.cacheId : undefined];
        }
      }
    }
  }
}
